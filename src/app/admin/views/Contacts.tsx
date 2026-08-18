"use client";
import { useMemo, useState } from "react";
import type { Crm } from "../useCrm";
import { ContactCard } from "../components/ContactCard";
import { leadStatusConfig } from "../statuses";
import { DEFAULT_SEGMENT, SEGMENTS, segmentMeta } from "../segments";
import { DAY, uid, type Lead, type LeadStatus } from "../types";
import { ACCENT, BORDER, CARD, FAINT, FILL, GREEN, INK, LINE, MUTED, btnS, ghostS, inputS, labelS } from "../theme";

// Everyone lives in Contacts. "Type" is derived from the pipeline status so the
// same record can be a lead, a member, a nurture contact, or a past/lost one.
type ContactType = "lead" | "member" | "nurture" | "past";
function typeOf(status: LeadStatus): { key: ContactType; label: string; color: string } {
  if (status === "member") return { key: "member", label: "Member", color: GREEN };
  if (status === "later") return { key: "nurture", label: "Nurture", color: "#C79A4A" };
  if (status === "declined") return { key: "past", label: "Past", color: FAINT };
  return { key: "lead", label: "Lead", color: ACCENT };
}
const TYPES: { id: "all" | ContactType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "lead", label: "Leads" },
  { id: "member", label: "Members" },
  { id: "nurture", label: "Nurture" },
  { id: "past", label: "Past" },
];

const COLS = "1.9fr 0.8fr 1fr 0.8fr 1.1fr 1.2fr 0.5fr";

export function Contacts({ crm }: { crm: Crm }) {
  const { leads, saveLeads, now } = crm;
  const [type, setType] = useState<"all" | ContactType>("all");
  const [seg, setSeg] = useState<"all" | string>("all");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const segOf = (l: Lead) => l.segment ?? DEFAULT_SEGMENT;
  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return leads
      .filter((l) => type === "all" || typeOf(l.status).key === type)
      .filter((l) => seg === "all" || segOf(l) === seg)
      .filter((l) => !query || `${l.name} ${l.email} ${l.business} ${l.whatsapp} ${l.revenue}`.toLowerCase().includes(query))
      .sort((a, b) => (b.lastActivityAt ?? b.createdAt) - (a.lastActivityAt ?? a.createdAt));
  }, [leads, type, seg, q]);

  const typeCounts = { all: leads.length } as Record<string, number>;
  for (const t of ["lead", "member", "nurture", "past"]) typeCounts[t] = leads.filter((l) => typeOf(l.status).key === t).length;

  const update = (next: Lead) => saveLeads(leads.map((l) => (l.id === next.id ? next : l)));
  const remove = (id: string) => { saveLeads(leads.filter((l) => l.id !== id)); setSelectedId(null); };
  const addContact = () => {
    const lead: Lead = {
      id: uid(), name: "New contact", email: "", whatsapp: "", instagram: "", business: "", revenue: "",
      source: "Manual", segment: DEFAULT_SEGMENT, status: "new", notes: "",
      createdAt: Date.now(), sequenceStep: 0, lastEmailAt: null, sequenceActive: false, lastActivityAt: Date.now(),
    };
    saveLeads([lead, ...leads]);
    setSelectedId(lead.id);
  };
  const selected = leads.find((l) => l.id === selectedId) ?? null;

  return (
    <>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", margin: 0 }}>Contacts</h1>
          <p style={{ margin: "6px 0 0", fontSize: 13.5, color: MUTED }}>Everyone you know · {leads.length} people</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={ghostS}>⇩ Export</button>
          <button style={btnS} onClick={addContact}>+ Add contact</button>
        </div>
      </header>

      {/* Type filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {TYPES.map((t) => {
          const on = type === t.id;
          return (
            <button key={t.id} onClick={() => setType(t.id)} style={{ border: `1px solid ${on ? "rgba(139,92,246,0.5)" : LINE}`, background: on ? "rgba(139,92,246,0.16)" : "transparent", color: on ? "#fff" : MUTED, fontWeight: on ? 800 : 600, fontSize: 12.5, padding: "7px 14px", borderRadius: 100, cursor: "pointer", fontFamily: "inherit" }}>
              {t.label} · {typeCounts[t.id] ?? 0}
            </button>
          );
        })}
      </div>

      {/* Segment filter + search */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[{ id: "all", label: "All segments" }, ...SEGMENTS.map((s) => ({ id: s.id, label: s.short }))].map((s) => {
            const on = seg === s.id;
            return (
              <button key={s.id} onClick={() => setSeg(s.id)} style={{ border: BORDER, background: on ? FILL : "transparent", color: on ? "#fff" : FAINT, fontWeight: 600, fontSize: 12, padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
                {s.label}
              </button>
            );
          })}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search contacts…" style={{ ...inputS, width: 260 }} />
      </div>

      {/* Table */}
      <div style={{ background: CARD, border: BORDER, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: COLS, gap: 12, padding: "11px 18px", borderBottom: BORDER }}>
          {["Contact", "Type", "Stage", "Segment", "Revenue", "Email / phone", "Last"].map((h) => (
            <span key={h} style={{ ...labelS, fontSize: 9.5 }}>{h}</span>
          ))}
        </div>
        {rows.length === 0 && <div style={{ padding: "28px 18px", color: FAINT, fontSize: 13 }}>No contacts match these filters.</div>}
        {rows.map((l) => {
          const meta = segmentMeta(l.segment);
          const cfg = leadStatusConfig[l.status];
          const ty = typeOf(l.status);
          const initials = l.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
          const last = l.lastActivityAt ?? l.lastEmailAt ?? l.createdAt;
          const age = now ? Math.max(0, Math.floor((now - last) / DAY)) : 0;
          return (
            <button key={l.id} onClick={() => setSelectedId(l.id)} style={{ width: "100%", display: "grid", gridTemplateColumns: COLS, gap: 12, alignItems: "center", padding: "11px 18px", borderBottom: BORDER, background: "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: `${meta.color}26`, color: meta.color, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{initials || "?"}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#fff", ...ellip }}>{l.name}</span>
                  <span style={{ display: "block", fontSize: 11, color: FAINT, ...ellip }}>{l.role || l.business || meta.label}</span>
                </span>
              </span>
              <span><Pill label={ty.label} color={ty.color} /></span>
              <span style={{ fontSize: 12, color: cfg.color, fontWeight: 600 }}>{cfg.label}</span>
              <span style={{ fontSize: 12, color: MUTED }}>{meta.short}</span>
              <span style={{ fontSize: 12.5, color: l.revenue ? INK : FAINT, ...ellip }}>{l.revenue || "—"}</span>
              <span style={{ fontSize: 12, color: MUTED, ...ellip }}>{l.email || l.whatsapp || "—"}</span>
              <span style={{ fontSize: 12, color: FAINT }}>{age}d</span>
            </button>
          );
        })}
      </div>

      {selected && <ContactCard lead={selected} onSave={update} onClose={() => setSelectedId(null)} onDelete={remove} />}
    </>
  );
}

const ellip: React.CSSProperties = { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
function Pill({ label, color }: { label: string; color: string }) {
  return <span style={{ fontSize: 10.5, fontWeight: 700, color, background: `${color}1e`, border: `1px solid ${color}33`, borderRadius: 100, padding: "2px 9px" }}>{label}</span>;
}

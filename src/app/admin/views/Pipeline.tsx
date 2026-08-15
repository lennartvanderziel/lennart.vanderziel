"use client";
import { useMemo, useState } from "react";
import type { Crm } from "../useCrm";
import { ContactCard } from "../components/ContactCard";
import { PIPELINE_ORDER, leadStatusConfig } from "../statuses";
import { DEFAULT_SEGMENT, SEGMENTS, segmentMeta } from "../segments";
import { DAY, uid, type Lead, type LeadStatus } from "../types";
import { ACCENT, BORDER, CARD, CARD_2, FAINT, FILL, GREEN, INK, LINE, MUTED, btnS, ghostS, inputS, labelS } from "../theme";

type SegFilter = "all" | string;

export function Pipeline({ crm }: { crm: Crm }) {
  const { leads, saveLeads, now } = crm;
  const [seg, setSeg] = useState<SegFilter>("all");
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"pipeline" | "table" | "insights">("pipeline");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const segOf = (l: Lead) => l.segment ?? DEFAULT_SEGMENT;
  const visible = useMemo(() => {
    const query = q.trim().toLowerCase();
    return leads.filter(
      (l) =>
        (seg === "all" || segOf(l) === seg) &&
        (!query || `${l.name} ${l.email} ${l.business} ${l.whatsapp}`.toLowerCase().includes(query))
    );
  }, [leads, seg, q]);

  const activeCount = visible.filter((l) => ["new", "contacted", "warming", "exploratory", "decision"].includes(l.status)).length;
  const segCounts: Record<string, number> = { all: leads.length };
  for (const s of SEGMENTS) segCounts[s.id] = leads.filter((l) => segOf(l) === s.id).length;

  const update = (next: Lead) => saveLeads(leads.map((l) => (l.id === next.id ? next : l)));
  const remove = (id: string) => { saveLeads(leads.filter((l) => l.id !== id)); setSelectedId(null); };
  const addContact = () => {
    const lead: Lead = {
      id: uid(), name: "New contact", email: "", whatsapp: "", instagram: "", business: "", revenue: "",
      source: "Manual", segment: seg === "all" ? DEFAULT_SEGMENT : (seg as Lead["segment"]), status: "new", notes: "",
      createdAt: Date.now(), sequenceStep: 0, lastEmailAt: null, sequenceActive: false, lastActivityAt: Date.now(),
    };
    saveLeads([lead, ...leads]);
    setSelectedId(lead.id);
  };

  const selected = leads.find((l) => l.id === selectedId) ?? null;

  return (
    <>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", margin: 0 }}>Leads</h1>
          <p style={{ margin: "6px 0 0", fontSize: 13.5, color: MUTED }}>
            {activeCount} active in pipeline · {visible.length} contacts
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={ghostS}>⇩ Export</button>
          <button style={btnS} onClick={addContact}>+ Add contact</button>
        </div>
      </header>

      {/* Tabs — Pipeline (kanban) · Table (list) · Insights (numbers) */}
      <div style={{ display: "flex", gap: 2, marginBottom: 16, borderBottom: BORDER }}>
        {([["pipeline", "Pipeline"], ["table", "Table"], ["insights", "Insights"]] as const).map(([id, label]) => {
          const on = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{ background: "transparent", border: "none", borderBottom: on ? `2px solid ${ACCENT}` : "2px solid transparent", color: on ? "#fff" : MUTED, fontWeight: on ? 800 : 600, fontSize: 13.5, padding: "9px 14px", cursor: "pointer", fontFamily: "inherit", marginBottom: -1 }}>
              {label}
            </button>
          );
        })}
      </div>

      {/* Toolbar: search + segment chips */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[{ id: "all", label: "All" }, ...SEGMENTS.map((s) => ({ id: s.id, label: s.short }))].map((t) => {
            const active = seg === t.id;
            return (
              <button key={t.id} onClick={() => setSeg(t.id)} style={{ border: `1px solid ${active ? "rgba(139,92,246,0.5)" : LINE}`, background: active ? "rgba(139,92,246,0.16)" : "transparent", color: active ? "#fff" : MUTED, fontWeight: active ? 800 : 600, fontSize: 12.5, padding: "7px 14px", borderRadius: 100, cursor: "pointer", fontFamily: "inherit" }}>
                {t.label}{segCounts[t.id] !== undefined ? ` · ${segCounts[t.id]}` : ""}
              </button>
            );
          })}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search contacts…" style={{ ...inputS, width: 240 }} />
      </div>

      {/* Pipeline — kanban board */}
      {tab === "pipeline" && (
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 12, alignItems: "flex-start" }}>
          {PIPELINE_ORDER.map((status) => {
            const cfg = leadStatusConfig[status];
            const column = visible.filter((l) => l.status === status);
            return (
              <div key={status} style={{ flex: "0 0 288px", width: 288 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 4px 12px" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.color }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: INK, textTransform: "uppercase", letterSpacing: "0.04em" }}>{cfg.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: FAINT, background: FILL, borderRadius: 100, padding: "1px 8px" }}>{column.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 60 }}>
                  {column.length === 0 && (
                    <div style={{ border: `1px dashed ${LINE}`, borderRadius: 14, padding: "18px 12px", textAlign: "center", fontSize: 12, color: FAINT }}>Empty</div>
                  )}
                  {column.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} now={now} onOpen={() => setSelectedId(lead.id)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "table" && <LeadTable rows={visible} now={now} onOpen={setSelectedId} />}
      {tab === "insights" && <Insights rows={visible} />}

      {selected && <ContactCard lead={selected} onSave={update} onClose={() => setSelectedId(null)} onDelete={remove} />}
    </>
  );
}

function LeadCard({ lead, now, onOpen }: { lead: Lead; now: number; onOpen: () => void }) {
  const meta = segmentMeta(lead.segment);
  const initials = lead.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const age = now ? Math.max(0, Math.floor((now - lead.createdAt) / DAY)) : 0;
  const digits = (s: string) => s.replace(/[^\d+]/g, "");
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <article
      onClick={onOpen}
      style={{ background: CARD, border: BORDER, borderRadius: 14, padding: "13px 14px", cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.3)", borderLeft: `3px solid ${leadStatusConfig[lead.status].color}` }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 34, height: 34, borderRadius: 10, background: `${meta.color}26`, color: meta.color, display: "grid", placeItems: "center", fontSize: 12.5, fontWeight: 800, flexShrink: 0 }}>{initials || "?"}</span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.name}</div>
          <div style={{ fontSize: 11.5, color: MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.role || lead.business || meta.label}</div>
        </div>
      </div>

      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4, fontSize: 11.5, color: MUTED }}>
        {lead.whatsapp && <span style={ellip}>✆ {lead.whatsapp}</span>}
        {lead.email && <span style={ellip}>✉ {lead.email}</span>}
        {!lead.whatsapp && !lead.email && <span style={{ color: FAINT }}>No contact details</span>}
      </div>

      <div style={{ marginTop: 9, fontSize: 12.5, fontWeight: 700, color: lead.revenue ? INK : FAINT }}>{lead.revenue || "No value set"}</div>

      <div style={{ marginTop: 9, display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Tag label={meta.short} color={meta.color} />
        {lead.business && <Tag label="Has business" color={FAINT} />}
        {lead.rating != null && <Tag label={`★ ${lead.rating}`} color="#F3C969" />}
      </div>

      <div style={{ marginTop: 11, display: "flex", gap: 6 }} onClick={stop}>
        <a href={lead.whatsapp ? `tel:${digits(lead.whatsapp)}` : undefined} style={{ ...miniBtn, opacity: lead.whatsapp ? 1 : 0.4, pointerEvents: lead.whatsapp ? "auto" : "none" }}>Call</a>
        <a href={lead.whatsapp ? `https://wa.me/${digits(lead.whatsapp)}` : undefined} target="_blank" rel="noreferrer" style={{ ...miniBtn, background: lead.whatsapp ? "rgba(52,211,153,0.16)" : FILL, color: lead.whatsapp ? GREEN : FAINT, pointerEvents: lead.whatsapp ? "auto" : "none" }}>WA</a>
        <button onClick={onOpen} style={{ ...miniBtn, flex: 1 }}>Open</button>
      </div>

      <div style={{ marginTop: 9, paddingTop: 8, borderTop: BORDER, display: "flex", justifyContent: "space-between", fontSize: 10.5, color: FAINT }}>
        <span>{age}d old</span>
        <span>{lead.source}</span>
      </div>
    </article>
  );
}

const ellip: React.CSSProperties = { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const miniBtn: React.CSSProperties = { background: CARD_2, border: BORDER, color: INK, fontSize: 11.5, fontWeight: 700, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontFamily: "inherit", textAlign: "center", textDecoration: "none" };

function Tag({ label, color }: { label: string; color: string }) {
  return <span style={{ fontSize: 10.5, fontWeight: 700, color, background: `${color}1e`, border: `1px solid ${color}33`, borderRadius: 100, padding: "2px 8px" }}>{label}</span>;
}

const COLS = "1.8fr 1fr 0.8fr 1fr 1.4fr 0.5fr";
function LeadTable({ rows, now, onOpen }: { rows: Lead[]; now: number; onOpen: (id: string) => void }) {
  return (
    <div style={{ background: CARD, border: BORDER, borderRadius: 16, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: COLS, gap: 12, padding: "11px 18px", borderBottom: BORDER }}>
        {["Contact", "Stage", "Segment", "Revenue", "Email / phone", "Age"].map((h) => (
          <span key={h} style={{ ...labelS, fontSize: 9.5 }}>{h}</span>
        ))}
      </div>
      {rows.length === 0 && <div style={{ padding: "26px 18px", color: FAINT, fontSize: 13 }}>No contacts in this view.</div>}
      {rows.map((l) => {
        const meta = segmentMeta(l.segment);
        const cfg = leadStatusConfig[l.status];
        const age = now ? Math.max(0, Math.floor((now - l.createdAt) / DAY)) : 0;
        const initials = l.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
        return (
          <button key={l.id} onClick={() => onOpen(l.id)} style={{ width: "100%", display: "grid", gridTemplateColumns: COLS, gap: 12, alignItems: "center", padding: "11px 18px", borderBottom: BORDER, background: "transparent", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: `${meta.color}26`, color: meta.color, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{initials || "?"}</span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#fff", ...ellip }}>{l.name}</span>
                <span style={{ display: "block", fontSize: 11, color: FAINT, ...ellip }}>{l.role || l.business || meta.label}</span>
              </span>
            </span>
            <span><Tag label={cfg.label} color={cfg.color} /></span>
            <span style={{ fontSize: 12, color: MUTED }}>{meta.short}</span>
            <span style={{ fontSize: 12.5, color: l.revenue ? INK : FAINT, ...ellip }}>{l.revenue || "—"}</span>
            <span style={{ fontSize: 12, color: MUTED, ...ellip }}>{l.email || l.whatsapp || "—"}</span>
            <span style={{ fontSize: 12, color: FAINT }}>{age}d</span>
          </button>
        );
      })}
    </div>
  );
}

function Insights({ rows }: { rows: Lead[] }) {
  const total = rows.length;
  const byStage = PIPELINE_ORDER.map((s) => ({ s, n: rows.filter((l) => l.status === s).length }));
  const bySeg = SEGMENTS.map((s) => ({ s, n: rows.filter((l) => (l.segment ?? "shoulder_to_shoulder") === s.id).length }));
  const members = rows.filter((l) => l.status === "member").length;
  const active = rows.filter((l) => ["new", "contacted", "warming", "exploratory", "decision"].includes(l.status)).length;
  const withContact = rows.filter((l) => l.email || l.whatsapp).length;
  const max = Math.max(1, ...byStage.map((x) => x.n));

  const stat = (label: string, value: string | number, color = INK) => (
    <div style={{ background: CARD, border: BORDER, borderRadius: 14, padding: "18px 20px" }}>
      <div style={{ ...labelS, fontSize: 10 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, color, marginTop: 8, letterSpacing: "-0.02em" }}>{value}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
        {stat("Total contacts", total)}
        {stat("Active in pipeline", active, ACCENT)}
        {stat("Members won", members, GREEN)}
        {stat("With contact info", `${total ? Math.round((withContact / total) * 100) : 0}%`)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
        <div style={{ background: CARD, border: BORDER, borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 16 }}>By stage</div>
          {byStage.map(({ s, n }) => {
            const cfg = leadStatusConfig[s];
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ width: 110, fontSize: 12.5, color: MUTED }}>{cfg.label}</span>
                <span style={{ flex: 1, height: 8, background: FILL, borderRadius: 100, overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: `${(n / max) * 100}%`, background: cfg.color, borderRadius: 100 }} />
                </span>
                <span style={{ width: 34, textAlign: "right", fontSize: 13, fontWeight: 800, color: INK }}>{n}</span>
              </div>
            );
          })}
        </div>
        <div style={{ background: CARD, border: BORDER, borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 16 }}>By segment</div>
          {bySeg.map(({ s, n }) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: BORDER }}>
              <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: INK }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: s.color }} />{s.label}
              </span>
              <span style={{ fontSize: 14, fontWeight: 800, color: INK }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

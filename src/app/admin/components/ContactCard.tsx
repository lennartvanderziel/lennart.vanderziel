"use client";
import { useEffect, useState } from "react";
import { DAY, type Lead, type LeadStatus, type Segment } from "../types";
import { leadStatusConfig } from "../statuses";
import { SEGMENTS, segmentMeta } from "../segments";
import { BORDER, CARD, CARD_2, FAINT, FILL, GREEN, INK, LINE, MUTED, RED, labelS } from "../theme";

const STEPPER: LeadStatus[] = ["new", "contacted", "warming", "exploratory", "decision", "member"];
const daysSince = (t?: number | null) => (t ? Math.max(0, Math.floor((Date.now() - t) / DAY)) : null);
const digits = (s: string) => s.replace(/[^\d+]/g, "");

export function ContactCard({
  lead,
  onSave,
  onClose,
  onDelete,
}: {
  lead: Lead;
  onSave: (next: Lead) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
}) {
  const [f, setF] = useState<Lead>(lead);
  useEffect(() => setF(lead), [lead]);

  // Selects/buttons commit immediately; text fields commit on blur.
  const patch = (p: Partial<Lead>) => {
    const next = { ...f, ...p, lastActivityAt: Date.now() };
    setF(next);
    onSave(next);
  };
  const setLocal = (p: Partial<Lead>) => setF((c) => ({ ...c, ...p }));
  const commit = () => onSave(f);

  const inPipeline = daysSince(f.createdAt);
  const lastAction = daysSince(f.lastActivityAt ?? f.lastEmailAt ?? f.createdAt);
  const seg = segmentMeta(f.segment);
  const curIdx = STEPPER.indexOf(f.status);

  const field = (label: string, key: keyof Lead, opts?: { type?: string; area?: boolean; placeholder?: string }) => (
    <label style={{ display: "block", marginBottom: 12 }}>
      <span style={{ ...labelS, fontSize: 10, display: "block", marginBottom: 5 }}>{label}</span>
      {opts?.area ? (
        <textarea
          value={(f[key] as string) ?? ""}
          placeholder={opts?.placeholder}
          onChange={(e) => setLocal({ [key]: e.target.value } as Partial<Lead>)}
          onBlur={commit}
          rows={3}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
        />
      ) : (
        <input
          type={opts?.type ?? "text"}
          value={(f[key] as string) ?? ""}
          placeholder={opts?.placeholder}
          onChange={(e) => setLocal({ [key]: e.target.value } as Partial<Lead>)}
          onBlur={commit}
          style={inputStyle}
        />
      )}
    </label>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(4,4,9,0.55)", zIndex: 90, backdropFilter: "blur(2px)" }} />
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "min(440px, 94vw)",
          background: CARD,
          borderLeft: BORDER,
          boxShadow: "-24px 0 60px rgba(0,0,0,0.5)",
          zIndex: 91,
          overflowY: "auto",
          padding: "20px 22px 40px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
          <input
            value={f.name}
            onChange={(e) => setLocal({ name: e.target.value })}
            onBlur={commit}
            style={{ ...inputStyle, fontSize: 18, fontWeight: 800, padding: "8px 10px", flex: 1 }}
          />
          <button onClick={onClose} aria-label="Close" style={{ ...iconBtn, fontSize: 18 }}>×</button>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          <select value={f.status} onChange={(e) => patch({ status: e.target.value as LeadStatus })} style={{ ...selectStyle, color: leadStatusConfig[f.status].color, fontWeight: 700 }}>
            {(Object.keys(leadStatusConfig) as LeadStatus[]).map((s) => (
              <option key={s} value={s} style={{ color: INK }}>{leadStatusConfig[s].label}</option>
            ))}
          </select>
          <select value={f.priority ?? ""} onChange={(e) => patch({ priority: (e.target.value || null) as Lead["priority"] })} style={selectStyle}>
            <option value="">No priority</option>
            <option value="high">High priority</option>
            <option value="medium">Medium priority</option>
            <option value="low">Low priority</option>
          </select>
        </div>

        {/* Meta */}
        <div style={{ display: "flex", gap: 18, marginBottom: 18, fontSize: 12 }}>
          <span style={{ color: FAINT }}>In pipeline <b style={{ color: MUTED }}>{inPipeline ?? 0}d</b></span>
          <span style={{ color: FAINT }}>Last action <b style={{ color: (lastAction ?? 0) > 14 ? RED : MUTED }}>{lastAction ?? 0}d</b></span>
        </div>

        {/* Quick contact actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          <a href={f.whatsapp ? `https://wa.me/${digits(f.whatsapp)}` : undefined} target="_blank" rel="noreferrer" onClick={() => f.whatsapp && patch({})} style={{ ...actBtn, background: f.whatsapp ? GREEN : FILL, color: f.whatsapp ? "#08210f" : FAINT, pointerEvents: f.whatsapp ? "auto" : "none" }}>WhatsApp</a>
          <a href={f.whatsapp ? `tel:${digits(f.whatsapp)}` : undefined} style={{ ...actBtn, pointerEvents: f.whatsapp ? "auto" : "none", opacity: f.whatsapp ? 1 : 0.5 }}>Call</a>
          <a href={f.email ? `mailto:${f.email}` : undefined} style={{ ...actBtn, pointerEvents: f.email ? "auto" : "none", opacity: f.email ? 1 : 0.5 }}>Email</a>
        </div>

        {/* Outcome buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 22 }}>
          <button onClick={() => patch({ status: "member", sequenceActive: false })} style={{ ...actBtn, background: "rgba(52,211,153,0.14)", color: GREEN, border: "1px solid rgba(52,211,153,0.4)" }}>🏆 Won · Member</button>
          <button onClick={() => patch({ status: "declined" })} style={{ ...actBtn, background: "rgba(248,113,113,0.12)", color: RED, border: "1px solid rgba(248,113,113,0.4)" }}>Lost</button>
        </div>

        {/* Process stepper */}
        <div style={{ ...labelS, marginBottom: 10 }}>Process</div>
        <div style={{ display: "flex", gap: 4, marginBottom: 22 }}>
          {STEPPER.map((s, i) => {
            const done = i <= curIdx && curIdx >= 0;
            const cfg = leadStatusConfig[s];
            return (
              <button key={s} onClick={() => patch({ status: s })} title={cfg.label} style={{ flex: 1, textAlign: "center", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                <div style={{ height: 26, width: 26, margin: "0 auto", borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800, background: done ? cfg.color : FILL, color: done ? "#0b0b12" : FAINT, border: i === curIdx ? `2px solid #fff` : "2px solid transparent" }}>{i + 1}</div>
                <div style={{ fontSize: 8.5, color: i === curIdx ? INK : FAINT, marginTop: 4, lineHeight: 1.15 }}>{cfg.label.split(" ")[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Segments */}
        <div style={{ ...labelS, marginBottom: 10 }}>Segment</div>
        <div style={{ display: "flex", gap: 7, marginBottom: 22, flexWrap: "wrap" }}>
          {SEGMENTS.map((s) => {
            const on = (f.segment ?? SEGMENTS[0].id) === s.id;
            return (
              <button key={s.id} onClick={() => patch({ segment: s.id as Segment })} style={{ fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 100, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${on ? s.color : LINE}`, background: on ? `${s.color}22` : "transparent", color: on ? "#fff" : MUTED }}>{s.label}</button>
            );
          })}
        </div>

        {/* Contact fields */}
        <div style={{ ...labelS, marginBottom: 12, paddingTop: 6, borderTop: BORDER }}>Contact</div>
        {field("Email", "email", { type: "email", placeholder: "name@email.com" })}
        {field("WhatsApp / phone", "whatsapp", { placeholder: "+31…" })}
        {field("Instagram", "instagram", { placeholder: "@handle" })}
        {field("What their business does", "business", { area: true, placeholder: "One line about their company" })}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {field("Revenue", "revenue", { placeholder: "€10k / mo" })}
          {field("Role", "role", { placeholder: "Founder / CEO" })}
        </div>
        {field("Website", "website", { placeholder: "https://" })}
        <label style={{ display: "block", marginBottom: 12 }}>
          <span style={{ ...labelS, fontSize: 10, display: "block", marginBottom: 5 }}>Rating (0–10)</span>
          <input type="number" min={0} max={10} step={0.5} value={f.rating ?? ""} onChange={(e) => setLocal({ rating: e.target.value === "" ? null : Number(e.target.value) })} onBlur={commit} style={inputStyle} />
        </label>
        {field("Notes · problems · questions from calls", "notes", { area: true, placeholder: "What you know about them" })}

        <button onClick={() => { if (confirm(`Delete ${f.name}?`)) onDelete(f.id); }} style={{ marginTop: 14, background: "transparent", border: `1px solid ${LINE}`, color: RED, borderRadius: 10, padding: "9px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Delete contact</button>
      </aside>
    </>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", background: FILL, border: BORDER, color: INK, padding: "9px 11px", fontSize: 13, fontFamily: "inherit", borderRadius: 9, outline: "none" };
const selectStyle: React.CSSProperties = { background: CARD_2, border: BORDER, color: INK, padding: "8px 11px", fontSize: 12.5, fontWeight: 600, borderRadius: 9, outline: "none", fontFamily: "inherit", cursor: "pointer" };
const iconBtn: React.CSSProperties = { background: FILL, border: BORDER, color: MUTED, width: 34, height: 34, borderRadius: 9, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 };
const actBtn: React.CSSProperties = { background: FILL, border: BORDER, color: INK, padding: "10px 8px", fontSize: 12.5, fontWeight: 700, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", textAlign: "center", textDecoration: "none", display: "block" };

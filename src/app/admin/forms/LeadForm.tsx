"use client";
import { useState } from "react";
import { BORDER, CARD, RADIUS, SHADOW, btnS, inputS } from "../theme";
import { LEAD_SOURCES, REVENUE_BRACKETS, type Segment } from "../types";
import { SEGMENTS } from "../segments";

export interface NewLead {
  name: string;
  email: string;
  whatsapp: string;
  instagram: string;
  business: string;
  revenue: string;
  source: string;
  segment: Segment;
}

export function LeadForm({ onAdd, defaultSegment }: { onAdd: (l: NewLead) => void; defaultSegment?: Segment }) {
  const [f, setF] = useState<NewLead>({
    name: "",
    email: "",
    whatsapp: "",
    instagram: "",
    business: "",
    revenue: "€10k – €25k / month",
    source: "Application form",
    segment: defaultSegment ?? SEGMENTS[0].id,
  });

  const hasContact = Boolean(f.email || f.whatsapp || f.instagram);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (f.name && hasContact) onAdd(f);
      }}
      style={{
        marginTop: 16,
        background: CARD,
        border: BORDER,
        borderRadius: RADIUS,
        padding: "20px 22px",
        boxShadow: SHADOW,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: 10,
      }}
    >
      <select aria-label="Segment" value={f.segment} onChange={(e) => setF({ ...f, segment: e.target.value as Segment })} style={inputS}>
        {SEGMENTS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      <input placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} style={inputS} required />
      <input type="email" placeholder="Email (optional if WA/IG)" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} style={inputS} />
      <input placeholder="WhatsApp (optional)" value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} style={inputS} />
      <input placeholder="Instagram (optional)" value={f.instagram} onChange={(e) => setF({ ...f, instagram: e.target.value })} style={inputS} />
      <input placeholder="Business (short)" value={f.business} onChange={(e) => setF({ ...f, business: e.target.value })} style={inputS} />
      <select aria-label="Revenue bracket" value={f.revenue} onChange={(e) => setF({ ...f, revenue: e.target.value })} style={inputS}>
        {REVENUE_BRACKETS.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      <select aria-label="Lead source" value={f.source} onChange={(e) => setF({ ...f, source: e.target.value })} style={inputS}>
        {LEAD_SOURCES.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      <button type="submit" style={btnS} disabled={!f.name || !hasContact}>
        Add lead{f.email ? " & start sequence" : ""}
      </button>
    </form>
  );
}

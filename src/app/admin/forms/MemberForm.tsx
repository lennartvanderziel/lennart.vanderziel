"use client";
import { useState } from "react";
import { BORDER, CARD, RADIUS, SHADOW, btnS, inputS } from "../theme";
import { CIRCLES, TIERS, type Member } from "../types";

export type NewMember = Omit<Member, "id" | "status" | "notes">;

export function MemberForm({ onAdd }: { onAdd: (m: NewMember) => void }) {
  const [f, setF] = useState<NewMember>({
    name: "",
    email: "",
    whatsapp: "",
    instagram: "",
    revenue: "",
    company: "",
    tier: "Founder Circle",
    price: "€",
    circle: "Circle A",
    joinedAt: "",
    renewsAt: "",
    engagement: "",
    needs: "",
    connections: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (f.name && f.email) onAdd(f);
      }}
      style={{
        marginTop: 16,
        background: CARD,
        border: BORDER,
        borderRadius: RADIUS,
        padding: "20px 22px",
        boxShadow: SHADOW,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
        gap: 10,
      }}
    >
      <input placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} style={inputS} required />
      <input type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} style={inputS} required />
      <input placeholder="Company" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} style={inputS} />
      <select aria-label="Tier" value={f.tier} onChange={(e) => setF({ ...f, tier: e.target.value })} style={inputS}>
        {TIERS.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <input placeholder="Price (e.g. €450/mo)" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} style={inputS} />
      <select aria-label="Circle" value={f.circle} onChange={(e) => setF({ ...f, circle: e.target.value })} style={inputS}>
        {[...CIRCLES, "—"].map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input type="date" aria-label="Joined date" value={f.joinedAt} onChange={(e) => setF({ ...f, joinedAt: e.target.value })} style={inputS} />
      <input type="date" aria-label="Renewal date" value={f.renewsAt} onChange={(e) => setF({ ...f, renewsAt: e.target.value })} style={inputS} />
      <button type="submit" style={btnS} disabled={!f.name || !f.email}>
        Add member
      </button>
    </form>
  );
}

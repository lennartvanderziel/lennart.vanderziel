"use client";
import React, { useEffect, useMemo, useState } from "react";

const ACCENT = "#E8742B";
const GREEN = "#7fb069";
const RED = "#d9534f";
const BLUE = "#5b8ca6";
const CARD = "rgba(255,255,255,0.04)";
const BORDER = "1px solid rgba(255,255,255,0.1)";
const PASSCODE = "STS-2026";
const DAY = 24 * 60 * 60 * 1000;

type LeadStatus = "new" | "reviewing" | "call_booked" | "member" | "declined";
type AdminTab = "dashboard" | "leads" | "members" | "emails";

interface Lead {
  id: string; name: string; email: string; whatsapp: string; instagram: string;
  business: string; revenue: string;
  source: string; status: LeadStatus; notes: string; createdAt: number;
  sequenceStep: number; lastEmailAt: number | null; sequenceActive: boolean;
}
interface Member {
  id: string; name: string; email: string; whatsapp: string; instagram: string; revenue: string;
  company: string; tier: string;
  price: string; circle: string; joinedAt: string; renewsAt: string; status: "active" | "paused" | "churned";
  engagement: string; needs: string; connections: string; notes: string;
}
interface SeqStep { id: string; dayOffset: number; subject: string; body: string }

const leadStatusConfig: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "New", color: "#cfc8bd" },
  reviewing: { label: "Reviewing", color: BLUE },
  call_booked: { label: "Call booked", color: ACCENT },
  member: { label: "Member ✓", color: GREEN },
  declined: { label: "Declined", color: RED },
};

const defaultSequence: SeqStep[] = [
  { id: "s1", dayOffset: 0, subject: "Your Shoulder to Shoulder application", body: "Hi {name},\n\nThanks for applying to Shoulder to Shoulder — I review every application personally, and yours is in front of me now.\n\nWhile you wait: the club exists for one reason. Alone you grow linearly; together you grow exponentially. A circle of 6–8 founders at your level, one hour a week, plus the dinners, side quests and Summits.\n\nI'll come back to you personally within a few days.\n\nShoulder to shoulder,\nLennart" },
  { id: "s2", dayOffset: 14, subject: "What the fastest-growing founders have in common", body: "Hi {name},\n\nA thought since your application: every founder knows the on-fire weeks and the stuck weeks. The difference between fast and slow growth is rarely talent — it's the room you're in.\n\nThe founders growing fastest collaborate with people who've been there, solve problems before they cost weeks, and hear opportunities before the rest of the world.\n\nThat's what the circles are built for. If you want to move your application forward, reply to this email and we'll plan your Founder Fit Conversation.\n\nLennart" },
  { id: "s3", dayOffset: 30, subject: "One question", body: "Hi {name},\n\nOne question, honestly meant: where will your business be in 12 months if nothing changes about who's around you?\n\nIf the answer excites you — great, keep going.\nIf it doesn't: that's exactly the problem Shoulder to Shoulder solves.\n\nThe next circle has a few open places. Reply and we'll talk.\n\nLennart" },
];

function load<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}
function save<T>(key: string, val: T) { localStorage.setItem(key, JSON.stringify(val)); }
const uid = () => Math.random().toString(36).slice(2, 10);

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [sequence, setSequence] = useState<SeqStep[]>(defaultSequence);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [editStep, setEditStep] = useState<string | null>(null);
  const [openMember, setOpenMember] = useState<string | null>(null);
  const [sending, setSending] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("sts-admin") === "1") setAuthed(true);
    setLeads(load("crm-leads", []));
    setMembers(load("crm-members", []));
    setSequence(load("crm-sequence", defaultSequence));
  }, []);

  function notify(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2500); }
  function saveLeads(next: Lead[]) { setLeads(next); save("crm-leads", next); }
  function saveMembers(next: Member[]) { setMembers(next); save("crm-members", next); }
  function saveSequence(next: SeqStep[]) { setSequence(next); save("crm-sequence", next); }

  // Emails due: for each active lead (not member/declined), find next sequence step whose dayOffset has passed
  const dueEmails = useMemo(() => {
    const now = Date.now();
    return leads.flatMap((lead) => {
      if (!lead.sequenceActive || !lead.email || lead.status === "member" || lead.status === "declined") return [];
      const step = sequence[lead.sequenceStep];
      if (!step) return [];
      const anchor = lead.lastEmailAt ?? lead.createdAt;
      const dueAt = lead.sequenceStep === 0 ? lead.createdAt + step.dayOffset * DAY : anchor + (step.dayOffset - (sequence[lead.sequenceStep - 1]?.dayOffset ?? 0)) * DAY;
      if (now >= dueAt) return [{ lead, step }];
      return [];
    });
  }, [leads, sequence]);

  async function sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    const res = await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, body }),
    });
    const json = await res.json().catch(() => ({ ok: false, error: "Network error" }));
    if (!json.ok) notify(`⚠ ${json.error?.slice(0, 90) ?? "Send failed"}`);
    return !!json.ok;
  }

  async function sendDue(leadId?: string) {
    const queue = leadId ? dueEmails.filter((d) => d.lead.id === leadId) : dueEmails;
    for (const { lead, step } of queue) {
      setSending(lead.id);
      const ok = await sendEmail(lead.email, step.subject, step.body.replaceAll("{name}", lead.name.split(" ")[0]));
      if (ok) {
        saveLeads(leads.map((l) => l.id === lead.id ? { ...l, sequenceStep: l.sequenceStep + 1, lastEmailAt: Date.now() } : l));
        notify(`✓ Sent "${step.subject}" to ${lead.name}`);
      }
      setSending(null);
      if (!ok) break;
    }
  }

  const mrr = members.filter((m) => m.status === "active").reduce((sum, m) => sum + (parseFloat(m.price.replace(/[^\d.]/g, "")) || 0), 0);

  const inputS: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.05)", border: BORDER, color: "#f0ece4", padding: "11px 13px", fontSize: 13.5, fontFamily: "inherit", borderRadius: 8, outline: "none" };
  const cardS: React.CSSProperties = { background: CARD, border: BORDER, borderRadius: 14, padding: "22px 24px" };
  const btnS: React.CSSProperties = { background: ACCENT, color: "#fff", border: "none", padding: "10px 20px", fontSize: 13, fontWeight: 700, borderRadius: 100, cursor: "pointer", fontFamily: "inherit" };
  const ghostS: React.CSSProperties = { background: "transparent", border: "1px solid rgba(255,255,255,0.18)", color: "#cfc8bd", padding: "9px 18px", fontSize: 12.5, fontWeight: 600, borderRadius: 100, cursor: "pointer", fontFamily: "inherit" };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0e0b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans), sans-serif", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 360, textAlign: "center" }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>Admin access</h1>
          <form onSubmit={(e) => { e.preventDefault(); if (pass === PASSCODE) { sessionStorage.setItem("sts-admin", "1"); setAuthed(true); } else notify("Wrong passcode"); }} style={{ marginTop: 18, display: "flex", gap: 10 }}>
            <input type="password" placeholder="Passcode" value={pass} onChange={(e) => setPass(e.target.value)} style={{ ...inputS, flex: 1 }} autoFocus />
            <button type="submit" style={btnS}>Enter</button>
          </form>
          {toast && <p style={{ marginTop: 12, fontSize: 13, color: RED }}>{toast}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f0e0b", color: "#f0ece4", fontFamily: "var(--font-sans), sans-serif" }}>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(15,14,11,0.92)", backdropFilter: "blur(14px)", borderBottom: BORDER }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 14.5, fontWeight: 800, color: "#fff" }}>STS CRM</span>
            <div style={{ display: "flex", gap: 4 }}>
              {(["dashboard", "leads", "members", "emails"] as AdminTab[]).map((t) => (
                <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? "rgba(232,116,43,0.14)" : "transparent", border: "none", color: tab === t ? ACCENT : "#a59e93", padding: "7px 14px", borderRadius: 100, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}>
                  {t}{t === "emails" && dueEmails.length > 0 ? ` (${dueEmails.length})` : ""}
                </button>
              ))}
            </div>
          </div>
          <span style={{ fontSize: 12, color: "#8a847a" }}>Private — only you</span>
        </div>
      </nav>

      {toast && <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#1c1915", border: BORDER, color: "#f0ece4", padding: "12px 22px", borderRadius: 100, fontSize: 13.5, fontWeight: 600, zIndex: 100 }}>{toast}</div>}

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 24px 80px" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Overview.</h1>
            <div className="grid-auto" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
              {[
                { label: "Active members", value: members.filter((m) => m.status === "active").length, color: GREEN },
                { label: "MRR", value: `€${mrr.toLocaleString()}`, color: ACCENT },
                { label: "Open leads", value: leads.filter((l) => l.status !== "member" && l.status !== "declined").length, color: BLUE },
                { label: "Emails due", value: dueEmails.length, color: dueEmails.length > 0 ? RED : "#cfc8bd" },
              ].map((s) => (
                <div key={s.label} style={cardS}>
                  <div style={{ fontSize: 34, fontWeight: 800, color: s.color, letterSpacing: "-0.02em" }}>{s.value}</div>
                  <div style={{ fontSize: 12.5, color: "#8a847a", marginTop: 4, fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
            {dueEmails.length > 0 && (
              <div style={{ ...cardS, marginTop: 20, border: "1px solid rgba(232,116,43,0.4)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h2 style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0 }}>{dueEmails.length} nurture email{dueEmails.length > 1 ? "s" : ""} due</h2>
                    <p style={{ fontSize: 13, color: "#a59e93", margin: "4px 0 0" }}>{dueEmails.map((d) => d.lead.name).join(", ")}</p>
                  </div>
                  <button onClick={() => sendDue()} style={btnS} disabled={!!sending}>{sending ? "Sending…" : "Send all due →"}</button>
                </div>
              </div>
            )}
            <div style={{ ...cardS, marginTop: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>Pipeline</h2>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {(Object.keys(leadStatusConfig) as LeadStatus[]).map((st) => (
                  <div key={st} style={{ flex: "1 1 140px", background: "rgba(255,255,255,0.03)", border: BORDER, borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: leadStatusConfig[st].color }}>{leads.filter((l) => l.status === st).length}</div>
                    <div style={{ fontSize: 11.5, color: "#8a847a", fontWeight: 700, marginTop: 2 }}>{leadStatusConfig[st].label}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* LEADS */}
        {tab === "leads" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Leads.</h1>
              <button onClick={() => setShowAddLead(!showAddLead)} style={btnS}>{showAddLead ? "Close" : "+ Add lead"}</button>
            </div>
            {showAddLead && <LeadForm onAdd={(l) => { saveLeads([{ ...l, id: uid(), status: "new", notes: "", createdAt: Date.now(), sequenceStep: 0, lastEmailAt: null, sequenceActive: true }, ...leads]); setShowAddLead(false); notify("Lead added — nurture sequence started"); }} inputS={inputS} btnS={btnS} />}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              {leads.length === 0 && <p style={{ color: "#8a847a", fontSize: 14 }}>No leads yet. Add applications here as they arrive in your inbox — the nurture sequence starts automatically.</p>}
              {leads.map((lead) => (
                <div key={lead.id} style={cardS}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0 }}>{lead.name}</h3>
                        <span style={{ fontSize: 11, fontWeight: 800, color: leadStatusConfig[lead.status].color, background: `color-mix(in srgb, ${leadStatusConfig[lead.status].color} 12%, transparent)`, padding: "3px 10px", borderRadius: 100 }}>{leadStatusConfig[lead.status].label}</span>
                      </div>
                      <p style={{ fontSize: 12.5, color: "#8a847a", margin: "4px 0 0" }}>{[lead.email, lead.whatsapp && `WA ${lead.whatsapp}`, lead.instagram && `IG ${lead.instagram}`].filter(Boolean).join(" · ") || "no contact details"} · {lead.revenue} · via {lead.source} · added {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                      {lead.business && <p style={{ fontSize: 13.5, color: "#a59e93", margin: "8px 0 0", lineHeight: 1.5 }}>{lead.business}</p>}
                      {lead.email ? (
                        <p style={{ fontSize: 12, color: "#8a847a", margin: "8px 0 0" }}>Sequence: step {Math.min(lead.sequenceStep + 1, sequence.length)}/{sequence.length}{lead.sequenceActive ? " · active" : " · paused"}{lead.lastEmailAt ? ` · last email ${new Date(lead.lastEmailAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` : ""}</p>
                      ) : (
                        <p style={{ fontSize: 12, color: ACCENT, margin: "8px 0 0", fontWeight: 700 }}>No email — follow up via {lead.whatsapp ? "WhatsApp" : lead.instagram ? "Instagram" : "…add a contact channel"}</p>
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                      <select value={lead.status} onChange={(e) => { const status = e.target.value as LeadStatus; saveLeads(leads.map((l) => l.id === lead.id ? { ...l, status, ...(status === "member" ? { sequenceActive: false } : {}) } : l)); if (status === "member") notify("🎉 Converted! Add them under Members."); }} style={{ ...inputS, width: "auto", padding: "8px 12px" }}>
                        {(Object.keys(leadStatusConfig) as LeadStatus[]).map((st) => <option key={st} value={st}>{leadStatusConfig[st].label}</option>)}
                      </select>
                      <div style={{ display: "flex", gap: 8 }}>
                        {dueEmails.some((d) => d.lead.id === lead.id) && <button onClick={() => sendDue(lead.id)} style={{ ...btnS, padding: "8px 14px", fontSize: 12 }} disabled={sending === lead.id}>{sending === lead.id ? "Sending…" : "Send due email"}</button>}
                        <button onClick={() => saveLeads(leads.map((l) => l.id === lead.id ? { ...l, sequenceActive: !l.sequenceActive } : l))} style={{ ...ghostS, padding: "8px 14px", fontSize: 12 }}>{lead.sequenceActive ? "Pause emails" : "Resume emails"}</button>
                        <button onClick={() => { if (confirm(`Delete lead ${lead.name}?`)) saveLeads(leads.filter((l) => l.id !== lead.id)); }} style={{ ...ghostS, padding: "8px 14px", fontSize: 12, color: RED, borderColor: "rgba(217,83,79,0.4)" }}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* MEMBERS */}
        {tab === "members" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Members.</h1>
              <button onClick={() => setShowAddMember(!showAddMember)} style={btnS}>{showAddMember ? "Close" : "+ Add member"}</button>
            </div>
            {showAddMember && <MemberForm onAdd={(m) => { saveMembers([{ ...m, id: uid(), status: "active", notes: "" }, ...members]); setShowAddMember(false); notify("Member added"); }} inputS={inputS} btnS={btnS} />}
            <div style={{ marginTop: 20, overflowX: "auto" }}>
              {members.length === 0 ? (
                <p style={{ color: "#8a847a", fontSize: 14 }}>No members yet. Add your six founding members with their tier, price and renewal date.</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: "#8a847a", fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {["Member", "Tier", "Paying", "Circle", "Joined", "Renews", "Status", ""].map((h) => <th key={h} style={{ padding: "10px 12px", borderBottom: BORDER }}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m) => {
                      const months = Math.max(0, Math.floor((Date.now() - new Date(m.joinedAt).getTime()) / (30.44 * DAY)));
                      return (
                        <React.Fragment key={m.id}>
                        <tr style={{ borderBottom: openMember === m.id ? "none" : "1px solid rgba(255,255,255,0.05)" }}>
                          <td style={{ padding: "14px 12px", cursor: "pointer" }} onClick={() => setOpenMember(openMember === m.id ? null : m.id)}>
                            <div style={{ fontWeight: 700, color: "#fff" }}>{m.name} <span style={{ color: ACCENT, fontSize: 11 }}>{openMember === m.id ? "▲" : "▼ profile"}</span></div>
                            <div style={{ fontSize: 12, color: "#8a847a" }}>{m.email}{m.company ? ` · ${m.company}` : ""}</div>
                          </td>
                          <td style={{ padding: "14px 12px", color: "#cfc8bd" }}>{m.tier}</td>
                          <td style={{ padding: "14px 12px", color: ACCENT, fontWeight: 700 }}>{m.price}</td>
                          <td style={{ padding: "14px 12px", color: "#cfc8bd" }}>{m.circle}</td>
                          <td style={{ padding: "14px 12px", color: "#cfc8bd" }}>{m.joinedAt}<div style={{ fontSize: 11.5, color: "#8a847a" }}>{months} mo member</div></td>
                          <td style={{ padding: "14px 12px", color: "#cfc8bd" }}>{m.renewsAt}</td>
                          <td style={{ padding: "14px 12px" }}>
                            <select value={m.status} onChange={(e) => saveMembers(members.map((x) => x.id === m.id ? { ...x, status: e.target.value as Member["status"] } : x))} style={{ ...inputS, width: "auto", padding: "6px 10px", fontSize: 12.5, color: m.status === "active" ? GREEN : m.status === "paused" ? ACCENT : RED }}>
                              <option value="active">Active</option><option value="paused">Paused</option><option value="churned">Churned</option>
                            </select>
                          </td>
                          <td style={{ padding: "14px 12px" }}>
                            <button onClick={() => { if (confirm(`Delete ${m.name}?`)) saveMembers(members.filter((x) => x.id !== m.id)); }} style={{ ...ghostS, padding: "6px 12px", fontSize: 11.5, color: RED, borderColor: "rgba(217,83,79,0.4)" }}>Delete</button>
                          </td>
                        </tr>
                        {openMember === m.id && (
                          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <td colSpan={8} style={{ padding: "0 12px 20px" }}>
                              <div style={{ background: "rgba(255,255,255,0.03)", border: BORDER, borderRadius: 12, padding: "20px 22px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
                                <div>
                                  <label style={{ fontSize: 11, fontWeight: 800, color: "#8a847a", textTransform: "uppercase", letterSpacing: "0.08em" }}>WhatsApp</label>
                                  <input value={m.whatsapp || ""} onChange={(e) => saveMembers(members.map((x) => x.id === m.id ? { ...x, whatsapp: e.target.value } : x))} style={{ ...inputS, marginTop: 6 }} placeholder="+31 6…" />
                                  <label style={{ fontSize: 11, fontWeight: 800, color: "#8a847a", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginTop: 12 }}>Instagram</label>
                                  <input value={m.instagram || ""} onChange={(e) => saveMembers(members.map((x) => x.id === m.id ? { ...x, instagram: e.target.value } : x))} style={{ ...inputS, marginTop: 6 }} placeholder="@handle" />
                                  <label style={{ fontSize: 11, fontWeight: 800, color: "#8a847a", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginTop: 12 }}>Revenue bracket</label>
                                  <select value={m.revenue || ""} onChange={(e) => saveMembers(members.map((x) => x.id === m.id ? { ...x, revenue: e.target.value } : x))} style={{ ...inputS, marginTop: 6 }}>
                                    <option value="">Unknown</option>
                                    {["Pre-revenue / Early stage", "Less than €10k / month", "€10k – €25k / month", "€25k – €100k / month", "€100k+ / month"].map((r) => <option key={r}>{r}</option>)}
                                  </select>
                                  <label style={{ fontSize: 11, fontWeight: 800, color: "#8a847a", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginTop: 12 }}>Engagement score</label>
                                  <select value={m.engagement || ""} onChange={(e) => saveMembers(members.map((x) => x.id === m.id ? { ...x, engagement: e.target.value } : x))} style={{ ...inputS, marginTop: 6 }}>
                                    <option value="">—</option>
                                    {["10 — fully engaged", "8 — strong", "6 — okay", "4 — drifting", "2 — at risk"].map((r) => <option key={r}>{r}</option>)}
                                  </select>
                                </div>
                                <div>
                                  <label style={{ fontSize: 11, fontWeight: 800, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.08em" }}>What they need right now</label>
                                  <textarea rows={4} value={m.needs || ""} onChange={(e) => saveMembers(members.map((x) => x.id === m.id ? { ...x, needs: e.target.value } : x))} style={{ ...inputS, marginTop: 6, resize: "vertical" }} placeholder="From dashboard inputs, calls, bottlenecks — what does this member actually need?" />
                                  <label style={{ fontSize: 11, fontWeight: 800, color: "#7fb069", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginTop: 12 }}>Possible combinations & intros</label>
                                  <textarea rows={4} value={m.connections || ""} onChange={(e) => saveMembers(members.map((x) => x.id === m.id ? { ...x, connections: e.target.value } : x))} style={{ ...inputS, marginTop: 6, resize: "vertical" }} placeholder="Who in the club or your network should this member meet? Why?" />
                                </div>
                                <div>
                                  <label style={{ fontSize: 11, fontWeight: 800, color: "#5b8ca6", textTransform: "uppercase", letterSpacing: "0.08em" }}>Session notes & transcript summaries</label>
                                  <textarea rows={11} value={m.notes || ""} onChange={(e) => saveMembers(members.map((x) => x.id === m.id ? { ...x, notes: e.target.value } : x))} style={{ ...inputS, marginTop: 6, resize: "vertical", lineHeight: 1.5 }} placeholder={"Paste key points from call transcripts, dashboard scores, observations…\n\n12 Jul — bottleneck: hiring closer. Score 6/10.\n05 Jul — big win on pricing."} />
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* EMAILS */}
        {tab === "emails" && (
          <>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Email automation.</h1>
            <p style={{ marginTop: 8, fontSize: 14, color: "#a59e93", maxWidth: 640 }}>Every new lead automatically enters this nurture sequence. Open the CRM regularly (or after new applications) and hit &quot;Send all due&quot; — the system knows exactly who is due for which email. Use {"{name}"} for personalisation.</p>
            {dueEmails.length > 0 && (
              <div style={{ ...cardS, marginTop: 18, border: "1px solid rgba(232,116,43,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: "#fff" }}>{dueEmails.length} email{dueEmails.length > 1 ? "s" : ""} ready to send</span>
                <button onClick={() => sendDue()} style={btnS} disabled={!!sending}>{sending ? "Sending…" : "Send all due →"}</button>
              </div>
            )}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {sequence.map((step, i) => (
                <div key={step.id} style={cardS}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(232,116,43,0.14)", border: "1px solid rgba(232,116,43,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: ACCENT }}>{i + 1}</span>
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 800, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase" }}>{step.dayOffset === 0 ? "Immediately on entry" : `Day ${step.dayOffset}`}</span>
                        <h3 style={{ fontSize: 15.5, fontWeight: 800, color: "#fff", margin: "2px 0 0" }}>{step.subject}</h3>
                      </div>
                    </div>
                    <button onClick={() => setEditStep(editStep === step.id ? null : step.id)} style={ghostS}>{editStep === step.id ? "Done" : "Edit"}</button>
                  </div>
                  {editStep === step.id ? (
                    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", gap: 10 }}>
                        <input type="number" min={0} value={step.dayOffset} onChange={(e) => saveSequence(sequence.map((s2) => s2.id === step.id ? { ...s2, dayOffset: parseInt(e.target.value) || 0 } : s2))} style={{ ...inputS, width: 110 }} />
                        <input value={step.subject} onChange={(e) => saveSequence(sequence.map((s2) => s2.id === step.id ? { ...s2, subject: e.target.value } : s2))} style={{ ...inputS, flex: 1 }} />
                      </div>
                      <textarea rows={8} value={step.body} onChange={(e) => saveSequence(sequence.map((s2) => s2.id === step.id ? { ...s2, body: e.target.value } : s2))} style={{ ...inputS, resize: "vertical", lineHeight: 1.55 }} />
                    </div>
                  ) : (
                    <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6, color: "#a59e93", whiteSpace: "pre-line" }}>{step.body.slice(0, 220)}{step.body.length > 220 ? "…" : ""}</p>
                  )}
                </div>
              ))}
              <button onClick={() => saveSequence([...sequence, { id: uid(), dayOffset: (sequence[sequence.length - 1]?.dayOffset ?? 0) + 14, subject: "New email", body: "Hi {name},\n\n" }])} style={{ ...ghostS, alignSelf: "flex-start" }}>+ Add sequence step</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function LeadForm({ onAdd, inputS, btnS }: { onAdd: (l: { name: string; email: string; whatsapp: string; instagram: string; business: string; revenue: string; source: string }) => void; inputS: React.CSSProperties; btnS: React.CSSProperties }) {
  const [f, setF] = useState({ name: "", email: "", whatsapp: "", instagram: "", business: "", revenue: "€10k – €25k / month", source: "Application form" });
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (f.name && (f.email || f.whatsapp || f.instagram)) onAdd(f); }} style={{ marginTop: 16, background: CARD, border: BORDER, borderRadius: 14, padding: "20px 22px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
      <input placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} style={inputS} required />
      <input type="email" placeholder="Email (optional if WA/IG)" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} style={inputS} />
      <input placeholder="WhatsApp (optional)" value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} style={inputS} />
      <input placeholder="Instagram (optional)" value={f.instagram} onChange={(e) => setF({ ...f, instagram: e.target.value })} style={inputS} />
      <input placeholder="Business (short)" value={f.business} onChange={(e) => setF({ ...f, business: e.target.value })} style={inputS} />
      <select value={f.revenue} onChange={(e) => setF({ ...f, revenue: e.target.value })} style={inputS}>
        {["Pre-revenue / Early stage", "Less than €10k / month", "€10k – €25k / month", "€25k+ / month"].map((r) => <option key={r}>{r}</option>)}
      </select>
      <select value={f.source} onChange={(e) => setF({ ...f, source: e.target.value })} style={inputS}>
        {["Application form", "Referral", "Instagram", "Event / dinner", "WhatsApp", "Never officially applied", "Other"].map((r) => <option key={r}>{r}</option>)}
      </select>
      <button type="submit" style={btnS}>Add lead{f.email ? " & start sequence" : ""}</button>
    </form>
  );
}

function MemberForm({ onAdd, inputS, btnS }: { onAdd: (m: Omit<Member, "id" | "status" | "notes">) => void; inputS: React.CSSProperties; btnS: React.CSSProperties }) {
  const [f, setF] = useState({ name: "", email: "", whatsapp: "", instagram: "", revenue: "", company: "", tier: "Founder Circle", price: "€", circle: "Circle A", joinedAt: "", renewsAt: "", engagement: "", needs: "", connections: "" });
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (f.name && f.email) onAdd(f); }} style={{ marginTop: 16, background: CARD, border: BORDER, borderRadius: 14, padding: "20px 22px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
      <input placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} style={inputS} required />
      <input type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} style={inputS} required />
      <input placeholder="Company" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} style={inputS} />
      <select value={f.tier} onChange={(e) => setF({ ...f, tier: e.target.value })} style={inputS}>
        {["Founder Circle", "Founder Circle — Level 2", "High Performance Mentoring", "Mastermind"].map((t) => <option key={t}>{t}</option>)}
      </select>
      <input placeholder="Price (e.g. €450/mo)" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} style={inputS} />
      <select value={f.circle} onChange={(e) => setF({ ...f, circle: e.target.value })} style={inputS}>
        {["Circle A", "Circle B", "—"].map((c) => <option key={c}>{c}</option>)}
      </select>
      <input type="date" value={f.joinedAt} onChange={(e) => setF({ ...f, joinedAt: e.target.value })} style={inputS} title="Joined" />
      <input type="date" value={f.renewsAt} onChange={(e) => setF({ ...f, renewsAt: e.target.value })} style={inputS} title="Renews" />
      <button type="submit" style={btnS}>Add member</button>
    </form>
  );
}

"use client";
import React, { useState } from "react";
import type { Crm } from "../useCrm";
import { EmptyState, PageHeader } from "../components/ui";
import { MemberForm } from "../forms/MemberForm";
import { DataTransfer } from "../components/DataTransfer";
import { memberStatusColor } from "../statuses";
import { ACCENT, ACCENT_TEXT, BLUE, BORDER, FILL, GREEN, INK, MUTED, RED, btnS, ghostS, inputS, labelS } from "../theme";
import { DAY, REVENUE_BRACKETS, uid, type Member } from "../types";

const ENGAGEMENT = ["10 — fully engaged", "8 — strong", "6 — okay", "4 — drifting", "2 — at risk"];

export function Members({ crm }: { crm: Crm }) {
  const { members, saveMembers, notify, now } = crm;
  const [showAdd, setShowAdd] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const patch = (id: string, p: Partial<Member>) =>
    saveMembers(members.map((x) => (x.id === id ? { ...x, ...p } : x)));

  return (
    <>
      <PageHeader
        title="Members."
        subtitle="Who is paying, what they need, and who they should meet."
        action={
          <button onClick={() => setShowAdd(!showAdd)} style={btnS}>
            {showAdd ? "Close" : "+ Add member"}
          </button>
        }
      />

      {showAdd && (
        <MemberForm
          onAdd={(m) => {
            saveMembers([{ ...m, id: uid(), status: "active", notes: "" }, ...members]);
            setShowAdd(false);
            notify("Member added");
          }}
        />
      )}

      <div style={{ marginTop: 20, overflowX: "auto" }}>
        {members.length === 0 ? (
          <EmptyState>
            No members yet. Add your founding members with their tier, price and renewal date and the dashboard,
            revenue and accountability views all fill in from here.
          </EmptyState>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, minWidth: 780 }}>
            <thead>
              <tr style={{ textAlign: "left", ...labelS }}>
                {["Member", "Tier", "Paying", "Circle", "Joined", "Renews", "Status", ""].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", borderBottom: BORDER, fontWeight: 800 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const months = now && m.joinedAt
                  ? Math.max(0, Math.floor((now - new Date(m.joinedAt).getTime()) / (30.44 * DAY)))
                  : 0;
                const isOpen = open === m.id;
                return (
                  <React.Fragment key={m.id}>
                    <tr style={{ borderBottom: isOpen ? "none" : BORDER }}>
                      <td style={{ padding: "14px 12px", cursor: "pointer" }} onClick={() => setOpen(isOpen ? null : m.id)}>
                        <div style={{ fontWeight: 700, color: INK }}>
                          {m.name} <span style={{ color: ACCENT_TEXT, fontSize: 11 }}>{isOpen ? "▲" : "▼ profile"}</span>
                        </div>
                        <div style={{ fontSize: 12, color: MUTED }}>
                          {m.email}
                          {m.company ? ` · ${m.company}` : ""}
                        </div>
                      </td>
                      <td style={{ padding: "14px 12px", color: MUTED }}>{m.tier}</td>
                      <td style={{ padding: "14px 12px", color: ACCENT, fontWeight: 700 }}>{m.price}</td>
                      <td style={{ padding: "14px 12px", color: MUTED }}>{m.circle}</td>
                      <td style={{ padding: "14px 12px", color: MUTED }}>
                        {m.joinedAt || "—"}
                        {m.joinedAt && <div style={{ fontSize: 11.5, color: MUTED }}>{months} mo member</div>}
                      </td>
                      <td style={{ padding: "14px 12px", color: MUTED }}>{m.renewsAt || "—"}</td>
                      <td style={{ padding: "14px 12px" }}>
                        <select
                          aria-label={`Status for ${m.name}`}
                          value={m.status}
                          onChange={(e) => patch(m.id, { status: e.target.value as Member["status"] })}
                          style={{ ...inputS, width: "auto", padding: "6px 10px", fontSize: 12.5, color: memberStatusColor[m.status] }}
                        >
                          <option value="active">Active</option>
                          <option value="paused">Paused</option>
                          <option value="churned">Churned</option>
                        </select>
                      </td>
                      <td style={{ padding: "14px 12px" }}>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${m.name}?`)) saveMembers(members.filter((x) => x.id !== m.id));
                          }}
                          style={{ ...ghostS, padding: "6px 12px", fontSize: 11.5, color: RED, borderColor: RED }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>

                    {isOpen && (
                      <tr style={{ borderBottom: BORDER }}>
                        <td colSpan={8} style={{ padding: "0 12px 20px" }}>
                          <div
                            style={{
                              background: FILL,
                              border: BORDER,
                              borderRadius: 12,
                              padding: "20px 22px",
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                              gap: 14,
                            }}
                          >
                            <div>
                              <label style={labelS}>WhatsApp</label>
                              <input value={m.whatsapp || ""} onChange={(e) => patch(m.id, { whatsapp: e.target.value })} style={{ ...inputS, marginTop: 6 }} placeholder="+31 6…" />
                              <label style={{ ...labelS, display: "block", marginTop: 12 }}>Instagram</label>
                              <input value={m.instagram || ""} onChange={(e) => patch(m.id, { instagram: e.target.value })} style={{ ...inputS, marginTop: 6 }} placeholder="@handle" />
                              <label style={{ ...labelS, display: "block", marginTop: 12 }}>Revenue bracket</label>
                              <select value={m.revenue || ""} onChange={(e) => patch(m.id, { revenue: e.target.value })} style={{ ...inputS, marginTop: 6 }}>
                                <option value="">Unknown</option>
                                {REVENUE_BRACKETS.map((r) => (
                                  <option key={r}>{r}</option>
                                ))}
                              </select>
                              <label style={{ ...labelS, display: "block", marginTop: 12 }}>Engagement score</label>
                              <select value={m.engagement || ""} onChange={(e) => patch(m.id, { engagement: e.target.value })} style={{ ...inputS, marginTop: 6 }}>
                                <option value="">—</option>
                                {ENGAGEMENT.map((r) => (
                                  <option key={r}>{r}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label style={{ ...labelS, color: ACCENT_TEXT }}>What they need right now</label>
                              <textarea rows={4} value={m.needs || ""} onChange={(e) => patch(m.id, { needs: e.target.value })} style={{ ...inputS, marginTop: 6, resize: "vertical" }} placeholder="From dashboard inputs, calls, bottlenecks — what does this member actually need?" />
                              <label style={{ ...labelS, color: GREEN, display: "block", marginTop: 12 }}>Possible combinations &amp; intros</label>
                              <textarea rows={4} value={m.connections || ""} onChange={(e) => patch(m.id, { connections: e.target.value })} style={{ ...inputS, marginTop: 6, resize: "vertical" }} placeholder="Who in the club or your network should this member meet? Why?" />
                            </div>
                            <div>
                              <label style={{ ...labelS, color: BLUE }}>Session notes &amp; transcript summaries</label>
                              <textarea rows={11} value={m.notes || ""} onChange={(e) => patch(m.id, { notes: e.target.value })} style={{ ...inputS, marginTop: 6, resize: "vertical", lineHeight: 1.5 }} placeholder={"Paste key points from call transcripts, dashboard scores, observations…\n\n12 Jul — bottleneck: hiring closer. Score 6/10.\n05 Jul — big win on pricing."} />
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

      <DataTransfer />
    </>
  );
}

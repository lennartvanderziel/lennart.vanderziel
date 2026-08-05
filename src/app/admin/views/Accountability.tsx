"use client";
import React, { useEffect, useMemo, useState } from "react";
import type { Crm } from "../useCrm";
import { Card, EmptyState, PageHeader, Pill, SectionTitle, StatRow, StatTile } from "../components/ui";
import { ACCENT, ACCENT_TEXT, BLUE, BORDER, FAINT, FILL, GREEN, INK, MUTED, RED, ghostS, labelS } from "../theme";
import {
  ACTIONS_PER_WEEK,
  actionStatusLabel,
  blankPlan,
  executionScore,
  lateReason,
  lateReasonLabel,
  migrateLegacy,
  recentWeekIds,
  weekLabel,
  type ActionStatus,
} from "@/lib/accountability";
import { useAccountability } from "@/lib/useAccountability";

const statusColor: Record<ActionStatus, string> = {
  open: MUTED,
  intervention: RED,
  done: GREEN,
};

export function Accountability({ crm }: { crm: Crm }) {
  const { members } = crm;
  const { store, setStore, weekId, ready, entryFor } = useAccountability();
  const [openMember, setOpenMember] = useState<string | null>(null);
  const [viewWeek, setViewWeek] = useState("");

  const activeMembers = useMemo(() => members.filter((m) => m.status === "active"), [members]);
  const week = viewWeek || weekId;

  // Bring anything typed into the old single-blob portal record across, once,
  // attached to the first active member.
  useEffect(() => {
    if (!ready || !weekId || activeMembers.length === 0) return;
    const first = activeMembers[0];
    const migrated = migrateLegacy(store, first.id, first.name, weekId);
    if (migrated !== store) setStore(migrated);
    // Intentionally runs on readiness only; re-running on every store change
    // would fight the user's edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, weekId, activeMembers.length]);

  const rows = activeMembers.map((m) => {
    const entry = entryFor(m.id, week);
    const plan = store.plans[m.id] ?? blankPlan(m.id, m.name, m.circle);
    return { member: m, entry, plan, late: lateReason(entry) };
  });

  const submitted = rows.filter((r) => r.entry.submitted).length;
  const late = rows.filter((r) => r.late !== null);
  const needHelp = rows.filter((r) => r.late === "needs_help");
  const allPromises = rows.flatMap((r) =>
    r.entry.actions.filter((a) => a.label.trim()).map((a) => ({ ...a, member: r.member.name }))
  );
  const donePromises = allPromises.filter((a) => a.status === "done").length;

  const weekOptions = weekId ? recentWeekIds(new Date(), 8) : [];

  return (
    <>
      <PageHeader
        title="Accountability."
        subtitle="Every member's promises for the week, who has filled theirs in, and who is behind. This is the view to run the weekly call from."
        action={
          <a href="/circle" target="_blank" rel="noopener noreferrer" style={{ ...ghostS, textDecoration: "none", display: "inline-block" }}>
            Open member view ↗
          </a>
        }
      />

      {activeMembers.length === 0 ? (
        <Card>
          <EmptyState>
            No active members yet. Add members under <strong>Members</strong> and they appear here automatically, each
            with their own weekly accountability record.
          </EmptyState>
        </Card>
      ) : (
        <>
          <StatRow>
            <StatTile
              label="Filled in"
              value={`${submitted}/${rows.length}`}
              color={submitted === rows.length ? GREEN : ACCENT}
              icon="✓"
              hint="Before this week's call"
            />
            <StatTile
              label="Behind"
              value={late.length}
              color={late.length > 0 ? RED : GREEN}
              icon="⚠"
              hint={late.length > 0 ? "Need chasing" : "Everyone on track"}
            />
            <StatTile
              label="Promises kept"
              value={allPromises.length ? `${donePromises}/${allPromises.length}` : "—"}
              color={BLUE}
              icon="◎"
              hint="Actions marked done"
            />
            <StatTile
              label="Need intervention"
              value={needHelp.length}
              color={needHelp.length > 0 ? RED : MUTED}
              icon="⌁"
              hint="Blocked, asked for help"
            />
          </StatRow>

          <Card style={{ marginBottom: 20 }}>
            <SectionTitle
              action={
                <select
                  aria-label="Week"
                  value={week}
                  onChange={(e) => setViewWeek(e.target.value)}
                  style={{ ...ghostS, padding: "8px 12px" }}
                >
                  {weekOptions.map((w, i) => (
                    <option key={w} value={w}>
                      {i === 0 ? "This week" : i === 1 ? "Last week" : weekLabel(w)}
                    </option>
                  ))}
                </select>
              }
            >
              Week of {week ? weekLabel(week) : "—"}
            </SectionTitle>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, minWidth: 720 }}>
                <thead>
                  <tr style={{ textAlign: "left", ...labelS }}>
                    {["Member", "Circle", "Key number", "Promises this week", "Score", "Status"].map((h) => (
                      <th key={h} style={{ padding: "10px 12px", borderBottom: BORDER, fontWeight: 800 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ member, entry, plan, late: reason }) => {
                    const open = openMember === member.id;
                    const filled = entry.actions.filter((a) => a.label.trim());
                    return (
                      <React.Fragment key={member.id}>
                        <tr style={{ borderBottom: open ? "none" : BORDER }}>
                          <td
                            style={{ padding: "14px 12px", cursor: "pointer" }}
                            onClick={() => setOpenMember(open ? null : member.id)}
                          >
                            <div style={{ fontWeight: 700, color: INK }}>
                              {member.name}{" "}
                              <span style={{ color: ACCENT_TEXT, fontSize: 11 }}>{open ? "▲" : "▼ detail"}</span>
                            </div>
                            <div style={{ fontSize: 12, color: FAINT }}>{plan.monthlyTarget || "No monthly target set"}</div>
                          </td>
                          <td style={{ padding: "14px 12px", color: MUTED }}>{member.circle}</td>
                          <td style={{ padding: "14px 12px", color: MUTED }}>
                            {entry.metricValue ? (
                              <>
                                <span style={{ color: INK, fontWeight: 700 }}>{entry.metricValue}</span>
                                {plan.metricTarget ? (
                                  <span style={{ color: FAINT }}> / {plan.metricTarget}</span>
                                ) : null}
                              </>
                            ) : (
                              <span style={{ color: FAINT }}>—</span>
                            )}
                          </td>
                          <td style={{ padding: "14px 12px" }}>
                            {filled.length === 0 ? (
                              <span style={{ color: FAINT }}>None set</span>
                            ) : (
                              <div style={{ display: "flex", gap: 5 }}>
                                {filled.map((a, i) => (
                                  <span
                                    key={i}
                                    title={`${a.label} — ${actionStatusLabel[a.status]}`}
                                    style={{
                                      width: 9,
                                      height: 9,
                                      borderRadius: "50%",
                                      background: statusColor[a.status],
                                      display: "inline-block",
                                    }}
                                  />
                                ))}
                                <span style={{ fontSize: 12, color: MUTED, marginLeft: 4 }}>
                                  {filled.filter((a) => a.status === "done").length}/{filled.length}
                                </span>
                              </div>
                            )}
                          </td>
                          <td style={{ padding: "14px 12px", fontWeight: 800, color: INK }}>{executionScore(entry)}</td>
                          <td style={{ padding: "14px 12px" }}>
                            {reason ? (
                              <Pill
                                label={lateReasonLabel[reason]}
                                color={reason === "needs_help" ? RED : reason === "not_submitted" ? ACCENT_TEXT : MUTED}
                              />
                            ) : (
                              <Pill label="On track" color={GREEN} />
                            )}
                          </td>
                        </tr>

                        {open && (
                          <tr style={{ borderBottom: BORDER }}>
                            <td colSpan={6} style={{ padding: "0 12px 20px" }}>
                              <div
                                style={{
                                  background: FILL,
                                  border: BORDER,
                                  borderRadius: 12,
                                  padding: "20px 22px",
                                  display: "grid",
                                  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                                  gap: 20,
                                }}
                              >
                                <div>
                                  <span style={labelS}>Direction</span>
                                  <Detail label="Quarter objective" value={plan.quarterObjective} />
                                  <Detail label="Monthly target" value={plan.monthlyTarget} />
                                  <Detail label="Key pathway" value={plan.pathway} />
                                  <Detail label="Bottleneck" value={entry.bottleneck} accent={RED} />
                                </div>
                                <div>
                                  <span style={labelS}>Promises this week</span>
                                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                                    {Array.from({ length: ACTIONS_PER_WEEK }).map((_, i) => {
                                      const a = entry.actions[i];
                                      if (!a?.label.trim())
                                        return (
                                          <p key={i} style={{ fontSize: 13, color: FAINT, margin: 0 }}>
                                            #{i + 1} — not set
                                          </p>
                                        );
                                      return (
                                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                          <span
                                            style={{
                                              width: 8,
                                              height: 8,
                                              borderRadius: "50%",
                                              background: statusColor[a.status],
                                              marginTop: 6,
                                              flexShrink: 0,
                                            }}
                                          />
                                          <span style={{ fontSize: 13.5, color: INK, lineHeight: 1.5 }}>
                                            {a.label}
                                            <span style={{ color: statusColor[a.status], fontWeight: 700 }}>
                                              {" "}
                                              · {actionStatusLabel[a.status]}
                                            </span>
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div>
                                  <span style={labelS}>Last week in their words</span>
                                  <Detail label="Wins" value={entry.wins} accent={GREEN} />
                                  <Detail label="Lessons" value={entry.lessons} />
                                  {entry.updatedAt > 0 && (
                                    <p style={{ fontSize: 11.5, color: FAINT, marginTop: 12 }}>
                                      Updated {new Date(entry.updatedAt).toLocaleString("en-GB")}
                                    </p>
                                  )}
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
            </div>
          </Card>

          {late.length > 0 && (
            <Card style={{ borderColor: RED }}>
              <SectionTitle>Chase list</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {late.map(({ member, late: reason }) => (
                  <div
                    key={member.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 0",
                      borderBottom: BORDER,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{member.name}</div>
                      <div style={{ fontSize: 12.5, color: MUTED }}>
                        {member.circle} · {member.whatsapp || member.email || "no contact on file"}
                      </div>
                    </div>
                    <Pill
                      label={reason ? lateReasonLabel[reason] : ""}
                      color={reason === "needs_help" ? RED : ACCENT_TEXT}
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </>
  );
}

function Detail({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: accent ?? FAINT }}>{label}</div>
      <p style={{ fontSize: 13.5, color: value ? INK : FAINT, margin: "2px 0 0", lineHeight: 1.5 }}>
        {value || "—"}
      </p>
    </div>
  );
}

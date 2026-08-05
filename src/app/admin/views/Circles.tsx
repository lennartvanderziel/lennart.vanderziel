"use client";
import type { Crm } from "../useCrm";
import { Card, EmptyState, PageHeader, Pill, SectionTitle } from "../components/ui";
import { ACCENT, BORDER, FAINT, FILL, GREEN, INK, MUTED, RED, inputS } from "../theme";
import { CIRCLES, CIRCLE_CAPACITY, formatEuro, priceToNumber } from "../types";
import { executionScore, lateReason } from "@/lib/accountability";
import { useAccountability } from "@/lib/useAccountability";

/** Who sits in which circle, how full each one is, and how the circle is executing. */
export function Circles({ crm }: { crm: Crm }) {
  const { members, saveMembers } = crm;
  const { weekId, entryFor } = useAccountability();

  const active = members.filter((m) => m.status === "active");
  const names = Array.from(new Set([...CIRCLES, ...active.map((m) => m.circle).filter((c) => c && c !== "—")]));
  const unassigned = active.filter((m) => !m.circle || m.circle === "—");

  return (
    <>
      <PageHeader
        title="Circles."
        subtitle={`Each circle runs 6–${CIRCLE_CAPACITY} founders. Move someone by changing their circle here.`}
      />

      {active.length === 0 ? (
        <EmptyState>No active members yet. Add members and assign them to a circle.</EmptyState>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
          {names.map((circle) => {
            const roster = active.filter((m) => m.circle === circle);
            const mrr = roster.reduce((s, m) => s + priceToNumber(m.price), 0);
            const full = roster.length >= CIRCLE_CAPACITY;
            const behind = roster.filter((m) => lateReason(entryFor(m.id, weekId)) !== null).length;

            return (
              <Card key={circle}>
                <SectionTitle
                  action={
                    <Pill
                      label={full ? "Full" : `${CIRCLE_CAPACITY - roster.length} seats open`}
                      color={full ? ACCENT : GREEN}
                    />
                  }
                >
                  {circle}
                </SectionTitle>

                <div style={{ display: "flex", gap: 18, marginBottom: 16, paddingBottom: 14, borderBottom: BORDER }}>
                  <Metric label="Members" value={`${roster.length}/${CIRCLE_CAPACITY}`} />
                  <Metric label="MRR" value={formatEuro(mrr)} color={ACCENT} />
                  <Metric label="Behind" value={behind} color={behind > 0 ? RED : GREEN} />
                </div>

                {roster.length === 0 ? (
                  <EmptyState>Nobody assigned to {circle} yet.</EmptyState>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {roster.map((m) => {
                      const entry = entryFor(m.id, weekId);
                      const reason = lateReason(entry);
                      return (
                        <div
                          key={m.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 10,
                            background: FILL,
                            borderRadius: 9,
                            padding: "10px 12px",
                          }}
                        >
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 13.5, fontWeight: 700, color: INK }}>{m.name}</div>
                            <div style={{ fontSize: 11.5, color: MUTED }}>{m.company || m.tier}</div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
                            <span
                              title="This week's execution score"
                              style={{ fontSize: 12.5, fontWeight: 800, color: reason ? MUTED : GREEN }}
                            >
                              {executionScore(entry)}
                            </span>
                            <select
                              aria-label={`Circle for ${m.name}`}
                              value={m.circle}
                              onChange={(e) =>
                                saveMembers(members.map((x) => (x.id === m.id ? { ...x, circle: e.target.value } : x)))
                              }
                              style={{ ...inputS, width: "auto", padding: "5px 8px", fontSize: 11.5 }}
                            >
                              {[...names, "—"].map((c) => (
                                <option key={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}

          {unassigned.length > 0 && (
            <Card style={{ borderColor: ACCENT }}>
              <SectionTitle>Not in a circle</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {unassigned.map((m) => (
                  <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: INK }}>{m.name}</span>
                    <select
                      aria-label={`Assign ${m.name} to a circle`}
                      value={m.circle}
                      onChange={(e) => saveMembers(members.map((x) => (x.id === m.id ? { ...x, circle: e.target.value } : x)))}
                      style={{ ...inputS, width: "auto", padding: "6px 10px", fontSize: 12 }}
                    >
                      {["—", ...names].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </>
  );
}

function Metric({ label, value, color = INK }: { label: string; value: string | number; color?: string }) {
  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 800, color, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 11, color: FAINT, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 1 }}>
        {label}
      </div>
    </div>
  );
}

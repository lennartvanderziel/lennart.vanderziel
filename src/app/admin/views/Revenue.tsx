"use client";
import type { Crm } from "../useCrm";
import { Card, EmptyState, PageHeader, Pill, SectionTitle, StatRow, StatTile } from "../components/ui";
import { memberStatusColor } from "../statuses";
import { ACCENT, BLUE, BORDER, FAINT, FILL, GREEN, INK, MUTED, RED, labelS } from "../theme";
import { DAY, formatEuro, priceToNumber } from "../types";

export function Revenue({ crm }: { crm: Crm }) {
  const { members, now } = crm;

  const active = members.filter((m) => m.status === "active");
  const paused = members.filter((m) => m.status === "paused");
  const churned = members.filter((m) => m.status === "churned");

  const mrr = active.reduce((s, m) => s + priceToNumber(m.price), 0);
  const arr = mrr * 12;
  const arpu = active.length ? mrr / active.length : 0;
  const atRisk = paused.reduce((s, m) => s + priceToNumber(m.price), 0);

  const byTier = Object.entries(
    active.reduce<Record<string, { count: number; mrr: number }>>((acc, m) => {
      const t = m.tier || "Untiered";
      const prev = acc[t] ?? { count: 0, mrr: 0 };
      return { ...acc, [t]: { count: prev.count + 1, mrr: prev.mrr + priceToNumber(m.price) } };
    }, {})
  ).sort((a, b) => b[1].mrr - a[1].mrr);

  const renewals = now
    ? active
        .map((m) => ({ member: m, at: new Date(m.renewsAt).getTime() }))
        .filter((x) => !Number.isNaN(x.at))
        .sort((a, b) => a.at - b.at)
    : [];

  return (
    <>
      <PageHeader title="Revenue &amp; renewals." subtitle="What the club earns each month, per tier, and what is coming up for renewal." />

      <StatRow>
        <StatTile label="MRR" value={formatEuro(mrr)} color={ACCENT} icon="€" hint={`${active.length} active members`} />
        <StatTile label="ARR run rate" value={formatEuro(arr)} color={INK} icon="↗" hint="MRR × 12" />
        <StatTile label="Average per member" value={formatEuro(arpu)} color={BLUE} icon="◍" hint="ARPU" />
        <StatTile
          label="At risk"
          value={formatEuro(atRisk)}
          color={atRisk > 0 ? RED : GREEN}
          icon="⚠"
          hint={`${paused.length} paused · ${churned.length} churned`}
        />
      </StatRow>

      <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
        <Card>
          <SectionTitle>Revenue by tier</SectionTitle>
          {byTier.length === 0 ? (
            <EmptyState>No active members yet. Add members with a price to see the breakdown.</EmptyState>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {byTier.map(([tier, data]) => {
                const pct = mrr ? (data.mrr / mrr) * 100 : 0;
                return (
                  <div key={tier}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                      <span style={{ fontSize: 13.5, color: INK, fontWeight: 600 }}>
                        {tier} <span style={{ color: FAINT, fontWeight: 500 }}>· {data.count}</span>
                      </span>
                      <span style={{ fontSize: 13.5, fontWeight: 800, color: ACCENT }}>{formatEuro(data.mrr)}</span>
                    </div>
                    <div style={{ height: 8, background: FILL, borderRadius: 100, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: ACCENT, borderRadius: 100 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card>
          <SectionTitle>Upcoming renewals</SectionTitle>
          {renewals.length === 0 ? (
            <EmptyState>No renewal dates set yet. Add them on each member so they surface here and on the dashboard.</EmptyState>
          ) : (
            <div style={{ maxHeight: 380, overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead>
                  <tr style={{ textAlign: "left", ...labelS }}>
                    {["Member", "Renews", "Value", "Status"].map((h) => (
                      <th key={h} style={{ padding: "8px 10px", borderBottom: BORDER, fontWeight: 800 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {renewals.map(({ member, at }) => {
                    const days = Math.ceil((at - now) / DAY);
                    return (
                      <tr key={member.id} style={{ borderBottom: BORDER }}>
                        <td style={{ padding: "11px 10px", color: INK, fontWeight: 600 }}>{member.name}</td>
                        <td style={{ padding: "11px 10px", color: days < 0 ? RED : days <= 30 ? INK : MUTED }}>
                          {member.renewsAt}
                          <div style={{ fontSize: 11.5, color: days < 0 ? RED : FAINT }}>
                            {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? "today" : `in ${days}d`}
                          </div>
                        </td>
                        <td style={{ padding: "11px 10px", color: ACCENT, fontWeight: 700 }}>{member.price}</td>
                        <td style={{ padding: "11px 10px" }}>
                          <Pill label={member.status} color={memberStatusColor[member.status]} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

"use client";
import type { Crm } from "../useCrm";
import type { View } from "../components/Sidebar";
import { Card, EmptyState, Pill, SectionTitle, StatRow, StatTile } from "../components/ui";
import { leadStatusConfig, PIPELINE_ORDER } from "../statuses";
import { ACCENT, ACCENT_TEXT, BLUE, BORDER, FAINT, FILL, GREEN, INK, MUTED, RED, ghostS } from "../theme";
import { DAY, formatEuro, isActiveLead, priceToNumber } from "../types";

const STALE_AFTER_DAYS = 7;

export function Dashboard({ crm, onNavigate }: { crm: Crm; onNavigate: (v: View) => void }) {
  const { leads, members, dueEmails, now } = crm;

  const active = members.filter((m) => m.status === "active");
  const mrr = active.reduce((sum, m) => sum + priceToNumber(m.price), 0);
  const openLeads = leads.filter((l) => isActiveLead(l.status));

  // Leads with no contact in a week. This is the "who am I dropping?" list.
  const stale = now
    ? openLeads
        .map((l) => ({ lead: l, days: Math.floor((now - (l.lastEmailAt ?? l.createdAt)) / DAY) }))
        .filter((x) => x.days >= STALE_AFTER_DAYS)
        .sort((a, b) => b.days - a.days)
    : [];

  // Renewals inside the next 30 days, soonest first.
  const renewals = now
    ? active
        .map((m) => ({ member: m, at: new Date(m.renewsAt).getTime() }))
        .filter((x) => !Number.isNaN(x.at) && x.at - now < 30 * DAY)
        .sort((a, b) => a.at - b.at)
    : [];

  return (
    <>
      <StatRow>
        <StatTile label="Active members" value={active.length} color={GREEN} icon="◍" hint="Paying now" />
        <StatTile label="MRR" value={formatEuro(mrr)} color={ACCENT} icon="€" hint="Recurring, per month" />
        <StatTile label="Open leads" value={openLeads.length} color={BLUE} icon="⚡" hint="Not yet decided" />
        <StatTile
          label="Emails due"
          value={dueEmails.length}
          color={dueEmails.length > 0 ? RED : MUTED}
          icon="✉"
          hint={dueEmails.length > 0 ? "Waiting to send" : "All caught up"}
        />
      </StatRow>

      {dueEmails.length > 0 && (
        <Card style={{ marginBottom: 20, borderColor: ACCENT }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: INK, margin: 0 }}>
                {dueEmails.length} nurture email{dueEmails.length > 1 ? "s" : ""} due
              </h2>
              <p style={{ fontSize: 13, color: MUTED, margin: "4px 0 0" }}>
                {dueEmails.map((d) => d.lead.name).join(", ")}
              </p>
            </div>
            <button onClick={() => onNavigate("emails")} style={ghostS}>
              Review &amp; send →
            </button>
          </div>
        </Card>
      )}

      <Card style={{ marginBottom: 20 }}>
        <SectionTitle
          action={
            <button onClick={() => onNavigate("leads")} style={ghostS}>
              Open pipeline
            </button>
          }
        >
          Needs follow-up now
        </SectionTitle>
        {stale.length === 0 ? (
          <EmptyState>
            Nobody is waiting. Every open lead has been contacted in the last {STALE_AFTER_DAYS} days.
          </EmptyState>
        ) : (
          <>
            <p style={{ fontSize: 13, color: MUTED, margin: "-6px 0 14px" }}>
              {stale.length} lead{stale.length > 1 ? "s" : ""} with no contact for over {STALE_AFTER_DAYS} days
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {stale.slice(0, 6).map(({ lead, days }) => (
                <div
                  key={lead.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    background: FILL,
                    border: BORDER,
                    borderRadius: 10,
                    padding: "12px 15px",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{lead.name}</div>
                    <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>
                      {lead.business || lead.revenue || "No business detail yet"}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <Pill label={leadStatusConfig[lead.status].label} color={leadStatusConfig[lead.status].color} />
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: days >= 14 ? RED : ACCENT_TEXT }}>
                      {days}d
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {stale.length > 6 && (
              <p style={{ fontSize: 12.5, color: FAINT, margin: "12px 0 0" }}>
                +{stale.length - 6} more in the pipeline
              </p>
            )}
          </>
        )}
      </Card>

      <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
        <Card>
          <SectionTitle>Pipeline overview</SectionTitle>
          {leads.length === 0 ? (
            <EmptyState>No leads yet. Add applications as they arrive and the pipeline fills in here.</EmptyState>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {PIPELINE_ORDER.map((status) => {
                const count = leads.filter((l) => l.status === status).length;
                const pct = leads.length ? (count / leads.length) * 100 : 0;
                return (
                  <div key={status} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12.5, color: MUTED, width: 92, flexShrink: 0 }}>
                      {leadStatusConfig[status].label}
                    </span>
                    <div style={{ flex: 1, height: 8, background: FILL, borderRadius: 100, overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          background: leadStatusConfig[status].color,
                          borderRadius: 100,
                          transition: "width 400ms cubic-bezier(0.22,1,0.36,1)",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: INK, width: 24, textAlign: "right" }}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card>
          <SectionTitle
            action={
              <button onClick={() => onNavigate("finance")} style={ghostS}>
                All renewals
              </button>
            }
          >
            Renewing within 30 days
          </SectionTitle>
          {renewals.length === 0 ? (
            <EmptyState>
              No renewals in the next 30 days. Add renewal dates on members so they surface here.
            </EmptyState>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {renewals.slice(0, 6).map(({ member, at }) => {
                const days = Math.ceil((at - now) / DAY);
                return (
                  <div
                    key={member.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom: BORDER,
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{member.name}</div>
                      <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>{member.tier}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 800, color: ACCENT }}>{member.price}</div>
                      <div style={{ fontSize: 11.5, color: days < 0 ? RED : FAINT, marginTop: 2 }}>
                        {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? "today" : `in ${days}d`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

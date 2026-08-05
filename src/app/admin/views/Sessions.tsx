"use client";
import { useState } from "react";
import type { Crm } from "../useCrm";
import { Card, EmptyState, PageHeader, SectionTitle } from "../components/ui";
import { ACCENT_TEXT, FAINT, FILL, GREEN, INK, LINE, MUTED, RED, btnS, ghostS, inputS, labelS } from "../theme";
import { CIRCLES, formatDate, uid, type Session } from "../types";

/** Log of the weekly circle calls: who showed up and what came out of it. */
export function Sessions({ crm }: { crm: Crm }) {
  const { sessions, saveSessions, members, notify } = crm;
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({ circle: CIRCLES[0] as string, date: "", topic: "" });

  const active = members.filter((m) => m.status === "active");
  const sorted = [...sessions].sort((a, b) => (a.date < b.date ? 1 : -1));

  function addSession() {
    if (!draft.date) return;
    saveSessions([
      { id: uid(), circle: draft.circle, date: draft.date, topic: draft.topic, attendeeIds: [], notes: "" },
      ...sessions,
    ]);
    setDraft({ circle: CIRCLES[0], date: "", topic: "" });
    setShowAdd(false);
    notify("Session logged");
  }

  function patch(id: string, p: Partial<Session>) {
    saveSessions(sessions.map((s) => (s.id === id ? { ...s, ...p } : s)));
  }

  function toggleAttendee(session: Session, memberId: string) {
    const next = session.attendeeIds.includes(memberId)
      ? session.attendeeIds.filter((x) => x !== memberId)
      : [...session.attendeeIds, memberId];
    patch(session.id, { attendeeIds: next });
  }

  return (
    <>
      <PageHeader
        title="Sessions."
        subtitle="The weekly circle calls. Track who attended and what came out of each one."
        action={
          <button onClick={() => setShowAdd(!showAdd)} style={btnS}>
            {showAdd ? "Close" : "+ Log session"}
          </button>
        }
      />

      {showAdd && (
        <Card style={{ marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
            <select aria-label="Circle" value={draft.circle} onChange={(e) => setDraft({ ...draft, circle: e.target.value })} style={inputS}>
              {CIRCLES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input type="date" aria-label="Session date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} style={inputS} />
            <input placeholder="Topic / focus" value={draft.topic} onChange={(e) => setDraft({ ...draft, topic: e.target.value })} style={inputS} />
            <button onClick={addSession} style={btnS} disabled={!draft.date}>
              Log it
            </button>
          </div>
        </Card>
      )}

      {sorted.length === 0 ? (
        <EmptyState>
          No sessions logged yet. Log each weekly call and attendance builds up here, so you can see who keeps showing
          up and who is drifting.
        </EmptyState>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {sorted.map((session) => {
            const roster = active.filter((m) => m.circle === session.circle);
            const present = session.attendeeIds.length;
            return (
              <Card key={session.id}>
                <SectionTitle
                  action={
                    <button
                      onClick={() => {
                        if (confirm("Delete this session?")) saveSessions(sessions.filter((s) => s.id !== session.id));
                      }}
                      style={{ ...ghostS, padding: "6px 12px", fontSize: 11.5, color: RED, borderColor: RED }}
                    >
                      Delete
                    </button>
                  }
                >
                  {session.circle} · {formatDate(session.date)}
                </SectionTitle>

                {session.topic && <p style={{ fontSize: 14, color: INK, margin: "-6px 0 14px" }}>{session.topic}</p>}

                <div style={{ marginBottom: 14 }}>
                  <span style={labelS}>
                    Attendance {roster.length > 0 && `· ${present}/${roster.length}`}
                  </span>
                  {roster.length === 0 ? (
                    <p style={{ fontSize: 13, color: FAINT, margin: "8px 0 0" }}>
                      No active members in {session.circle} yet.
                    </p>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 9 }}>
                      {roster.map((m) => {
                        const here = session.attendeeIds.includes(m.id);
                        return (
                          <button
                            key={m.id}
                            onClick={() => toggleAttendee(session, m.id)}
                            aria-pressed={here}
                            style={{
                              background: here ? "#eef5ea" : "transparent",
                              border: `1px solid ${here ? GREEN : LINE}`,
                              color: here ? GREEN : MUTED,
                              padding: "6px 13px",
                              borderRadius: 100,
                              fontSize: 12.5,
                              fontWeight: 700,
                              cursor: "pointer",
                              fontFamily: "inherit",
                            }}
                          >
                            {here ? "✓ " : ""}
                            {m.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <label style={{ ...labelS, color: ACCENT_TEXT, display: "block" }}>Session notes</label>
                <textarea
                  rows={4}
                  value={session.notes}
                  onChange={(e) => patch(session.id, { notes: e.target.value })}
                  placeholder="Bottlenecks raised, commitments made, intros to follow up on…"
                  style={{ ...inputS, marginTop: 6, resize: "vertical", lineHeight: 1.5, background: FILL }}
                />
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

"use client";
import { useMemo, useState } from "react";
import {
  ACCENT,
  ACCENT_TEXT,
  ACCENT_TINT,
  BORDER,
  CARD,
  FAINT,
  FILL,
  GREEN,
  INK,
  LINE,
  MUTED,
  PAGE,
  RED,
  SHADOW,
  btnS,
  ghostS,
  inputS,
  labelS,
} from "@/lib/theme";
import {
  ACTIONS_PER_WEEK,
  actionStatusLabel,
  blankPlan,
  executionScore,
  lateReason,
  lateReasonLabel,
  weekLabel,
  type ActionStatus,
  type MemberPlan,
  type WeekEntry,
} from "@/lib/accountability";
import { useAccountability } from "@/lib/useAccountability";
import { type RosterMember } from "@/lib/members";
import { useLocalStore } from "@/lib/useLocalStore";
import { portalMembers } from "@/lib/portalRoster";
import { Wordmark } from "@/components/Wordmark";

const ME_KEY = "sts-circle-me";
// Same starting roster the CRM uses, so a member opening this link before
// Lennart has edited anything still sees their circle.
const NO_MEMBERS: RosterMember[] = portalMembers.map((m) => ({
  id: m.id,
  name: m.name,
  email: "",
  circle: m.circle,
  status: "active",
}));

/** Active members only, with defaults filled in for anything the CRM left blank. */
function normaliseRoster(list: RosterMember[]): RosterMember[] {
  if (!Array.isArray(list)) return NO_MEMBERS;
  return list
    .filter((m) => m && typeof m.id === "string" && typeof m.name === "string")
    .filter((m) => (m.status ?? "active") === "active")
    .map((m) => ({ id: m.id, name: m.name, email: m.email ?? "", circle: m.circle ?? "—", status: "active" }));
}

const statusColor: Record<ActionStatus, string> = {
  open: MUTED,
  intervention: RED,
  done: GREEN,
};

export default function CirclePage() {
  const { store, weekId, ready, savePlan, saveEntry, entryFor } = useAccountability();
  const [allMembers] = useLocalStore<RosterMember[]>("crm-members", NO_MEMBERS);
  const [storedMe, setStoredMe] = useLocalStore<string | null>(ME_KEY, null);
  const [saved, setSaved] = useState(false);

  const roster = useMemo(() => normaliseRoster(allMembers), [allMembers]);
  const meId = storedMe && roster.some((m) => m.id === storedMe) ? storedMe : null;

  const chooseMe = (id: string) => setStoredMe(id);

  function flashSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  }

  if (!ready) return <div style={{ minHeight: "100vh", background: PAGE }} />;

  if (roster.length === 0) {
    return (
      <Shell>
        <div style={{ ...card, textAlign: "center", maxWidth: 460, margin: "80px auto" }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: INK, margin: 0 }}>No circle members yet</h1>
          <p style={{ fontSize: 14.5, color: MUTED, lineHeight: 1.6, marginTop: 10 }}>
            Once Lennart adds members in the Command Center, they can open this page and fill in their week.
          </p>
        </div>
      </Shell>
    );
  }

  if (!meId) {
    return (
      <Shell>
        <div style={{ ...card, maxWidth: 460, margin: "72px auto" }}>
          <span style={labelS}>Week of {weekLabel(weekId)}</span>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: INK, margin: "12px 0 6px", letterSpacing: "-0.02em" }}>
            Who are you?
          </h1>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: "0 0 18px" }}>
            Pick your name to open your weekly accountability. Everyone in your circle sees what you commit to.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {roster.map((m) => (
              <button
                key={m.id}
                onClick={() => chooseMe(m.id)}
                style={{
                  ...ghostS,
                  textAlign: "left",
                  padding: "13px 16px",
                  borderRadius: 10,
                  fontSize: 14.5,
                  color: INK,
                  fontWeight: 700,
                }}
              >
                {m.name}
                <span style={{ color: FAINT, fontWeight: 500 }}> · {m.circle}</span>
              </button>
            ))}
          </div>
        </div>
      </Shell>
    );
  }

  const me = roster.find((m) => m.id === meId)!;
  const myPlan: MemberPlan = store.plans[meId] ?? blankPlan(meId, me.name, me.circle);
  const myEntry: WeekEntry = entryFor(meId, weekId);

  const updatePlan = (patch: Partial<MemberPlan>) => {
    savePlan({ ...myPlan, ...patch });
    flashSaved();
  };
  const updateEntry = (patch: Partial<WeekEntry>) => {
    saveEntry({ ...myEntry, ...patch });
    flashSaved();
  };
  const updateAction = (i: number, patch: Partial<{ label: string; status: ActionStatus }>) => {
    const actions = myEntry.actions.map((a, idx) => (idx === i ? { ...a, ...patch } : a));
    updateEntry({ actions });
  };

  const others = roster.filter((m) => m.id !== meId && m.circle === me.circle);

  return (
    <Shell>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 14, marginBottom: 28 }}>
        <div>
          <span style={labelS}>Week of {weekLabel(weekId)} · {me.circle}</span>
          <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "8px 0 0" }}>
            Your week, {me.name.split(" ")[0]}.
          </h1>
          <p style={{ fontSize: 14.5, color: MUTED, margin: "6px 0 0", maxWidth: 560, lineHeight: 1.55 }}>
            Fill this in before the call. Your circle can see it, and you can see theirs. That is the point.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {saved && <span style={{ fontSize: 13, fontWeight: 700, color: GREEN }}>✓ Saved</span>}
          <button onClick={() => setStoredMe(null)} style={ghostS}>
            Not you?
          </button>
        </div>
      </header>

      <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <section style={{ ...card, borderLeft: `3px solid #8a7aa8` }}>
            <span style={labelS}>Quarterly · set once per quarter</span>
            <h2 style={h2}>Quarter objective</h2>
            <textarea
              rows={2}
              placeholder="What is your objective this quarter?"
              value={myPlan.quarterObjective}
              onChange={(e) => updatePlan({ quarterObjective: e.target.value })}
              style={{ ...inputS, resize: "vertical" }}
            />
          </section>

          <section style={{ ...card, borderLeft: `3px solid #3a6480` }}>
            <span style={labelS}>Monthly · direction</span>
            <h2 style={h2}>Monthly target</h2>
            <input
              placeholder="What is your target this month?"
              value={myPlan.monthlyTarget}
              onChange={(e) => updatePlan({ monthlyTarget: e.target.value })}
              style={inputS}
            />
            <h2 style={{ ...h2, marginTop: 18 }}>Key pathway</h2>
            <p style={hint}>The main route to that target. Holds for at least a month.</p>
            <input
              placeholder="What is the key pathway to your goal?"
              value={myPlan.pathway}
              onChange={(e) => updatePlan({ pathway: e.target.value })}
              style={inputS}
            />
          </section>

          <section style={{ ...card, borderLeft: `3px solid ${RED}` }}>
            <span style={labelS}>Rolling · update when it changes</span>
            <h2 style={h2}>Current bottleneck</h2>
            <p style={hint}>The one thing blocking your pathway. Solve it, then name the next.</p>
            <input
              placeholder="What is blocking your progress?"
              value={myEntry.bottleneck}
              onChange={(e) => updateEntry({ bottleneck: e.target.value })}
              style={inputS}
            />
          </section>

          <section style={{ ...card, borderLeft: `3px solid ${ACCENT}` }}>
            <span style={labelS}>Weekly · update before every session</span>
            <h2 style={h2}>Your key number</h2>
            <input
              placeholder="What are you tracking? (e.g. Monthly revenue €)"
              value={myPlan.metricName}
              onChange={(e) => updatePlan({ metricName: e.target.value })}
              style={inputS}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <input
                placeholder="This week"
                value={myEntry.metricValue}
                onChange={(e) => updateEntry({ metricValue: e.target.value })}
                style={{ ...inputS, flex: 1 }}
              />
              <input
                placeholder="Target"
                value={myPlan.metricTarget}
                onChange={(e) => updatePlan({ metricTarget: e.target.value })}
                style={{ ...inputS, flex: 1 }}
              />
            </div>
          </section>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <section style={{ ...card, textAlign: "center" }}>
            <span style={labelS}>This week&apos;s execution score</span>
            <div style={{ fontSize: 52, fontWeight: 800, color: ACCENT, letterSpacing: "-0.03em", marginTop: 8 }}>
              {executionScore(myEntry)}
            </div>
            <p style={{ fontSize: 12.5, color: FAINT, marginTop: 2 }}>
              {myEntry.actions.filter((a) => a.label.trim() && a.status === "done").length} of{" "}
              {myEntry.actions.filter((a) => a.label.trim()).length || ACTIONS_PER_WEEK} promises kept
            </p>
          </section>

          <section style={{ ...card, borderLeft: `3px solid ${ACCENT}` }}>
            <span style={labelS}>Weekly · your promises</span>
            <h2 style={h2}>What you commit to this week</h2>
            <p style={hint}>1 = primary needle-mover · 2 = secondary · 3 = sharpening the axe</p>
            {Array.from({ length: ACTIONS_PER_WEEK }).map((_, i) => {
              const action = myEntry.actions[i] ?? { label: "", status: "open" as ActionStatus };
              return (
                <div key={i} style={{ marginBottom: 14 }}>
                  <input
                    placeholder={
                      i === 0
                        ? "#1 — the action that moves the needle most"
                        : i === 1
                        ? "#2 — supporting needle-mover"
                        : "#3 — upgrade yourself: identity, beliefs, skills"
                    }
                    value={action.label}
                    onChange={(e) => updateAction(i, { label: e.target.value })}
                    style={inputS}
                  />
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    {(Object.keys(actionStatusLabel) as ActionStatus[]).map((st) => {
                      const on = action.status === st;
                      return (
                        <button
                          key={st}
                          onClick={() => updateAction(i, { status: st })}
                          style={{
                            background: on ? `color-mix(in srgb, ${statusColor[st]} 12%, transparent)` : "transparent",
                            border: `1px solid ${on ? statusColor[st] : LINE}`,
                            color: on ? statusColor[st] : FAINT,
                            padding: "5px 12px",
                            borderRadius: 100,
                            fontSize: 11.5,
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          {actionStatusLabel[st]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>

          <section style={{ ...card, borderLeft: `3px solid ${GREEN}` }}>
            <span style={labelS}>Weekly · reflection</span>
            <h2 style={h2}>Wins &amp; lessons</h2>
            <textarea
              rows={3}
              placeholder="What went well last week?"
              value={myEntry.wins}
              onChange={(e) => updateEntry({ wins: e.target.value })}
              style={{ ...inputS, resize: "vertical" }}
            />
            <textarea
              rows={3}
              placeholder="What did you learn the hard way?"
              value={myEntry.lessons}
              onChange={(e) => updateEntry({ lessons: e.target.value })}
              style={{ ...inputS, resize: "vertical", marginTop: 10 }}
            />
          </section>

          <button
            onClick={() => updateEntry({ submitted: true })}
            style={{ ...btnS, padding: "14px 24px", fontSize: 14, opacity: myEntry.submitted ? 0.55 : 1 }}
            disabled={myEntry.submitted}
          >
            {myEntry.submitted ? "✓ Submitted for this week" : "Submit my week →"}
          </button>
        </div>
      </div>

      {/* ---------------------------------------------- the rest of the circle */}
      <section style={{ marginTop: 44 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: INK, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
          Your circle this week
        </h2>
        <p style={{ fontSize: 14, color: MUTED, margin: "0 0 18px" }}>
          What everyone else committed to. Hold each other to it.
        </p>
        {others.length === 0 ? (
          <div style={card}>
            <p style={{ fontSize: 14, color: MUTED, margin: 0 }}>
              You are the only active member in {me.circle} right now.
            </p>
          </div>
        ) : (
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
            {others.map((other) => {
              const entry = entryFor(other.id, weekId);
              const plan = store.plans[other.id] ?? blankPlan(other.id, other.name, other.circle);
              const reason = lateReason(entry);
              const filled = entry.actions.filter((a) => a.label.trim());
              return (
                <div key={other.id} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                    <h3 style={{ fontSize: 15.5, fontWeight: 800, color: INK, margin: 0 }}>{other.name}</h3>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        padding: "3px 9px",
                        borderRadius: 100,
                        color: reason ? (reason === "needs_help" ? RED : ACCENT_TEXT) : GREEN,
                        background: reason ? (reason === "needs_help" ? "#fbeceb" : ACCENT_TINT) : "#eef5ea",
                      }}
                    >
                      {reason ? lateReasonLabel[reason] : "On track"}
                    </span>
                  </div>
                  {plan.monthlyTarget && (
                    <p style={{ fontSize: 12.5, color: FAINT, margin: "5px 0 0" }}>Target: {plan.monthlyTarget}</p>
                  )}
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
                    {filled.length === 0 ? (
                      <p style={{ fontSize: 13.5, color: FAINT, margin: 0 }}>Has not set their promises yet.</p>
                    ) : (
                      filled.map((a, i) => (
                        <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
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
                      ))
                    )}
                  </div>
                  {entry.bottleneck && (
                    <div style={{ marginTop: 14, background: FILL, borderRadius: 9, padding: "10px 12px" }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: RED }}>BOTTLENECK</div>
                      <p style={{ fontSize: 13, color: INK, margin: "3px 0 0", lineHeight: 1.5 }}>{entry.bottleneck}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </Shell>
  );
}

const card: React.CSSProperties = {
  background: CARD,
  border: BORDER,
  borderRadius: 16,
  padding: "24px 26px",
  boxShadow: SHADOW,
};

const h2: React.CSSProperties = { fontSize: 16.5, fontWeight: 800, color: INK, margin: "12px 0 10px" };
const hint: React.CSSProperties = { fontSize: 12.5, color: FAINT, margin: "0 0 10px" };

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: PAGE, color: INK, fontFamily: "var(--font-sans), sans-serif" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(251,249,245,0.85)", backdropFilter: "blur(14px)", borderBottom: BORDER }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", gap: 11 }}>
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: ACCENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
            aria-hidden
          >
            <span style={{ width: 4.5, height: 13, borderRadius: 3, background: "#fff" }} />
            <span style={{ width: 4.5, height: 13, borderRadius: 3, background: "#fff", opacity: 0.72 }} />
          </span>
          <Wordmark size={14.5} />
        </div>
      </nav>
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "36px 24px 80px" }}>{children}</main>
    </div>
  );
}

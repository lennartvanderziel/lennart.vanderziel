"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ACCENT = "#E8742B";
const GREEN = "#7fb069";
const RED = "#d9534f";
const CARD = "rgba(255,255,255,0.04)";
const BORDER = "1px solid rgba(255,255,255,0.1)";

type Tab = "home" | "accountability" | "sessions" | "members" | "board" | "perks" | "conduct" | "billing";
type ActionStatus = "open" | "intervention" | "done";

const tabs: { id: Tab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "accountability", label: "Accountability" },
  { id: "sessions", label: "Sessions" },
  { id: "members", label: "Members" },
  { id: "board", label: "The Board" },
  { id: "perks", label: "Referrals & Perks" },
  { id: "conduct", label: "Code of Conduct" },
  { id: "billing", label: "Billing" },
];

const circles = [
  {
    name: "Circle A",
    members: [
      { name: "Member 1", company: "Company", focus: "E-commerce", location: "Bali", intro: "Building an e-com brand. Ask me about logistics & sourcing." },
      { name: "Member 2", company: "Company", focus: "Agency", location: "Netherlands", intro: "Runs a marketing agency. Strong in paid social." },
      { name: "Member 3", company: "Company", focus: "SaaS", location: "Bali", intro: "Bootstrapping a B2B SaaS. Loves product talk." },
    ],
  },
  {
    name: "Circle B",
    members: [
      { name: "Member 4", company: "Company", focus: "Real estate", location: "Netherlands", intro: "Developing property projects. Happy to share deal structures." },
      { name: "Member 5", company: "Company", focus: "Coaching", location: "Bali", intro: "Scaling a coaching business past €25k/mo." },
      { name: "Member 6", company: "Company", focus: "E-commerce", location: "Europe", intro: "Second e-com exit in progress. Ops nerd." },
    ],
  },
];

const pastSessions = [
  { date: "Last Tuesday", title: "Circle Session — Pricing deep-dive", summary: "Reviewed two pricing models; agreed on value-anchoring experiment for Member 3. Everyone set one pricing action.", recording: "#" },
  { date: "2 weeks ago", title: "Circle Session — Hiring bottlenecks", summary: "Discussed first ops hires. Key lesson: hire against your calendar, not your org chart.", recording: "#" },
  { date: "3 weeks ago", title: "Circle Session — Q3 objectives", summary: "Each member locked their Q3 objective and key metric. These now live in your Accountability dashboard.", recording: "#" },
];

const winsFeed = [
  { author: "Member 5", time: "3d ago", type: "Win", text: "Closed the biggest deal of the year after the pricing feedback from last week's session. 🔥" },
  { author: "Member 2", time: "5d ago", type: "Lesson", text: "Lesson from this week: my team mirrors my energy. Fixed my sleep, the standup fixed itself." },
  { author: "Member 1", time: "1w ago", type: "Win", text: "Hit the monthly revenue target 6 days early. The weekly needle-mover focus works." },
  { author: "Member 4", time: "1w ago", type: "Lesson", text: "Stop selling the product, start selling the outcome. Changed one sales page headline, +22% conversion." },
];

const boardPosts = [
  { type: "Bottleneck", author: "Member 3", time: "2d ago", text: "Scaling past my own capacity in sales — who has experience handing sales off to a first closer?", replies: 4 },
  { type: "Introduction", author: "Member 1", time: "4d ago", text: "Can anyone intro me to a good 3PL partner in Western Europe? Volume ~2k orders/month.", replies: 2 },
  { type: "Bottleneck", author: "Member 2", time: "1w ago", text: "Hiring my first ops manager — what did you pay and where did you find them?", replies: 5 },
];

const statusConfig: Record<ActionStatus, { label: string; color: string; bg: string }> = {
  open: { label: "Open", color: "#cfc8bd", bg: "rgba(255,255,255,0.08)" },
  intervention: { label: "Intervention needed", color: RED, bg: "rgba(217,83,79,0.14)" },
  done: { label: "Done", color: GREEN, bg: "rgba(127,176,105,0.14)" },
};

function loadState<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

const defaultAcc = {
  q3Objective: "",
  monthlyTarget: "",
  metricName: "Monthly revenue (€)",
  metricHistory: [] as { week: string; value: string }[],
  metricCurrent: "",
  metricTarget: "",
  actions: [
    { label: "", status: "open" as ActionStatus },
    { label: "", status: "open" as ActionStatus },
    { label: "", status: "open" as ActionStatus },
  ],
  lessons: "",
  wins: "",
};

export default function Dashboard() {
  const router = useRouter();
  const [member, setMember] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("home");
  const [acc, setAcc] = useState(defaultAcc);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const m = sessionStorage.getItem("sts-member");
    if (!m) router.replace("/platform");
    else {
      setMember(m);
      setAcc(loadState("sts-accountability", defaultAcc));
    }
  }, [router]);

  function saveAcc(next: typeof defaultAcc) {
    setAcc(next);
    localStorage.setItem("sts-accountability", JSON.stringify(next));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function logMetric() {
    if (!acc.metricCurrent.trim()) return;
    const week = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    const history = [...acc.metricHistory.filter((h) => h.week !== week), { week, value: acc.metricCurrent }].slice(-8);
    saveAcc({ ...acc, metricHistory: history });
  }

  if (!member) return <div style={{ minHeight: "100vh", background: "#0f0e0b" }} />;

  const firstName = member.split("@")[0].split(".")[0];
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const doneCount = acc.actions.filter((a) => a.status === "done").length;
  const execScore = acc.actions.some((a) => a.label) ? ((doneCount / acc.actions.length) * 10).toFixed(1) : "—";

  const sectionCard: React.CSSProperties = { background: CARD, border: BORDER, borderRadius: 16, padding: "26px 28px" };
  const inputDark: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.05)", border: BORDER, color: "#f0ece4", padding: "13px 15px", fontSize: 14.5, fontFamily: "inherit", borderRadius: 10, outline: "none" };
  const eyebrowStyle = (color: string): React.CSSProperties => ({ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color, background: `color-mix(in srgb, ${color} 12%, transparent)`, padding: "4px 10px", borderRadius: 100, display: "inline-block" });

  const maxMetric = Math.max(...acc.metricHistory.map((h) => parseFloat(h.value) || 0), 1);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0e0b", color: "#f0ece4", fontFamily: "var(--font-sans), ui-sans-serif, sans-serif" }}>

      {/* TOP BAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(15,14,11,0.92)", backdropFilter: "blur(14px)", borderBottom: BORDER }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="/platform/dashboard" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flex: "0 0 auto" }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
              <span style={{ width: 4.5, height: 13, borderRadius: 3, background: "#fff" }} />
              <span style={{ width: 4.5, height: 13, borderRadius: 3, background: "#fff", opacity: 0.72 }} />
            </span>
            <span style={{ fontSize: 14.5, fontWeight: 800, color: "#fff" }}>STS Portal</span>
          </a>
          <button onClick={() => { sessionStorage.removeItem("sts-member"); router.push("/platform"); }} className="btn-ghost" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#cfc8bd", padding: "7px 16px", borderRadius: 100, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flex: "0 0 auto" }}>Log out</button>
        </div>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto", padding: "0 20px 12px" }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ background: tab === t.id ? "rgba(232,116,43,0.14)" : "rgba(255,255,255,0.04)", border: "none", color: tab === t.id ? ACCENT : "#a59e93", padding: "8px 15px", borderRadius: 100, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "color .2s, background .2s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ============ HOME ============ */}
        {tab === "home" && (
          <>
            <header className="fade-up" style={{ marginBottom: 32 }}>
              <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 21, color: ACCENT }}>Shoulder to Shoulder</span>
              <h1 style={{ marginTop: 6, fontSize: "clamp(28px,4.5vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.04 }}>Welcome back, {displayName}.</h1>
            </header>
            <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Prepare for next session */}
                <section className="fade-up-1" style={{ ...sectionCard, border: "1px solid rgba(232,116,43,0.35)" }}>
                  <span style={eyebrowStyle(ACCENT)}>Next session · Tuesday 16:00 CET</span>
                  <h2 style={{ fontSize: 19, fontWeight: 800, color: "#fff", margin: "14px 0 4px" }}>Prepare for your circle session</h2>
                  <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                    {["Update your key metric in the Accountability tab", "Set the status of last week's actions (done / open / intervention)", "Write down this week's #1 bottleneck", "Log your wins & lessons from last week"].map((item) => (
                      <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: ACCENT, fontWeight: 800, fontSize: 14, lineHeight: 1.6 }}>→</span>
                        <span style={{ fontSize: 14.5, lineHeight: 1.55, color: "#cfc8bd" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setTab("accountability")} className="btn-primary" style={{ marginTop: 18, background: ACCENT, color: "#fff", border: "none", padding: "12px 24px", fontSize: 13.5, fontWeight: 700, borderRadius: 100, cursor: "pointer", fontFamily: "inherit" }}>Open Accountability →</button>
                </section>

                {/* Wins & lessons feed */}
                <section className="fade-up-2" style={sectionCard}>
                  <h2 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: 0 }}>Wins & lessons from the club</h2>
                  {winsFeed.slice(0, 3).map((post) => (
                    <div key={post.text} style={{ marginTop: 12, background: "rgba(255,255,255,0.03)", border: BORDER, borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={eyebrowStyle(post.type === "Win" ? GREEN : ACCENT)}>{post.type}</span>
                        <span style={{ fontSize: 12, color: "#8a847a" }}>{post.author} · {post.time}</span>
                      </div>
                      <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: "#f0ece4", margin: "8px 0 0" }}>{post.text}</p>
                    </div>
                  ))}
                </section>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Your buddy */}
                <section className="fade-up-1" style={sectionCard}>
                  <span style={eyebrowStyle(ACCENT)}>Buddy system · Thursdays</span>
                  <h2 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: "12px 0 4px" }}>Your buddy this cycle</h2>
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg, rgba(232,116,43,0.35), rgba(232,116,43,0.1))", border: "1px solid rgba(232,116,43,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: ACCENT }}>M2</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#f0ece4" }}>Member 2</div>
                      <div style={{ fontSize: 12.5, color: "#8a847a" }}>Weekly check-in · every Thursday</div>
                    </div>
                  </div>
                </section>
                <section className="fade-up-2 photo-zoom" style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", border: BORDER }}>
                  <Image src="/session.jpg" alt="Circle session" fill className="photo-grade" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,7,0.8), transparent 55%)", display: "flex", alignItems: "flex-end", padding: 18 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Last mastermind · Bali</span>
                  </div>
                </section>
                <section className="fade-up-3" style={{ background: "rgba(232,116,43,0.09)", border: "1px solid rgba(232,116,43,0.4)", borderRadius: 16, padding: "24px 24px" }}>
                  <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 18, color: ACCENT }}>Earn a free month</span>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#cfc8bd", margin: "8px 0 0" }}>Refer a founder who joins and get one month free.</p>
                  <button onClick={() => setTab("perks")} style={{ marginTop: 14, background: "none", border: "none", color: ACCENT, fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>How it works →</button>
                </section>
              </div>
            </div>
          </>
        )}

        {/* ============ ACCOUNTABILITY ============ */}
        {tab === "accountability" && (
          <>
            <header className="fade-up" style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>Accountability.</h1>
                <p style={{ marginTop: 6, fontSize: 14.5, color: "#a59e93" }}>Quarterly direction → monthly target → weekly execution. Update weekly items before every session.</p>
              </div>
              {saved && <span style={{ fontSize: 13, fontWeight: 700, color: GREEN }}>✓ Saved</span>}
            </header>

            <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* QUARTERLY */}
                <section style={{ ...sectionCard, borderLeft: "3px solid #8a7aa8" }}>
                  <span style={eyebrowStyle("#8a7aa8")}>Quarterly · set once per quarter</span>
                  <h2 style={{ fontSize: 16.5, fontWeight: 800, color: "#fff", margin: "12px 0 10px" }}>Q3 Objective</h2>
                  <textarea rows={2} placeholder="What's your Q3 objective?" value={acc.q3Objective} onChange={(e) => saveAcc({ ...acc, q3Objective: e.target.value })} style={{ ...inputDark, resize: "vertical" }} />
                </section>

                {/* MONTHLY */}
                <section style={{ ...sectionCard, borderLeft: `3px solid #5b8ca6` }}>
                  <span style={eyebrowStyle("#5b8ca6")}>Monthly · set at the start of each month</span>
                  <h2 style={{ fontSize: 16.5, fontWeight: 800, color: "#fff", margin: "12px 0 10px" }}>Monthly target</h2>
                  <input placeholder="What's your target for this month?" value={acc.monthlyTarget} onChange={(e) => saveAcc({ ...acc, monthlyTarget: e.target.value })} style={inputDark} />
                </section>

                {/* KEY METRIC */}
                <section style={{ ...sectionCard, borderLeft: `3px solid ${ACCENT}` }}>
                  <span style={eyebrowStyle(ACCENT)}>Weekly · update before every session</span>
                  <h2 style={{ fontSize: 16.5, fontWeight: 800, color: "#fff", margin: "12px 0 10px" }}>Your key number</h2>
                  <input placeholder="What are you tracking? (e.g. Monthly revenue €)" value={acc.metricName} onChange={(e) => saveAcc({ ...acc, metricName: e.target.value })} style={inputDark} />
                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <input placeholder="Current" value={acc.metricCurrent} onChange={(e) => setAcc({ ...acc, metricCurrent: e.target.value })} style={{ ...inputDark, flex: 1 }} />
                    <input placeholder="Target" value={acc.metricTarget} onChange={(e) => saveAcc({ ...acc, metricTarget: e.target.value })} style={{ ...inputDark, flex: 1 }} />
                    <button onClick={logMetric} className="btn-primary" style={{ background: ACCENT, color: "#fff", border: "none", padding: "0 20px", fontSize: 13.5, fontWeight: 700, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Log week</button>
                  </div>
                  {acc.metricHistory.length > 0 && (
                    <div style={{ marginTop: 18 }}>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90 }}>
                        {acc.metricHistory.map((h) => (
                          <div key={h.week} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                            <div style={{ width: "100%", maxWidth: 44, height: `${Math.max((parseFloat(h.value) || 0) / maxMetric * 70, 4)}px`, background: `linear-gradient(to top, ${ACCENT}, rgba(232,116,43,0.55))`, borderRadius: "4px 4px 0 0" }} />
                            <span style={{ fontSize: 10, color: "#8a847a", whiteSpace: "nowrap" }}>{h.week}</span>
                          </div>
                        ))}
                      </div>
                      <p style={{ marginTop: 8, fontSize: 12, color: "#8a847a" }}>Latest: {acc.metricHistory[acc.metricHistory.length - 1]?.value}{acc.metricTarget ? ` / target ${acc.metricTarget}` : ""}</p>
                    </div>
                  )}
                </section>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* EXECUTION SCORE */}
                <section style={{ ...sectionCard, textAlign: "center" }}>
                  <span style={eyebrowStyle(ACCENT)}>Weekly execution score</span>
                  <div style={{ fontSize: 52, fontWeight: 800, color: doneCount === acc.actions.length && acc.actions.some(a => a.label) ? GREEN : "#fff", letterSpacing: "-0.03em", marginTop: 8 }}>{execScore}</div>
                  <p style={{ fontSize: 12.5, color: "#8a847a", marginTop: 2 }}>{doneCount} of {acc.actions.length} key actions done</p>
                </section>

                {/* WEEKLY ACTIONS */}
                <section style={{ ...sectionCard, borderLeft: `3px solid ${ACCENT}` }}>
                  <span style={eyebrowStyle(ACCENT)}>Weekly · set every week</span>
                  <h2 style={{ fontSize: 16.5, fontWeight: 800, color: "#fff", margin: "12px 0 4px" }}>Key actions this week</h2>
                  <p style={{ fontSize: 12.5, color: "#8a847a", margin: "0 0 12px" }}>1 = primary needle-mover · 2 = secondary · 3 = sharpening the axe</p>
                  {acc.actions.map((action, i) => (
                    <div key={i} style={{ marginBottom: 14 }}>
                      <input
                        placeholder={i === 0 ? "#1 — the action that moves the needle most" : i === 1 ? "#2 — supporting needle-mover" : "#3 — upgrade yourself: identity, beliefs, skills"}
                        value={action.label}
                        onChange={(e) => { const actions = [...acc.actions]; actions[i] = { ...action, label: e.target.value }; saveAcc({ ...acc, actions }); }}
                        style={inputDark}
                      />
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        {(Object.keys(statusConfig) as ActionStatus[]).map((st) => (
                          <button key={st} onClick={() => { const actions = [...acc.actions]; actions[i] = { ...action, status: st }; saveAcc({ ...acc, actions }); }}
                            style={{ background: action.status === st ? statusConfig[st].bg : "transparent", border: action.status === st ? `1px solid ${statusConfig[st].color}` : "1px solid rgba(255,255,255,0.12)", color: action.status === st ? statusConfig[st].color : "#8a847a", padding: "5px 12px", borderRadius: 100, fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>
                            {statusConfig[st].label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>

                {/* WINS & LESSONS */}
                <section style={{ ...sectionCard, borderLeft: `3px solid ${GREEN}` }}>
                  <span style={eyebrowStyle(GREEN)}>Weekly · before next call</span>
                  <h2 style={{ fontSize: 16.5, fontWeight: 800, color: "#fff", margin: "12px 0 10px" }}>Wins</h2>
                  <textarea rows={2} placeholder="What wins did you have this week?" value={acc.wins} onChange={(e) => saveAcc({ ...acc, wins: e.target.value })} style={{ ...inputDark, resize: "vertical" }} />
                  <h2 style={{ fontSize: 16.5, fontWeight: 800, color: "#fff", margin: "16px 0 10px" }}>Key lessons</h2>
                  <textarea rows={2} placeholder="Reflecting on last week's actions, execution and outcomes…" value={acc.lessons} onChange={(e) => saveAcc({ ...acc, lessons: e.target.value })} style={{ ...inputDark, resize: "vertical" }} />
                </section>
              </div>
            </div>
          </>
        )}

        {/* ============ SESSIONS ============ */}
        {tab === "sessions" && (
          <>
            <header className="fade-up" style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>Sessions.</h1>
              <p style={{ marginTop: 6, fontSize: 14.5, color: "#a59e93" }}>What&apos;s coming, what to prepare, and everything you missed.</p>
            </header>
            <section style={{ ...sectionCard, border: "1px solid rgba(232,116,43,0.35)", marginBottom: 20 }}>
              <span style={eyebrowStyle(ACCENT)}>Upcoming · Tuesday 16:00 CET</span>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: "#fff", margin: "14px 0 6px" }}>Circle Session — weekly</h2>
              <p style={{ fontSize: 14.5, color: "#a59e93", margin: 0 }}>Zoom · link shared in your WhatsApp group</p>
              <div style={{ marginTop: 14, background: "rgba(255,255,255,0.03)", border: BORDER, borderRadius: 12, padding: "16px 18px" }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: ACCENT, margin: "0 0 8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Prepare</h3>
                {["Key metric updated", "Action statuses set", "Your #1 bottleneck written down", "Wins & lessons logged"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center", padding: "4px 0" }}>
                    <span style={{ color: ACCENT, fontWeight: 800 }}>→</span>
                    <span style={{ fontSize: 14, color: "#cfc8bd" }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: "0 0 14px" }}>Past sessions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {pastSessions.map((s) => (
                <div key={s.title} className="card-lift-dark" style={{ ...sectionCard, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
                  <div style={{ flex: "0 0 110px", fontSize: 13, fontWeight: 700, color: ACCENT, paddingTop: 2 }}>{s.date}</div>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <h3 style={{ fontSize: 15.5, fontWeight: 800, color: "#f0ece4", margin: 0 }}>{s.title}</h3>
                    <p style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.6, color: "#a59e93" }}>{s.summary}</p>
                  </div>
                  <a href={s.recording} className="btn-ghost" style={{ textDecoration: "none", border: "1px solid rgba(255,255,255,0.18)", color: "#cfc8bd", padding: "9px 18px", borderRadius: 100, fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap" }}>▶ Rewatch</a>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ============ MEMBERS ============ */}
        {tab === "members" && (
          <>
            <header className="fade-up" style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>The members.</h1>
              <p style={{ marginTop: 6, fontSize: 14.5, color: "#a59e93" }}>Your circle, your buddy, and the wider network. Communication runs through WhatsApp.</p>
            </header>
            {circles.map((circle, ci) => (
              <div key={circle.name} style={{ marginBottom: 30 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <h2 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: 0 }}>{circle.name}</h2>
                  {ci === 0 && <span style={eyebrowStyle(ACCENT)}>Your circle</span>}
                </div>
                <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
                  {circle.members.map((m) => (
                    <div key={m.name} className="card-lift-dark" style={{ background: CARD, border: BORDER, borderRadius: 16, padding: "24px 22px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, rgba(232,116,43,0.35), rgba(232,116,43,0.1))", border: "1px solid rgba(232,116,43,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: ACCENT, flex: "0 0 auto" }}>
                          {m.name.split(" ").map((w) => w[0]).join("")}
                        </span>
                        <div>
                          <h3 style={{ fontSize: 15.5, fontWeight: 800, color: "#fff", margin: 0 }}>{m.name}</h3>
                          <p style={{ fontSize: 12.5, color: "#8a847a", margin: "2px 0 0" }}>{m.focus} · {m.location}</p>
                        </div>
                      </div>
                      <p style={{ marginTop: 12, fontSize: 13.5, lineHeight: 1.55, color: "#a59e93" }}>{m.intro}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p style={{ fontSize: 12.5, color: "#8a847a" }}>Profiles are placeholders — real names, photos and intros go live once you send them over.</p>
          </>
        )}

        {/* ============ THE BOARD ============ */}
        {tab === "board" && (
          <>
            <header className="fade-up" style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>The Board.</h1>
              <p style={{ marginTop: 6, fontSize: 14.5, color: "#a59e93" }}>Bottlenecks, intro requests, wins and lessons — from the whole club.</p>
            </header>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[...boardPosts, ...winsFeed.map((w) => ({ type: w.type, author: w.author, time: w.time, text: w.text, replies: 0 }))].map((post, i) => (
                <div key={i} className="card-lift-dark" style={{ background: CARD, border: BORDER, borderRadius: 14, padding: "20px 24px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={eyebrowStyle(post.type === "Win" ? GREEN : post.type === "Lesson" ? "#5b8ca6" : ACCENT)}>{post.type}</span>
                    <span style={{ fontSize: 12.5, color: "#8a847a" }}>{post.author} · {post.time}</span>
                  </div>
                  <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.6, color: "#f0ece4" }}>{post.text}</p>
                  {post.replies > 0 && <div style={{ marginTop: 10, fontSize: 12.5, color: "#8a847a", fontWeight: 600 }}>💬 {post.replies} replies</div>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ============ PERKS ============ */}
        {tab === "perks" && (
          <>
            <header className="fade-up" style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>Referrals & perks.</h1>
            </header>
            <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
              <section style={{ ...sectionCard, border: "1px solid rgba(232,116,43,0.35)" }}>
                <span style={eyebrowStyle(ACCENT)}>Referral program</span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "14px 0 8px" }}>Refer a founder, get one month free.</h2>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { n: "1", text: "Think of a founder at your level who'd raise the bar of the room." },
                    { n: "2", text: "Send them the site — lennartvanderziel.com/shoulder-to-shoulder — or intro them directly to Lennart on WhatsApp." },
                    { n: "3", text: "They mention your name in their application (\"How did you hear about us → A member or referral\")." },
                    { n: "4", text: "When they join, your next month is free. Automatically applied." },
                  ].map((s) => (
                    <div key={s.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ flex: "0 0 auto", width: 24, height: 24, borderRadius: "50%", background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>{s.n}</span>
                      <span style={{ fontSize: 14, lineHeight: 1.55, color: "#cfc8bd" }}>{s.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, background: "rgba(255,255,255,0.03)", border: BORDER, borderRadius: 12, padding: "14px 16px" }}>
                  <h3 style={{ fontSize: 12, fontWeight: 800, color: ACCENT, margin: "0 0 6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>What to share</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#a59e93", margin: 0 }}>The one-liner: &quot;It&apos;s a circle of 6–8 founders at your level — weekly online sessions, dinners and side quests in Bali and Europe, and two Summits a year. By application only.&quot;</p>
                </div>
              </section>
              <section style={sectionCard}>
                <span style={eyebrowStyle(GREEN)}>Testimonials</span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "14px 0 8px" }}>Share your story, get rewarded.</h2>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ background: "rgba(255,255,255,0.03)", border: BORDER, borderRadius: 12, padding: "16px 18px" }}>
                    <h3 style={{ fontSize: 14.5, fontWeight: 800, color: "#f0ece4", margin: "0 0 6px" }}>🎥 Video testimonial</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#a59e93", margin: 0 }}>60–90 seconds, phone camera is perfect. Formula: where you were → what happened in the circle → where you are now (with one concrete number or outcome). Send it to Lennart on WhatsApp.</p>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", border: BORDER, borderRadius: 12, padding: "16px 18px" }}>
                    <h3 style={{ fontSize: 14.5, fontWeight: 800, color: "#f0ece4", margin: "0 0 6px" }}>⭐ Google review</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#a59e93", margin: 0 }}>A short honest review helps future members find the club. Link follows soon.</p>
                  </div>
                  <div style={{ background: "rgba(127,176,105,0.08)", border: "1px solid rgba(127,176,105,0.3)", borderRadius: 12, padding: "16px 18px" }}>
                    <h3 style={{ fontSize: 14.5, fontWeight: 800, color: GREEN, margin: "0 0 6px" }}>The thank-you</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#a59e93", margin: 0 }}>Deliver both and there&apos;s a bonus on Lennart — announced at the next dinner.</p>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {/* ============ CODE OF CONDUCT ============ */}
        {tab === "conduct" && (
          <>
            <header className="fade-up" style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>Code of conduct.</h1>
              <p style={{ marginTop: 6, fontSize: 14.5, color: "#a59e93" }}>The standard that protects the room. By being a member, you hold it.</p>
            </header>
            <div style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { title: "Confidentiality is absolute", text: "What's shared in the circle stays in the circle. Numbers, struggles, plans — nothing leaves the room, ever." },
                { title: "Show up", text: "Weekly sessions and your Thursday buddy call are commitments, not options. If you can't make it, tell your circle in advance." },
                { title: "Radical honesty, zero judgment", text: "We tell each other the truth — about the business and about ourselves. Feedback is a gift here, not an attack." },
                { title: "Give first", text: "Lead with contributions: intros, solutions, experience. The club works because everyone deposits more than they withdraw." },
                { title: "No pitching", text: "Members are peers, not prospects. Selling to the room breaks the trust that makes it valuable." },
                { title: "Have fun, stay classy", text: "Dinners, side quests and Summits are part of the work. Enjoy them fully — and represent the club well." },
              ].map((rule, i) => (
                <div key={rule.title} style={{ ...sectionCard, display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <span style={{ flex: "0 0 auto", width: 32, height: 32, borderRadius: "50%", background: "rgba(232,116,43,0.14)", border: "1px solid rgba(232,116,43,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: ACCENT }}>{i + 1}</span>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#f0ece4", margin: 0 }}>{rule.title}</h3>
                    <p style={{ marginTop: 6, fontSize: 14, lineHeight: 1.6, color: "#a59e93" }}>{rule.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ============ BILLING ============ */}
        {tab === "billing" && (
          <>
            <header className="fade-up" style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>Billing.</h1>
            </header>
            <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start", maxWidth: 860 }}>
              <section style={sectionCard}>
                <span style={eyebrowStyle(ACCENT)}>Membership</span>
                <h2 style={{ fontSize: 21, fontWeight: 800, color: "#fff", marginTop: 12 }}>Founder Circle</h2>
                <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: "#a59e93" }}>Active membership · Renews automatically</p>
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: GREEN }}>Active</span>
                </div>
              </section>
              <section style={sectionCard}>
                <span style={eyebrowStyle(ACCENT)}>Payment method</span>
                <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6, color: "#a59e93" }}>Update your credit card, view invoices and manage your subscription securely via Stripe.</p>
                <a href="https://billing.stripe.com/p/login/REPLACE_WITH_YOUR_PORTAL_LINK" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "inline-flex", marginTop: 16, textDecoration: "none", color: "#fff", background: ACCENT, padding: "13px 26px", borderRadius: 100, fontSize: 14, fontWeight: 700 }}>
                  Manage payment method →
                </a>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

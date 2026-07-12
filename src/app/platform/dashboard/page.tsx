"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ACCENT = "#E8742B";
const CARD = "rgba(255,255,255,0.04)";
const BORDER = "1px solid rgba(255,255,255,0.1)";

type Tab = "home" | "members" | "events" | "board" | "billing";

const members = [
  { name: "Member 1", company: "Company", location: "Bali", focus: "E-commerce" },
  { name: "Member 2", company: "Company", location: "Netherlands", focus: "Agency" },
  { name: "Member 3", company: "Company", location: "Bali", focus: "SaaS" },
  { name: "Member 4", company: "Company", location: "Netherlands", focus: "Real estate" },
  { name: "Member 5", company: "Company", location: "Bali", focus: "Coaching" },
  { name: "Member 6", company: "Company", location: "Europe", focus: "E-commerce" },
];

const events = [
  { date: "Tue · 16:00 CET", title: "Founder Circle — Weekly Session", where: "Zoom", tag: "Your circle" },
  { date: "Fri · 19:00", title: "Founders Dinner", where: "Canggu, Bali", tag: "Offline" },
  { date: "Next month", title: "Side Quest — TBA", where: "Netherlands", tag: "Offline" },
  { date: "This autumn", title: "Global STS Summit", where: "Location revealed to members", tag: "Summit" },
];

const board = [
  { type: "Bottleneck", author: "Member 3", time: "2d ago", text: "Scaling past my own capacity in sales — who has experience handing sales off to a first closer?", replies: 4 },
  { type: "Introduction", author: "Member 1", time: "4d ago", text: "Can anyone intro me to a good 3PL partner in Western Europe? Volume ~2k orders/month.", replies: 2 },
  { type: "Win", author: "Member 5", time: "5d ago", text: "Closed the biggest deal of the year after the pricing feedback from last week's session. Thank you brothers. 🔥", replies: 7 },
  { type: "Bottleneck", author: "Member 2", time: "1w ago", text: "Hiring my first ops manager — what did you pay and where did you find them?", replies: 5 },
];

const tabs: { id: Tab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "members", label: "Members" },
  { id: "events", label: "Events" },
  { id: "board", label: "The Board" },
  { id: "billing", label: "Billing" },
];

export default function Dashboard() {
  const router = useRouter();
  const [member, setMember] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("home");

  useEffect(() => {
    const m = sessionStorage.getItem("sts-member");
    if (!m) router.replace("/platform");
    else setMember(m);
  }, [router]);

  if (!member) return <div style={{ minHeight: "100vh", background: "#0f0e0b" }} />;

  const firstName = member.split("@")[0].split(".")[0];
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  const sectionCard: React.CSSProperties = { background: CARD, border: BORDER, borderRadius: 16, padding: "28px 30px" };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0e0b", color: "#f0ece4", fontFamily: "var(--font-sans), ui-sans-serif, sans-serif" }}>

      {/* TOP BAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(15,14,11,0.92)", backdropFilter: "blur(14px)", borderBottom: BORDER }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <a href="/platform/dashboard" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                <span style={{ width: 4.5, height: 13, borderRadius: 3, background: "#fff" }} />
                <span style={{ width: 4.5, height: 13, borderRadius: 3, background: "#fff", opacity: 0.72 }} />
              </span>
              <span style={{ fontSize: 14.5, fontWeight: 800, color: "#fff" }}>STS Portal</span>
            </a>
            <div className="nav-links" style={{ display: "flex", gap: 4 }}>
              {tabs.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ background: tab === t.id ? "rgba(232,116,43,0.14)" : "transparent", border: "none", color: tab === t.id ? ACCENT : "#a59e93", padding: "8px 16px", borderRadius: 100, fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "color .2s, background .2s" }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem("sts-member"); router.push("/platform"); }}
            className="btn-ghost"
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#cfc8bd", padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >
            Log out
          </button>
        </div>
        {/* Mobile tabs */}
        <div style={{ display: "flex", gap: 4, overflowX: "auto", padding: "0 20px 12px" }} className="mobile-tabs">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ background: tab === t.id ? "rgba(232,116,43,0.14)" : "rgba(255,255,255,0.04)", border: "none", color: tab === t.id ? ACCENT : "#a59e93", padding: "7px 14px", borderRadius: 100, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 28px 80px" }}>

        {/* ============ HOME ============ */}
        {tab === "home" && (
          <>
            <header className="fade-up" style={{ marginBottom: 36 }}>
              <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 21, color: ACCENT }}>Shoulder to Shoulder</span>
              <h1 style={{ marginTop: 6, fontSize: "clamp(30px,4.5vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.04 }}>Welcome back, {displayName}.</h1>
              <p style={{ marginTop: 10, fontSize: 16, color: "#a59e93", maxWidth: 540 }}>Your circle meets Tuesday at 16:00 CET. Come prepared with this week&apos;s bottleneck.</p>
            </header>
            <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 22, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <section className="fade-up-1" style={sectionCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>Next up</h2>
                    <button onClick={() => setTab("events")} style={{ background: "none", border: "none", color: ACCENT, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>All events →</button>
                  </div>
                  {events.slice(0, 2).map((s, i) => (
                    <div key={s.title} style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none", marginTop: i === 0 ? 12 : 0 }}>
                      <div style={{ flex: "0 0 110px", fontSize: 13, fontWeight: 700, color: ACCENT }}>{s.date}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15.5, fontWeight: 700, color: "#f0ece4" }}>{s.title}</div>
                        <div style={{ fontSize: 12.5, color: "#8a847a", marginTop: 2 }}>{s.tag} · {s.where}</div>
                      </div>
                    </div>
                  ))}
                </section>
                <section className="fade-up-2" style={sectionCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>Latest on The Board</h2>
                    <button onClick={() => setTab("board")} style={{ background: "none", border: "none", color: ACCENT, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Open board →</button>
                  </div>
                  {board.slice(0, 2).map((post) => (
                    <div key={post.text} style={{ marginTop: 14, background: "rgba(255,255,255,0.03)", border: BORDER, borderRadius: 12, padding: "16px 18px" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: post.type === "Win" ? "#7fb069" : ACCENT }}>{post.type}</span>
                        <span style={{ fontSize: 12, color: "#8a847a" }}>{post.author} · {post.time}</span>
                      </div>
                      <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.55, color: "#f0ece4", margin: "8px 0 0" }}>{post.text}</p>
                    </div>
                  ))}
                </section>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <section className="fade-up-1 photo-zoom" style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", border: BORDER }}>
                  <Image src="/dinner.jpg" alt="STS" fill className="photo-grade" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,7,0.8), transparent 55%)", display: "flex", alignItems: "flex-end", padding: 18 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Last dinner · Bali</span>
                  </div>
                </section>
                <section className="fade-up-2" style={{ background: "rgba(232,116,43,0.09)", border: "1px solid rgba(232,116,43,0.4)", borderRadius: 16, padding: "26px 26px" }}>
                  <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 19, color: ACCENT }}>Go deeper</span>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "8px 0 8px" }}>High Performance Mentoring</h2>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#cfc8bd", margin: 0 }}>Members get priority access to 1-on-1 mentoring with Lennart. Limited spots per quarter.</p>
                  <a href="mailto:l.vanderziel@gmail.com?subject=High%20Performance%20Mentoring" className="btn-primary" style={{ display: "inline-flex", marginTop: 18, textDecoration: "none", color: "#fff", background: ACCENT, padding: "12px 24px", borderRadius: 100, fontSize: 13.5, fontWeight: 700 }}>Request a spot →</a>
                </section>
              </div>
            </div>
          </>
        )}

        {/* ============ MEMBERS ============ */}
        {tab === "members" && (
          <>
            <header className="fade-up" style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>The members.</h1>
              <p style={{ marginTop: 8, fontSize: 15, color: "#a59e93" }}>Your brothers in the club. Reach out, connect, help each other win.</p>
            </header>
            <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 18 }}>
              {members.map((m) => (
                <div key={m.name} className="card-lift-dark" style={{ background: CARD, border: BORDER, borderRadius: 16, padding: "26px 24px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, rgba(232,116,43,0.35), rgba(232,116,43,0.1))", border: "1px solid rgba(232,116,43,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: ACCENT }}>
                    {m.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginTop: 14 }}>{m.name}</h3>
                  <p style={{ fontSize: 13.5, color: "#a59e93", marginTop: 4 }}>{m.company} · {m.focus}</p>
                  <p style={{ fontSize: 12.5, color: "#8a847a", marginTop: 2 }}>📍 {m.location}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 24, fontSize: 13, color: "#8a847a" }}>Member profiles are placeholders — real names, photos and companies will appear here once connected to the member database.</p>
          </>
        )}

        {/* ============ EVENTS ============ */}
        {tab === "events" && (
          <>
            <header className="fade-up" style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>Upcoming.</h1>
              <p style={{ marginTop: 8, fontSize: 15, color: "#a59e93" }}>Circle sessions, dinners, side quests and the Summit.</p>
            </header>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {events.map((e) => (
                <div key={e.title} className="card-lift-dark" style={{ display: "flex", alignItems: "center", gap: 20, background: CARD, border: BORDER, borderRadius: 14, padding: "22px 26px", flexWrap: "wrap" }}>
                  <div style={{ flex: "0 0 130px", fontSize: 14, fontWeight: 800, color: ACCENT }}>{e.date}</div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 16.5, fontWeight: 700, color: "#f0ece4" }}>{e.title}</div>
                    <div style={{ fontSize: 13, color: "#8a847a", marginTop: 3 }}>{e.tag} · {e.where}</div>
                  </div>
                  <button className="btn-ghost" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.18)", color: "#cfc8bd", padding: "9px 18px", borderRadius: 100, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>RSVP</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ============ THE BOARD ============ */}
        {tab === "board" && (
          <>
            <header className="fade-up" style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>The Board.</h1>
              <p style={{ marginTop: 8, fontSize: 15, color: "#a59e93" }}>Bottlenecks, intro requests and wins. Post yours — someone in the club has the answer.</p>
            </header>
            <div style={{ ...sectionCard, marginBottom: 22 }}>
              <textarea rows={2} placeholder="Share a bottleneck, ask for an intro, or post a win…" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: BORDER, color: "#f0ece4", padding: "14px 16px", fontSize: 14.5, fontFamily: "inherit", borderRadius: 10, outline: "none", resize: "vertical" }} />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <button className="btn-primary" style={{ background: ACCENT, color: "#fff", border: "none", padding: "11px 24px", fontSize: 13.5, fontWeight: 700, borderRadius: 100, cursor: "pointer", fontFamily: "inherit" }}>Post to the club</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {board.map((post) => (
                <div key={post.text} className="card-lift-dark" style={{ background: CARD, border: BORDER, borderRadius: 14, padding: "22px 26px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: post.type === "Win" ? "#7fb069" : ACCENT, background: post.type === "Win" ? "rgba(127,176,105,0.12)" : "rgba(232,116,43,0.12)", padding: "4px 10px", borderRadius: 100 }}>{post.type}</span>
                    <span style={{ fontSize: 12.5, color: "#8a847a" }}>{post.author} · {post.time}</span>
                  </div>
                  <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.6, color: "#f0ece4" }}>{post.text}</p>
                  <div style={{ marginTop: 12, fontSize: 12.5, color: "#8a847a", fontWeight: 600 }}>💬 {post.replies} replies</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ============ BILLING ============ */}
        {tab === "billing" && (
          <>
            <header className="fade-up" style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>Billing.</h1>
              <p style={{ marginTop: 8, fontSize: 15, color: "#a59e93" }}>Your membership and payment details.</p>
            </header>
            <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "start", maxWidth: 860 }}>
              <section style={sectionCard}>
                <span className="eyebrow" style={{ color: ACCENT }}>Membership</span>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginTop: 12 }}>Founder Circle</h2>
                <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.6, color: "#a59e93" }}>Active membership · Renews automatically</p>
                <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7fb069" }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#7fb069" }}>Active</span>
                </div>
              </section>
              <section style={sectionCard}>
                <span className="eyebrow" style={{ color: ACCENT }}>Payment method</span>
                <p style={{ marginTop: 14, fontSize: 14.5, lineHeight: 1.6, color: "#a59e93" }}>Update your credit card, view invoices and manage your subscription securely via Stripe.</p>
                <a
                  href="https://billing.stripe.com/p/login/REPLACE_WITH_YOUR_PORTAL_LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: "inline-flex", marginTop: 18, textDecoration: "none", color: "#fff", background: ACCENT, padding: "13px 26px", borderRadius: 100, fontSize: 14, fontWeight: 700 }}
                >
                  Manage payment method →
                </a>
                <p style={{ marginTop: 14, fontSize: 12, color: "#8a847a" }}>Opens the secure Stripe customer portal. You&apos;ll verify with the email on your membership.</p>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";

const ACCENT = "#E8742B";

const circleSystem = [
  { title: "Share opportunities", desc: "Deals, intros and openings reach your circle before the rest of the world hears about them." },
  { title: "Provide solutions", desc: "Six to eight founders have seen almost every problem before. Someone in your circle has the answer." },
  { title: "Solve each other's problems", desc: "Structured sessions turn your biggest bottleneck into a decision — not another week of circling." },
  { title: "Hold each other accountable", desc: "You commit in front of your circle. Next session, they ask. Standards stay high." },
  { title: "Have fun", desc: "Long dinners, side quests and real friendship. Growth without enjoyment doesn't last." },
];

const included = [
  "Your Founder Circle — 6 to 8 founders at your level",
  "Regular online circle sessions — join from anywhere",
  "Offline dinners, activities and side quests where you live",
  "Two STS Summits per year",
  "Exclusive opportunities shared inside the community",
  "A vetted network across the Netherlands, Bali and beyond",
];

const fitFor = [
  "Want to raise their standards so they can scale faster.",
  "Realize they are the bottleneck — and value honest feedback over protecting their ego.",
  "Believe the most exceptional businesses are never built alone.",
  "Have the do-what-it-takes attitude to match the room.",
];

const steps = [
  { n: "1", title: "Apply", desc: "A short application — takes two minutes. Tell us about you and your business." },
  { n: "2", title: "Founder Fit Conversation", desc: "A personal call to make sure it's the right fit, both ways. No pitch, no pressure." },
  { n: "3", title: "Join your circle", desc: "You're matched into a Founder Circle of 6–8 founders operating at your level." },
];

const faqs = [
  { q: "How do the Founder Circles work?", a: "Your circle is a fixed group of 6 to 8 founders operating at your level. You meet in regular online sessions using a structured system: sharing opportunities, providing solutions, solving each other's problems and holding each other accountable. Same faces, growing trust, compounding value." },
  { q: "Are the sessions online or offline?", a: "Both — by design. Circle sessions are online, so you can join from anywhere in the world. The events, dinners, activities and side quests are offline, organised where members actually live — with active hubs in the Netherlands and Bali. And twice a year the whole community comes together at the STS Summit." },
  { q: "I split my time between countries. Does that work?", a: "Perfectly. Most members are based in the Netherlands or Bali, and many move between them. Your circle travels with you because it's online — and there are offline gatherings in both places." },
  { q: "Who is in the community?", a: "Two levels: founders doing €5k–25k/month scaling to €1M/year, and founders past €25k/month scaling to multiple 7 figures. Every member is personally vetted on level, values and attitude." },
  { q: "What is the time commitment?", a: "Built for busy founders: regular circle sessions online, offline gatherings you choose to attend, and two Summits a year. Intentional, never noise." },
  { q: "What happens after I apply?", a: "Every application is reviewed personally. If there's a potential fit, you're invited to a short Founder Fit Conversation — and from there, matched into your circle." },
];

export default function ShoulderToShoulder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [biz, setBiz] = useState("");
  const [applied, setApplied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#0f0e0b", color: "#15130f", fontFamily: "var(--font-sans), ui-sans-serif, sans-serif", minHeight: "100vh", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, background: "linear-gradient(to bottom, rgba(10,9,7,0.55), transparent)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", color: "#fff" }}>
            <span style={{ flex: "0 0 auto", width: 32, height: 32, borderRadius: 9, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", gap: 3.5 }}>
              <span style={{ width: 5, height: 14, borderRadius: 3, background: "#fff" }} />
              <span style={{ width: 5, height: 14, borderRadius: 3, background: "#fff", opacity: 0.72 }} />
            </span>
            <span style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: "-0.01em", color: "#fff" }}>Shoulder to Shoulder</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <a href="/platform" className="nav-links" style={{ textDecoration: "none", color: "rgba(255,255,255,0.75)", fontSize: 13.5, fontWeight: 600 }}>Member login</a>
            <a href="#apply" className="btn-light" style={{ textDecoration: "none", color: "#15130f", background: "#fff", padding: "11px 22px", borderRadius: 100, fontSize: 13.5, fontWeight: 700 }}>Apply now</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" style={{ position: "relative", width: "100%", height: "100vh", minHeight: 640, overflow: "hidden" }}>
        <Image src="/founders.jpg" alt="Founders" fill className="ken-burns" style={{ objectFit: "cover" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,9,7,0.5) 0%, rgba(10,9,7,0.15) 38%, rgba(10,9,7,0.55) 68%, rgba(10,9,7,0.92) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 1180, margin: "0 auto", padding: "0 28px 88px" }}>
          <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: "#fff", opacity: 0.9 }}>The Founder Circle Club</span>
          <h1 style={{ marginTop: 8, fontSize: "clamp(40px,7vw,88px)", fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.035em", color: "#fff", maxWidth: 820 }}>Grow exponentially, shoulder to shoulder.</h1>
          <p style={{ marginTop: 20, fontSize: 19, lineHeight: 1.5, color: "rgba(255,255,255,0.86)", fontWeight: 500, maxWidth: 560 }}>A circle of 6–8 founders at your level. Online sessions from anywhere, offline experiences where you live, and two Summits a year.</p>
          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <a href="#apply" className="btn-light" style={{ textDecoration: "none", color: "#15130f", background: "#fff", padding: "17px 34px", borderRadius: 100, fontSize: 16, fontWeight: 700 }}>Apply to join →</a>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
              By application only
            </span>
          </div>
        </div>
      </header>

      {/* THE PROBLEM */}
      <section style={{ background: "#15130f", padding: "110px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(26px,4vw,38px)", lineHeight: 1.35, color: "#fff" }}>
            The higher you climb,<br />the smaller your <span style={{ color: ACCENT }}>circle</span> gets.
          </p>
          <p style={{ marginTop: 28, fontSize: 16.5, lineHeight: 1.6, color: "#a59e93", maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>Fewer people understand your challenges. Fewer dare to be honest with you. And the connections you do make are random, not at your level. That&apos;s exactly the problem Shoulder to Shoulder solves.</p>
        </div>
      </section>

      {/* THE FOUNDER CIRCLE — flagship */}
      <section style={{ background: "#fff", color: "#15130f", padding: "110px 28px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 56px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>The heart of the club</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,46px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>Your Founder Circle: 6–8 founders operating at your level.</h2>
            <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.6, color: "#6b665d" }}>Not a loose network — a fixed circle that meets in regular online sessions, using a system built for one thing: growing exponentially, together.</p>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {circleSystem.map((item, i) => (
              <div key={item.title} className="card-lift" style={{ background: "#f6f5f2", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, padding: "28px 26px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`, color: ACCENT, fontWeight: 800, fontSize: 15 }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontSize: 18.5, fontWeight: 800, marginTop: 16, color: "#15130f" }}>{item.title}</h3>
                <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.55, color: "#6b665d" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE + OFFLINE — how it works geographically */}
      <section style={{ background: "#f6f5f2", color: "#15130f", padding: "110px 28px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>Best of both worlds</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4.2vw,46px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>Online where it&apos;s efficient.<br />Offline where it matters.</h2>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            <div className="card-lift" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "36px 32px" }}>
              <span style={{ fontSize: 26 }}>💻</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginTop: 14 }}>Circle sessions — online</h3>
              <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: "#6b665d" }}>Your Founder Circle meets online, so it works from anywhere — whether you&apos;re in Amsterdam, Bali or on the road. No flights needed to stay sharp.</p>
            </div>
            <div className="card-lift" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "36px 32px" }}>
              <span style={{ fontSize: 26 }}>🍽️</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginTop: 14 }}>Events & side quests — offline</h3>
              <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: "#6b665d" }}>Dinners, activities and side quests happen in person, where you live. Most members are based in the <strong>Netherlands</strong> or <strong>Bali</strong> — so both hubs have a full calendar.</p>
            </div>
            <div className="card-lift" style={{ background: "#15130f", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "36px 32px" }}>
              <span style={{ fontSize: 26 }}>🌍</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginTop: 14, color: "#fff" }}>STS Summit — twice a year</h3>
              <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: "#a59e93" }}>Twice a year the whole community comes together for the STS Summit — several days of strategy, connection and unforgettable experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO MOMENT */}
      <section style={{ position: "relative", width: "100%", height: "78vh", minHeight: 480, overflow: "hidden" }}>
        <Image src="/mastermind.jpg" alt="Founders Mastermind" fill style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,7,0.85) 0%, rgba(10,9,7,0.05) 45%)", pointerEvents: "none", display: "flex", alignItems: "flex-end", padding: 48 }}>
          <p style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: "clamp(24px,3.4vw,34px)", color: "#fff", maxWidth: 640, lineHeight: 1.3 }}>&quot;Others see what you can&apos;t, and know things you don&apos;t.&quot;</p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ background: "#fff", color: "#15130f", padding: "110px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 50px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>Your membership</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>Everything inside Shoulder to Shoulder.</h2>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
            {included.map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 13, background: "#f6f5f2", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: "20px 22px" }}>
                <span style={{ flex: "0 0 auto", color: ACCENT, fontSize: 17, fontWeight: 800, lineHeight: 1.4 }}>✓</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.45, color: "#15130f", fontWeight: 600 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section style={{ background: "#0f0e0b", padding: 0 }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", maxHeight: "86vh", overflow: "hidden" }}>
          <iframe src="https://drive.google.com/file/d/1YGaVx7w8KNlEusDKk-oXqa0DNAdB5S-x/preview" allow="autoplay" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} title="Shoulder to Shoulder" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "#15130f", color: "#fff", padding: "110px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 54px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>The result</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff" }}>Become a world-class founder, surrounded by exceptional entrepreneurs.</h2>
            <p style={{ marginTop: 16, fontSize: 16.5, lineHeight: 1.55, color: "#a59e93" }}>So your business grows faster, generates more profit, and scales without depending on you.</p>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 22 }}>
            {[
              { quote: "I stopped thinking like an operator and started thinking like the founder I need to become to raise €40M for my business. That changed how I do everything.", name: "KIBET KIPKEMOI" },
              { quote: "I'd been circling the real estate idea for a while without moving. With the support of the group it turned into land I now own and a 14-unit project underway.", name: "SAMER ATTALLA" },
            ].map((t) => (
              <div key={t.name} className="card-lift-dark" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "30px 30px" }}>
                <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 40, color: ACCENT, lineHeight: 0.4, display: "block" }}>&quot;</span>
                <p style={{ marginTop: 10, fontSize: 16.5, lineHeight: 1.5, fontWeight: 500, color: "#f0ece4" }}>{t.quote}</p>
                <p style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em" }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="photo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#0f0e0b" }}>
        <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
          <Image src="/dinner.jpg" alt="Founders dinner" fill style={{ objectFit: "cover" }} />
        </div>
        <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", background: "#1a1816" }}>
          <Image src="/mastermind.jpg" alt="Founders group" fill style={{ objectFit: "cover" }} />
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ background: "#fff", color: "#15130f", padding: "110px 28px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 44px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>Who it&apos;s for</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>The next circles are for founders who</h2>
            <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.55, color: "#6b665d" }}>Two levels: €5k–25k/month founders scaling to €1M/year, and €25k+/month founders scaling to multiple 7 figures a year.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {fitFor.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "#f6f5f2", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: "20px 24px" }}>
                <span style={{ flex: "0 0 auto", color: ACCENT, fontSize: 17, fontWeight: 800, lineHeight: 1.4 }}>✓</span>
                <span style={{ fontSize: 16, lineHeight: 1.45, color: "#15130f", fontWeight: 600 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 STEPS */}
      <section style={{ background: "#f6f5f2", color: "#15130f", padding: "110px 28px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 52px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>Simple by design</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>Join in three steps.</h2>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {steps.map((st) => (
              <div key={st.n} className="card-lift" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "34px 30px", textAlign: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: "50%", background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 19 }}>{st.n}</span>
                <h3 style={{ fontSize: 19, fontWeight: 800, marginTop: 18 }}>{st.title}</h3>
                <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.55, color: "#6b665d" }}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ background: "#fff", color: "#15130f", padding: "80px 20px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 44px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>About us</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>Your host</h2>
          </div>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32, alignItems: "center", background: "#f6f5f2", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: 32 }}>
            <div style={{ position: "relative", width: 200, height: 200, borderRadius: 14, overflow: "hidden", flex: "0 0 auto" }}>
              <Image src="/lennart.jpg" alt="Lennart van der Ziel" fill style={{ objectFit: "cover" }} />
            </div>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em" }}>Lennart van der Ziel</h3>
              <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, color: "#3f3b34" }}>Former founder & CEO who scaled his tech business to <strong style={{ fontWeight: 800, color: "#15130f" }}>€12M+</strong> in revenue with <strong style={{ fontWeight: 800, color: "#15130f" }}>30+ employees</strong>.</p>
              <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, color: "#3f3b34" }}>Now helps entrepreneurs supercharge their performance and business growth through high-performing founder groups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#f6f5f2", color: "#15130f", padding: "110px 28px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>Great question</span>
            <h2 style={{ fontSize: "clamp(30px,4.4vw,50px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: 8 }}>Frequently asked</h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "24px 4px", textAlign: "left", fontFamily: "var(--font-sans), sans-serif" }}>
                <span style={{ fontSize: 18, fontWeight: 600, color: "#15130f" }}>{faq.q}</span>
                <span style={{ flex: "0 0 auto", width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: ACCENT, fontWeight: 600 }}>{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ padding: "0 4px 26px", maxWidth: 680, fontSize: 16, lineHeight: 1.6, color: "#5f5a51" }}>{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" style={{ position: "relative", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/lennart.jpg" alt="Apply background" fill style={{ objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,7,0.9)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 620, margin: "0 auto", padding: "110px 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: ACCENT }}>Join the next Founder Circle</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4.4vw,46px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff" }}>Start with a two-minute application.</h2>
            <p style={{ marginTop: 16, fontSize: 16.5, lineHeight: 1.55, color: "#a59e93" }}>Applications are reviewed personally. If there&apos;s a strong mutual fit, we&apos;ll invite you to a short Founder Fit Conversation.</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.35)" }}>
            <div style={{ padding: "32px 32px 34px" }}>
              {applied ? (
                <div style={{ textAlign: "center", padding: "14px 4px" }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: "#15130f" }}>Application received.</p>
                  <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.55, color: "#6b665d" }}>We review every application personally. If there&apos;s a strong mutual fit, you&apos;ll hear from us about a short Founder Fit Conversation.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (name.trim() && email.trim()) setApplied(true); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input type="text" required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="input-premium" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: "#15130f", padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }} />
                  <input type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="input-premium" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: "#15130f", padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }} />
                  <input type="text" required placeholder="Business & monthly revenue" value={biz} onChange={(e) => setBiz(e.target.value)} className="input-premium" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: "#15130f", padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }} />
                  <button type="submit" className="btn-primary" style={{ marginTop: 4, background: ACCENT, color: "#fff", border: "none", padding: "18px 24px", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>Apply to join →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f0e0b", color: "#7d766c" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "30px 28px", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#9a9389", fontWeight: 600 }}>Shoulder to Shoulder · The Founder Circle Club</span>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="https://www.instagram.com/lennartvanderziel/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#9a9389", fontSize: 13 }}>Instagram</a>
            <a href="https://www.linkedin.com/in/lennartvanderziel/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#9a9389", fontSize: 13 }}>LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

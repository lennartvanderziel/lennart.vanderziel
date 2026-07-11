"use client";
import { useState } from "react";
import Image from "next/image";

const ACCENT = "#E8742B";
const INK = "#15130f";
const MUTED = "#6b665d";
const PANEL = "#f6f5f2";

const faqs = [
  { q: "What exactly is this?", a: "A private community and guidance system for committed founders — combining business strategy, personal leadership, and mind & body work, alongside a brotherhood of peers." },
  { q: "Who is it for?", a: "Founders running a real business who want to grow in every area, not only revenue — and who value depth and honesty over surface-level networking." },
  { q: "What makes it different from other founder groups?", a: "We work on the founder, not just the company. Strategy is rarely the bottleneck — leadership, energy and psychology are. We build all three together." },
  { q: "What is the time commitment?", a: "Designed around busy founders: focused sessions, small-team check-ins, and a few in-person gatherings a year. Intentional, never noise." },
  { q: "Is it only for male founders?", a: "The core brotherhood is built around male founders working in small teams. Reach out if you have questions about fit." },
  { q: "What happens after I join the waitlist?", a: "You will be among the first contacted when the next cohort opens, with a short personal conversation to make sure it is the right fit both ways." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <div style={{ background: "#ffffff", color: INK, minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,0.86)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: INK }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em" }}>Lennart van der Ziel</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <a href="#challenges" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 500 }}>The Problem</a>
              <a href="#system" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 500 }}>The System</a>
              <a href="#faq" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 500 }}>FAQ</a>
              <a href="/shoulder-to-shoulder" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 500 }}>Shoulder to Shoulder</a>
            </div>
            <a href="/platform" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>Log in</a>
            <a href="#waitlist" className="btn-primary" style={{ textDecoration: "none", color: "#fff", background: ACCENT, padding: "10px 18px", borderRadius: 100, fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap" }}>Join the waitlist</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        {/* Background photo */}
        <Image src="/lennart.jpg" alt="Lennart van der Ziel" fill className="ken-burns" style={{ objectFit: "cover", objectPosition: "center 15%" }} priority />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,6,0.25) 0%, rgba(10,8,6,0.1) 30%, rgba(10,8,6,0.6) 60%, rgba(10,8,6,0.92) 100%)" }} />

        {/* Content */}
        <div className="fade-up" style={{ position: "relative", maxWidth: 1180, margin: "0 auto", width: "100%", padding: "0 32px 80px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100, padding: "7px 16px", marginBottom: 28, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>Health Performance Coach · By invitation</span>
          </div>
          <h1 style={{ fontSize: "clamp(42px,7vw,90px)", fontWeight: 800, lineHeight: 0.97, letterSpacing: "-0.035em", color: "#fff", maxWidth: 820, marginBottom: 28 }}>
            The man behind<br />the highest-performing<br /><span style={{ color: ACCENT }}>founders.</span>
          </h1>
          <p style={{ maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.75)", marginBottom: 40, fontWeight: 500 }}>
            I help elite entrepreneurs optimize their mind, body and business — so they perform at the highest level without burning out.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="#waitlist" className="btn-primary" style={{ textDecoration: "none", color: "#fff", background: ACCENT, padding: "17px 34px", borderRadius: 100, fontSize: 15, fontWeight: 700 }}>Work with Lennart →</a>
            <a href="#system" className="btn-ghost" style={{ textDecoration: "none", color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 100, border: "1px solid transparent" }}>
              <span style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>↓</span>
              See the system
            </a>
          </div>

          {/* Credentials bar */}
          <div style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              { num: "€12M+", label: "Scaled as founder & CEO" },
              { num: "50,000+", label: "Products sold worldwide" },
              { num: "100+", label: "Founders guided since 2019" },
            ].map((s) => (
              <div key={s.num}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* PRESS / AUTHORITY */}
      <section style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", background: "#fff" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "center", gap: 36, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a39d92" }}>Ventures featured at</span>
          {["CES Las Vegas", "TechRadar", "The Telegraph", "Indiegogo", "Venture Café"].map((brand) => (
            <span key={brand} style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", color: "#8a847a" }}>{brand}</span>
          ))}
        </div>
      </section>

      {/* COMMUNITY PROOF */}
      <section className="section-pad" style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 32px 96px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
          <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: ACCENT }}>The room</span>
          <h2 style={{ fontSize: "clamp(28px,3.8vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", marginTop: 8, color: INK }}>Real founders. Real rooms.</h2>
          <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.55, color: MUTED }}>From masterminds to long dinners — a community built on eye contact and trust, not another group chat.</p>
        </div>
        <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {[
            { src: "/mastermind.jpg", caption: "Founders Mastermind · Bali" },
            { src: "/founders.jpg", caption: "The Founders · Bali" },
          ].map((img) => (
            <figure key={img.src} className="photo-zoom" style={{ margin: 0, position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "4/3", background: "#e7e3db" }}>
              <Image src={img.src} alt={img.caption} fill style={{ objectFit: "cover", objectPosition: "center 35%" }} />
              <figcaption style={{ position: "absolute", left: 16, bottom: 14, color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CHALLENGES */}
      <section id="challenges" style={{ background: PANEL, borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "90px 32px", display: "flex", gap: 72, flexWrap: "wrap" }}>
          <div className="flex-wrap-col" style={{ flex: "1 1 380px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>Sounds familiar?</span>
            <h2 style={{ fontSize: "clamp(30px,4.2vw,50px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.02em", marginTop: 12, color: INK }}>Being a high-level founder comes with unique challenges.</h2>
            <a href="#waitlist" className="btn-primary" style={{ display: "inline-flex", marginTop: 34, textDecoration: "none", color: "#fff", background: ACCENT, padding: "15px 30px", borderRadius: 100, fontSize: 14.5, fontWeight: 600 }}>Join the waitlist →</a>
          </div>
          <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column" }}>
            {[
              { n: "01", text: <><strong style={{ fontWeight: 700 }}>You run a serious business</strong> and want peers at or above your level — not another beginner room.</> },
              { n: "02", text: <><strong style={{ fontWeight: 700 }}>Most communities don't match</strong> your ambition, pace or standards. You've outgrown them.</> },
              { n: "03", text: <><strong style={{ fontWeight: 700 }}>It's lonely at the top.</strong> Few people truly understand the weight you carry every day.</> },
              { n: "04", text: <><strong style={{ fontWeight: 700 }}>Your time is limited.</strong> Connections should be curated and intentional — never random.</> },
            ].map((item, i) => (
              <div key={item.n} style={{ display: "flex", gap: 18, padding: "24px 0", borderTop: "1px solid rgba(0,0,0,0.1)", ...(i === 3 ? { borderBottom: "1px solid rgba(0,0,0,0.1)" } : {}) }}>
                <span style={{ flex: "0 0 auto", width: 26, height: 26, borderRadius: "50%", background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, marginTop: 2 }}>{item.n}</span>
                <p style={{ fontSize: 16.5, lineHeight: 1.5, color: "#3f3b34" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET LENNART */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px" }}>
        <div className="flex-wrap-col" style={{ display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 8, overflow: "hidden", background: "#e7e3db" }}>
              <Image src="/lennart.jpg" alt="Lennart van der Ziel" fill style={{ objectFit: "cover", objectPosition: "center 18%" }} />
            </div>
          </div>
          <div style={{ flex: "1 1 440px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: ACCENT }}>Meet your guide</span>
            <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", marginTop: 10, color: INK }}>Lennart van der Ziel</h2>
            <p style={{ marginTop: 22, maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "#5f5a51" }}>As co-founder & CEO of <strong style={{ color: INK }}>Travis the Translator</strong>, I took a hardware startup from idea to 50,000+ devices sold in its first year — featured at CES, covered by TechRadar and The Telegraph. I also co-founded <strong style={{ color: INK }}>Venture Café Rotterdam</strong>, one of the largest founder communities in the Netherlands.</p>
            <p style={{ marginTop: 16, maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "#5f5a51" }}>Then the success bill arrived: a long, painful burnout. That crash became my life's work — I rebuilt myself through health, psychology and structure, and since 2019 I've guided 100+ founders to perform at the highest level <em>without paying the price I paid</em>.</p>
            <p style={{ marginTop: 16, maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "#5f5a51" }}>The strategy is rarely the bottleneck. The founder is. My work closes that gap.</p>
            <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 30, height: 1, background: "rgba(0,0,0,0.25)" }} />
              <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 22, color: INK }}>Lennart van der Ziel</span>
            </div>
          </div>
        </div>
      </section>

      {/* THE SYSTEM */}
      <section id="system" style={{ background: PANEL, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 56px" }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>The system rests on three</span>
            <h2 style={{ fontSize: "clamp(34px,5vw,60px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.025em", marginTop: 14, color: INK }}>Business. Mind. Body.</h2>
            <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, color: MUTED }}>You can't scale a company further than you've scaled yourself. We build all three at once — so growth compounds instead of breaking you.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 24 }}>
            {[
              { n: "01", title: "Strategy & Growth", body: "Sharper positioning, clearer decisions and an operating rhythm that turns effort into compounding results — not just a busier calendar." },
              { n: "02", title: "Mind & Psychology", body: "A psychology built for performance and peace. Optimise your mental capacity and lead yourself first — so success and happiness stop competing." },
              { n: "03", title: "Body & Energy", body: "Train the physical capacity to carry the weight of your ambition. Energy, resilience and a body that keeps pace with the business you're building." },
            ].map((card) => (
              <div key={card.n} className="card-lift" style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: "40px 34px", background: "#fff" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 10, background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`, color: ACCENT, fontWeight: 800, fontSize: 18 }}>{card.n}</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginTop: 22, letterSpacing: "-0.01em", color: INK }}>{card.title}</h3>
                <p style={{ marginTop: 12, fontSize: 15.5, lineHeight: 1.58, color: MUTED }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section style={{ background: INK }}>
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "104px 32px", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(28px,3.8vw,44px)", fontWeight: 600, lineHeight: 1.22, letterSpacing: "-0.02em", color: "#f6f3ec" }}>
            Most founders scale their company faster than they scale themselves. The result is a bigger business carried by a <span style={{ color: ACCENT }}>smaller man.</span> My work is to close that gap.
          </p>
          <div style={{ marginTop: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <span style={{ width: 26, height: 1, background: "rgba(255,255,255,0.32)" }} />
            <span style={{ fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#cfc8bd" }}>Lennart van der Ziel</span>
            <span style={{ width: 26, height: 1, background: "rgba(255,255,255,0.32)" }} />
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 56px" }}>
          <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>What you get</span>
          <h2 style={{ fontSize: "clamp(32px,4.6vw,54px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: 10, color: INK }}>Inside the brotherhood</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 1, background: "rgba(0,0,0,0.09)", border: "1px solid rgba(0,0,0,0.09)", borderRadius: 8, overflow: "hidden" }}>
          {[
            { title: "Strategy Intensives", body: "Work directly on your biggest growth lever with structured sessions that turn into decisions, not just discussion." },
            { title: "Founder Teams", body: "Small accountability pods that meet regularly to clear each other's bottlenecks and hold the standard." },
            { title: "Mind & Performance", body: "Tools and coaching for the psychology of leadership — focus, resilience and a calm that scales with pressure." },
            { title: "Body & Energy Protocols", body: "Practical training, recovery and nutrition frameworks so your physical capacity matches your ambition." },
            { title: "A Curated Network", body: "Vetted founders, trusted operators and the people you actually want in the room when it matters." },
            { title: "Live Gatherings", body: "In-person days and dinners built for real connection — the momentum you can't fake online." },
          ].map((perk) => (
            <div key={perk.title} style={{ background: "#fff", padding: "38px 32px" }}>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: INK }}>{perk.title}</h3>
              <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.58, color: MUTED }}>{perk.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE PATH — client journey */}
      <section id="path" style={{ background: INK }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "100px 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 60px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>Your journey</span>
            <h2 style={{ fontSize: "clamp(32px,4.6vw,54px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: 10, color: "#f6f3ec" }}>Three levels. One standard.</h2>
            <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.55, color: "#a59e93" }}>Every founder enters where it fits. Most stay for years — because the work compounds.</p>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22 }}>
            {[
              { step: "Level 1", title: "Shoulder to Shoulder", desc: "The Founder Circle. Weekly peer sessions, the Global STS Summit, and a brotherhood that holds your standard.", cta: "Apply to join →", href: "/shoulder-to-shoulder", featured: false },
              { step: "Level 2", title: "1-on-1 Coaching", desc: "Private, high-touch coaching on your health, psychology and business — full access to Lennart, built entirely around you.", cta: "Request a conversation →", href: "#waitlist", featured: true },
              { step: "Level 3", title: "Elite Mastermind", desc: "An invitation-only room for founders past 7 figures. Deep strategy, longevity protocols and life design at the highest level.", cta: "By invitation only", href: "#waitlist", featured: false },
            ].map((tier) => (
              <div key={tier.title} className="card-lift-dark" style={{ background: tier.featured ? "rgba(232,116,43,0.09)" : "rgba(255,255,255,0.04)", border: tier.featured ? "1px solid rgba(232,116,43,0.55)" : "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "38px 32px", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>{tier.step}</span>
                <h3 style={{ fontSize: 25, fontWeight: 800, marginTop: 14, letterSpacing: "-0.01em", color: "#f6f3ec" }}>{tier.title}</h3>
                <p style={{ marginTop: 12, fontSize: 15.5, lineHeight: 1.6, color: "#a59e93", flex: 1 }}>{tier.desc}</p>
                <a href={tier.href} style={{ marginTop: 26, textDecoration: "none", color: tier.featured ? "#fff" : ACCENT, background: tier.featured ? ACCENT : "transparent", border: tier.featured ? "none" : "1px solid rgba(232,116,43,0.4)", padding: "13px 24px", borderRadius: 100, fontSize: 14, fontWeight: 700, textAlign: "center" }} className={tier.featured ? "btn-primary" : "btn-ghost"}>{tier.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section style={{ background: PANEL, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "90px 32px", textAlign: "center" }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>By invitation only</span>
          <h2 style={{ fontSize: "clamp(32px,4.6vw,54px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: 14, color: INK }}>This isn't for everyone.</h2>
          <p style={{ margin: "18px auto 0", maxWidth: 540, fontSize: 17, lineHeight: 1.55, color: MUTED }}>Every member is personally reviewed. It's how we protect the quality, trust and integrity of the room.</p>
          <div style={{ marginTop: 38, textAlign: "left", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: "10px 34px" }}>
            {[
              "You're running a real business with real momentum — not just an idea.",
              "You're committed to growth in every area — not only revenue.",
              "You'd rather be sharpened by peers than flattered by an audience.",
              "You value depth, honesty and brotherhood over networking.",
            ].map((req, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 0", ...(i < 3 ? { borderBottom: "1px solid rgba(0,0,0,0.08)" } : {}) }}>
                <span style={{ color: ACCENT, fontSize: 18, fontWeight: 800, lineHeight: 1.4 }}>✓</span>
                <span style={{ fontSize: 16.5, lineHeight: 1.5, color: "#3f3b34" }}>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ maxWidth: 840, margin: "0 auto", padding: "96px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>Great question</span>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,50px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: 8, color: INK }}>Frequently asked</h2>
        </div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "24px 4px", textAlign: "left", fontFamily: "var(--font-sans), sans-serif" }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: INK }}>{faq.q}</span>
              <span style={{ flex: "0 0 auto", width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: ACCENT, fontWeight: 600 }}>{openFaq === i ? "–" : "+"}</span>
            </button>
            {openFaq === i && <p style={{ padding: "0 4px 26px", maxWidth: 680, fontSize: 16, lineHeight: 1.6, color: "#5f5a51" }}>{faq.a}</p>}
          </div>
        ))}
      </section>

      {/* WAITLIST */}
      <section id="waitlist" style={{ background: PANEL, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "96px 32px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(36px,5.4vw,64px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em", color: INK }}>Join the waitlist.</h2>
          <p style={{ margin: "20px auto 0", maxWidth: 480, fontSize: 17, lineHeight: 1.55, color: MUTED }}>The first cohort is small and selective. Add your name and you'll be among the first invited when doors open.</p>
          {joined ? (
            <div style={{ margin: "38px auto 0", maxWidth: 520, border: `1px solid ${ACCENT}`, background: `color-mix(in srgb, ${ACCENT} 8%, transparent)`, padding: 28, borderRadius: 12 }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: INK }}>You're on the list.</p>
              <p style={{ marginTop: 8, fontSize: 15, color: MUTED }}>Watch your inbox — an invitation is coming.</p>
            </div>
          ) : (
            <>
              <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setJoined(true); }} style={{ margin: "38px auto 0", maxWidth: 520, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-premium" style={{ flex: "1 1 260px", background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: INK, padding: "16px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, outline: "none" }} />
                <button type="submit" className="btn-primary" style={{ background: ACCENT, color: "#fff", border: "none", padding: "16px 30px", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>Request an invitation</button>
              </form>
              <p style={{ marginTop: 14, fontSize: 12.5, color: "#8a847a" }}>No spam. One message when the cohort opens.</p>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: INK, color: "#cfc8bd", overflow: "hidden" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 32px 0", display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 280px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />
              <span style={{ fontSize: 18, fontWeight: 800, color: "#f6f3ec" }}>Lennart van der Ziel</span>
            </div>
            <p style={{ marginTop: 14, maxWidth: 320, fontSize: 14.5, lineHeight: 1.55, color: "#9a9389" }}>Business · Mind · Body. A private brotherhood for committed founders.</p>
          </div>
          <div>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#7d766c" }}>Follow</span>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Instagram", "LinkedIn", "YouTube"].map((s) => (
                <a key={s} href="#" style={{ textDecoration: "none", color: "#cfc8bd", fontSize: 15 }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: "48px 0 0", lineHeight: 0.8, textAlign: "center", userSelect: "none" }}>
          <span style={{ display: "inline-block", fontSize: "clamp(60px,17vw,230px)", fontWeight: 900, letterSpacing: "-0.04em", color: "rgba(246,243,236,0.07)", whiteSpace: "nowrap" }}>VAN DER ZIEL</span>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 32px", display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12.5, color: "#7d766c" }}>© 2026 Lennart van der Ziel. All rights reserved.</span>
            <span style={{ fontSize: 12.5, color: "#7d766c" }}>Terms · Privacy</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

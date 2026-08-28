"use client";
import { useState } from "react";
import Image from "next/image";
import { submitToInbox } from "@/lib/submit";

const ACCENT = "#E8742B";
const INK = "#15130f";
const INK_MUT = "#5f5a51";
const MUT = "#c2bbae";
const MUT_SOFT = "#d8d2c7";

const system = [
  { n: "1", title: "Assess", desc: "A full intake into your lifestyle and health, with multiple real tests. No guessing where you stand.", img: "/hpm-assess.jpg", alt: "Real health data being collected" },
  { n: "2", title: "Plan", desc: "A specific plan for your body and mind, built around your business.", img: "/hpm-assess-2.jpg", alt: "Lennart reviewing the data" },
  { n: "3", title: "Coach", desc: "Ongoing 1-on-1 coaching. We measure, adjust, and keep raising the bar.", img: "/hpm-coach.jpg", alt: "Lennart speaking on stage" },
];

const fitItems = [
  "You know you're the biggest lever in your business.",
  "You want to operate at your A-game, body and mind.",
  "You want decisions based on data, not guesswork.",
  "You want a mentor who's carried the founder weight himself.",
];

export default function HighPerformanceMentoring() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [applied, setApplied] = useState(false);

  const eyebrow: React.CSSProperties = { fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT };
  const h2 = (dark: boolean): React.CSSProperties => ({ marginTop: 14, fontSize: "clamp(29px,3.7vw,40px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.022em", color: dark ? "#fff" : INK });
  const SEC = "88px 24px";

  return (
    <div style={{ background: "#fbf9f5", color: INK, minHeight: "100vh", overflowX: "hidden", fontFamily: "var(--font-sans), ui-sans-serif, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(251,249,245,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: INK }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em" }}>Lennart van der Ziel</span>
          </a>
          <a href="#apply" className="btn-primary" style={{ textDecoration: "none", color: "#fff", background: ACCENT, padding: "10px 20px", borderRadius: 100, fontSize: 13.5, fontWeight: 700, whiteSpace: "nowrap" }}>Apply</a>
        </div>
      </nav>

      {/* HERO */}
      <header style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 32px 70px" }}>
        <div className="flex-wrap-col" style={{ display: "flex", gap: 56, alignItems: "center", flexWrap: "wrap" }}>
          <div className="fade-up" style={{ flex: "1 1 480px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 100, padding: "7px 16px", marginBottom: 24 }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: INK_MUT }}>1-on-1 · By application</span>
            </div>
            <h1 style={{ fontSize: "clamp(38px,6vw,68px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", color: INK }}>
              Operate like the founder<br />your business <span style={{ color: ACCENT }}>needs.</span>
            </h1>
            <p style={{ marginTop: 20, maxWidth: 480, fontSize: 18, lineHeight: 1.5, color: INK_MUT }}>
              Private mentoring for founders, mind and body, built on real data, not guesswork.
            </p>
            <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <a href="#apply" className="btn-primary" style={{ textDecoration: "none", color: "#fff", background: ACCENT, padding: "17px 34px", borderRadius: 100, fontSize: 15.5, fontWeight: 700 }}>Apply for a conversation →</a>
            </div>
          </div>
          <div className="fade-up-1" style={{ flex: "1 1 380px", minWidth: 280 }}>
            <div className="photo-zoom" style={{ position: "relative", aspectRatio: "4/5", borderRadius: 14, overflow: "hidden" }}>
              <Image src="/coaching-portrait.jpg" alt="Lennart van der Ziel" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 20%" }} priority />
            </div>
          </div>
        </div>
      </header>

      {/* WHY */}
      <section style={{ background: INK, padding: SEC }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <span style={eyebrow}>Why</span>
          <h2 style={h2(true)}>To take your business to the next level, you have to reach your own highest level first.</h2>
          <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.6, color: MUT_SOFT }}>
            I help you turn your health and mindset into your competitive advantage. Call it <span style={{ color: ACCENT, fontWeight: 700 }}>Million Dollar Performance</span>: getting your mindset and physical health into the best state possible, backed by real medical testing.
          </p>
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ background: "#fbf9f5", padding: SEC }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 40px" }}>
            <span style={eyebrow}>What to expect</span>
            <h2 style={h2(false)}>The results.</h2>
          </div>
          <div className="grid-auto-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {["Double your energy and focus", "Boost hormones and longevity", "A mind that matches your ambition", "Explosive growth in business and life"].map((r) => (
              <div key={r} style={{ display: "flex", gap: 13, alignItems: "center", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "18px 20px" }}>
                <span style={{ flex: "0 0 auto", color: ACCENT, fontSize: 17, fontWeight: 800 }}>+</span>
                <span style={{ fontSize: 15.5, fontWeight: 600, color: INK }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section style={{ background: "#fbf9f5", padding: SEC }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 44px" }}>
            <span style={eyebrow}>How it works</span>
            <h2 style={h2(false)}>Assess. Plan. Coach.</h2>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
            {system.map((s) => (
              <div key={s.n} className="card-lift" style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
                {s.img2 ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(0,0,0,0.08)" }}>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "3/4" }}>
                      <Image src={s.img} alt={s.alt} fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
                    </div>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "3/4" }}>
                      <Image src={s.img2} alt="Reviewing the data" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 25%" }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
                    <Image src={s.img} alt={s.alt} fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
                  </div>
                )}
                <div style={{ padding: "30px 28px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 16 }}>{s.n}</span>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginTop: 18, letterSpacing: "-0.01em", color: INK }}>{s.title}</h3>
                  <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.55, color: INK_MUT }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WITH CLIENTS */}
      <section style={{ background: INK, padding: SEC }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
            <span style={eyebrow}>In the room</span>
            <h2 style={h2(true)}>Working with founders.</h2>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.5, color: MUT }}>Real sessions, real founders.</p>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
            {["/hpm-client-1.jpg", "/hpm-client-2.jpg", "/hpm-client-3.jpg"].map((src) => (
              <div key={src} className="photo-zoom" style={{ position: "relative", aspectRatio: "4/5", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
                <Image src={src} alt="Lennart with a client" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ background: "#fbf9f5", padding: SEC }}>
        <div className="flex-wrap-col" style={{ maxWidth: 980, margin: "0 auto", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 260px", minWidth: 230 }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
              <Image src="/lennart.jpg" alt="Lennart van der Ziel" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
          </div>
          <div style={{ flex: "1 1 420px" }}>
            <span style={eyebrow}>Your mentor</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(26px,3.4vw,36px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: INK }}>Lennart van der Ziel</h2>
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Former tech CEO", "200k+ products sold", "100+ founders guided"].map((c) => (
                <span key={c} style={{ fontSize: 12.5, fontWeight: 700, color: INK, background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 100, padding: "6px 13px" }}>{c}</span>
              ))}
            </div>
            <p style={{ marginTop: 18, fontSize: 16.5, lineHeight: 1.6, color: INK_MUT }}>
              As founder & CEO I built Travis the Translator, named Dutch Startup of the Year, with 200,000+ devices sold worldwide. I carried the weight myself: the stress, the bad sleep, the decisions made on empty. I learned it the hard way, so my clients don&apos;t have to.
            </p>
            <p style={{ marginTop: 12, fontSize: 16.5, lineHeight: 1.6, color: INK_MUT }}>
              Today I mentor founders on performance, body and mind, using real data, not motivational talk.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ background: INK, padding: SEC }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <span style={eyebrow}>Proof</span>
          <h2 style={h2(true)}>What it does for them.</h2>
          <div className="flex-wrap-col" style={{ marginTop: 36, display: "flex", gap: 22, alignItems: "stretch", flexWrap: "wrap", textAlign: "left" }}>
            <div style={{ flex: "1 1 260px", minWidth: 240, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ position: "relative", flex: 1, aspectRatio: "9/16", borderRadius: 16, overflow: "hidden", border: `1px solid ${ACCENT}` }}>
                <video src="/hpm-testimonial-matej.mp4" controls playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#000" }} />
              </div>
              <p style={{ fontSize: 12.5, fontWeight: 700, color: MUT, letterSpacing: "0.04em" }}>MATEJ · ECOMMERCE FOUNDER</p>
            </div>
            <div style={{ flex: "1 1 380px", minWidth: 260, background: "rgba(232,116,43,0.07)", border: `1px solid ${ACCENT}`, borderRadius: 16, padding: "30px 30px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ fontSize: 16, lineHeight: 1.62, fontWeight: 500, color: "#f0ece4", fontStyle: "italic" }}>
                &ldquo;As a personal trainer, I&apos;ve looked after my health for 15 years, but only in the last two did I go deeper into optimisation. The data and protocols from Lennart helped me understand the pieces I was missing. I&apos;m following my personalised supplement protocol, and it&apos;s already improving my sleep and giving me more energy. I thought I needed more discipline and to be stricter with myself. In reality, I needed more recovery and to be kinder to my body, and that pivot is making a huge difference to my health, long term.&rdquo;
              </p>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative", width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto", border: `1px solid ${ACCENT}` }}>
                  <Image src="/hpm-teodora.jpg" alt="Teodora Sklayne" fill style={{ objectFit: "cover", objectPosition: "center 15%" }} />
                </div>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em" }}>TEODORA SKLAYNE · OWNER, ATTIKA FITNESS BARCELONA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ background: "#fbf9f5", padding: SEC }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 36px" }}>
            <span style={eyebrow}>Is this you?</span>
            <h2 style={h2(false)}>This is for founders who</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {fitItems.map((f) => (
              <div key={f} style={{ display: "flex", gap: 13, alignItems: "center", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "16px 22px" }}>
                <span style={{ flex: "0 0 auto", color: ACCENT, fontSize: 16, fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: INK }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" style={{ position: "relative", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/coaching.jpg" alt="" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,7,0.92)" }} />
        <div style={{ position: "relative", maxWidth: 560, margin: "0 auto", padding: "96px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px,4.2vw,46px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", color: "#fff" }}>Request a conversation.</h2>
          <p style={{ margin: "14px auto 0", maxWidth: 420, fontSize: 16, lineHeight: 1.5, color: MUT }}>A short, personal call to see if this is the right fit. No pitch, no pressure.</p>
          {applied ? (
            <div style={{ margin: "30px auto 0", maxWidth: 440, border: `1px solid ${ACCENT}`, background: "rgba(232,116,43,0.1)", padding: 26, borderRadius: 14 }}>
              <p style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Received.</p>
              <p style={{ marginTop: 8, fontSize: 14.5, color: MUT }}>I&apos;ll personally reach out to schedule the conversation.</p>
            </div>
          ) : (
            <form onSubmit={async (e) => { e.preventDefault(); if (name.trim() && email.trim()) { await submitToInbox(`High Performance Mentoring request - ${name}`, { Name: name, Email: email, Source: "High Performance Mentoring page" }); setApplied(true); } }} style={{ margin: "28px auto 0", maxWidth: 440, display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="input-premium" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: INK, padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }} />
              <input type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="input-premium" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: INK, padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }} />
              <button type="submit" className="btn-primary" style={{ marginTop: 4, background: ACCENT, color: "#fff", border: "none", padding: "16px 24px", fontSize: 15.5, fontWeight: 700, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>Apply for a conversation →</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: INK, color: "#7d766c" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 28px", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#9a9389", fontWeight: 600 }}>High Performance Mentoring · Lennart van der Ziel</span>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="https://www.instagram.com/lennartvanderziel/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#9a9389", fontSize: 13 }}>Instagram</a>
            <a href="https://www.linkedin.com/in/lennartvanderziel/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#9a9389", fontSize: 13 }}>LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

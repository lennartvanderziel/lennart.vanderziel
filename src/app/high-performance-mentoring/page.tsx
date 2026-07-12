"use client";
import { useState } from "react";
import Image from "next/image";
import { submitToInbox } from "@/lib/submit";

const ACCENT = "#E8742B";
const INK = "#15130f";
const MUTED = "#6b665d";
const PANEL = "#f6f5f2";

const pillars = [
  {
    n: "01",
    title: "Assess",
    desc: "We start with a full physical and mental assessment — including health tests like blood work — so we know exactly where you stand. No guessing.",
  },
  {
    n: "02",
    title: "Plan",
    desc: "A specific plan for your physical health, and a plan for mental & emotional peak performance. Built around your life and your business — not a generic template.",
  },
  {
    n: "03",
    title: "Coach",
    desc: "Ongoing 1-on-1 coaching to make sure it keeps getting better. We measure, adjust and raise the bar as you do.",
  },
];

const forWho = [
  "You run a serious business and know you are its biggest lever.",
  "You want to operate at your A-game — mentally, physically and emotionally.",
  "You want decisions based on data: assessments and health tests, not guesswork.",
  "You want a mentor who has carried the founder weight himself.",
];

export default function HighPerformanceMentoring() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [applied, setApplied] = useState(false);

  return (
    <div style={{ background: "#ffffff", color: INK, minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,0.86)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: INK }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em" }}>Lennart van der Ziel</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <a href="/#story" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 500 }}>My story</a>
              <a href="/shoulder-to-shoulder" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 500 }}>Shoulder to Shoulder</a>
            </div>
            <a href="#apply" className="btn-primary" style={{ textDecoration: "none", color: "#fff", background: ACCENT, padding: "10px 18px", borderRadius: 100, fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap" }}>Request a conversation</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header style={{ maxWidth: 1180, margin: "0 auto", padding: "100px 32px 80px" }}>
        <div className="flex-wrap-col" style={{ display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap" }}>
          <div className="fade-up" style={{ flex: "1 1 480px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 100, padding: "7px 16px", marginBottom: 28 }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED }}>1-on-1 · Limited spots</span>
            </div>
            <h1 style={{ fontSize: "clamp(38px,5.5vw,68px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", color: INK }}>
              High Performance<br /><span style={{ color: ACCENT }}>Mentoring.</span>
            </h1>
            <p style={{ marginTop: 24, maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: MUTED }}>
              Private mentoring for founders who want to operate at their A-game — mentally, physically and emotionally. Based on real assessments, real data and a plan that keeps getting better.
            </p>
            <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <a href="#apply" className="btn-primary" style={{ textDecoration: "none", color: "#fff", background: ACCENT, padding: "17px 34px", borderRadius: 100, fontSize: 15, fontWeight: 700 }}>Request a conversation →</a>
              <a href="#how" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 600 }}>How it works ↓</a>
            </div>
          </div>
          <div className="fade-up-1" style={{ flex: "1 1 380px", minWidth: 300 }}>
            <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 12, overflow: "hidden", background: "linear-gradient(135deg, #1c1915, #2e2820)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center", padding: 24 }}>
                <span style={{ display: "inline-flex", width: 60, height: 60, borderRadius: "50%", background: "rgba(232,116,43,0.16)", border: "1px solid rgba(232,116,43,0.4)", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📷</span>
                <p style={{ marginTop: 14, fontSize: 13.5, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Lennart with a 1-on-1 client<br />— photo coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section id="how" style={{ background: PANEL, borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "100px 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>How it works</span>
            <h2 style={{ fontSize: "clamp(30px,4.4vw,50px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: 10, color: INK }}>Assess. Plan. Coach.</h2>
            <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.55, color: MUTED }}>Peak performance isn&apos;t a feeling — it&apos;s measurable. That&apos;s where we start.</p>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 24 }}>
            {pillars.map((card) => (
              <div key={card.n} className="card-lift" style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: "40px 34px", background: "#fff" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 10, background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`, color: ACCENT, fontWeight: 800, fontSize: 18 }}>{card.n}</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginTop: 22, letterSpacing: "-0.01em", color: INK }}>{card.title}</h3>
                <p style={{ marginTop: 12, fontSize: 15.5, lineHeight: 1.58, color: MUTED }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 32px" }}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 48px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>What&apos;s included</span>
          <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: INK }}>Everything measured. Everything personal.</h2>
        </div>
        <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
          {[
            "Full physical & mental intake assessment",
            "Health testing — blood work and other diagnostics",
            "A specific plan for your physical health",
            "A plan for mental & emotional peak performance",
            "Regular 1-on-1 coaching sessions with Lennart",
            "Continuous measurement — so it keeps getting better",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 13, background: PANEL, border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: "20px 22px" }}>
              <span style={{ flex: "0 0 auto", color: ACCENT, fontSize: 17, fontWeight: 800, lineHeight: 1.4 }}>✓</span>
              <span style={{ fontSize: 15.5, lineHeight: 1.45, color: INK, fontWeight: 600 }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOR WHO */}
      <section style={{ background: INK }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "100px 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 44px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>Is this you?</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#f6f3ec" }}>This is for founders who</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {forWho.map((f) => (
              <div key={f} className="card-lift-dark" style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "20px 24px" }}>
                <span style={{ flex: "0 0 auto", color: ACCENT, fontSize: 17, fontWeight: 800, lineHeight: 1.4 }}>✓</span>
                <span style={{ fontSize: 16, lineHeight: 1.45, color: "#f0ece4", fontWeight: 600 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" style={{ background: PANEL, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "100px 32px", textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: ACCENT }}>Limited spots per quarter</span>
          <h2 style={{ marginTop: 8, fontSize: "clamp(30px,4.6vw,50px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.025em", color: INK }}>Request a conversation.</h2>
          <p style={{ margin: "18px auto 0", maxWidth: 460, fontSize: 16.5, lineHeight: 1.55, color: MUTED }}>A short, personal call to see if this is the right fit — both ways. No pitch, no pressure.</p>
          {applied ? (
            <div style={{ margin: "36px auto 0", maxWidth: 480, border: `1px solid ${ACCENT}`, background: `color-mix(in srgb, ${ACCENT} 8%, transparent)`, padding: 28, borderRadius: 12 }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: INK }}>Received.</p>
              <p style={{ marginTop: 8, fontSize: 15, color: MUTED }}>I&apos;ll personally reach out to schedule the conversation.</p>
            </div>
          ) : (
            <form onSubmit={async (e) => { e.preventDefault(); if (name.trim() && email.trim()) { await submitToInbox(`High Performance Mentoring request — ${name}`, { Name: name, Email: email, Source: "High Performance Mentoring page" }); setApplied(true); } }} style={{ margin: "36px auto 0", maxWidth: 480, display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="text" required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="input-premium" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: INK, padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }} />
              <input type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="input-premium" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: INK, padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }} />
              <button type="submit" className="btn-primary" style={{ marginTop: 4, background: ACCENT, color: "#fff", border: "none", padding: "17px 24px", fontSize: 15.5, fontWeight: 700, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>Request a conversation →</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: INK, color: "#7d766c" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "30px 28px", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
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

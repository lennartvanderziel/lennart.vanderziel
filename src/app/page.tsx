"use client";
import { useState } from "react";
import Image from "next/image";

const ACCENT = "#E8742B";
const INK = "#15130f";
const MUTED = "#6b665d";
const PANEL = "#f6f5f2";

export default function Home() {
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
              <a href="#story" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 500 }}>My story</a>
              <a href="#programs" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 500 }}>Programs</a>
              <a href="/shoulder-to-shoulder" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 500 }}>Shoulder to Shoulder</a>
              <a href="/high-performance-mentoring" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 500 }}>High Performance</a>
            </div>
            <a href="/platform" className="nav-link" style={{ textDecoration: "none", color: MUTED, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>Log in</a>
            <a href="#contact" className="btn-primary" style={{ textDecoration: "none", color: "#fff", background: ACCENT, padding: "10px 18px", borderRadius: 100, fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap" }}>Work with me</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <Image src="/lennart.jpg" alt="Lennart van der Ziel" fill className="ken-burns" style={{ objectFit: "cover", objectPosition: "center 15%" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,6,0.25) 0%, rgba(10,8,6,0.1) 30%, rgba(10,8,6,0.6) 60%, rgba(10,8,6,0.92) 100%)" }} />

        <div className="fade-up" style={{ position: "relative", maxWidth: 1180, margin: "0 auto", width: "100%", padding: "0 32px 80px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100, padding: "7px 16px", marginBottom: 28, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>Developing founders, not technology</span>
          </div>
          <h1 style={{ fontSize: "clamp(42px,7vw,90px)", fontWeight: 800, lineHeight: 0.97, letterSpacing: "-0.035em", color: "#fff", maxWidth: 820, marginBottom: 28 }}>
            The man behind<br />the highest-performing<br /><span style={{ color: ACCENT }}>founders.</span>
          </h1>
          <p style={{ maxWidth: 540, fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.75)", marginBottom: 40, fontWeight: 500 }}>
            I spent a decade building technology. Now I develop people — the founders behind growing businesses.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="#programs" className="btn-primary" style={{ textDecoration: "none", color: "#fff", background: ACCENT, padding: "17px 34px", borderRadius: 100, fontSize: 15, fontWeight: 700 }}>Explore the programs →</a>
            <a href="#story" className="btn-ghost" style={{ textDecoration: "none", color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 100, border: "1px solid transparent" }}>
              <span style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>↓</span>
              Read my story
            </a>
          </div>

          <div style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              { num: "€12M+", label: "Scaled as founder & CEO" },
              { num: "50,000+", label: "Products sold worldwide" },
              { num: "100+", label: "Founders developed since 2020" },
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

      {/* STORY */}
      <section id="story" style={{ maxWidth: 1180, margin: "0 auto", padding: "110px 32px" }}>
        <div className="flex-wrap-col" style={{ display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <div className="photo-zoom" style={{ position: "relative", aspectRatio: "4/5", borderRadius: 8, overflow: "hidden", background: "#e7e3db" }}>
              <Image src="/lennart.jpg" alt="Lennart van der Ziel" fill style={{ objectFit: "cover", objectPosition: "center 18%" }} />
            </div>
          </div>
          <div style={{ flex: "1 1 440px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: ACCENT }}>My story</span>
            <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", marginTop: 10, color: INK }}>From building products to building people.</h2>
            <p style={{ marginTop: 22, maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "#5f5a51" }}>Ten years ago I co-founded <strong style={{ color: INK }}>Travis the Translator</strong> — an award-winning tech startup that sold 50,000+ devices in its first year, was featured at CES and covered by TechRadar and The Telegraph. I also co-founded <strong style={{ color: INK }}>Venture Café Rotterdam</strong>, one of the largest founder communities in the Netherlands.</p>
            <p style={{ marginTop: 16, maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "#5f5a51" }}>In 2020 I made a decision: I&apos;d rather develop <strong style={{ color: INK }}>founders</strong> than technology. Developing people is simply more meaningful work.</p>
            <p style={{ marginTop: 16, maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "#5f5a51" }}>Since then I&apos;ve worked with 100+ business owners on their strategy and their mental and physical well-being — and just as importantly, on who&apos;s around them. The right room and the right condition change everything.</p>
            <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 30, height: 1, background: "rgba(0,0,0,0.25)" }} />
              <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 22, color: INK }}>Lennart van der Ziel</span>
            </div>
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

      {/* PROGRAMS — the two initiatives */}
      <section id="programs" style={{ background: PANEL, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "110px 32px" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>My two initiatives</span>
            <h2 style={{ fontSize: "clamp(32px,4.6vw,54px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.025em", marginTop: 10, color: INK }}>I&apos;m the guy behind these two.</h2>
          </div>

          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

            {/* Shoulder to Shoulder */}
            <a href="/shoulder-to-shoulder" className="card-lift" style={{ textDecoration: "none", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div className="photo-zoom" style={{ position: "relative", aspectRatio: "16/10" }}>
                <Image src="/founders.jpg" alt="Shoulder to Shoulder — the founder group" fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "34px 32px 38px" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>The Club</span>
                <h3 style={{ fontSize: 26, fontWeight: 800, marginTop: 10, letterSpacing: "-0.02em", color: INK }}>Shoulder to Shoulder</h3>
                <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, color: "#5f5a51" }}>Founder Circles that meet in regular sessions, the Global STS Summit, and a community where founders hold each other accountable and reach exponential growth — together.</p>
                <span style={{ display: "inline-flex", marginTop: 20, color: ACCENT, fontSize: 14.5, fontWeight: 700 }}>Discover the club →</span>
              </div>
            </a>

            {/* High Performance Mentoring */}
            <a href="/high-performance-mentoring" className="card-lift" style={{ textDecoration: "none", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", aspectRatio: "16/10", background: "linear-gradient(135deg, #1c1915, #2e2820)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", padding: 20 }}>
                  <span style={{ display: "inline-flex", width: 54, height: 54, borderRadius: "50%", background: "rgba(232,116,43,0.16)", border: "1px solid rgba(232,116,43,0.4)", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📷</span>
                  <p style={{ marginTop: 12, fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Photo with 1-on-1 client — coming soon</p>
                </div>
              </div>
              <div style={{ padding: "34px 32px 38px" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>1-on-1</span>
                <h3 style={{ fontSize: 26, fontWeight: 800, marginTop: 10, letterSpacing: "-0.02em", color: INK }}>High Performance Mentoring</h3>
                <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, color: "#5f5a51" }}>Private mentoring for founders who want to operate at their A-game — mentally, physically and emotionally. Built on real assessments and a plan that keeps getting better.</p>
                <span style={{ display: "inline-flex", marginTop: 20, color: ACCENT, fontSize: 14.5, fontWeight: 700 }}>Explore the mentoring →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "110px 32px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(36px,5.4vw,64px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em", color: INK }}>Start the conversation.</h2>
          <p style={{ margin: "20px auto 0", maxWidth: 480, fontSize: 17, lineHeight: 1.55, color: MUTED }}>Leave your email and I&apos;ll personally reach out to find the right fit — the club or 1-on-1 mentoring.</p>
          {joined ? (
            <div style={{ margin: "38px auto 0", maxWidth: 520, border: `1px solid ${ACCENT}`, background: `color-mix(in srgb, ${ACCENT} 8%, transparent)`, padding: 28, borderRadius: 12 }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: INK }}>Received.</p>
              <p style={{ marginTop: 8, fontSize: 15, color: MUTED }}>Watch your inbox — I&apos;ll be in touch personally.</p>
            </div>
          ) : (
            <>
              <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setJoined(true); }} style={{ margin: "38px auto 0", maxWidth: 520, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-premium" style={{ flex: "1 1 260px", background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: INK, padding: "16px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, outline: "none" }} />
                <button type="submit" className="btn-primary" style={{ background: ACCENT, color: "#fff", border: "none", padding: "16px 30px", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>Get in touch</button>
              </form>
              <p style={{ marginTop: 14, fontSize: 12.5, color: "#8a847a" }}>No spam. A personal message, nothing more.</p>
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
            <p style={{ marginTop: 14, maxWidth: 320, fontSize: 14.5, lineHeight: 1.55, color: "#9a9389" }}>Developing founders, not technology. Shoulder to Shoulder & High Performance Mentoring.</p>
          </div>
          <div>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#7d766c" }}>Follow</span>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="https://www.instagram.com/lennartvanderziel/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#cfc8bd", fontSize: 15 }}>Instagram</a>
              <a href="https://www.linkedin.com/in/lennartvanderziel/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#cfc8bd", fontSize: 15 }}>LinkedIn</a>
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

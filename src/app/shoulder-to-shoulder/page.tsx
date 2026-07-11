"use client";
import { useState } from "react";
import Image from "next/image";

const ACCENT = "#E8742B";

const benefits = [
  "Collaboration with exceptional founders who've been there.",
  "Solving critical problems before they cost you weeks of growth.",
  "Exclusive opportunities before the rest of the world hears about them.",
  "A Founder Circle that meets weekly.",
  "The Global STS Summit, monthly dinners and unforgettable group experiences.",
  "Participate from anywhere — no need to be in Bali.",
];

const fitFor = [
  "Want to raise their standards so they can scale faster.",
  "Realize they are the bottleneck — and value honest feedback over protecting their ego.",
  "Believe the most exceptional businesses are never built alone.",
  "Have the do-what-it-takes attitude to match the room.",
];

export default function ShoulderToShoulder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [biz, setBiz] = useState("");
  const [applied, setApplied] = useState(false);

  return (
    <div style={{ background: "#0f0e0b", color: "#15130f", fontFamily: "var(--font-sans), ui-sans-serif, sans-serif", minHeight: "100vh", overflowX: "hidden", WebkitFontSmoothing: "antialiased" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, background: "linear-gradient(to bottom, rgba(10,9,7,0.55), transparent)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", color: "#fff" }}>
            <span style={{ flex: "0 0 auto", width: 32, height: 32, borderRadius: 9, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", gap: 3.5 }}>
              <span style={{ width: 5, height: 14, borderRadius: 3, background: "#fff" }} />
              <span style={{ width: 5, height: 14, borderRadius: 3, background: "#fff", opacity: 0.72 }} />
            </span>
            <span style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: "-0.01em", color: "#fff" }}>Shoulder to Shoulder</span>
          </a>
          <a href="#apply" style={{ textDecoration: "none", color: "#15130f", background: "#fff", padding: "11px 22px", borderRadius: 100, fontSize: 13.5, fontWeight: 700 }}>Apply now</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" style={{ position: "relative", width: "100%", height: "100vh", minHeight: 640, overflow: "hidden" }}>
        <Image src="/founders.jpg" alt="Founders" fill style={{ objectFit: "cover" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,9,7,0.5) 0%, rgba(10,9,7,0.15) 38%, rgba(10,9,7,0.55) 68%, rgba(10,9,7,0.92) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 1180, margin: "0 auto", padding: "0 28px 88px" }}>
          <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: "#fff", opacity: 0.9 }}>Founder Circle</span>
          <h1 style={{ marginTop: 8, fontSize: "clamp(40px,7vw,88px)", fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.035em", color: "#fff", maxWidth: 820 }}>Scale further, alongside founders who've been there.</h1>
          <p style={{ marginTop: 20, fontSize: 19, lineHeight: 1.5, color: "rgba(255,255,255,0.86)", fontWeight: 500, maxWidth: 540 }}>Some weeks you're on fire. Other weeks you're stuck — losing momentum, money and growth. Shoulder to Shoulder makes reaching your potential inevitable.</p>
          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <a href="#apply" style={{ textDecoration: "none", color: "#15130f", background: "#fff", padding: "17px 34px", borderRadius: 100, fontSize: 16, fontWeight: 700 }}>Apply to join →</a>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
              By application only
            </span>
          </div>
        </div>
      </header>

      {/* THE FEELING */}
      <section style={{ background: "#15130f", padding: "110px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(26px,4vw,38px)", lineHeight: 1.35, color: "#fff" }}>
            Every founder knows the feeling.<br />Some weeks you're on fire. Other weeks<br />you're <span style={{ color: ACCENT }}>stuck.</span>
          </p>
          <p style={{ marginTop: 28, fontSize: 16.5, lineHeight: 1.6, color: "#a59e93", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>And it's frustrating — because you're losing momentum, money and growth. But the fastest-growing entrepreneurs have a few things in common.</p>
        </div>
      </section>

      {/* PHOTO MOMENT */}
      <section style={{ position: "relative", width: "100%", height: "78vh", minHeight: 480, overflow: "hidden" }}>
        <Image src="/mastermind.jpg" alt="Founders Mastermind" fill style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,7,0.85) 0%, rgba(10,9,7,0.05) 45%)", pointerEvents: "none", display: "flex", alignItems: "flex-end", padding: 48 }}>
          <p style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: "clamp(24px,3.4vw,34px)", color: "#fff", maxWidth: 640, lineHeight: 1.3 }}>"Others see what you can't, and know things you don't."</p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ background: "#fff", color: "#15130f", padding: "110px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 50px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>What you get</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>Make reaching your potential inevitable.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
            {benefits.map((b) => (
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 22 }}>
            {[
              { quote: "I stopped thinking like an operator and started thinking like the founder I need to become to raise €40M for my business. That changed how I do everything.", name: "KIBET KIPKEMOI" },
              { quote: "I'd been circling the real estate idea for a while without moving. With the support of the group it turned into land I now own and a 14-unit project underway.", name: "SAMER ATTALLA" },
            ].map((t) => (
              <div key={t.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "30px 30px" }}>
                <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 40, color: ACCENT, lineHeight: 0.4, display: "block" }}>"</span>
                <p style={{ marginTop: 10, fontSize: 16.5, lineHeight: 1.5, fontWeight: 500, color: "#f0ece4" }}>{t.quote}</p>
                <p style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em" }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#0f0e0b" }}>
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
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>Who it's for</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>The next cohort is for founders who</h2>
            <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.55, color: "#6b665d" }}>Two circles: €5k–25k/month founders scaling to €1M/year, and €25k+/month founders scaling to multiple 7 figures a year.</p>
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

      {/* ABOUT */}
      <section style={{ background: "#fff", color: "#15130f", padding: "110px 28px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 44px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>About us</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>Your host</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32, alignItems: "center", background: "#f6f5f2", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: 32 }}>
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

      {/* APPLY */}
      <section id="apply" style={{ position: "relative", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/lennart.jpg" alt="Apply background" fill style={{ objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,7,0.9)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 620, margin: "0 auto", padding: "110px 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: ACCENT }}>Join the next Founder Circle</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4.4vw,46px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff" }}>Request a short Founder Fit Conversation.</h2>
            <p style={{ marginTop: 16, fontSize: 16.5, lineHeight: 1.55, color: "#a59e93" }}>Applications are reviewed personally. If there's a strong mutual fit, we'll invite you to a short call.</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.35)" }}>
            <div style={{ padding: "32px 32px 34px" }}>
              {applied ? (
                <div style={{ textAlign: "center", padding: "14px 4px" }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: "#15130f" }}>Application received.</p>
                  <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.55, color: "#6b665d" }}>We review every application personally. If there's a strong mutual fit, you'll hear from us about a short Founder Fit Conversation.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (name.trim() && email.trim()) setApplied(true); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input type="text" required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: "#15130f", padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }} />
                  <input type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: "#15130f", padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }} />
                  <input type="text" required placeholder="Business & monthly revenue" value={biz} onChange={(e) => setBiz(e.target.value)} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: "#15130f", padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }} />
                  <button type="submit" style={{ marginTop: 4, background: ACCENT, color: "#fff", border: "none", padding: "18px 24px", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>Apply to join →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f0e0b", color: "#7d766c" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "30px 28px", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#9a9389", fontWeight: 600 }}>Shoulder to Shoulder · Founder Circle</span>
          <span style={{ fontSize: 12.5 }}>© 2026</span>
        </div>
      </footer>

    </div>
  );
}

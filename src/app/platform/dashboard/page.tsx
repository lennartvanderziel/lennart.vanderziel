"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ACCENT = "#E8742B";
const CARD = "rgba(255,255,255,0.04)";
const BORDER = "1px solid rgba(255,255,255,0.1)";

const upcoming = [
  { date: "Tue · 16:00 CET", title: "Founder Circle — Weekly Session", tag: "Circle A", type: "Zoom" },
  { date: "Thu · 09:00 CET", title: "Body & Energy Protocol Check-in", tag: "All members", type: "Zoom" },
  { date: "Aug 22–24", title: "Global STS Summit", tag: "In person", type: "Bali" },
];

const modules = [
  { n: "01", title: "Founder Operating System", desc: "Your weekly rhythm: priorities, decisions, energy management.", progress: 80 },
  { n: "02", title: "Mind & Psychology", desc: "Stress, focus and the psychology of leading under pressure.", progress: 45 },
  { n: "03", title: "Body & Energy Protocols", desc: "Training, sleep, nutrition — built for founder schedules.", progress: 30 },
  { n: "04", title: "Strategy Intensives", desc: "Recorded deep-dives on positioning, offers and scale.", progress: 10 },
];

const pods = [
  { name: "Circle A — Scale to €1M", members: 6, next: "Tuesday 16:00" },
  { name: "Circle B — Multiple 7 figures", members: 5, next: "Wednesday 17:00" },
];

export default function Dashboard() {
  const router = useRouter();
  const [member, setMember] = useState<string | null>(null);

  useEffect(() => {
    const m = sessionStorage.getItem("sts-member");
    if (!m) {
      router.replace("/platform");
    } else {
      setMember(m);
    }
  }, [router]);

  if (!member) return <div style={{ minHeight: "100vh", background: "#0f0e0b" }} />;

  const firstName = member.split("@")[0].split(".")[0];
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0e0b", color: "#f0ece4", fontFamily: "var(--font-sans), ui-sans-serif, sans-serif" }}>

      {/* TOP BAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(15,14,11,0.9)", backdropFilter: "blur(14px)", borderBottom: BORDER }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <a href="/platform/dashboard" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
              <span style={{ width: 4.5, height: 13, borderRadius: 3, background: "#fff" }} />
              <span style={{ width: 4.5, height: 13, borderRadius: 3, background: "#fff", opacity: 0.72 }} />
            </span>
            <span style={{ fontSize: 14.5, fontWeight: 800, color: "#fff" }}>STS Platform</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <span className="nav-links" style={{ fontSize: 13.5, color: "#a59e93" }}>Member since 2024</span>
            <button
              onClick={() => { sessionStorage.removeItem("sts-member"); router.push("/platform"); }}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#cfc8bd", padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              className="btn-ghost"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 28px 80px" }}>

        {/* WELCOME */}
        <header className="fade-up" style={{ marginBottom: 40 }}>
          <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 21, color: ACCENT }}>Founder Circle</span>
          <h1 style={{ marginTop: 6, fontSize: "clamp(30px,4.5vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.04 }}>
            Welcome back, {displayName}.
          </h1>
          <p style={{ marginTop: 10, fontSize: 16, color: "#a59e93", maxWidth: 520 }}>Your next session is Tuesday at 16:00 CET. Come prepared with this week&apos;s bottleneck.</p>
        </header>

        {/* GRID */}
        <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 22, alignItems: "start" }}>

          {/* LEFT column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

            {/* Upcoming sessions */}
            <section className="fade-up-1" style={{ background: CARD, border: BORDER, borderRadius: 16, padding: "28px 30px" }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>Upcoming</h2>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column" }}>
                {upcoming.map((s, i) => (
                  <div key={s.title} style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                    <div style={{ flex: "0 0 110px", fontSize: 13, fontWeight: 700, color: ACCENT }}>{s.date}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15.5, fontWeight: 700, color: "#f0ece4" }}>{s.title}</div>
                      <div style={{ fontSize: 12.5, color: "#8a847a", marginTop: 2 }}>{s.tag} · {s.type}</div>
                    </div>
                    <button className="btn-ghost" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.18)", color: "#cfc8bd", padding: "8px 16px", borderRadius: 100, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Add to calendar</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum modules */}
            <section className="fade-up-2" style={{ background: CARD, border: BORDER, borderRadius: 16, padding: "28px 30px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>Your curriculum</h2>
                <span style={{ fontSize: 12.5, color: "#8a847a" }}>4 modules</span>
              </div>
              <div className="grid-auto" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {modules.map((m) => (
                  <div key={m.n} className="card-lift-dark" style={{ background: "rgba(255,255,255,0.03)", border: BORDER, borderRadius: 12, padding: "22px 22px", cursor: "pointer" }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", color: ACCENT }}>MODULE {m.n}</span>
                    <h3 style={{ fontSize: 16.5, fontWeight: 700, color: "#f0ece4", margin: "10px 0 6px" }}>{m.title}</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "#8a847a", margin: 0 }}>{m.desc}</p>
                    <div style={{ marginTop: 16, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                      <div style={{ width: `${m.progress}%`, height: "100%", background: ACCENT, borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 11.5, color: "#8a847a", marginTop: 6, display: "inline-block" }}>{m.progress}% complete</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

            {/* Your circle */}
            <section className="fade-up-1" style={{ background: CARD, border: BORDER, borderRadius: 16, padding: "26px 26px" }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: 0 }}>Your circles</h2>
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                {pods.map((p) => (
                  <div key={p.name} style={{ background: "rgba(255,255,255,0.03)", border: BORDER, borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: "#f0ece4" }}>{p.name}</div>
                    <div style={{ fontSize: 12.5, color: "#8a847a", marginTop: 4 }}>{p.members} founders · Next: {p.next}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Community photo */}
            <section className="fade-up-2 photo-zoom" style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", border: BORDER }}>
              <Image src="/dinner.jpg" alt="STS Summit" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,7,0.8), transparent 55%)", display: "flex", alignItems: "flex-end", padding: 18 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Last Summit · Bali</span>
              </div>
            </section>

            {/* Book 1:1 */}
            <section className="fade-up-3" style={{ background: "rgba(232,116,43,0.09)", border: "1px solid rgba(232,116,43,0.4)", borderRadius: 16, padding: "26px 26px" }}>
              <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 19, color: ACCENT }}>Go deeper</span>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "8px 0 8px" }}>1-on-1 with Lennart</h2>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#cfc8bd", margin: 0 }}>Members get priority access to private coaching. Limited spots per quarter.</p>
              <a href="mailto:l.vanderziel@gmail.com?subject=1-on-1%20Coaching" className="btn-primary" style={{ display: "inline-flex", marginTop: 18, textDecoration: "none", color: "#fff", background: ACCENT, padding: "12px 24px", borderRadius: 100, fontSize: 13.5, fontWeight: 700 }}>Request a spot →</a>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

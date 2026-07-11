"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ACCENT = "#E8742B";

export default function PlatformLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    // Demo auth — replaced by real authentication when the backend lands
    sessionStorage.setItem("sts-member", email);
    router.push("/platform/dashboard");
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0f0e0b", fontFamily: "var(--font-sans), ui-sans-serif, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Background */}
      <Image src="/mastermind.jpg" alt="" fill style={{ objectFit: "cover", opacity: 0.25 }} priority />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,9,7,0.7), rgba(10,9,7,0.95))" }} />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
            <span style={{ width: 32, height: 32, borderRadius: 9, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", gap: 3.5 }}>
              <span style={{ width: 5, height: 14, borderRadius: 3, background: "#fff" }} />
              <span style={{ width: 5, height: 14, borderRadius: 3, background: "#fff", opacity: 0.72 }} />
            </span>
            <span style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: "-0.01em", color: "#fff" }}>Shoulder to Shoulder</span>
          </a>
          <a href="/shoulder-to-shoulder" style={{ textDecoration: "none", color: "rgba(255,255,255,0.7)", fontSize: 13.5, fontWeight: 600 }}>Not a member? Apply →</a>
        </div>
      </nav>

      {/* Login card */}
      <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div className="fade-up" style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 22, color: ACCENT }}>Members only</span>
            <h1 style={{ marginTop: 8, fontSize: "clamp(30px,5vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.05 }}>Welcome back to the Circle.</h1>
          </div>
          <div style={{ background: "#fff", borderRadius: 18, padding: "34px 32px", boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }}>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: "#15130f", padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }}
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-premium"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: "#15130f", padding: "15px 18px", fontSize: 15, fontFamily: "var(--font-sans), sans-serif", borderRadius: 10, outline: "none" }}
              />
              {error && <p style={{ fontSize: 13.5, color: "#c0392b", margin: 0 }}>{error}</p>}
              <button type="submit" className="btn-primary" style={{ marginTop: 4, background: ACCENT, color: "#fff", border: "none", padding: "17px 24px", fontSize: 15.5, fontWeight: 700, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>
                Enter the platform →
              </button>
            </form>
            <p style={{ marginTop: 18, textAlign: "center", fontSize: 13, color: "#8a847a" }}>
              Forgot your password? <a href="mailto:l.vanderziel@gmail.com" style={{ color: ACCENT, fontWeight: 600, textDecoration: "none" }}>Contact us</a>
            </p>
          </div>
          <p style={{ marginTop: 22, textAlign: "center", fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>
            Access is reserved for active Founder Circle members.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { submitToInbox } from "@/lib/submit";

const ACCENT = "#E8742B";

const revenueBands = ["Pre-revenue / Early stage", "Less than €10k / month", "€10k – €25k / month", "€25k+ / month"];
const sources = ["Lennart", "A member or referral", "A friend", "Instagram", "Somewhere else"];

const inputStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.16)",
  color: "#15130f",
  padding: "15px 18px",
  fontSize: 15,
  fontFamily: "var(--font-sans), sans-serif",
  borderRadius: 10,
  outline: "none",
  width: "100%",
};

const optionStyle = (selected: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  width: "100%",
  textAlign: "left",
  background: selected ? `color-mix(in srgb, ${ACCENT} 10%, #fff)` : "#fff",
  border: selected ? `1.5px solid ${ACCENT}` : "1px solid rgba(0,0,0,0.14)",
  borderRadius: 10,
  padding: "15px 18px",
  fontSize: 15,
  fontWeight: 600,
  color: "#15130f",
  cursor: "pointer",
  fontFamily: "var(--font-sans), sans-serif",
  transition: "border-color .15s ease, background .15s ease",
});

const emptyData = {
  firstName: "", lastName: "", email: "", whatsapp: "", instagram: "",
  business: "", revenue: "", why: "", source: "",
};

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ ...emptyData });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [hp, setHp] = useState(""); // honeypot — humans never see or fill this

  const steps = [
    { valid: true }, // 0 intro
    { valid: data.firstName.trim().length > 1 && data.lastName.trim().length > 0 }, // 1 name
    { valid: /.+@.+\..+/.test(data.email) && data.whatsapp.trim().length > 4 }, // 2 contact
    { valid: data.business.trim().length > 2 }, // 3 business
    { valid: data.revenue !== "" }, // 4 revenue
    { valid: data.why.trim().length > 2 }, // 5 why
    { valid: data.source !== "" }, // 6 source
  ];
  const total = steps.length - 1;
  const progress = Math.min(step / total, 1) * 100;

  async function submit() {
    setStatus("sending");
    const ok = await submitToInbox(
      `New STS application — ${data.firstName} ${data.lastName}`,
      {
        Name: `${data.firstName} ${data.lastName}`,
        Email: data.email,
        WhatsApp: data.whatsapp,
        Instagram: data.instagram || "—",
        Business: data.business,
        "Monthly revenue": data.revenue,
        "Why join / what would make it valuable": data.why,
        "How did you hear about us": data.source,
      },
      hp
    );
    setStatus(ok ? "done" : "error");
  }

  function next() {
    if (!steps[step].valid) return;
    if (step === steps.length - 1) { submit(); return; }
    setStep(step + 1);
  }

  if (status === "done") {
    return (
      <div style={{ textAlign: "center", padding: "22px 4px" }}>
        <span style={{ display: "inline-flex", width: 54, height: 54, borderRadius: "50%", background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`, alignItems: "center", justifyContent: "center", fontSize: 24, color: ACCENT, fontWeight: 800 }}>✓</span>
        <p style={{ marginTop: 16, fontSize: 24, fontWeight: 800, color: "#15130f" }}>Application received.</p>
        <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: "#6b665d", maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
          Every application is reviewed personally. If there&apos;s a strong mutual fit, you&apos;ll be invited to a short <strong style={{ color: "#15130f" }}>Founder Fit Conversation</strong> — a personal call, no pitch, no pressure.
        </p>
      </div>
    );
  }

  return (
    <div>
      {step > 0 && (
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#8a847a", letterSpacing: "0.06em" }}>STEP {step} OF {total}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT }}>~2 minutes</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: ACCENT, borderRadius: 2, transition: "width .35s cubic-bezier(0.22,1,0.36,1)" }} />
          </div>
        </div>
      )}

      {step === 0 && (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <p style={{ fontSize: 21, fontWeight: 800, color: "#15130f", lineHeight: 1.3 }}>See if you qualify.</p>
          <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.6, color: "#6b665d" }}>Six short questions — about two minutes. Every application is reviewed personally, and membership is by invitation only.</p>
          <button onClick={next} className="btn-primary" style={{ marginTop: 22, background: ACCENT, color: "#fff", border: "none", padding: "16px 36px", fontSize: 15.5, fontWeight: 700, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>
            Start the application →
          </button>
        </div>
      )}

      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f" }}>First — who are you?</p>
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
          <input autoFocus type="text" placeholder="First name" value={data.firstName} onChange={(e) => setData({ ...data, firstName: e.target.value })} className="input-premium" style={inputStyle} />
          <input type="text" placeholder="Last name" value={data.lastName} onChange={(e) => setData({ ...data, lastName: e.target.value })} onKeyDown={(e) => e.key === "Enter" && next()} className="input-premium" style={inputStyle} />
        </div>
      )}

      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f" }}>How can we reach you?</p>
          <input autoFocus type="email" placeholder="Email address" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="input-premium" style={inputStyle} />
          <input type="tel" placeholder="WhatsApp number (incl. country code)" value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} className="input-premium" style={inputStyle} />
          <input type="text" placeholder="Instagram (optional)" value={data.instagram} onChange={(e) => setData({ ...data, instagram: e.target.value })} onKeyDown={(e) => e.key === "Enter" && next()} className="input-premium" style={inputStyle} />
        </div>
      )}

      {step === 3 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f" }}>What does your business do?</p>
          <p style={{ fontSize: 13.5, color: "#8a847a", marginTop: -6 }}>One or two sentences is perfect.</p>
          <textarea autoFocus rows={3} placeholder="E.g. e-commerce brand in sports nutrition, 8 people, mostly EU market" value={data.business} onChange={(e) => setData({ ...data, business: e.target.value })} className="input-premium" style={{ ...inputStyle, resize: "vertical" }} />
        </div>
      )}

      {step === 4 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f", marginBottom: 4 }}>Your current monthly revenue?</p>
          {revenueBands.map((band) => (
            <button key={band} onClick={() => { setData({ ...data, revenue: band }); setTimeout(() => setStep(5), 180); }} style={optionStyle(data.revenue === band)}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: data.revenue === band ? `6px solid ${ACCENT}` : "2px solid rgba(0,0,0,0.25)", flex: "0 0 auto", boxSizing: "border-box" }} />
              {band}
            </button>
          ))}
        </div>
      )}

      {step === 5 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f" }}>Why would you like to join?</p>
          <p style={{ fontSize: 13.5, color: "#8a847a", marginTop: -6 }}>And what would make it truly valuable for you?</p>
          <textarea autoFocus rows={4} placeholder="E.g. I want honest feedback, accountability and like-minded founders to grow and enjoy the journey with…" value={data.why} onChange={(e) => setData({ ...data, why: e.target.value })} className="input-premium" style={{ ...inputStyle, resize: "vertical" }} />
        </div>
      )}

      {step === 6 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f", marginBottom: 4 }}>How did you hear about us?</p>
          {sources.map((src) => (
            <button key={src} onClick={() => setData({ ...data, source: src })} style={optionStyle(data.source === src)}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: data.source === src ? `6px solid ${ACCENT}` : "2px solid rgba(0,0,0,0.25)", flex: "0 0 auto", boxSizing: "border-box" }} />
              {src}
            </button>
          ))}
        </div>
      )}

      {status === "error" && (
        <p style={{ marginTop: 16, fontSize: 13.5, color: "#c0392b" }}>Something went wrong sending your application. Please email l.vanderziel@gmail.com directly.</p>
      )}

      {/* Nav buttons (radio steps 4 auto-advance, step 6 needs submit) */}
      {step > 0 && step !== 4 && (
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button onClick={() => setStep(step - 1)} style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.15)", color: "#6b665d", padding: "14px 22px", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>
            ← Back
          </button>
          <button onClick={next} disabled={!steps[step].valid || status === "sending"} className={steps[step].valid ? "btn-primary" : undefined} style={{ flex: 1, background: steps[step].valid ? ACCENT : "rgba(0,0,0,0.12)", color: "#fff", border: "none", padding: "14px 24px", fontSize: 15, fontWeight: 700, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: steps[step].valid && status !== "sending" ? "pointer" : "not-allowed", transition: "background .2s ease" }}>
            {status === "sending" ? "Sending…" : step === steps.length - 1 ? "Submit application →" : "Continue →"}
          </button>
        </div>
      )}
      {step === 4 && (
        <div style={{ marginTop: 20 }}>
          <button onClick={() => setStep(3)} style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.15)", color: "#6b665d", padding: "14px 22px", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

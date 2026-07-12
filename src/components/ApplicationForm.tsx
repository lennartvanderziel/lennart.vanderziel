"use client";
import { useState } from "react";

const ACCENT = "#E8742B";

const revenueBands = ["Below €5k / month", "€5k – €25k / month", "€25k – €100k / month", "€100k+ / month"];
const locations = ["Netherlands / Europe", "Bali / Southeast Asia", "Somewhere else"];
const drivers = [
  "Growing my business faster",
  "Peers who hold me accountable",
  "A network at my level",
  "More fun & life quality on the way up",
];

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

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", email: "", business: "", revenue: "", location: "", driver: "", bottleneck: "" });
  const [done, setDone] = useState(false);

  const steps = [
    { key: "intro", valid: true },
    { key: "person", valid: data.name.trim().length > 1 && /.+@.+\..+/.test(data.email) },
    { key: "business", valid: data.business.trim().length > 2 },
    { key: "revenue", valid: data.revenue !== "" },
    { key: "location", valid: data.location !== "" },
    { key: "driver", valid: data.driver !== "" },
    { key: "bottleneck", valid: true },
  ];
  const total = steps.length - 1; // intro doesn't count in progress
  const progress = Math.min(step / total, 1) * 100;

  function next() {
    if (!steps[step].valid) return;
    if (step === steps.length - 1) {
      setDone(true);
      return;
    }
    setStep(step + 1);
  }

  if (done) {
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
      {/* Progress bar */}
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
          <input autoFocus type="text" placeholder="Full name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} onKeyDown={(e) => e.key === "Enter" && next()} className="input-premium" style={inputStyle} />
          <input type="email" placeholder="Email address" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} onKeyDown={(e) => e.key === "Enter" && next()} className="input-premium" style={inputStyle} />
        </div>
      )}

      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f" }}>What business do you run?</p>
          <p style={{ fontSize: 13.5, color: "#8a847a", marginTop: -6 }}>One or two sentences is perfect.</p>
          <textarea autoFocus rows={3} placeholder="E.g. e-commerce brand in sports nutrition, 8 people, mostly EU market" value={data.business} onChange={(e) => setData({ ...data, business: e.target.value })} className="input-premium" style={{ ...inputStyle, resize: "vertical" }} />
        </div>
      )}

      {step === 3 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f", marginBottom: 4 }}>Current monthly revenue?</p>
          {revenueBands.map((band) => (
            <button key={band} onClick={() => { setData({ ...data, revenue: band }); setTimeout(() => setStep(4), 180); }} style={optionStyle(data.revenue === band)}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: data.revenue === band ? `6px solid ${ACCENT}` : "2px solid rgba(0,0,0,0.25)", flex: "0 0 auto", boxSizing: "border-box" }} />
              {band}
            </button>
          ))}
        </div>
      )}

      {step === 4 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f", marginBottom: 4 }}>Where are you based?</p>
          {locations.map((loc) => (
            <button key={loc} onClick={() => { setData({ ...data, location: loc }); setTimeout(() => setStep(5), 180); }} style={optionStyle(data.location === loc)}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: data.location === loc ? `6px solid ${ACCENT}` : "2px solid rgba(0,0,0,0.25)", flex: "0 0 auto", boxSizing: "border-box" }} />
              {loc}
            </button>
          ))}
        </div>
      )}

      {step === 5 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f", marginBottom: 4 }}>What matters most to you right now?</p>
          {drivers.map((d) => (
            <button key={d} onClick={() => { setData({ ...data, driver: d }); setTimeout(() => setStep(6), 180); }} style={optionStyle(data.driver === d)}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: data.driver === d ? `6px solid ${ACCENT}` : "2px solid rgba(0,0,0,0.25)", flex: "0 0 auto", boxSizing: "border-box" }} />
              {d}
            </button>
          ))}
        </div>
      )}

      {step === 6 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 17, fontWeight: 800, color: "#15130f" }}>Last one — what&apos;s your biggest bottleneck right now?</p>
          <p style={{ fontSize: 13.5, color: "#8a847a", marginTop: -6 }}>Optional, but it helps us match you to the right circle.</p>
          <textarea autoFocus rows={3} placeholder="E.g. I'm the bottleneck in sales, the team depends on me for everything…" value={data.bottleneck} onChange={(e) => setData({ ...data, bottleneck: e.target.value })} className="input-premium" style={{ ...inputStyle, resize: "vertical" }} />
        </div>
      )}

      {/* Nav buttons */}
      {step > 0 && step !== 3 && step !== 4 && step !== 5 && (
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button onClick={() => setStep(step - 1)} style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.15)", color: "#6b665d", padding: "14px 22px", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>
            ← Back
          </button>
          <button onClick={next} disabled={!steps[step].valid} className={steps[step].valid ? "btn-primary" : undefined} style={{ flex: 1, background: steps[step].valid ? ACCENT : "rgba(0,0,0,0.12)", color: "#fff", border: "none", padding: "14px 24px", fontSize: 15, fontWeight: 700, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: steps[step].valid ? "pointer" : "not-allowed", transition: "background .2s ease" }}>
            {step === steps.length - 1 ? "Submit application →" : "Continue →"}
          </button>
        </div>
      )}
      {(step === 3 || step === 4 || step === 5) && (
        <div style={{ marginTop: 20 }}>
          <button onClick={() => setStep(step - 1)} style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.15)", color: "#6b665d", padding: "14px 22px", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-sans), sans-serif", borderRadius: 100, cursor: "pointer" }}>
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

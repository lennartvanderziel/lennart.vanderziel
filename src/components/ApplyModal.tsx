"use client";
import { useState } from "react";
import { useLang } from "@/components/i18n";

const ACCENT = "#E8742B";
const INK = "#15130f";

const copy = {
  en: {
    kicker: "Application",
    name: "Your name",
    email: "Your email",
    whatsapp: "Your WhatsApp",
    instagram: "Your Instagram / LinkedIn",
    contactTitle: "How can we reach you?",
    business: "What are you building?",
    businessSub: "One or two sentences is perfect.",
    revenueLabel: "Numbers wise, where is your monthly revenue at?",
    revenue: ["Pre-revenue / early stage", "Less than €10k / month", "€10k – €25k / month", "€25k – €50k / month", "€50k – €100k / month", "€100k+ / month"],
    goals: "What are you trying to achieve over the next 6–12 months?",
    challenge: "What is currently holding you back the most?",
    whereHelps: "Where would having the right group of founders around you make the biggest difference?",
    why: "What would make this Circle extremely valuable for you?",
    contribution: "What do you think you could contribute to the group?",
    whyNow: "Why are you interested in joining now?",
    sourceLabel: "How did you hear about us?",
    source: ["Lennart", "A member or referral", "A friend", "Instagram", "Somewhere else"],
    back: "← Back",
    next: "Next",
    submit: "Submit application",
    sending: "Sending…",
    step: "Step",
    of: "of",
    doneTitle: "Application received",
    doneBody: "We review every application personally. If it's a strong fit, you'll get an email with a link to book your call, and if we invite you, it's because we think you belong in this Circle.",
    close: "Close",
    err: "Something went wrong. Please email lennart@shouldertoshoulder.club.",
  },
  nl: {
    kicker: "Aanmelding",
    name: "Je naam",
    email: "Je e-mailadres",
    whatsapp: "Je WhatsApp",
    instagram: "Je Instagram / LinkedIn",
    contactTitle: "Hoe kunnen we je bereiken?",
    business: "Wat ben je aan het bouwen?",
    businessSub: "Eén of twee zinnen is genoeg.",
    revenueLabel: "Wat is je maandelijkse omzet ongeveer?",
    revenue: ["Pre-revenue / vroege fase", "Minder dan €10k / maand", "€10k – €25k / maand", "€25k – €50k / maand", "€50k – €100k / maand", "€100k+ / maand"],
    goals: "Wat wil je de komende 6–12 maanden bereiken?",
    challenge: "Wat houdt je nu het meest tegen?",
    whereHelps: "Waar zou de juiste groep founders om je heen het grootste verschil maken?",
    why: "Wat zou deze Circle extreem waardevol maken voor jou?",
    contribution: "Wat denk je dat jij kan bijdragen aan de groep?",
    whyNow: "Waarom wil je nu meedoen?",
    sourceLabel: "Hoe hoorde je van ons?",
    source: ["Lennart", "Een lid of doorverwijzing", "Een vriend", "Instagram", "Ergens anders"],
    back: "← Terug",
    next: "Volgende",
    submit: "Aanmelding versturen",
    sending: "Versturen…",
    step: "Stap",
    of: "van",
    doneTitle: "Aanmelding ontvangen",
    doneBody: "We bekijken elke aanmelding persoonlijk. Bij een sterke match krijg je een e-mail met een link om je call te boeken, en als we je uitnodigen, is dat omdat we denken dat je in deze Circle thuishoort.",
    close: "Sluiten",
    err: "Er ging iets mis. Mail lennart@shouldertoshoulder.club.",
  },
};

const emptyData = {
  name: "", email: "", whatsapp: "", instagram: "", business: "", revenue: "",
  goals: "", challenge: "", whereHelps: "", why: "", contribution: "", whyNow: "",
  source: "",
};

const field: React.CSSProperties = {
  width: "100%", background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: "#15130f",
  padding: "14px 16px", fontSize: 15.5, fontFamily: "inherit", borderRadius: 10, outline: "none",
};

const optionStyle = (selected: boolean): React.CSSProperties => ({
  display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left",
  background: selected ? INK : "#fff", border: selected ? `1px solid ${INK}` : "1px solid rgba(0,0,0,0.14)",
  borderRadius: 10, padding: "14px 18px", fontSize: 15, fontWeight: 600,
  color: selected ? "#fff" : "#15130f", cursor: "pointer", fontFamily: "inherit",
  transition: "background .15s ease, border-color .15s ease",
});

export default function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang();
  const t = copy[lang];
  const [step, setStep] = useState(0);
  const [d, setD] = useState({ ...emptyData });
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  if (!open) return null;

  const set = (k: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setD({ ...d, [k]: e.target.value });

  const steps = [
    { valid: d.name.trim().length > 1 && /.+@.+\..+/.test(d.email) && d.whatsapp.trim().length > 4 && d.instagram.trim().length > 1 }, // 0 contact
    { valid: d.business.trim().length > 2 }, // 1 business
    { valid: d.revenue !== "" }, // 2 revenue
    { valid: d.goals.trim().length > 2 }, // 3 goals
    { valid: d.challenge.trim().length > 2 }, // 4 challenge
    { valid: d.whereHelps.trim().length > 2 }, // 5 whereHelps
    { valid: d.why.trim().length > 2 }, // 6 why
    { valid: d.contribution.trim().length > 2 }, // 7 contribution
    { valid: d.whyNow.trim().length > 2 }, // 8 whyNow
    { valid: d.source !== "" }, // 9 source
  ];
  const total = steps.length;
  const progress = ((step + 1) / total) * 100;

  async function submit() {
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, hp_field_sts: hp }),
      });
      const j = await res.json().catch(() => ({ ok: false }));
      setStatus(j.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  function next() {
    if (!steps[step].valid) return;
    if (step === steps.length - 1) { submit(); return; }
    setStep(step + 1);
  }

  function close() {
    setStep(0);
    setD({ ...emptyData });
    setStatus("idle");
    onClose();
  }

  const nav = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28 }}>
      {step > 0 ? (
        <button type="button" onClick={() => setStep(step - 1)} style={{ background: "none", border: "none", color: "#8a847a", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>{t.back}</button>
      ) : <span />}
      <button
        type="button"
        onClick={next}
        disabled={!steps[step].valid || status === "sending"}
        style={{
          background: steps[step].valid ? INK : "rgba(0,0,0,0.12)", color: "#fff", border: "none",
          padding: "14px 30px", fontSize: 14.5, fontWeight: 700, borderRadius: 100, letterSpacing: "0.02em",
          cursor: steps[step].valid && status !== "sending" ? "pointer" : "not-allowed", fontFamily: "inherit",
        }}
      >
        {status === "sending" ? t.sending : step === steps.length - 1 ? t.submit : t.next}
      </button>
    </div>
  );

  const Q = ({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) => (
    <div>
      <h3 style={{ fontSize: 21, fontWeight: 800, color: "#15130f", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{title}</h3>
      {sub && <p style={{ marginTop: 6, fontSize: 13.5, color: "#8a847a" }}>{sub}</p>}
      <div style={{ marginTop: 18 }}>{children}</div>
    </div>
  );

  return (
    <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(10,9,7,0.75)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "24px 16px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#faf8f3", borderRadius: 18, maxWidth: 520, width: "100%", padding: "30px 28px", margin: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
        {status === "done" ? (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <span style={{ display: "inline-flex", width: 54, height: 54, borderRadius: "50%", background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`, alignItems: "center", justifyContent: "center", fontSize: 24, color: ACCENT, fontWeight: 800 }}>✓</span>
            <h3 style={{ marginTop: 16, fontSize: 22, fontWeight: 800, color: "#15130f" }}>{t.doneTitle}</h3>
            <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: "#5f5a51" }}>{t.doneBody}</p>
            <button onClick={close} style={{ marginTop: 22, background: ACCENT, color: "#fff", border: "none", padding: "13px 28px", fontSize: 15, fontWeight: 700, borderRadius: 100, cursor: "pointer", fontFamily: "inherit" }}>{t.close}</button>
          </div>
        ) : (
          <div>
            {/* Header: kicker + close */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8a847a" }}>{t.kicker}</span>
              <button type="button" onClick={close} aria-label="Close" style={{ background: "none", border: "none", fontSize: 22, color: "#8a847a", cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>

            {/* Step counter + progress bar */}
            <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "#8a847a", letterSpacing: "0.06em" }}>{t.step.toUpperCase()} {step + 1} {t.of.toUpperCase()} {total}</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: ACCENT }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: ACCENT, borderRadius: 2, transition: "width .35s cubic-bezier(0.22,1,0.36,1)" }} />
            </div>

            <input type="text" name="hp_field_sts" autoComplete="off" tabIndex={-1} value={hp} onChange={(e) => setHp(e.target.value)} style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true" />

            <div style={{ marginTop: 24 }}>
              {step === 0 && (
                <Q title={t.contactTitle}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    <input autoFocus placeholder={t.name} value={d.name} onChange={set("name")} style={field} />
                    <input type="email" placeholder={t.email} value={d.email} onChange={set("email")} style={field} />
                    <input type="tel" placeholder={t.whatsapp} value={d.whatsapp} onChange={set("whatsapp")} style={field} />
                    <input placeholder={t.instagram} value={d.instagram} onChange={set("instagram")} onKeyDown={(e) => e.key === "Enter" && next()} style={field} />
                  </div>
                </Q>
              )}
              {step === 1 && (
                <Q title={t.business} sub={t.businessSub}>
                  <textarea autoFocus rows={3} value={d.business} onChange={set("business")} style={{ ...field, resize: "vertical" }} />
                </Q>
              )}
              {step === 2 && (
                <Q title={t.revenueLabel}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {t.revenue.map((r) => (
                      <button key={r} type="button" onClick={() => { setD({ ...d, revenue: r }); setTimeout(() => setStep((s) => s + 1), 160); }} style={optionStyle(d.revenue === r)}>
                        {r}{d.revenue === r && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </Q>
              )}
              {step === 3 && (
                <Q title={t.goals}>
                  <textarea autoFocus rows={3} value={d.goals} onChange={set("goals")} style={{ ...field, resize: "vertical" }} />
                </Q>
              )}
              {step === 4 && (
                <Q title={t.challenge}>
                  <textarea autoFocus rows={3} value={d.challenge} onChange={set("challenge")} style={{ ...field, resize: "vertical" }} />
                </Q>
              )}
              {step === 5 && (
                <Q title={t.whereHelps}>
                  <textarea autoFocus rows={3} value={d.whereHelps} onChange={set("whereHelps")} style={{ ...field, resize: "vertical" }} />
                </Q>
              )}
              {step === 6 && (
                <Q title={t.why}>
                  <textarea autoFocus rows={3} value={d.why} onChange={set("why")} style={{ ...field, resize: "vertical" }} />
                </Q>
              )}
              {step === 7 && (
                <Q title={t.contribution}>
                  <textarea autoFocus rows={3} value={d.contribution} onChange={set("contribution")} style={{ ...field, resize: "vertical" }} />
                </Q>
              )}
              {step === 8 && (
                <Q title={t.whyNow}>
                  <textarea autoFocus rows={3} value={d.whyNow} onChange={set("whyNow")} style={{ ...field, resize: "vertical" }} />
                </Q>
              )}
              {step === 9 && (
                <Q title={t.sourceLabel}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {t.source.map((s) => (
                      <button key={s} type="button" onClick={() => setD({ ...d, source: s })} style={optionStyle(d.source === s)}>
                        {s}{d.source === s && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </Q>
              )}
            </div>

            {status === "error" && <p style={{ marginTop: 12, fontSize: 13.5, color: "#c0392b" }}>{t.err}</p>}
            {step !== 2 && nav}
            {step === 2 && step > 0 && (
              <div style={{ marginTop: 28 }}>
                <button type="button" onClick={() => setStep(step - 1)} style={{ background: "none", border: "none", color: "#8a847a", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>{t.back}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

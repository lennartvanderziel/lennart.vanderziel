"use client";
import { useState } from "react";
import { useLang } from "@/components/i18n";

const ACCENT = "#E8742B";

const copy = {
  en: {
    title: "Apply for a fit call",
    intro: "Every application is reviewed personally. If it's a fit, you'll get a link to book your call.",
    name: "Full name",
    email: "Email address",
    whatsapp: "WhatsApp (incl. country code)",
    instagram: "Instagram / LinkedIn",
    business: "What does your business do?",
    revenueLabel: "Monthly revenue",
    revenue: ["Pre-revenue / early stage", "Less than €10k / month", "€10k – €25k / month", "€25k – €50k / month", "€50k – €100k / month", "€100k+ / month"],
    why: "Why do you want to join, and what would make it valuable?",
    sourceLabel: "How did you hear about us?",
    source: ["Lennart", "A member or referral", "A friend", "Instagram", "Somewhere else"],
    submit: "Submit application →",
    sending: "Sending…",
    doneTitle: "Application received",
    doneBody: "We review every application personally. If it's a strong fit, you'll get an email with a link to book your call.",
    close: "Close",
    err: "Something went wrong. Please email lennart@shouldertoshoulder.club.",
  },
  nl: {
    title: "Meld je aan voor een fit call",
    intro: "Elke aanmelding wordt persoonlijk bekeken. Bij een match krijg je een link om je call te boeken.",
    name: "Volledige naam",
    email: "E-mailadres",
    whatsapp: "WhatsApp (incl. landcode)",
    instagram: "Instagram / LinkedIn",
    business: "Wat doet je bedrijf?",
    revenueLabel: "Maandelijkse omzet",
    revenue: ["Pre-revenue / vroege fase", "Minder dan €10k / maand", "€10k – €25k / maand", "€25k – €50k / maand", "€50k – €100k / maand", "€100k+ / maand"],
    why: "Waarom wil je meedoen, en wat maakt het waardevol voor jou?",
    sourceLabel: "Hoe hoorde je van ons?",
    source: ["Lennart", "Een lid of doorverwijzing", "Een vriend", "Instagram", "Ergens anders"],
    submit: "Aanmelding versturen →",
    sending: "Versturen…",
    doneTitle: "Aanmelding ontvangen",
    doneBody: "We bekijken elke aanmelding persoonlijk. Bij een sterke match krijg je een e-mail met een link om je call te boeken.",
    close: "Sluiten",
    err: "Er ging iets mis. Mail lennart@shouldertoshoulder.club.",
  },
};

const field: React.CSSProperties = {
  width: "100%", background: "#fff", border: "1px solid rgba(0,0,0,0.16)", color: "#15130f",
  padding: "13px 15px", fontSize: 15, fontFamily: "inherit", borderRadius: 10, outline: "none",
};

export default function ApplyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang();
  const t = copy[lang];
  const [d, setD] = useState({ name: "", email: "", whatsapp: "", instagram: "", business: "", revenue: "", why: "", source: "" });
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  if (!open) return null;

  const set = (k: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setD({ ...d, [k]: e.target.value });
  const valid = d.name.trim().length > 1 && /.+@.+\..+/.test(d.email) && d.whatsapp.trim().length > 4 && d.instagram.trim().length > 1 && d.business.trim().length > 1 && Boolean(d.revenue) && d.why.trim().length > 1 && Boolean(d.source);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
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

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(10,9,7,0.75)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "24px 16px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#faf8f3", borderRadius: 18, maxWidth: 520, width: "100%", padding: "32px 28px", margin: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
        {status === "done" ? (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <span style={{ display: "inline-flex", width: 54, height: 54, borderRadius: "50%", background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`, alignItems: "center", justifyContent: "center", fontSize: 24, color: ACCENT, fontWeight: 800 }}>✓</span>
            <h3 style={{ marginTop: 16, fontSize: 22, fontWeight: 800, color: "#15130f" }}>{t.doneTitle}</h3>
            <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: "#5f5a51" }}>{t.doneBody}</p>
            <button onClick={onClose} style={{ marginTop: 22, background: ACCENT, color: "#fff", border: "none", padding: "13px 28px", fontSize: 15, fontWeight: 700, borderRadius: 100, cursor: "pointer", fontFamily: "inherit" }}>{t.close}</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#15130f", letterSpacing: "-0.01em" }}>{t.title}</h3>
                <p style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5, color: "#6b665d" }}>{t.intro}</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close" style={{ flex: "0 0 auto", background: "none", border: "none", fontSize: 24, color: "#8a847a", cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 11 }}>
              <input type="text" name="hp_field_sts" autoComplete="off" tabIndex={-1} value={hp} onChange={(e) => setHp(e.target.value)} style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true" />
              <input required placeholder={t.name} value={d.name} onChange={set("name")} style={field} />
              <input required type="email" placeholder={t.email} value={d.email} onChange={set("email")} style={field} />
              <input required type="tel" placeholder={t.whatsapp} value={d.whatsapp} onChange={set("whatsapp")} style={field} />
              <input required placeholder={t.instagram} value={d.instagram} onChange={set("instagram")} style={field} />
              <textarea required rows={2} placeholder={t.business} value={d.business} onChange={set("business")} style={{ ...field, resize: "vertical" }} />
              <select required value={d.revenue} onChange={set("revenue")} style={{ ...field, color: d.revenue ? "#15130f" : "#8a847a" }}>
                <option value="" disabled>{t.revenueLabel}</option>
                {t.revenue.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <textarea required rows={3} placeholder={t.why} value={d.why} onChange={set("why")} style={{ ...field, resize: "vertical" }} />
              <select required value={d.source} onChange={set("source")} style={{ ...field, color: d.source ? "#15130f" : "#8a847a" }}>
                <option value="" disabled>{t.sourceLabel}</option>
                {t.source.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {status === "error" && <p style={{ marginTop: 12, fontSize: 13.5, color: "#c0392b" }}>{t.err}</p>}
            <button type="submit" disabled={!valid || status === "sending"} style={{ marginTop: 18, width: "100%", background: valid ? ACCENT : "rgba(0,0,0,0.12)", color: "#fff", border: "none", padding: "15px 24px", fontSize: 15.5, fontWeight: 700, borderRadius: 100, cursor: valid && status !== "sending" ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
              {status === "sending" ? t.sending : t.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

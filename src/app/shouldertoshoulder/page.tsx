"use client";
import { useState } from "react";
import Image from "next/image";
import { submitToInbox } from "@/lib/submit";
import { useLang, LanguageToggle } from "@/components/i18n";

const ACCENT = "#E8742B";
const CAL_LINK = ""; // paste your Cal.com / Calendly link here when ready

const copy = {
  en: {
    book: "Book your selection call",
    bookArrow: "Book your selection call →",
    bySelection: "By selection only",
    heroKicker: "Stop building your business alone.",
    heroTitleA: "Your weekly board of ",
    heroTitleB: "founders.",
    heroSub: "A small, hand-picked group of founders who challenge each other, solve real bottlenecks, and keep each other accountable — every week.",
    freeNoPitch: "Free · No pitch",
    getEyebrow: "What you'll get out of it",
    getTitle: "Three things change fast.",
    benefits: [
      { title: "Faster growth", desc: "No more stuck weeks. You make real progress every week and pressure-test your big decisions instead of guessing alone." },
      { title: "More confidence", desc: "You're not solo anymore. You have a team that knows your business and has your back on every hard call." },
      { title: "Enjoy the journey", desc: "Wins get shared, problems get lighter, and building stops feeling lonely." },
    ],
    knowKicker: "“But I already know founders”",
    knowTitle: "Knowing people isn't having a team.",
    knowP1: "Most founders do. A few contacts, a WhatsApp group, the odd dinner. That's random, and it fades.",
    knowP2a: "This is structured and consistent: ",
    knowP2b: "the same committed group, every week",
    knowP2c: ", who know your business and hold you to your word. That's the difference between knowing people and having a team.",
    dashboardCaption: "Accountability dashboard screenshot — coming soon",
    runEyebrow: "How it runs",
    runTitle: "A weekly strategy session, accountability on the actions that matter, and real feedback on your hardest calls — plus a monthly 1-on-1 with me, dinners, events, and an annual summit.",
    runCaption: "A weekly session in progress",
    forEyebrow: "Who it's for",
    forTitle: "A good fit if you:",
    forYou: ["Already have traction", "Want to grow faster", "Value accountability and honest feedback", "Want a real team, not more networking"],
    resultsEyebrow: "Results",
    resultsTitle: "The change members see.",
    videoCaption: "Member testimonial video — coming soon",
    testimonials: [
      { quote: "I'd been circling the real estate idea for a while without moving. With the support of the group it turned into land I now own and a 14-unit project underway.", name: "Samer", type: "Real estate" },
      { quote: "I stopped thinking like an operator and started thinking like the founder I need to become to raise €40M. That changed how I do everything.", name: "Kibet", type: "Agritech" },
    ],
    howEyebrow: "How it works",
    howTitle: "Three steps in.",
    steps: [
      { n: "1", title: "Book a selection call", desc: "A free, relaxed conversation with Lennart about where you are and where you want to go." },
      { n: "2", title: "We see if you match", desc: "It only works if everyone fits — so we look honestly, both ways. No pitch, no pressure." },
      { n: "3", title: "Join and start", desc: "If it's a fit, you join a small group of founders and the momentum starts immediately." },
    ],
    faqEyebrow: "Good questions",
    faqTitle: "Frequently asked.",
    faqs: [
      { q: "Is this coaching?", a: "No. It's a founder group built on structure, accountability, and peer support — not a coach talking at you." },
      { q: "I don't have time.", a: "It's one focused hour a week. That hour saves you from losing whole weeks to the wrong priorities." },
      { q: "I'm always traveling.", a: "No problem. It's online-first, so you join from anywhere. Members are spread across the world already." },
      { q: "Is it online?", a: "Weekly sessions are online. Plus dinners, events, and an annual summit in person." },
      { q: "Who joins?", a: "Founders with real traction who are serious about building and helping each other grow." },
    ],
    finalTitleA: "Your business grows",
    finalTitleB: "as fast as you do.",
    finalSub: "Stop figuring it out alone. Leave your details and Lennart personally reaches out to plan your selection call.",
    received: "Received.",
    receivedSub: "Lennart will reach out personally to lock in your selection call. Keep an eye on your WhatsApp and inbox.",
    fName: "Full name",
    fEmail: "Email address",
    fWhats: "WhatsApp (incl. country code)",
    fBiz: "What does your business do? (1 line)",
    fGoal: "Your biggest goal right now",
    sending: "Sending…",
    freeBySelection: "Free · By selection only",
    fullDetails: "Full details",
    footer: "Shoulder to Shoulder · By selection only",
    dinnerCaps: ["Founder dinner", "The room", "Together"],
  },
  nl: {
    book: "Boek je selectiegesprek",
    bookArrow: "Boek je selectiegesprek →",
    bySelection: "Alleen op selectie",
    heroKicker: "Stop met alleen ondernemen.",
    heroTitleA: "Je wekelijkse raad van ",
    heroTitleB: "founders.",
    heroSub: "Een kleine, zorgvuldig geselecteerde groep founders die elkaar uitdagen, echte bottlenecks oplossen en elkaar scherp houden — elke week.",
    freeNoPitch: "Gratis · Geen pitch",
    getEyebrow: "Wat het je oplevert",
    getTitle: "Drie dingen veranderen snel.",
    benefits: [
      { title: "Sneller groeien", desc: "Geen vastgelopen weken meer. Je boekt elke week echte progressie en toetst je grote beslissingen in plaats van in je eentje te gokken." },
      { title: "Meer vertrouwen", desc: "Je staat er niet meer alleen voor. Je hebt een team dat je business kent en achter je staat bij elke lastige keuze." },
      { title: "Geniet van de reis", desc: "Wins worden gedeeld, problemen worden lichter, en ondernemen voelt niet langer eenzaam." },
    ],
    knowKicker: "“Maar ik ken al founders”",
    knowTitle: "Mensen kennen is geen team hebben.",
    knowP1: "De meeste founders wel. Een paar contacten, een WhatsApp-groep, af en toe een diner. Dat is willekeurig, en het verwatert.",
    knowP2a: "Dit is gestructureerd en consistent: ",
    knowP2b: "dezelfde toegewijde groep, elke week",
    knowP2c: ", die je business kent en je aan je woord houdt. Dat is het verschil tussen mensen kennen en een team hebben.",
    dashboardCaption: "Screenshot accountability-dashboard — komt binnenkort",
    runEyebrow: "Hoe het werkt",
    runTitle: "Een wekelijkse strategiesessie, accountability op de acties die er toe doen, en echte feedback op je moeilijkste keuzes — plus een maandelijkse 1-op-1 met mij, diners, events en een jaarlijkse summit.",
    runCaption: "Een wekelijkse sessie in volle gang",
    forEyebrow: "Voor wie",
    forTitle: "Een goede match als je:",
    forYou: ["Al tractie hebt", "Sneller wil groeien", "Accountability en eerlijke feedback waardeert", "Een echt team wil, niet nog meer netwerken"],
    resultsEyebrow: "Resultaten",
    resultsTitle: "De verandering die leden zien.",
    videoCaption: "Video-testimonial van een lid — komt binnenkort",
    testimonials: [
      { quote: "Ik liep al een tijd rond met het vastgoedidee zonder in beweging te komen. Met de steun van de groep werd het grond die ik nu bezit en een project van 14 units dat loopt.", name: "Samer", type: "Vastgoed" },
      { quote: "Ik stopte met denken als operator en begon te denken als de founder die ik moet worden om €40M op te halen. Dat veranderde alles in hoe ik werk.", name: "Kibet", type: "Agritech" },
    ],
    howEyebrow: "Hoe het gaat",
    howTitle: "In drie stappen erin.",
    steps: [
      { n: "1", title: "Boek een selectiegesprek", desc: "Een gratis, ontspannen gesprek met Lennart over waar je staat en waar je heen wil." },
      { n: "2", title: "We kijken of het matcht", desc: "Het werkt alleen als iedereen past — dus we kijken eerlijk, van beide kanten. Geen pitch, geen druk." },
      { n: "3", title: "Doe mee en start", desc: "Bij een match kom je in een kleine groep founders en begint de momentum direct." },
    ],
    faqEyebrow: "Goede vragen",
    faqTitle: "Veelgestelde vragen.",
    faqs: [
      { q: "Is dit coaching?", a: "Nee. Het is een foundersgroep gebouwd op structuur, accountability en steun van je peers — geen coach die tegen je praat." },
      { q: "Ik heb geen tijd.", a: "Het is één gefocust uur per week. Dat uur voorkomt dat je hele weken verliest aan de verkeerde prioriteiten." },
      { q: "Ik reis constant.", a: "Geen probleem. Het is online-first, dus je doet vanaf overal mee. Leden zitten al verspreid over de wereld." },
      { q: "Is het online?", a: "De wekelijkse sessies zijn online. Plus diners, events en een jaarlijkse summit in het echt." },
      { q: "Wie doen er mee?", a: "Founders met echte tractie die serieus bouwen en elkaar helpen groeien." },
    ],
    finalTitleA: "Je business groeit",
    finalTitleB: "zo snel als jij groeit.",
    finalSub: "Stop met het alleen uitzoeken. Laat je gegevens achter en Lennart neemt persoonlijk contact op om je selectiegesprek te plannen.",
    received: "Ontvangen.",
    receivedSub: "Lennart neemt persoonlijk contact op om je selectiegesprek in te plannen. Houd je WhatsApp en inbox in de gaten.",
    fName: "Volledige naam",
    fEmail: "E-mailadres",
    fWhats: "WhatsApp (incl. landcode)",
    fBiz: "Wat doet je bedrijf? (1 regel)",
    fGoal: "Je grootste doel op dit moment",
    sending: "Versturen…",
    freeBySelection: "Gratis · Alleen op selectie",
    fullDetails: "Alle details",
    footer: "Shoulder to Shoulder · Alleen op selectie",
    dinnerCaps: ["Founder-diner", "De groep", "Samen"],
  },
};

export default function Join() {
  const { lang } = useLang();
  const t = copy[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [business, setBusiness] = useState("");
  const [goal, setGoal] = useState("");
  const [hp, setHp] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSending(true);
    await submitToInbox(
      `Selection call request — ${name}`,
      { Name: name, Email: email, WhatsApp: whatsapp || "—", Business: business || "—", "Biggest goal": goal || "—", Language: lang.toUpperCase(), Source: "Dinner landing page (/join)" },
      hp
    );
    setSending(false);
    setSent(true);
  }

  function book() {
    if (CAL_LINK) { window.open(CAL_LINK, "_blank"); return; }
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  }

  const btnLight = (extra: React.CSSProperties = {}): React.CSSProperties => ({ color: "#15130f", background: "#fff", padding: "17px 34px", borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: "pointer", border: "none", fontFamily: "inherit", ...extra });
  const mediaBox: React.CSSProperties = { position: "relative", width: "100%", borderRadius: 16, overflow: "hidden", background: "linear-gradient(135deg, #1c1915, #2e2820)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" };

  return (
    <div style={{ background: "#0f0e0b", color: "#f0ece4", fontFamily: "var(--font-sans), ui-sans-serif, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, background: "linear-gradient(to bottom, rgba(10,9,7,0.6), transparent)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ width: 32, height: 32, borderRadius: 9, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", gap: 3.5 }}>
              <span style={{ width: 5, height: 14, borderRadius: 3, background: "#fff" }} />
              <span style={{ width: 5, height: 14, borderRadius: 3, background: "#fff", opacity: 0.72 }} />
            </span>
            <span style={{ fontSize: 15.5, fontWeight: 800, color: "#fff" }}>Shoulder to Shoulder</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <LanguageToggle dark />
            <button onClick={book} className="btn-light nav-links" style={btnLight({ padding: "10px 20px", fontSize: 13.5 })}>{t.book}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <Image src="/founders.jpg" alt="Founders together" fill className="ken-burns photo-grade" style={{ objectFit: "cover" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,9,7,0.55) 0%, rgba(10,9,7,0.2) 35%, rgba(10,9,7,0.6) 65%, rgba(10,9,7,0.95) 100%)" }} />
        <div className="fade-up" style={{ position: "relative", maxWidth: 1080, margin: "0 auto", width: "100%", padding: "0 24px 80px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100, padding: "7px 16px", marginBottom: 26, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>{t.bySelection}</span>
          </div>
          <p style={{ fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>{t.heroKicker}</p>
          <h1 style={{ fontSize: "clamp(42px,7vw,86px)", fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.035em", color: "#fff", maxWidth: 820, marginBottom: 24 }}>
            {t.heroTitleA}<span style={{ color: ACCENT }}>{t.heroTitleB}</span>
          </h1>
          <p style={{ maxWidth: 560, fontSize: 18.5, lineHeight: 1.55, color: "rgba(255,255,255,0.8)", marginBottom: 36, fontWeight: 500 }}>{t.heroSub}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button onClick={book} className="btn-light" style={btnLight()}>{t.bookArrow}</button>
            <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{t.freeNoPitch}</span>
          </div>
        </div>
      </header>

      {/* WHAT YOU'LL GET */}
      <section style={{ background: "#fff", color: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 52px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>{t.getEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.getTitle}</h2>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {t.benefits.map((b, i) => (
              <div key={b.title} className="card-lift" style={{ background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: "34px 30px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 10, background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`, color: ACCENT, fontWeight: 800, fontSize: 17 }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginTop: 20, letterSpacing: "-0.01em" }}>{b.title}</h3>
                <p style={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.6, color: "#5f5a51" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUT I ALREADY KNOW FOUNDERS */}
      <section style={{ background: "#15130f", padding: "100px 24px" }}>
        <div className="flex-wrap-col" style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 56, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: ACCENT }}>{t.knowKicker}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(26px,3.6vw,38px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}>{t.knowTitle}</h2>
            <p style={{ marginTop: 18, fontSize: 16.5, lineHeight: 1.65, color: "#a59e93" }}>{t.knowP1}</p>
            <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.65, color: "#f0ece4" }}>{t.knowP2a}<strong>{t.knowP2b}</strong>{t.knowP2c}</p>
          </div>
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <div style={{ ...mediaBox, aspectRatio: "16/11" }}>
              <div style={{ textAlign: "center", padding: 20 }}>
                <span style={{ fontSize: 30 }}>📊</span>
                <p style={{ marginTop: 10, fontSize: 12.5, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>{t.dashboardCaption}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT RUNS */}
      <section style={{ background: "#0f0e0b", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>{t.runEyebrow}</span>
          <h2 style={{ marginTop: 10, fontSize: "clamp(26px,3.8vw,40px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>{t.runTitle}</h2>
          <div style={{ marginTop: 44, ...mediaBox, aspectRatio: "16/9", maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
            <Image src="/session.jpg" alt="Live group session" fill className="photo-grade" style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,7,0.7), transparent 55%)", display: "flex", alignItems: "flex-end", padding: 22 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#fff" }}>{t.runCaption}</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ background: "#fff", color: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 44px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>{t.forEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.forTitle}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {t.forYou.map((f) => (
              <div key={f} style={{ display: "flex", gap: 14, alignItems: "center", background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: "18px 24px" }}>
                <span style={{ flex: "0 0 auto", color: ACCENT, fontSize: 17, fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: 16.5, fontWeight: 600 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ background: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 44px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>{t.resultsEyebrow}</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff" }}>{t.resultsTitle}</h2>
          </div>
          <div style={{ ...mediaBox, aspectRatio: "16/9", maxWidth: 820, margin: "0 auto 24px" }}>
            <iframe src="https://drive.google.com/file/d/144mWmikXCAq_pEbl_U1d19YJ33m62y55/preview" allow="autoplay; fullscreen" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} title="Member testimonial" />
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
            {t.testimonials.map((tt) => (
              <div key={tt.name} style={{ background: "rgba(232,116,43,0.07)", border: "1px solid rgba(232,116,43,0.35)", borderRadius: 16, padding: "30px 30px" }}>
                <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 40, color: ACCENT, lineHeight: 0.4, display: "block" }}>&quot;</span>
                <p style={{ marginTop: 10, fontSize: 16.5, lineHeight: 1.5, fontWeight: 500, color: "#f0ece4" }}>{tt.quote}</p>
                <p style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em" }}>{tt.name.toUpperCase()} · {tt.type}</p>
              </div>
            ))}
          </div>
          <div className="photo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20 }}>
            {[{ src: "/dinner.jpg" }, { src: "/event-group.jpg" }, { src: "/mastermind.jpg" }].map((p, i) => (
              <div key={p.src} className="photo-zoom" style={{ position: "relative", aspectRatio: "1/1", borderRadius: 12, overflow: "hidden" }}>
                <Image src={p.src} alt={t.dinnerCaps[i]} fill className="photo-grade" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#fff", color: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 52px" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>{t.howEyebrow}</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.howTitle}</h2>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {t.steps.map((s) => (
              <div key={s.n} className="card-lift" style={{ background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: "34px 30px", textAlign: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: "50%", background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 19 }}>{s.n}</span>
                <h3 style={{ fontSize: 19, fontWeight: 800, marginTop: 18 }}>{s.title}</h3>
                <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.55, color: "#6b665d" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#0f0e0b", padding: "100px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>{t.faqEyebrow}</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff" }}>{t.faqTitle}</h2>
          </div>
          {t.faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "22px 4px", textAlign: "left", fontFamily: "inherit" }}>
                <span style={{ fontSize: 17.5, fontWeight: 600, color: "#f0ece4" }}>{f.q}</span>
                <span style={{ flex: "0 0 auto", width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: ACCENT, fontWeight: 600 }}>{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ padding: "0 4px 24px", maxWidth: 640, fontSize: 16, lineHeight: 1.6, color: "#a59e93" }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA / BOOK */}
      <section id="book" style={{ position: "relative", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/event-group.jpg" alt="" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 60%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,7,0.92)" }} />
        <div style={{ position: "relative", maxWidth: 620, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(30px,4.6vw,52px)", fontWeight: 800, lineHeight: 1.03, letterSpacing: "-0.03em", color: "#fff" }}>{t.finalTitleA}<br />{t.finalTitleB}</h2>
          <p style={{ margin: "18px auto 0", maxWidth: 440, fontSize: 17, lineHeight: 1.55, color: "#a59e93" }}>{t.finalSub}</p>
          {sent ? (
            <div style={{ margin: "36px auto 0", maxWidth: 480, border: `1px solid ${ACCENT}`, background: "rgba(232,116,43,0.1)", padding: 28, borderRadius: 14 }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{t.received}</p>
              <p style={{ marginTop: 8, fontSize: 15, color: "#a59e93" }}>{t.receivedSub}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ margin: "36px auto 0", maxWidth: 480, display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
              <input required type="text" placeholder={t.fName} value={name} onChange={(e) => setName(e.target.value)} className="input-premium" style={fieldStyle} />
              <input required type="email" placeholder={t.fEmail} value={email} onChange={(e) => setEmail(e.target.value)} className="input-premium" style={fieldStyle} />
              <input type="tel" placeholder={t.fWhats} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="input-premium" style={fieldStyle} />
              <input type="text" placeholder={t.fBiz} value={business} onChange={(e) => setBusiness(e.target.value)} className="input-premium" style={fieldStyle} />
              <input type="text" placeholder={t.fGoal} value={goal} onChange={(e) => setGoal(e.target.value)} className="input-premium" style={fieldStyle} />
              <button type="submit" disabled={sending} className="btn-primary" style={{ marginTop: 6, background: ACCENT, color: "#fff", border: "none", padding: "17px 24px", fontSize: 16, fontWeight: 700, borderRadius: 100, cursor: "pointer", fontFamily: "inherit" }}>
                {sending ? t.sending : t.bookArrow}
              </button>
              <p style={{ fontSize: 12, color: "#8a847a", textAlign: "center", marginTop: 2 }}>{t.freeBySelection}</p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f0e0b", color: "#7d766c", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 24px", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#9a9389", fontWeight: 600 }}>{t.footer}</span>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <LanguageToggle dark />
            <a href="https://www.instagram.com/lennartvanderziel/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#9a9389", fontSize: 13 }}>Instagram</a>
            <a href="/shoulder-to-shoulder" style={{ textDecoration: "none", color: "#9a9389", fontSize: 13 }}>{t.fullDetails}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.16)",
  color: "#15130f",
  padding: "15px 18px",
  fontSize: 15,
  fontFamily: "var(--font-sans), sans-serif",
  borderRadius: 10,
  outline: "none",
};

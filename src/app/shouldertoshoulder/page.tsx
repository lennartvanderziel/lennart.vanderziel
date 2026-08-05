"use client";
import { useState } from "react";
import Image from "next/image";
import { useLang, LanguageToggle } from "@/components/i18n";

const ACCENT = "#E8742B";
const CAL_LINK = "https://calendar.app.google/wguaVQyvxW8Rbsxx9"; // Google Calendar booking (auto-adds Meet)

const MUT = "#c2bbae";
const MUT_SOFT = "#d8d2c7";

const copy = {
  en: {
    book: "Book a Founder Fit Call",
    bookArrow: "Book a Founder Fit Call →",
    bySelection: "By selection only",

    heroKicker: "Scale to 7 and 8 figures and beyond, alongside exceptional founders.",
    heroTitleA: "Your own weekly ",
    heroTitleB: "board of founders.",
    heroSub: "A hand-picked circle of entrepreneurs who make the big decisions with you, inside a system built to make growth inevitable.",
    freeNoPitch: "Free · No pitch · 30 minutes",

    changeEyebrow: "What changes",
    changes: [
      { title: "Faster growth", desc: "Real progress every week, instead of guessing alone." },
      { title: "More confidence", desc: "A circle that knows your business has your back on every hard call." },
      { title: "More fun", desc: "Wins get shared, problems get lighter, building stops feeling lonely." },
    ],

    storyEyebrow: "Why this exists",
    storyLead: "Every founder knows the feeling. Some weeks you're on fire, solving big problems. Other weeks you're stuck. That's frustrating, because you're losing momentum, money and growth.",
    storyBridge: "But there's another way. The fastest-growing entrepreneurs have a few things in common:",
    storyPoints: [
      "Collaboration with exceptional founders who have been there.",
      "Solving critical problems before they cost them weeks of growth.",
      "Sharing exclusive opportunities before the rest of the world hears about them.",
    ],
    storyQuote: "Others see what you can't, and know things you don't.",
    storyImagine: "Imagine overcoming obstacles faster. Imagine consistently acting on the highest-leverage opportunities. How much further ahead would your business be in 12 months? And in 3 years?",
    storyClosePre: "This is why Shoulder to Shoulder exists: ",
    storyCloseAccent: "make reaching your potential inevitable.",

    netEyebrow: "“But I already know entrepreneurs”",
    netTitle: "Knowing people isn't having a circle.",
    netP: "You have contacts and WhatsApp groups. That creates conversations. Not progress.",
    netLeftTitle: "Networking",
    netLeft: ["Different people each time", "Surface-level advice", "You decide alone", "Forgotten by next week"],
    netRightTitle: "Shoulder to Shoulder",
    netRight: ["The same circle, every week", "They know your business", "Big decisions made together", "A system that compounds"],

    sysEyebrow: "The system",
    sysTitle: "How growth becomes inevitable.",
    sysItems: ["Set your 10 goals", "Outside-the-box strategies", "Needle-moving actions", "Accountability dashboard", "Bottlenecks cleared together"],
    sysClose: "So growth becomes inevitable.",
    meetCaption: "A weekly session on Google Meet",

    circleEyebrow: "How it's built",
    circleTitle: "Your circle of six. Plus the whole club.",
    circleCrewTitle: "Your circle of six",
    circleCrewDesc: "Six entrepreneurs at your level. Same faces every week. This is your board.",
    circleCommTitle: "The club",
    circleCommDesc: "Monthly dinners, real friendships, and an annual summit where everyone meets.",
    dinnerCaps: ["Founder dinner", "The club", "Together"],

    aboutEyebrow: "Who runs it",
    aboutName: "Lennart van der Ziel",
    aboutRole: "Founder of Shoulder to Shoulder",
    aboutChips: ["Tech founder & CEO", "Award-winning startup", "100+ founders guided"],
    aboutP: "I was a successful tech founder and CEO. In those years I missed a group like this. I made a lot of mistakes, felt alone, and decided to build what I wish I'd had.",

    fitEyebrow: "Who belongs here",
    fitTitle: "This is for you if:",
    fitItems: [
      "You know you're your own bottleneck.",
      "You'd grow faster with the right people.",
      "You want the truth, not ego protection.",
      "You're ambitious and all in.",
    ],

    resultsEyebrow: "Results",
    resultsTitle: "What members say.",
    videoCaption: "Zach · Member",
    testimonials: [
      { quote: "I'd been stuck on a real estate idea for months. With the circle it became land I now own and a 14-unit project.", name: "Samer", type: "Member · Real estate" },
      { quote: "I started thinking like the founder I need to become to raise €40M. It changed everything.", name: "Kibet", type: "Member · Agritech" },
    ],

    selEyebrow: "Why we select",
    selTitle: "We select carefully.",
    selP: "One wrong member lowers it for everyone. So it starts with a conversation, not a checkout.",

    faqEyebrow: "Honest answers",
    faqTitle: "Common questions.",
    faqs: [
      { q: "I already know entrepreneurs.", a: "Knowing people creates conversations. This creates progress: the same circle, every week, making the big decisions with you." },
      { q: "I'm already in WhatsApp groups.", a: "Those are noise. This is one focused hour a week with a real system behind it." },
      { q: "I'm too busy.", a: "One focused hour a week stops you losing whole weeks to the wrong priorities." },
      { q: "Is it worth it?", a: "Avoiding one expensive mistake pays for years." },
      { q: "I'm not sure about the other members.", a: "That's why we select carefully. Everyone earns their place." },
    ],

    finalKicker: "The honest question:",
    finalTitleA: "How much faster could you move",
    finalTitleB: "with the right people?",
    finalSub: "Book a Founder Fit Call. Relaxed, no pitch, 30 minutes.",
    freeBySelection: "Free · By selection only",
    fullDetails: "Full details",
    footer: "Shoulder to Shoulder · By selection only",
  },

  nl: {
    book: "Boek een Founder Fit Call",
    bookArrow: "Boek een Founder Fit Call →",
    bySelection: "Alleen op selectie",

    heroKicker: "Schaal naar 7 en 8 cijfers en verder, naast uitzonderlijke ondernemers.",
    heroTitleA: "Je eigen wekelijkse ",
    heroTitleB: "raad van founders.",
    heroSub: "Een zorgvuldig geselecteerde kring ondernemers die de grote beslissingen mét je nemen, binnen een systeem gebouwd om groei onvermijdelijk te maken.",
    freeNoPitch: "Gratis · Geen pitch · 30 minuten",

    changeEyebrow: "Wat er verandert",
    changes: [
      { title: "Sneller groeien", desc: "Elke week echte progressie, in plaats van alleen gokken." },
      { title: "Meer vertrouwen", desc: "Een kring die je business kent staat achter je bij elke lastige keuze." },
      { title: "Meer plezier", desc: "Wins worden gedeeld, problemen lichter, ondernemen voelt niet langer eenzaam." },
    ],

    storyEyebrow: "Waarom dit bestaat",
    storyLead: "Elke founder kent het gevoel. Sommige weken sta je in vuur en vlam en los je grote problemen op. Andere weken zit je vast. En dat is frustrerend, want je verliest momentum, geld en groei.",
    storyBridge: "Maar er is een andere manier. De snelst groeiende ondernemers hebben een paar dingen gemeen:",
    storyPoints: [
      "Samenwerken met uitzonderlijke founders die er al geweest zijn.",
      "Kritieke problemen oplossen voordat ze weken groei kosten.",
      "Exclusieve kansen delen voordat de rest van de wereld ervan hoort.",
    ],
    storyQuote: "Anderen zien wat jij niet ziet, en weten wat jij niet weet.",
    storyImagine: "Stel je voor dat je obstakels sneller overwint. Stel je voor dat je consistent inzet op de kansen met de meeste impact. Hoeveel verder zou je business zijn over 12 maanden? En over 3 jaar?",
    storyClosePre: "Daarom bestaat Shoulder to Shoulder: ",
    storyCloseAccent: "je potentieel bereiken onvermijdelijk maken.",

    netEyebrow: "“Maar ik ken al ondernemers”",
    netTitle: "Mensen kennen is geen kring hebben.",
    netP: "Je hebt contacten en WhatsApp-groepen. Dat levert gesprekken op. Geen progressie.",
    netLeftTitle: "Netwerken",
    netLeft: ["Elke keer andere mensen", "Oppervlakkig advies", "Je beslist alleen", "Volgende week vergeten"],
    netRightTitle: "Shoulder to Shoulder",
    netRight: ["Dezelfde kring, elke week", "Ze kennen je business", "Grote beslissingen samen", "Een systeem dat compound"],

    sysEyebrow: "Het systeem",
    sysTitle: "Hoe groei onvermijdelijk wordt.",
    sysItems: ["Stel je 10 doelen", "Outside-the-box strategieën", "Needle-moving acties", "Accountability-dashboard", "Bottlenecks samen opgelost"],
    sysClose: "Zo wordt groei onvermijdelijk.",
    meetCaption: "Een wekelijkse sessie op Google Meet",

    circleEyebrow: "Hoe het is opgebouwd",
    circleTitle: "Je kring van zes. Plus de hele club.",
    circleCrewTitle: "Je kring van zes",
    circleCrewDesc: "Zes ondernemers op jouw niveau. Dezelfde gezichten elke week. Dit is je board.",
    circleCommTitle: "De club",
    circleCommDesc: "Maandelijkse diners, echte vriendschappen, en een jaarlijkse summit waar iedereen samenkomt.",
    dinnerCaps: ["Founder-diner", "De club", "Samen"],

    aboutEyebrow: "Wie het leidt",
    aboutName: "Lennart van der Ziel",
    aboutRole: "Founder van Shoulder to Shoulder",
    aboutChips: ["Tech founder & CEO", "Bekroonde startup", "100+ founders begeleid"],
    aboutP: "Ik was een succesvolle tech-founder en CEO. In die jaren miste ik een groep als deze. Ik maakte veel fouten, voelde me alleen, en besloot te bouwen wat ik zelf had willen hebben.",

    fitEyebrow: "Wie hier thuishoort",
    fitTitle: "Dit is voor jou als:",
    fitItems: [
      "Je weet dat je je eigen bottleneck bent.",
      "Je sneller zou groeien met de juiste mensen.",
      "Je de waarheid wil, geen ego-bescherming.",
      "Je ambitieus bent en er volledig voor gaat.",
    ],

    resultsEyebrow: "Resultaten",
    resultsTitle: "Wat leden zeggen.",
    videoCaption: "Zach · Lid",
    testimonials: [
      { quote: "Ik zat al maanden vast op een vastgoedidee. Met de kring werd het grond die ik nu bezit en een project van 14 units.", name: "Samer", type: "Lid · Vastgoed" },
      { quote: "Ik begon te denken als de founder die ik moet worden om €40M op te halen. Dat veranderde alles.", name: "Kibet", type: "Lid · Agritech" },
    ],

    selEyebrow: "Waarom we selecteren",
    selTitle: "We selecteren zorgvuldig.",
    selP: "Eén verkeerd lid verlaagt het voor iedereen. Dus het begint met een gesprek, niet met een afrekenscherm.",

    faqEyebrow: "Eerlijke antwoorden",
    faqTitle: "Veelgestelde vragen.",
    faqs: [
      { q: "Ik ken al ondernemers.", a: "Mensen kennen levert gesprekken op. Dit levert progressie op: dezelfde kring, elke week, die de grote beslissingen mét je maakt." },
      { q: "Ik zit al in WhatsApp-groepen.", a: "Dat is ruis. Dit is één gefocust uur per week met een echt systeem erachter." },
      { q: "Ik heb geen tijd.", a: "Eén gefocust uur per week voorkomt dat je hele weken verliest aan de verkeerde prioriteiten." },
      { q: "Is het het waard?", a: "Eén dure fout vermijden verdient zich jaren terug." },
      { q: "Ik twijfel over de andere leden.", a: "Daarom selecteren we zorgvuldig. Iedereen verdient z'n plek." },
    ],

    finalKicker: "De eerlijke vraag:",
    finalTitleA: "Hoeveel sneller zou je bewegen",
    finalTitleB: "met de juiste mensen?",
    finalSub: "Boek een Founder Fit Call. Ontspannen, geen pitch, 30 minuten.",
    freeBySelection: "Gratis · Alleen op selectie",
    fullDetails: "Alle details",
    footer: "Shoulder to Shoulder · Alleen op selectie",
  },
};

export default function Join() {
  const { lang } = useLang();
  const t = copy[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function book() {
    if (CAL_LINK) { window.open(CAL_LINK, "_blank"); return; }
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  }

  const btnLight = (extra: React.CSSProperties = {}): React.CSSProperties => ({ color: "#15130f", background: "#fff", padding: "17px 34px", borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: "pointer", border: "none", fontFamily: "inherit", ...extra });
  const mediaBox: React.CSSProperties = { position: "relative", width: "100%", borderRadius: 16, overflow: "hidden", background: "linear-gradient(135deg, #1c1915, #2e2820)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" };
  const eyebrow = (color = ACCENT): React.CSSProperties => ({ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color });

  return (
    <div style={{ background: "#0f0e0b", color: "#f0ece4", fontFamily: "var(--font-sans), ui-sans-serif, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, background: "linear-gradient(to bottom, rgba(10,9,7,0.75), transparent)" }}>
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
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,9,7,0.6) 0%, rgba(10,9,7,0.28) 35%, rgba(10,9,7,0.7) 68%, rgba(10,9,7,0.97) 100%)" }} />
        <div className="fade-up" style={{ position: "relative", maxWidth: 1080, margin: "0 auto", width: "100%", padding: "0 24px 80px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.4)", borderRadius: 100, padding: "7px 16px", marginBottom: 26, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.16)" }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>{t.bySelection}</span>
          </div>
          <p style={{ fontSize: 18.5, fontWeight: 700, color: "#fff", marginBottom: 12, textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}>{t.heroKicker}</p>
          <h1 style={{ fontSize: "clamp(42px,7vw,86px)", fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.035em", color: "#fff", maxWidth: 820, marginBottom: 24 }}>
            {t.heroTitleA}<span style={{ color: ACCENT }}>{t.heroTitleB}</span>
          </h1>
          <p style={{ maxWidth: 580, fontSize: 18.5, lineHeight: 1.55, color: MUT_SOFT, marginBottom: 36, fontWeight: 500 }}>{t.heroSub}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button onClick={book} className="btn-light" style={btnLight()}>{t.bookArrow}</button>
            <span style={{ fontSize: 13.5, color: MUT, fontWeight: 600 }}>{t.freeNoPitch}</span>
          </div>
        </div>
      </header>

      {/* WHAT CHANGES — results high up */}
      <section style={{ background: "#fff", color: "#15130f", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={eyebrow()}>{t.changeEyebrow}</span>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {t.changes.map((b, i) => (
              <div key={b.title} className="card-lift" style={{ background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: "32px 28px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 10, background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`, color: ACCENT, fontWeight: 800, fontSize: 16 }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontSize: 21, fontWeight: 800, marginTop: 18, letterSpacing: "-0.01em" }}>{b.title}</h3>
                <p style={{ marginTop: 8, fontSize: 15.5, lineHeight: 1.55, color: "#5f5a51" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORYLINE — why this exists */}
      <section style={{ background: "#0f0e0b", padding: "100px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <span style={eyebrow()}>{t.storyEyebrow}</span>
          <p style={{ marginTop: 18, fontSize: "clamp(20px,2.6vw,27px)", lineHeight: 1.45, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{t.storyLead}</p>
          <p style={{ marginTop: 24, fontSize: 17.5, lineHeight: 1.6, color: MUT_SOFT }}>{t.storyBridge}</p>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 13 }}>
            {t.storyPoints.map((p) => (
              <div key={p} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ flex: "0 0 auto", marginTop: 2, width: 22, height: 22, borderRadius: "50%", background: ACCENT, color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
                <span style={{ fontSize: 16.5, lineHeight: 1.5, color: "#f0ece4", fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: "38px 0", textAlign: "center", fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: "clamp(23px,3.4vw,32px)", lineHeight: 1.3, color: ACCENT }}>&ldquo;{t.storyQuote}&rdquo;</p>
          <p style={{ fontSize: 17.5, lineHeight: 1.6, color: MUT_SOFT }}>{t.storyImagine}</p>
          <p style={{ marginTop: 28, fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#fff" }}>{t.storyClosePre}<span style={{ color: ACCENT }}>{t.storyCloseAccent}</span></p>
        </div>
      </section>

      {/* NETWORKING vs STS */}
      <section style={{ background: "#fff", color: "#15130f", padding: "90px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ maxWidth: 620, marginBottom: 40 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: ACCENT }}>{t.netEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.netTitle}</h2>
            <p style={{ marginTop: 14, fontSize: 17, lineHeight: 1.55, color: "#54504a" }}>{t.netP}</p>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            <div style={{ background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: "30px 28px" }}>
              <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8f887c" }}>{t.netLeftTitle}</p>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                {t.netLeft.map((x) => (
                  <div key={x} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 15.5, color: "#54504a" }}>
                    <span style={{ flex: "0 0 auto", width: 20, height: 20, borderRadius: "50%", border: "1.5px solid rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#8f887c" }}>✕</span>
                    {x}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#15130f", border: `1px solid ${ACCENT}`, borderRadius: 16, padding: "30px 28px" }}>
              <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT }}>{t.netRightTitle}</p>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                {t.netRight.map((x) => (
                  <div key={x} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 15.5, color: "#fff", fontWeight: 500 }}>
                    <span style={{ flex: "0 0 auto", width: 20, height: 20, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 800 }}>✓</span>
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE SYSTEM — labels only */}
      <section style={{ background: "#fff", color: "#15130f", padding: "90px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={eyebrow()}>{t.sysEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.sysTitle}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.sysItems.map((s, i) => (
              <div key={s} style={{ display: "flex", gap: 16, alignItems: "center", background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "16px 22px" }}>
                <span style={{ flex: "0 0 auto", width: 36, height: 36, borderRadius: "50%", background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <span style={{ fontSize: 17.5, fontWeight: 700, letterSpacing: "-0.01em" }}>{s}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28, textAlign: "center", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
            {t.sysClose.replace(/\.$/, "")}<span style={{ color: ACCENT }}>.</span>
          </p>
        </div>
      </section>

      {/* CIRCLE OF 6 + CLUB */}
      <section style={{ background: "#15130f", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 44px" }}>
            <span style={eyebrow()}>{t.circleEyebrow}</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff" }}>{t.circleTitle}</h2>
          </div>
          <div style={{ ...mediaBox, aspectRatio: "16/10", maxWidth: 820, margin: "0 auto 20px" }}>
            <span style={{ position: "absolute", fontSize: 30, opacity: 0.5 }}>🎥</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/session-meet.jpg" alt="A weekly session on Google Meet" className="photo-grade" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,7,0.72), transparent 55%)", display: "flex", alignItems: "flex-end", padding: 20 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#fff" }}>{t.meetCaption}</span>
            </div>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            <div style={{ background: "rgba(232,116,43,0.08)", border: `1px solid ${ACCENT}`, borderRadius: 18, padding: "30px 28px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 19 }}>6</span>
              <h3 style={{ marginTop: 16, fontSize: 21, fontWeight: 800, color: "#fff" }}>{t.circleCrewTitle}</h3>
              <p style={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.55, color: MUT_SOFT }}>{t.circleCrewDesc}</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: "30px 28px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 800, fontSize: 19 }}>∞</span>
              <h3 style={{ marginTop: 16, fontSize: 21, fontWeight: 800, color: "#fff" }}>{t.circleCommTitle}</h3>
              <p style={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.55, color: MUT }}>{t.circleCommDesc}</p>
            </div>
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

      {/* ABOUT LENNART — short story */}
      <section style={{ background: "#0f0e0b", padding: "90px 24px" }}>
        <div className="flex-wrap-col" style={{ maxWidth: 980, margin: "0 auto", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 280px", minWidth: 240 }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Image src="/lennart.jpg" alt="Lennart van der Ziel" fill className="photo-grade" style={{ objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ flex: "1 1 420px" }}>
            <span style={eyebrow()}>{t.aboutEyebrow}</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(26px,3.6vw,38px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff" }}>{t.aboutName}</h2>
            <p style={{ marginTop: 6, fontSize: 14.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.03em" }}>{t.aboutRole}</p>
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {t.aboutChips.map((c) => (
                <span key={c} style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 100, padding: "6px 13px" }}>{c}</span>
              ))}
            </div>
            <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.6, color: MUT_SOFT }}>{t.aboutP}</p>
          </div>
        </div>
      </section>

      {/* WHO BELONGS — short */}
      <section style={{ background: "#fff", color: "#15130f", padding: "90px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={eyebrow()}>{t.fitEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.fitTitle}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {t.fitItems.map((f) => (
              <div key={f} style={{ display: "flex", gap: 14, alignItems: "center", background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: "16px 22px" }}>
                <span style={{ flex: "0 0 auto", color: ACCENT, fontSize: 17, fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: 16.5, fontWeight: 600 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS / TESTIMONIALS */}
      <section style={{ background: "#15130f", padding: "90px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>{t.resultsEyebrow}</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff" }}>{t.resultsTitle}</h2>
          </div>
          <div style={{ ...mediaBox, aspectRatio: "16/9", maxWidth: 820, margin: "0 auto 10px" }}>
            <iframe src="https://drive.google.com/file/d/144mWmikXCAq_pEbl_U1d19YJ33m62y55/preview" allow="autoplay; fullscreen" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} title="Member testimonial" />
          </div>
          <p style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 26 }}>{t.videoCaption}</p>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
            {t.testimonials.map((tt) => (
              <div key={tt.name} style={{ background: "rgba(232,116,43,0.07)", border: "1px solid rgba(232,116,43,0.35)", borderRadius: 16, padding: "26px 28px" }}>
                <p style={{ fontSize: 16.5, lineHeight: 1.5, fontWeight: 500, color: "#f0ece4" }}>{tt.quote}</p>
                <p style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em" }}>{tt.name.toUpperCase()} · {tt.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WE SELECT */}
      <section style={{ background: "#fff", color: "#15130f", padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <span style={eyebrow()}>{t.selEyebrow}</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(26px,3.8vw,40px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em" }}>{t.selTitle}</h2>
          <p style={{ marginTop: 16, fontSize: 17.5, lineHeight: 1.6, color: "#54504a" }}>{t.selP}</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#0f0e0b", padding: "90px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>{t.faqEyebrow}</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff" }}>{t.faqTitle}</h2>
          </div>
          {t.faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "20px 4px", textAlign: "left", fontFamily: "inherit" }}>
                <span style={{ fontSize: 17, fontWeight: 600, color: "#f0ece4" }}>{f.q}</span>
                <span style={{ flex: "0 0 auto", width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: ACCENT, fontWeight: 600 }}>{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ padding: "0 4px 22px", maxWidth: 620, fontSize: 15.5, lineHeight: 1.55, color: MUT }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="book" style={{ position: "relative", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/event-group.jpg" alt="" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 60%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,7,0.92)" }} />
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto", padding: "90px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 22, color: ACCENT }}>{t.finalKicker}</p>
          <h2 style={{ marginTop: 8, fontSize: "clamp(30px,4.6vw,52px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>{t.finalTitleA}<br />{t.finalTitleB}</h2>
          <p style={{ margin: "16px auto 0", maxWidth: 420, fontSize: 17, lineHeight: 1.5, color: MUT }}>{t.finalSub}</p>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <button onClick={book} className="btn-light" style={btnLight()}>{t.bookArrow}</button>
            <span style={{ fontSize: 12.5, color: MUT }}>{t.freeBySelection}</span>
          </div>
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

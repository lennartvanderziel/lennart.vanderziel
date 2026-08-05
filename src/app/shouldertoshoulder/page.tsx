"use client";
import { useState } from "react";
import Image from "next/image";
import { useLang, LanguageToggle } from "@/components/i18n";

const ACCENT = "#E8742B";
const CAL_LINK = "https://calendar.app.google/wguaVQyvxW8Rbsxx9";

const MUT = "#c2bbae";
const MUT_SOFT = "#d8d2c7";
const INK = "#15130f";
const INK_MUT = "#57534c";

const copy = {
  en: {
    book: "Book a Founder Fit Call",
    bookArrow: "Book a Founder Fit Call →",
    bySelection: "By selection only",

    heroTitleA: "Your weekly ",
    heroTitleB: "board of founders.",
    heroSub: "Scale to 7 and 8 figures alongside entrepreneurs who have been there.",
    freeNote: "Free · 30 min",

    storyEyebrow: "Why this exists",
    storyLead: "Every founder knows the feeling. Some weeks you're on fire. Other weeks you're stuck, losing momentum, money and growth.",
    storyBridge: "The fastest-growing entrepreneurs have a few things in common:",
    storyPoints: [
      "They collaborate with founders who have been there.",
      "They solve problems before they cost weeks of growth.",
      "They hear opportunities before the rest of the world.",
    ],
    storyQuote: "Others see what you can't, and know things you don't.",
    storyClosePre: "This is why Shoulder to Shoulder exists. ",
    storyCloseAccent: "To make reaching your potential inevitable.",

    netEyebrow: "The difference",
    netTitle: "Knowing people isn't having a circle.",
    netLeftTitle: "Networking",
    netLeft: ["Different people each time", "Surface-level advice", "You decide alone", "Forgotten by next week"],
    netRightTitle: "Shoulder to Shoulder",
    netRight: ["The same circle, every week", "They know your business", "Big decisions made together", "A system that compounds"],

    sysEyebrow: "The system",
    sysTitle: "How growth becomes inevitable.",
    sysItems: ["Set your 10 goals", "Outside-the-box strategies", "Needle-moving actions", "Accountability dashboard", "Bottlenecks cleared together"],
    sysClose: "So growth becomes inevitable.",

    setupEyebrow: "The setup",
    setupTitle: "Your circle of six. Plus the club.",
    setupCrewTitle: "Your circle of six",
    setupCrewDesc: "Six entrepreneurs at your level. Same faces every week. This is your board.",
    setupClubTitle: "The club",
    setupClubDesc: "Monthly dinners, real friendships, and a yearly summit.",
    meetCaption: "A weekly session on Google Meet",
    dinnerCaps: ["Founder dinner", "The club", "Together"],

    changeEyebrow: "What changes",
    changeTitle: "What you get out of it.",
    changes: [
      { title: "Faster growth", desc: "Real progress every week, instead of guessing alone." },
      { title: "More confidence", desc: "A circle that has your back on every hard call." },
      { title: "More fun", desc: "Wins get shared. Building stops feeling lonely." },
    ],

    resultsEyebrow: "Results",
    resultsTitle: "What members say.",
    videoCaption: "Zach · Member",
    testimonials: [
      { quote: "I'd been stuck on a real estate idea for months. With the circle it became land I now own and a 14-unit project.", name: "Samer", type: "Member · Real estate" },
      { quote: "I started thinking like the founder I need to become to raise €40M. It changed everything.", name: "Kibet", type: "Member · Agritech" },
    ],

    aboutEyebrow: "Who runs it",
    aboutName: "Lennart van der Ziel",
    aboutChips: ["Tech founder & CEO", "Award-winning startup", "100+ founders guided"],
    aboutP: "I was a successful tech founder and CEO. In those years I missed a group like this. I made a lot of mistakes, felt alone, and decided to build what I wish I'd had.",

    fitEyebrow: "Who belongs",
    fitTitle: "This is for you if:",
    fitItems: [
      "You know you're your own bottleneck.",
      "You'd grow faster with the right people.",
      "You want the truth, not ego protection.",
      "You're ambitious and all in.",
    ],
    fitNote: "We select carefully. One wrong member lowers it for everyone, so it starts with a conversation, not a checkout.",

    faqEyebrow: "FAQ",
    faqTitle: "Questions, answered.",
    faqs: [
      { q: "I already know entrepreneurs.", a: "Knowing people creates conversations. This creates progress: the same circle, every week, making the big decisions with you." },
      { q: "I'm too busy.", a: "One focused hour a week stops you losing whole weeks to the wrong priorities." },
      { q: "Is it worth it?", a: "Avoiding one expensive mistake pays for years." },
      { q: "What about the other members?", a: "That's why we select carefully. Everyone earns their place." },
    ],

    finalTitle: "How much faster could you move with the right people?",
    finalSub: "Book a Founder Fit Call. 30 minutes, no pitch.",
    footer: "Shoulder to Shoulder · By selection only",
    fullDetails: "Full details",
  },

  nl: {
    book: "Boek een Founder Fit Call",
    bookArrow: "Boek een Founder Fit Call →",
    bySelection: "Alleen op selectie",

    heroTitleA: "Je wekelijkse ",
    heroTitleB: "raad van founders.",
    heroSub: "Schaal naar 7 en 8 cijfers, naast ondernemers die er al geweest zijn.",
    freeNote: "Gratis · 30 min",

    storyEyebrow: "Waarom dit bestaat",
    storyLead: "Elke founder kent het gevoel. Sommige weken sta je in vuur en vlam. Andere weken zit je vast, en verlies je momentum, geld en groei.",
    storyBridge: "De snelst groeiende ondernemers hebben een paar dingen gemeen:",
    storyPoints: [
      "Ze werken samen met founders die er al geweest zijn.",
      "Ze lossen problemen op voordat die weken groei kosten.",
      "Ze horen kansen voordat de rest van de wereld het weet.",
    ],
    storyQuote: "Anderen zien wat jij niet ziet, en weten wat jij niet weet.",
    storyClosePre: "Daarom bestaat Shoulder to Shoulder. ",
    storyCloseAccent: "Om je potentieel bereiken onvermijdelijk te maken.",

    netEyebrow: "Het verschil",
    netTitle: "Mensen kennen is geen kring hebben.",
    netLeftTitle: "Netwerken",
    netLeft: ["Elke keer andere mensen", "Oppervlakkig advies", "Je beslist alleen", "Volgende week vergeten"],
    netRightTitle: "Shoulder to Shoulder",
    netRight: ["Dezelfde kring, elke week", "Ze kennen je business", "Grote beslissingen samen", "Een systeem dat compound"],

    sysEyebrow: "Het systeem",
    sysTitle: "Hoe groei onvermijdelijk wordt.",
    sysItems: ["Stel je 10 doelen", "Outside-the-box strategieën", "Needle-moving acties", "Accountability-dashboard", "Bottlenecks samen opgelost"],
    sysClose: "Zo wordt groei onvermijdelijk.",

    setupEyebrow: "De opzet",
    setupTitle: "Je kring van zes. Plus de club.",
    setupCrewTitle: "Je kring van zes",
    setupCrewDesc: "Zes ondernemers op jouw niveau. Dezelfde gezichten elke week. Dit is je board.",
    setupClubTitle: "De club",
    setupClubDesc: "Maandelijkse diners, echte vriendschappen, en een jaarlijkse summit.",
    meetCaption: "Een wekelijkse sessie op Google Meet",
    dinnerCaps: ["Founder-diner", "De club", "Samen"],

    changeEyebrow: "Wat er verandert",
    changeTitle: "Wat het je oplevert.",
    changes: [
      { title: "Sneller groeien", desc: "Elke week echte progressie, in plaats van alleen gokken." },
      { title: "Meer vertrouwen", desc: "Een kring die achter je staat bij elke lastige keuze." },
      { title: "Meer plezier", desc: "Wins worden gedeeld. Ondernemen voelt niet langer eenzaam." },
    ],

    resultsEyebrow: "Resultaten",
    resultsTitle: "Wat leden zeggen.",
    videoCaption: "Zach · Lid",
    testimonials: [
      { quote: "Ik zat al maanden vast op een vastgoedidee. Met de kring werd het grond die ik nu bezit en een project van 14 units.", name: "Samer", type: "Lid · Vastgoed" },
      { quote: "Ik begon te denken als de founder die ik moet worden om €40M op te halen. Dat veranderde alles.", name: "Kibet", type: "Lid · Agritech" },
    ],

    aboutEyebrow: "Wie het leidt",
    aboutName: "Lennart van der Ziel",
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
    fitNote: "We selecteren zorgvuldig. Eén verkeerd lid verlaagt het voor iedereen, dus het begint met een gesprek, niet met een afrekenscherm.",

    faqEyebrow: "FAQ",
    faqTitle: "Vragen, beantwoord.",
    faqs: [
      { q: "Ik ken al ondernemers.", a: "Mensen kennen levert gesprekken op. Dit levert progressie op: dezelfde kring, elke week, die de grote beslissingen mét je maakt." },
      { q: "Ik heb geen tijd.", a: "Eén gefocust uur per week voorkomt dat je hele weken verliest aan de verkeerde prioriteiten." },
      { q: "Is het het waard?", a: "Eén dure fout vermijden verdient zich jaren terug." },
      { q: "En de andere leden?", a: "Daarom selecteren we zorgvuldig. Iedereen verdient z'n plek." },
    ],

    finalTitle: "Hoeveel sneller zou je bewegen met de juiste mensen?",
    finalSub: "Boek een Founder Fit Call. 30 minuten, geen pitch.",
    footer: "Shoulder to Shoulder · Alleen op selectie",
    fullDetails: "Alle details",
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

  // ---- Design system ----
  const SEC = "104px 24px";
  const btnLight = (extra: React.CSSProperties = {}): React.CSSProperties => ({ color: INK, background: "#fff", padding: "16px 32px", borderRadius: 100, fontSize: 15.5, fontWeight: 700, cursor: "pointer", border: "none", fontFamily: "inherit", ...extra });
  const eyebrowS: React.CSSProperties = { fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT };
  const h2 = (dark: boolean): React.CSSProperties => ({ marginTop: 14, fontSize: "clamp(29px,3.7vw,40px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.022em", color: dark ? "#fff" : INK });
  const mediaBox: React.CSSProperties = { position: "relative", width: "100%", borderRadius: 16, overflow: "hidden", background: "linear-gradient(135deg, #1c1915, #2e2820)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" };
  const Head = ({ eye, title, dark, center }: { eye: string; title: string; dark: boolean; center?: boolean }) => (
    <div style={{ maxWidth: 640, margin: center ? "0 auto 48px" : "0 0 40px", textAlign: center ? "center" : "left" }}>
      <span style={eyebrowS}>{eye}</span>
      <h2 style={h2(dark)}>{title}</h2>
    </div>
  );

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
            <button onClick={book} className="btn-light nav-links" style={btnLight({ padding: "10px 18px", fontSize: 13.5 })}>{t.book}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header style={{ position: "relative", width: "100%", minHeight: "94vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <Image src="/founders.jpg" alt="Founders together" fill className="ken-burns photo-grade" style={{ objectFit: "cover" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,9,7,0.5) 0%, rgba(10,9,7,0.2) 38%, rgba(10,9,7,0.72) 72%, rgba(10,9,7,0.97) 100%)" }} />
        <div className="fade-up" style={{ position: "relative", maxWidth: 1080, margin: "0 auto", width: "100%", padding: "0 24px 84px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.4)", borderRadius: 100, padding: "7px 15px", marginBottom: 24, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.14)" }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff" }}>{t.bySelection}</span>
          </div>
          <h1 style={{ fontSize: "clamp(46px,7.6vw,88px)", fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.035em", color: "#fff", maxWidth: 800, marginBottom: 22 }}>
            {t.heroTitleA}<span style={{ color: ACCENT }}>{t.heroTitleB}</span>
          </h1>
          <p style={{ maxWidth: 520, fontSize: 19, lineHeight: 1.5, color: MUT_SOFT, marginBottom: 34, fontWeight: 500 }}>{t.heroSub}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button onClick={book} className="btn-light" style={btnLight({ padding: "17px 34px", fontSize: 16 })}>{t.bookArrow}</button>
            <span style={{ fontSize: 13.5, color: MUT, fontWeight: 600 }}>{t.freeNote}</span>
          </div>
        </div>
      </header>

      {/* STORY */}
      <section style={{ background: "#0f0e0b", padding: SEC, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <span style={eyebrowS}>{t.storyEyebrow}</span>
          <p style={{ marginTop: 16, fontSize: "clamp(21px,2.6vw,26px)", lineHeight: 1.4, fontWeight: 600, color: "#fff", letterSpacing: "-0.015em" }}>{t.storyLead}</p>
          <p style={{ marginTop: 26, fontSize: 17, lineHeight: 1.6, color: MUT_SOFT }}>{t.storyBridge}</p>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
            {t.storyPoints.map((p) => (
              <div key={p} style={{ display: "flex", gap: 13, alignItems: "center" }}>
                <span style={{ flex: "0 0 auto", width: 21, height: 21, borderRadius: "50%", background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
                <span style={{ fontSize: 16.5, lineHeight: 1.5, color: "#f0ece4", fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: "36px 0 0", fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: "clamp(22px,3vw,29px)", lineHeight: 1.35, color: ACCENT }}>&ldquo;{t.storyQuote}&rdquo;</p>
          <p style={{ marginTop: 30, fontSize: "clamp(20px,2.6vw,26px)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em", color: "#fff" }}>{t.storyClosePre}<span style={{ color: ACCENT }}>{t.storyCloseAccent}</span></p>
        </div>
      </section>

      {/* DIFFERENCE — table */}
      <section style={{ background: "#fff", color: INK, padding: SEC }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <Head eye={t.netEyebrow} title={t.netTitle} dark={false} />
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            <div style={{ background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: "28px 26px" }}>
              <p style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8f887c" }}>{t.netLeftTitle}</p>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 11 }}>
                {t.netLeft.map((x) => (
                  <div key={x} style={{ display: "flex", gap: 11, alignItems: "center", fontSize: 15.5, color: INK_MUT }}>
                    <span style={{ flex: "0 0 auto", width: 19, height: 19, borderRadius: "50%", border: "1.5px solid rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#8f887c" }}>✕</span>
                    {x}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: INK, border: `1px solid ${ACCENT}`, borderRadius: 16, padding: "28px 26px" }}>
              <p style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT }}>{t.netRightTitle}</p>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 11 }}>
                {t.netRight.map((x) => (
                  <div key={x} style={{ display: "flex", gap: 11, alignItems: "center", fontSize: 15.5, color: "#fff", fontWeight: 500 }}>
                    <span style={{ flex: "0 0 auto", width: 19, height: 19, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 800 }}>✓</span>
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section style={{ background: "#15130f", padding: SEC }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Head eye={t.sysEyebrow} title={t.sysTitle} dark center />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.sysItems.map((s, i) => (
              <div key={s} style={{ display: "flex", gap: 15, alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "15px 20px" }}>
                <span style={{ flex: "0 0 auto", width: 34, height: 34, borderRadius: "50%", background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <span style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{s}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 26, textAlign: "center", fontSize: "clamp(20px,2.8vw,26px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
            {t.sysClose.replace(/\.$/, "")}<span style={{ color: ACCENT }}>.</span>
          </p>
        </div>
      </section>

      {/* SETUP — circle + club */}
      <section style={{ background: "#0f0e0b", padding: SEC }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Head eye={t.setupEyebrow} title={t.setupTitle} dark center />
          <div style={{ ...mediaBox, aspectRatio: "16/10", maxWidth: 800, margin: "0 auto 18px" }}>
            <span style={{ position: "absolute", fontSize: 30, opacity: 0.5 }}>🎥</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/session-meet.jpg" alt="A weekly session on Google Meet" className="photo-grade" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,7,0.72), transparent 55%)", display: "flex", alignItems: "flex-end", padding: 18 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.meetCaption}</span>
            </div>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            <div style={{ background: "rgba(232,116,43,0.08)", border: `1px solid ${ACCENT}`, borderRadius: 16, padding: "28px 26px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 11, background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 18 }}>6</span>
              <h3 style={{ marginTop: 15, fontSize: 20, fontWeight: 800, color: "#fff" }}>{t.setupCrewTitle}</h3>
              <p style={{ marginTop: 9, fontSize: 15.5, lineHeight: 1.55, color: MUT_SOFT }}>{t.setupCrewDesc}</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "28px 26px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 800, fontSize: 18 }}>∞</span>
              <h3 style={{ marginTop: 15, fontSize: 20, fontWeight: 800, color: "#fff" }}>{t.setupClubTitle}</h3>
              <p style={{ marginTop: 9, fontSize: 15.5, lineHeight: 1.55, color: MUT }}>{t.setupClubDesc}</p>
            </div>
          </div>
          <div className="photo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 18 }}>
            {[{ src: "/dinner.jpg" }, { src: "/event-group.jpg" }, { src: "/mastermind.jpg" }].map((p, i) => (
              <div key={p.src} className="photo-zoom" style={{ position: "relative", aspectRatio: "1/1", borderRadius: 12, overflow: "hidden" }}>
                <Image src={p.src} alt={t.dinnerCaps[i]} fill className="photo-grade" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CHANGES */}
      <section style={{ background: "#fff", color: INK, padding: SEC }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Head eye={t.changeEyebrow} title={t.changeTitle} dark={false} center />
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
            {t.changes.map((b, i) => (
              <div key={b.title} className="card-lift" style={{ background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: "30px 26px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`, color: ACCENT, fontWeight: 800, fontSize: 15 }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginTop: 16, letterSpacing: "-0.01em" }}>{b.title}</h3>
                <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.5, color: INK_MUT }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ background: "#15130f", padding: SEC }}>
        <div style={{ maxWidth: 940, margin: "0 auto" }}>
          <Head eye={t.resultsEyebrow} title={t.resultsTitle} dark center />
          <div style={{ ...mediaBox, aspectRatio: "16/9", maxWidth: 800, margin: "0 auto 10px" }}>
            <iframe src="https://drive.google.com/file/d/144mWmikXCAq_pEbl_U1d19YJ33m62y55/preview" allow="autoplay; fullscreen" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} title="Member testimonial" />
          </div>
          <p style={{ textAlign: "center", fontSize: 12.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24 }}>{t.videoCaption}</p>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 18 }}>
            {t.testimonials.map((tt) => (
              <div key={tt.name} style={{ background: "rgba(232,116,43,0.07)", border: "1px solid rgba(232,116,43,0.35)", borderRadius: 16, padding: "26px 28px" }}>
                <p style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 500, color: "#f0ece4" }}>{tt.quote}</p>
                <p style={{ marginTop: 14, fontSize: 12.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em" }}>{tt.name.toUpperCase()} · {tt.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ background: "#0f0e0b", padding: SEC }}>
        <div className="flex-wrap-col" style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 260px", minWidth: 230 }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Image src="/lennart.jpg" alt="Lennart van der Ziel" fill className="photo-grade" style={{ objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ flex: "1 1 420px" }}>
            <span style={eyebrowS}>{t.aboutEyebrow}</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(26px,3.4vw,36px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}>{t.aboutName}</h2>
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {t.aboutChips.map((c) => (
                <span key={c} style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 100, padding: "6px 13px" }}>{c}</span>
              ))}
            </div>
            <p style={{ marginTop: 18, fontSize: 16.5, lineHeight: 1.6, color: MUT_SOFT }}>{t.aboutP}</p>
          </div>
        </div>
      </section>

      {/* WHO BELONGS + SELECT */}
      <section style={{ background: "#fff", color: INK, padding: SEC }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Head eye={t.fitEyebrow} title={t.fitTitle} dark={false} center />
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {t.fitItems.map((f) => (
              <div key={f} style={{ display: "flex", gap: 13, alignItems: "center", background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: "16px 22px" }}>
                <span style={{ flex: "0 0 auto", color: ACCENT, fontSize: 16, fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: 16.5, fontWeight: 600 }}>{f}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 22, textAlign: "center", fontSize: 15, lineHeight: 1.6, color: INK_MUT, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>{t.fitNote}</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#15130f", padding: SEC }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Head eye={t.faqEyebrow} title={t.faqTitle} dark center />
          {t.faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "20px 4px", textAlign: "left", fontFamily: "inherit" }}>
                <span style={{ fontSize: 16.5, fontWeight: 600, color: "#f0ece4" }}>{f.q}</span>
                <span style={{ flex: "0 0 auto", width: 27, height: 27, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: ACCENT, fontWeight: 600 }}>{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ padding: "0 4px 20px", maxWidth: 600, fontSize: 15.5, lineHeight: 1.55, color: MUT }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="book" style={{ position: "relative", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/event-group.jpg" alt="" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 60%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,7,0.93)" }} />
        <div style={{ position: "relative", maxWidth: 620, margin: "0 auto", padding: "104px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,48px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fff" }}>{t.finalTitle}</h2>
          <p style={{ margin: "16px auto 0", maxWidth: 400, fontSize: 16.5, lineHeight: 1.5, color: MUT }}>{t.finalSub}</p>
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <button onClick={book} className="btn-light" style={btnLight({ padding: "17px 34px", fontSize: 16 })}>{t.bookArrow}</button>
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

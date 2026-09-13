"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang, LanguageToggle } from "@/components/i18n";
import ApplyModal from "@/components/ApplyModal";

const ACCENT = "#E8742B";

const MUT = "#c2bbae";
const MUT_SOFT = "#d8d2c7";
const INK = "#15130f";
const INK_MUT = "#57534c";

type Member = { name: string; tag: string; img: string; pos?: string; scale?: number; note?: string };
const members: Member[] = [
  { name: "Kibet", tag: "AgTech hardware · raising Series A", img: "/members/Kibet.png" },
  { name: "David", tag: "Bali real estate investment", img: "/members/David.png" },
  { name: "Demian", tag: "2× AI-run B2B SaaS", img: "/members/Demian.jpeg", scale: 1.3 },
  { name: "Dane", tag: "AI platform for filmmakers", img: "/members/Dane.jpeg" },
  { name: "Samer", tag: "Airbnb · building a 16-unit project", img: "/members/Samer.png" },
  { name: "Zach", tag: "Health & wellbeing app", img: "/members/Zach.png", pos: "center 18%" },
];

const copy = {
  en: {
    apply: "Apply",
    applyArrow: "Apply for this cohort →",
    byInvite: "By invitation only",

    heroTitleA: "The founders who grow fastest ",
    heroTitleB: "never do it alone",
    heroSub: "A hand-picked circle that helps you grow exponentially.",
    cohortPill: "Next Founder Circle · Starts October 2026",

    painEyebrow: "Why together is better",
    painIntro: "Your business is growing. But what if you'd be challenged to do the uncomfortable, every single week? How much further ahead would your business be in a year?",
    painAloneTitle: "Alone",
    painAlone: ["You make the big calls alone", "Fewer opportunities reach you", "No one keeps you accountable"],
    painTogetherTitle: "Together",
    painTogether: ["You decide with a team behind you", "Opportunities in abundance", "You're held accountable"],

    changeEyebrow: "What you get",
    changeTitle: "What joining a circle changes",
    changes: [
      { title: "Exponential growth", desc: "Normal founders grow linearly. Together we grow exponentially." },
      { title: "Feeling supported", desc: "A real team of founders around you, who know your business." },
      { title: "Enjoy the journey", desc: "Side quests, dinners and activities. You're not alone anymore." },
    ],


    globalEyebrow: "The bigger vision",
    globalTitle: "One family, wherever you go.",
    globalBody: "Someone to call when things get hard. Deals shared before anyone else hears. Lifelong memories, living together in villas from Bali to Cape Town. Wherever you land, you already have friends there.",

    roomEyebrow: "The members",
    roomTitle: "Some of our members, based across 3 continents",
    selEyebrow: "Who we are",
    selTitle: "Not a typical founder club",
    selBody: "We're not the group with the big watches, chasing the biggest car. We're conscious men who've done real inner work, matched on character and development level, not just business success. We want each other to become the best version of ourselves, in business and in life.",

    proofEyebrow: "Proof",
    proofTitle: "The difference it made",
    videoCaption: "Zach · Member",
    videoCaptionDavid: "David · Member",
    testimonials: [
      { quote: "I'd been stuck on a real estate idea for months. With the circle it became land I now own and a 14-unit project.", name: "Samer", type: "member" },
      { quote: "I started thinking like the founder I need to become to raise €40M. It changed everything.", name: "Kibet", type: "member" },
    ],
    dinnerCaps: ["Founder dinner", "Weekly online call", "Founder event"],

    howEyebrow: "Our growth system",
    howTitle: "One hour to make all the other hours better.",
    howNote: "4 sessions a month, always 60 minutes.",
    howMonthly: ["2× Hot-seat", "1× Expert session", "1× Personal growth"],
    howExtraLabel: "Plus",
    howExtra: ["Growth dashboard", "In-person events", "Monthly 1-on-1"],

    hostEyebrow: "Your coach",
    hostName: "Lennart van der Ziel",
    hostChips: ["Business & performance coach", "Former tech CEO", "100+ founders guided"],
    hostDesc: "Former tech CEO turned business and performance coach. I built Travis the Translator, named Dutch Startup of the Year, sold 200,000+ devices worldwide, and helped start one of the Netherlands' largest founder communities. Since then I've personally guided over 100 founders, through their business, their health and their mindset. Today I bring all of that into Shoulder to Shoulder, as your facilitator and coach.",

    faqEyebrow: "FAQ",
    faqTitle: "Good questions",
    faqs: [
      { q: "Is it online or offline?", a: "Both. Your weekly circle meets online, so you join from anywhere. Dinners, events and gatherings happen in person with the whole club." },
      { q: "What if I travel or don't live nearby?", a: "No problem. Members are spread across the world and circles are online, so location never gets in the way. The in-person events are a bonus, not a requirement." },
      { q: "I already have a strong network.", a: "Networks create conversations. A circle creates progress: the same people every week who know your business and hold you to your word." },
      { q: "I'm looking into a coach or mentor.", a: "This works alongside them. A coach gives one perspective. Here you get a whole circle plus weekly accountability." },
      { q: "Is this coaching?", a: "No. It's peers, not a coach talking at you." },
      { q: "I'm too busy.", a: "It's one focused hour a week, and it saves you far more. You set better priorities, make fewer bad decisions, and spend less time on things that don't matter." },
      { q: "How does the application actually work?", a: "We work in cohorts, not open enrollment. When you apply, we look at fit with the upcoming Circle specifically. If there's a potential match, you're invited to a call where we figure out together whether it's a real fit." },
      { q: "What if I don't get into this cohort?", a: "If the current Circle is full or the timing isn't right yet, you'll be considered for the next cohort, we just can't promise exactly when that opens." },
    ],

    eventEyebrow: "Our events",
    eventLook: "Bringing the members together",
    cohortLabel: "Next Founder Circle",
    cohortDetail: "October 2026 · 6 founders · Applications close September 30",
    cohortDays: (n: number) => `${n} day${n === 1 ? "" : "s"} left to apply`,
    finalTitle: "Ready to grow faster?",
    footer: "Shoulder to Shoulder",
    fullDetails: "Full details",
  },

  nl: {
    apply: "Aanmelden",
    applyArrow: "Meld je aan voor dit cohort →",
    byInvite: "Alleen op uitnodiging",

    heroTitleA: "De founders die het snelst groeien ",
    heroTitleB: "doen het nooit alleen",
    heroSub: "Een zorgvuldig geselecteerde kring die je exponentieel laat groeien.",
    cohortPill: "Volgende Founder Circle · Start oktober 2026",

    painEyebrow: "Waarom samen beter is",
    painIntro: "Je business groeit. Maar wat als je elke week wordt uitgedaagd om het ongemakkelijke te doen? Hoeveel verder zou je business zijn over een jaar?",
    painAloneTitle: "Alleen",
    painAlone: ["Je maakt de grote keuzes alleen", "Minder kansen bereiken je", "Niemand houdt je accountable"],
    painTogetherTitle: "Samen",
    painTogether: ["Je beslist met een team achter je", "Kansen in overvloed", "Je wordt accountable gehouden"],

    changeEyebrow: "Wat je krijgt",
    changeTitle: "Wat verandert als je in een founder circle komt",
    changes: [
      { title: "Exponentiële groei", desc: "Normale founders groeien lineair. Samen groeien we exponentieel." },
      { title: "Gesteund voelen", desc: "Een echt team van founders om je heen, die je business kennen." },
      { title: "Geniet van de reis", desc: "Sidequests, diners en activiteiten. Je bent niet meer alleen." },
    ],


    globalEyebrow: "De grotere visie",
    globalTitle: "Eén familie, waar je ook bent.",
    globalBody: "Iemand om te bellen als het zwaar wordt. Deals die gedeeld worden voordat de rest ervan hoort. Herinneringen voor het leven, samenwonen in villa's van Bali tot Kaapstad. Waar je ook landt, je hebt er al vrienden.",

    roomEyebrow: "De members",
    roomTitle: "Een aantal van onze members, verspreid over 3 continenten",
    selEyebrow: "Wie we zijn",
    selTitle: "Geen doorsnee founderclub",
    selBody: "We zijn niet de groep met de dikke horloges, die bezig is met de grootste auto. We zijn bewuste mannen die echt innerlijk werk doen, gematcht op karakter en ontwikkelingsniveau, niet alleen op succes in business. We gunnen elkaar de beste versie van onszelf te worden, in business en in het leven.",

    proofEyebrow: "Bewijs",
    proofTitle: "Het verschil dat het maakte",
    videoCaption: "Zach · Lid",
    videoCaptionDavid: "David · Lid",
    testimonials: [
      { quote: "Ik zat al maanden vast op een vastgoedidee. Met de kring werd het grond die ik nu bezit en een project van 14 units.", name: "Samer", type: "lid" },
      { quote: "Ik begon te denken als de founder die ik moet worden om €40M op te halen. Dat veranderde alles.", name: "Kibet", type: "lid" },
    ],
    dinnerCaps: ["Founder-diner", "Wekelijkse online call", "Founder event"],

    howEyebrow: "Ons groeisysteem",
    howTitle: "Eén uur dat al je andere uren beter maakt.",
    howNote: "4 sessies per maand, altijd 60 minuten.",
    howMonthly: ["2× Hotseat", "1× Expert-sessie", "1× Personal growth"],
    howExtraLabel: "Plus",
    howExtra: ["Growth dashboard", "In-person events", "Maandelijks 1-op-1"],

    hostEyebrow: "Je coach",
    hostName: "Lennart van der Ziel",
    hostChips: ["Business & performance coach", "Voormalig tech-CEO", "100+ founders begeleid"],
    hostDesc: "Voormalig tech-CEO, nu business en performance coach. Ik bouwde Travis the Translator, uitgeroepen tot Dutch Startup of the Year, verkocht 200.000+ apparaten wereldwijd, en hielp een van de grootste foundercommunities van Nederland opstarten. Sindsdien heb ik persoonlijk meer dan 100 founders begeleid, in hun business, hun gezondheid en hun mindset. Vandaag breng ik dat allemaal in binnen Shoulder to Shoulder, als jouw facilitator en coach.",

    faqEyebrow: "FAQ",
    faqTitle: "Goede vragen",
    faqs: [
      { q: "Is het online of offline?", a: "Allebei. Je wekelijkse circle is online, dus je doet vanaf overal mee. Diners, events en gatherings zijn in het echt, met de hele club." },
      { q: "Wat als ik reis of niet in de buurt woon?", a: "Geen probleem. Members zitten over de hele wereld en circles zijn online, dus locatie zit nooit in de weg. De events in het echt zijn een bonus, geen vereiste." },
      { q: "Ik heb al een sterk netwerk.", a: "Netwerken leveren gesprekken op. Een kring levert progressie op: dezelfde mensen elke week die je business kennen en je aan je woord houden." },
      { q: "Ik denk ook aan een coach of mentor.", a: "Dit werkt daarnaast. Een coach geeft één perspectief. Hier krijg je een hele kring plus wekelijkse accountability." },
      { q: "Is dit coaching?", a: "Nee. Het zijn peers, geen coach die tegen je praat." },
      { q: "Ik heb geen tijd.", a: "Het is één gefocust uur per week, en het bespaart je veel meer. Je stelt betere prioriteiten, maakt minder verkeerde keuzes, en verliest minder tijd aan wat er niet toe doet." },
      { q: "Hoe werkt de aanmelding precies?", a: "We werken met cohorten, niet met doorlopende inschrijving. Als je je aanmeldt, kijken we naar fit met de aankomende Circle specifiek. Bij een mogelijke match nodigen we je uit voor een gesprek waarin we samen bepalen of het een echte fit is." },
      { q: "Wat als ik niet in dit cohort kom?", a: "Als de huidige Circle vol zit of het moment nog niet goed is, kom je in beeld voor het volgende cohort, we kunnen alleen niet precies zeggen wanneer dat opent." },
    ],

    eventEyebrow: "Onze events",
    eventLook: "De members samenbrengen",
    cohortLabel: "Volgende Founder Circle",
    cohortDetail: "Oktober 2026 · 6 founders · Aanmeldingen sluiten 30 september",
    cohortDays: (n: number) => `Nog ${n} dag${n === 1 ? "" : "en"} om je aan te melden`,
    finalTitle: "Klaar om sneller te groeien?",
    footer: "Shoulder to Shoulder",
    fullDetails: "Alle details",
  },
};

export default function Join() {
  const { lang } = useLang();
  const t = copy[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [eventPlaying, setEventPlaying] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const scrollMembers = (dir: number) => scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  useEffect(() => {
    const deadline = new Date("2026-09-30T23:59:59+02:00").getTime();
    setDaysLeft(Math.max(Math.ceil((deadline - Date.now()) / 86400000), 0));
  }, []);

  function book() {
    setApplyOpen(true);
  }

  const SEC = "88px 24px";
  const btnLight = (extra: React.CSSProperties = {}): React.CSSProperties => ({ color: INK, background: "#fff", padding: "16px 32px", borderRadius: 100, fontSize: 15.5, fontWeight: 700, cursor: "pointer", border: "none", fontFamily: "inherit", ...extra });
  const eyebrowS: React.CSSProperties = { fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT };
  const h2 = (dark: boolean): React.CSSProperties => ({ marginTop: 14, fontSize: "clamp(29px,3.7vw,40px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.022em", color: dark ? "#fff" : INK });
  const mediaBox: React.CSSProperties = { position: "relative", width: "100%", borderRadius: 16, overflow: "hidden", background: "linear-gradient(135deg, #1c1915, #2e2820)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" };
  const arrowBtn = (side: "left" | "right"): React.CSSProperties => ({ position: "absolute", top: 59, [side]: -8, transform: "translateY(-50%)", zIndex: 3, width: 46, height: 46, borderRadius: "50%", background: "#fff", color: INK, border: "none", fontSize: 26, lineHeight: 1, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.22)", paddingBottom: 4 });
  const Head = ({ eye, title, dark, center }: { eye: string; title: string; dark: boolean; center?: boolean }) => (
    <div style={{ maxWidth: 640, margin: center ? "0 auto 44px" : "0 0 36px", textAlign: center ? "center" : "left" }}>
      <span style={eyebrowS}>{eye}</span>
      <h2 style={h2(dark)}>{title}</h2>
    </div>
  );

  return (
    <div style={{ background: "#0f0e0b", color: "#f0ece4", fontFamily: "var(--font-sans), ui-sans-serif, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, background: "linear-gradient(to bottom, rgba(10,9,7,0.8), transparent)" }}>
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
            <button onClick={book} className="nav-links" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", padding: "9px 18px", fontSize: 13.5, fontWeight: 700, borderRadius: 100, cursor: "pointer", fontFamily: "inherit" }}>{t.apply}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header style={{ position: "relative", width: "100%", minHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <Image src="/founders.jpg" alt="Founders together" fill className="ken-burns photo-grade" style={{ objectFit: "cover" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,9,7,0.6) 0%, rgba(10,9,7,0.35) 40%, rgba(10,9,7,0.8) 74%, rgba(10,9,7,0.98) 100%)" }} />
        <div className="fade-up" style={{ position: "relative", maxWidth: 1080, margin: "0 auto", width: "100%", padding: "0 24px 56px" }}>
          <h1 style={{ fontSize: "clamp(38px,6vw,72px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", color: "#fff", maxWidth: 860, marginBottom: 22, textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>
            {t.heroTitleA}<span style={{ color: ACCENT }}>{t.heroTitleB}</span>
          </h1>
          <p style={{ maxWidth: 720, fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.4, color: "#efe9de", marginBottom: 20, fontWeight: 500, textShadow: "0 1px 16px rgba(0,0,0,0.6)" }}>{t.heroSub}</p>
          <div style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,116,43,0.14)", border: `1px solid ${ACCENT}`, borderRadius: 100, padding: "8px 16px" }}>
            <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{t.cohortPill}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button onClick={book} className="btn-light" style={btnLight({ padding: "17px 34px", fontSize: 16 })}>{t.applyArrow}</button>
          </div>
        </div>
      </header>

      {/* PAINPOINT, alone vs together */}
      <section style={{ background: "#0f0e0b", padding: "76px 24px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 38 }}>
            <span style={eyebrowS}>{t.painEyebrow}</span>
            <p style={{ marginTop: 14, fontSize: "clamp(19px,2.4vw,24px)", lineHeight: 1.45, color: "#f0ece4", fontWeight: 600, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>{t.painIntro}</p>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "26px 26px" }}>
              <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8f887c" }}>{t.painAloneTitle}</p>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {t.painAlone.map((x) => (
                  <div key={x} style={{ display: "flex", gap: 11, alignItems: "center", fontSize: 15.5, color: MUT }}>
                    <span style={{ flex: "0 0 auto", width: 19, height: 19, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#8f887c" }}>✕</span>{x}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(232,116,43,0.08)", border: `1px solid ${ACCENT}`, borderRadius: 16, padding: "26px 26px" }}>
              <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT }}>{t.painTogetherTitle}</p>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {t.painTogether.map((x) => (
                  <div key={x} style={{ display: "flex", gap: 11, alignItems: "center", fontSize: 15.5, color: "#fff", fontWeight: 500 }}>
                    <span style={{ flex: "0 0 auto", width: 19, height: 19, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 800 }}>✓</span>{x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ background: "#fff", padding: "80px 24px 88px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 48px" }}>
            <span style={eyebrowS}>{t.changeEyebrow}</span>
            <h2 style={h2(false)}>{t.changeTitle}</h2>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {t.changes.map((b, i) => (
              <div key={b.title} style={{ background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 18, padding: "34px 32px 38px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: "rgba(232,116,43,0.14)", border: `1px solid ${ACCENT}`, color: ACCENT, fontWeight: 800, fontSize: 17, marginBottom: 20 }}>{i + 1}</span>
                <h3 style={{ fontSize: 25, fontWeight: 800, letterSpacing: "-0.02em", color: INK }}>{b.title}</h3>
                <p style={{ marginTop: 12, fontSize: 16.5, lineHeight: 1.55, color: INK_MUT }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE PHOTOS */}
      <section style={{ background: "#fff", padding: "0 24px 88px" }}>
        <div className="photo-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[{ src: "/dinner.jpg" }, { src: "/session-meet.jpg" }, { src: "/event-group.jpg" }].map((p, i) => (
            <div key={p.src} className="photo-zoom" style={{ position: "relative", aspectRatio: "1/1", borderRadius: 12, overflow: "hidden" }}>
              <Image src={p.src} alt={t.dinnerCaps[i]} fill className="photo-grade" style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "18px 14px 10px", background: "linear-gradient(to top, rgba(10,9,7,0.75), transparent)" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>{t.dinnerCaps[i]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL NETWORK */}
      <section style={{ background: "#0f0e0b", padding: "88px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <span style={eyebrowS}>{t.globalEyebrow}</span>
          <h2 style={h2(true)}>{t.globalTitle}</h2>
          <p style={{ marginTop: 18, fontSize: 16.5, lineHeight: 1.65, color: MUT_SOFT }}>{t.globalBody}</p>
        </div>
      </section>

      {/* PROOF */}
      <section style={{ background: "#fff", color: INK, padding: SEC }}>
        <div style={{ maxWidth: 940, margin: "0 auto" }}>
          <Head eye={t.proofEyebrow} title={t.proofTitle} dark={false} center />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", alignItems: "flex-start", margin: "0 auto 26px" }}>
            <div style={{ flex: "0 1 300px", maxWidth: 300 }}>
              <div style={{ ...mediaBox, aspectRatio: "9/16" }}>
                <video src="/zachreview.mp4" controls playsInline preload="metadata" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", background: "#000" }} />
              </div>
              <p style={{ textAlign: "center", fontSize: 12.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 10 }}>{t.videoCaption}</p>
            </div>
            <div style={{ flex: "0 1 300px", maxWidth: 300 }}>
              <div style={{ ...mediaBox, aspectRatio: "9/16" }}>
                <video src="/davidreview.mp4" controls playsInline preload="metadata" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", background: "#000" }} />
              </div>
              <p style={{ textAlign: "center", fontSize: 12.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 10 }}>{t.videoCaptionDavid}</p>
            </div>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 18 }}>
            {t.testimonials.map((tt) => (
              <div key={tt.name} style={{ background: "rgba(232,116,43,0.07)", border: "1px solid rgba(232,116,43,0.35)", borderRadius: 16, padding: "26px 28px" }}>
                <p style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 500, color: INK }}>{tt.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 16 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/members/${tt.name}.png`} alt={tt.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(232,116,43,0.45)", flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em" }}>{tt.name.toUpperCase()} · {tt.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO'S IN THE ROOM */}
      <section style={{ background: "#15130f", color: "#f0ece4", padding: SEC }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
            <span style={eyebrowS}>{t.roomEyebrow}</span>
            <h2 style={h2(true)}>{t.roomTitle}</h2>
          </div>
          <div style={{ position: "relative" }}>
          <button aria-label="Previous" onClick={() => scrollMembers(-1)} style={arrowBtn("left")}>‹</button>
          <button aria-label="Next" onClick={() => scrollMembers(1)} style={arrowBtn("right")}>›</button>
          <div ref={scroller} className="member-scroll" style={{ display: "flex", gap: 18, overflowX: "auto", scrollSnapType: "x mandatory", padding: "4px 8px 12px", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", maskImage: "linear-gradient(to right, transparent 0, #000 30px, #000 calc(100% - 30px), transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 30px, #000 calc(100% - 30px), transparent 100%)" }}>
            {members.map((m) => (
              <div key={m.name} style={{ flex: "0 0 auto", width: 170, textAlign: "center", scrollSnapAlign: "center" }}>
                <div style={{ position: "relative", width: 118, height: 118, borderRadius: "50%", margin: "0 auto", overflow: "hidden", background: `color-mix(in srgb, ${ACCENT} 20%, #e7e0d4)`, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(0,0,0,0.05)" }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: ACCENT }}>{m.name.slice(0, 1)}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: m.pos || "center", transform: m.scale ? `scale(${m.scale})` : undefined }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                </div>
                <h3 style={{ marginTop: 14, fontSize: 17, fontWeight: 800 }}>{m.name}</h3>
                <p style={{ marginTop: 3, fontSize: 12.5, fontWeight: 600, color: MUT, lineHeight: 1.35 }}>{m.tag}</p>
                {m.note && <p style={{ marginTop: 4, fontSize: 11.5, color: "#8f887c", lineHeight: 1.35 }}>{m.note}</p>}
              </div>
            ))}
          </div>
          </div>

        </div>
      </section>

      {/* SELECTION (white) */}
      <section style={{ background: "#fff", color: INK, padding: SEC }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <span style={eyebrowS}>{t.selEyebrow}</span>
          <h2 style={h2(false)}>{t.selTitle}</h2>
          <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.65, color: INK_MUT }}>{t.selBody}</p>
        </div>
      </section>

      {/* OUR EVENTS (black) */}
      <section style={{ background: "#0f0e0b", color: "#f0ece4", padding: "64px 24px 88px" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <span style={eyebrowS}>{t.eventEyebrow}</span>
          <h2 style={h2(true)}>{t.eventLook}</h2>
        </div>
        <div style={{ maxWidth: 360, margin: "0 auto" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "9/16", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "#000" }}>
            {eventPlaying ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video src="/event.mp4" autoPlay controls playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", background: "#000" }} />
            ) : (
              <button onClick={() => setEventPlaying(true)} aria-label="Play event video" style={{ position: "absolute", inset: 0, padding: 0, border: "none", background: "none", cursor: "pointer" }}>
                <Image src="/event-live.jpg" alt="An STS event" fill className="photo-grade" style={{ objectFit: "cover" }} />
                <span style={{ position: "absolute", left: 0, right: 0, bottom: "16%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ width: 66, height: 66, borderRadius: "50%", background: "rgba(255,255,255,0.94)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(0,0,0,0.4)" }}>
                    <span style={{ marginLeft: 5, borderStyle: "solid", borderWidth: "11px 0 11px 18px", borderColor: `transparent transparent transparent ${INK}` }} />
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (white) */}
      <section style={{ background: "#fff", color: INK, padding: "78px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Head eye={t.howEyebrow} title={t.howTitle} dark={false} center />
          <div style={{ textAlign: "center", marginTop: -20, marginBottom: 40 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: ACCENT, background: "rgba(232,116,43,0.08)", border: `1px solid ${ACCENT}`, borderRadius: 100, padding: "8px 18px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />{t.howNote}
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {t.howMonthly.map((label) => (
              <span key={label} style={{ fontSize: 15, fontWeight: 800, color: INK, background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 100, padding: "13px 24px" }}>{label}</span>
            ))}
          </div>
          <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: INK_MUT, textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.howExtraLabel}</span>
            {t.howExtra.map((label) => (
              <span key={label} style={{ fontSize: 13.5, fontWeight: 600, color: INK_MUT, background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 100, padding: "8px 16px" }}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* YOUR HOST */}
      <section style={{ background: "#0f0e0b", padding: "56px 24px 88px" }}>
        <div className="flex-wrap-col" style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 44, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 auto" }}>
            <div style={{ position: "relative", width: 200, height: 240, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Image src="/coaching-portrait.jpg" alt={t.hostName} fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 15%" }} />
            </div>
          </div>
          <div style={{ flex: "1 1 340px" }}>
            <span style={eyebrowS}>{t.hostEyebrow}</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}>{t.hostName}</h2>
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {t.hostChips.map((c) => (
                <span key={c} style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 100, padding: "6px 13px" }}>{c}</span>
              ))}
            </div>
            <p style={{ marginTop: 18, fontSize: 16.5, lineHeight: 1.6, color: MUT_SOFT }}>{t.hostDesc}</p>
          </div>
        </div>
      </section>

      {/* FAQ (white) */}
      <section style={{ background: "#fff", color: INK, padding: SEC }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Head eye={t.faqEyebrow} title={t.faqTitle} dark={false} center />
          {t.faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "20px 4px", textAlign: "left", fontFamily: "inherit" }}>
                <span style={{ fontSize: 16.5, fontWeight: 700, color: INK }}>{f.q}</span>
                <span style={{ flex: "0 0 auto", width: 27, height: 27, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: ACCENT, fontWeight: 600 }}>{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ padding: "0 4px 20px", maxWidth: 600, fontSize: 15.5, lineHeight: 1.55, color: INK_MUT }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA (black) */}
      <section id="book" style={{ position: "relative", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/mastermind.jpg" alt="" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,7,0.93)" }} />
        <div style={{ position: "relative", maxWidth: 620, margin: "0 auto", padding: "80px 24px 92px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, background: "rgba(232,116,43,0.1)", border: `1px solid ${ACCENT}`, borderRadius: 16, padding: "14px 26px", marginBottom: 30 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT }}>{t.cohortLabel}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{t.cohortDetail}</span>
            {daysLeft !== null && daysLeft > 0 && (
              <span style={{ fontSize: 13, fontWeight: 600, color: MUT }}>{t.cohortDays(daysLeft)}</span>
            )}
          </div>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,48px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fff" }}>{t.finalTitle}</h2>
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <button onClick={book} className="btn-light" style={btnLight({ padding: "17px 34px", fontSize: 16 })}>{t.applyArrow}</button>
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
          </div>
        </div>
      </footer>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}

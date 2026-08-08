"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useLang, LanguageToggle } from "@/components/i18n";

const ACCENT = "#E8742B";
const CAL_LINK = "https://calendar.app.google/wguaVQyvxW8Rbsxx9";

const MUT = "#c2bbae";
const MUT_SOFT = "#d8d2c7";
const INK = "#15130f";
const INK_MUT = "#57534c";

type Member = { name: string; tag: string; img: string; pos?: string; scale?: number };
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
    applyArrow: "Apply for a fit call →",
    byInvite: "By invitation only",

    heroTitleA: "The founders who grow fastest ",
    heroTitleB: "never do it alone",
    heroSub: "A hand-picked circle that makes the big decisions with you",
    freeNote: "Free · 30 min",

    painEyebrow: "Why alone is slow",
    painAloneTitle: "Alone",
    painAlone: ["You make the big calls alone", "Fewer opportunities reach you", "No one keeps you accountable"],
    painTogetherTitle: "Together",
    painTogether: ["You decide with a team behind you", "Opportunities come from each other", "Support and accountability, every week"],

    changeEyebrow: "The outcome",
    changeTitle: "What changes when you join a founder circle",
    changes: [
      { title: "Exponential growth", desc: "Normal founders grow linearly. Together we grow exponentially." },
      { title: "A real team", desc: "A real team of founders around you, who know your business." },
      { title: "Enjoy the journey", desc: "Side quests, dinners and activities. You're not alone anymore." },
    ],

    visionLine: "Imagine overcoming obstacles faster, and consistently acting on your highest-leverage opportunities.",
    visionQ: "How much further ahead would your business be in 12 months? And in 3 years?",

    roomEyebrow: "Who's in the room",
    roomTitle: "Who's in the room",
    roomSub: "Some of our members, based across 3 continents",
    selTitle: "Not a typical founder community",
    selSub: "Every member is selected on more than track record",
    selItems: [
      { title: "Different skill sets", desc: "So someone always brings what you're missing." },
      { title: "Team players, no ego", desc: "People who lift the room, not dominate it." },
      { title: "Real and open", desc: "Willing to show what's actually going on." },
    ],

    proofEyebrow: "Proof",
    proofTitle: "What it does for them",
    videoCaption: "Zach · Member",
    testimonials: [
      { quote: "I'd been stuck on a real estate idea for months. With the circle it became land I now own and a 14-unit project.", name: "Samer", type: "member" },
      { quote: "I started thinking like the founder I need to become to raise €40M. It changed everything.", name: "Kibet", type: "member" },
    ],
    dinnerCaps: ["Weekly online call", "Founder dinner", "Founder event"],

    howEyebrow: "How it works",
    howTitle: "Everything a founder needs",
    how: [
      { n: "1", title: "You're selected into a circle", desc: "A weekly circle with your six. One hour, online, facilitated by Lennart." },
      { n: "2", title: "Meet the whole club", desc: "In person, you connect with every member of the club." },
      { n: "3", title: "A personal 1-on-1 with Lennart", desc: "A short, personal session with your performance and business coach." },
    ],

    hostEyebrow: "Your host",
    hostName: "Lennart van der Ziel",
    hostChips: ["Former tech CEO", "200k+ products sold", "100+ founders guided"],
    hostDesc: "As founder & CEO I built Travis the Translator, an award-winning startup named Dutch Startup of the Year, with 200,000+ devices sold worldwide. I also helped start one of the largest founder communities in the Netherlands. Along the way I made costly mistakes and often felt alone, so I built the environment I wish I'd had. Today I personally host everything inside Shoulder to Shoulder — every circle, dinner and gathering.",

    faqEyebrow: "FAQ",
    faqTitle: "Good questions",
    faqs: [
      { q: "Is it online or offline?", a: "Both. Your weekly circle meets online, so you join from anywhere. Dinners, events and gatherings happen in person with the whole club." },
      { q: "What if I travel or don't live nearby?", a: "No problem. Members are spread across the world and circles are online, so location never gets in the way. The in-person events are a bonus, not a requirement." },
      { q: "I already have a strong network.", a: "Networks create conversations. A circle creates progress: the same people every week who know your business and hold you to your word." },
      { q: "I'm looking into a coach or mentor.", a: "This works alongside them. A coach gives one perspective. Here you get a whole circle plus weekly accountability." },
      { q: "Is this coaching?", a: "No. It's peers, not a coach talking at you." },
      { q: "I'm too busy.", a: "It's one focused hour a week, and it saves you far more. You set better priorities, make fewer bad decisions, and spend less time on things that don't matter." },
    ],

    eventEyebrow: "Our events",
    eventLook: "This is what an STS event looks like",
    finalTitle: "Ready to grow faster?",
    finalSub: "Apply for a fit call. 30 minutes, no pitch.",
    footer: "Shoulder to Shoulder · By invitation only",
    fullDetails: "Full details",
  },

  nl: {
    apply: "Aanmelden",
    applyArrow: "Meld je aan voor een fit call →",
    byInvite: "Alleen op uitnodiging",

    heroTitleA: "De founders die het snelst groeien ",
    heroTitleB: "doen het nooit alleen",
    heroSub: "Een zorgvuldig geselecteerde kring die de grote beslissingen mét je maakt",
    freeNote: "Gratis · 30 min",

    painEyebrow: "Waarom alleen traag is",
    painAloneTitle: "Alleen",
    painAlone: ["Je maakt de grote keuzes alleen", "Minder kansen bereiken je", "Niemand houdt je accountable"],
    painTogetherTitle: "Samen",
    painTogether: ["Je beslist met een team achter je", "Kansen komen van elkaar", "Steun en accountability, elke week"],

    changeEyebrow: "Het resultaat",
    changeTitle: "Wat verandert als je in een founder circle komt",
    changes: [
      { title: "Exponentiële groei", desc: "Normale founders groeien lineair. Samen groeien we exponentieel." },
      { title: "Een echt team", desc: "Een echt team van founders om je heen, die je business kennen." },
      { title: "Geniet van de reis", desc: "Sidequests, diners en activiteiten. Je bent niet meer alleen." },
    ],

    visionLine: "Stel je voor dat je obstakels sneller overwint, en consistent inzet op je kansen met de meeste impact.",
    visionQ: "Hoeveel verder zou je business zijn over 12 maanden? En over 3 jaar?",

    roomEyebrow: "Wie er in de kamer zit",
    roomTitle: "Wie er in de kamer zit",
    roomSub: "Een aantal van onze members, verspreid over 3 continenten",
    selTitle: "Geen doorsnee foundercommunity",
    selSub: "Elke member wordt geselecteerd op meer dan track record",
    selItems: [
      { title: "Verschillende skill sets", desc: "Zodat iemand altijd brengt wat jij mist." },
      { title: "Teamplayers, geen ego", desc: "Mensen die de groep optillen, niet domineren." },
      { title: "Echt en open", desc: "Durven laten zien wat er echt speelt." },
    ],

    proofEyebrow: "Bewijs",
    proofTitle: "Wat het voor hen doet",
    videoCaption: "Zach · Lid",
    testimonials: [
      { quote: "Ik zat al maanden vast op een vastgoedidee. Met de kring werd het grond die ik nu bezit en een project van 14 units.", name: "Samer", type: "lid" },
      { quote: "Ik begon te denken als de founder die ik moet worden om €40M op te halen. Dat veranderde alles.", name: "Kibet", type: "lid" },
    ],
    dinnerCaps: ["Wekelijkse online call", "Founder-diner", "Founder event"],

    howEyebrow: "Hoe het werkt",
    howTitle: "Alles wat een founder nodig heeft",
    how: [
      { n: "1", title: "Je wordt geplaatst in een circle", desc: "Een wekelijkse circle met je zes. Eén uur, online, gefaciliteerd door Lennart." },
      { n: "2", title: "Ontmoet de hele club", desc: "In het echt connect je met elke member van de club." },
      { n: "3", title: "Een persoonlijke 1-op-1 met Lennart", desc: "Een korte, persoonlijke sessie met je performance- en business-coach." },
    ],

    hostEyebrow: "Je host",
    hostName: "Lennart van der Ziel",
    hostChips: ["Voormalig tech-CEO", "200k+ producten verkocht", "100+ founders begeleid"],
    hostDesc: "Als founder & CEO bouwde ik Travis the Translator, een bekroonde startup, uitgeroepen tot Dutch Startup of the Year, met 200.000+ verkochte apparaten wereldwijd. Ik hielp ook een van de grootste foundercommunities van Nederland opstarten. Onderweg maakte ik dure fouten en voelde ik me vaak alleen, dus bouwde ik de omgeving die ik zelf had willen hebben. Vandaag host ik alles binnen Shoulder to Shoulder persoonlijk — elke circle, elk diner en elke gathering.",

    faqEyebrow: "FAQ",
    faqTitle: "Goede vragen",
    faqs: [
      { q: "Is het online of offline?", a: "Allebei. Je wekelijkse circle is online, dus je doet vanaf overal mee. Diners, events en gatherings zijn in het echt, met de hele club." },
      { q: "Wat als ik reis of niet in de buurt woon?", a: "Geen probleem. Members zitten over de hele wereld en circles zijn online, dus locatie zit nooit in de weg. De events in het echt zijn een bonus, geen vereiste." },
      { q: "Ik heb al een sterk netwerk.", a: "Netwerken leveren gesprekken op. Een kring levert progressie op: dezelfde mensen elke week die je business kennen en je aan je woord houden." },
      { q: "Ik denk ook aan een coach of mentor.", a: "Dit werkt daarnaast. Een coach geeft één perspectief. Hier krijg je een hele kring plus wekelijkse accountability." },
      { q: "Is dit coaching?", a: "Nee. Het zijn peers, geen coach die tegen je praat." },
      { q: "Ik heb geen tijd.", a: "Het is één gefocust uur per week, en het bespaart je veel meer. Je stelt betere prioriteiten, maakt minder verkeerde keuzes, en verliest minder tijd aan wat er niet toe doet." },
    ],

    eventEyebrow: "Onze events",
    eventLook: "Zo ziet een STS-event eruit",
    finalTitle: "Klaar om sneller te groeien?",
    finalSub: "Meld je aan voor een fit call. 30 minuten, geen pitch.",
    footer: "Shoulder to Shoulder · Alleen op uitnodiging",
    fullDetails: "Alle details",
  },
};

export default function Join() {
  const { lang } = useLang();
  const t = copy[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [eventPlaying, setEventPlaying] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const scrollMembers = (dir: number) => scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  function book() {
    if (CAL_LINK) { window.open(CAL_LINK, "_blank"); return; }
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  }

  const SEC = "88px 24px";
  const btnLight = (extra: React.CSSProperties = {}): React.CSSProperties => ({ color: INK, background: "#fff", padding: "16px 32px", borderRadius: 100, fontSize: 15.5, fontWeight: 700, cursor: "pointer", border: "none", fontFamily: "inherit", ...extra });
  const eyebrowS: React.CSSProperties = { fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT };
  const h2 = (dark: boolean): React.CSSProperties => ({ marginTop: 14, fontSize: "clamp(29px,3.7vw,40px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.022em", color: dark ? "#fff" : INK });
  const mediaBox: React.CSSProperties = { position: "relative", width: "100%", borderRadius: 16, overflow: "hidden", background: "linear-gradient(135deg, #1c1915, #2e2820)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" };
  const arrowBtn = (side: "left" | "right"): React.CSSProperties => ({ position: "absolute", top: 59, [side]: -8, transform: "translateY(-50%)", zIndex: 3, width: 46, height: 46, borderRadius: "50%", background: INK, color: "#fff", border: "none", fontSize: 26, lineHeight: 1, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.22)", paddingBottom: 4 });
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
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.4)", borderRadius: 100, padding: "7px 15px", marginBottom: 24, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.14)" }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff" }}>{t.byInvite}</span>
          </div>
          <h1 style={{ fontSize: "clamp(38px,6vw,72px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", color: "#fff", maxWidth: 860, marginBottom: 22, textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>
            {t.heroTitleA}<span style={{ color: ACCENT }}>{t.heroTitleB}</span>
          </h1>
          <p style={{ maxWidth: 720, fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.4, color: "#efe9de", marginBottom: 32, fontWeight: 500, textShadow: "0 1px 16px rgba(0,0,0,0.6)" }}>{t.heroSub}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button onClick={book} className="btn-light" style={btnLight({ padding: "17px 34px", fontSize: 16 })}>{t.applyArrow}</button>
            <span style={{ fontSize: 13.5, color: MUT, fontWeight: 600 }}>{t.freeNote}</span>
          </div>
        </div>
      </header>

      {/* PAINPOINT — alone vs together */}
      <section style={{ background: "#0f0e0b", padding: "40px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <span style={eyebrowS}>{t.painEyebrow}</span>
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
      <section style={{ background: "#0f0e0b", padding: "56px 24px 64px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 40px" }}>
            <span style={eyebrowS}>{t.changeEyebrow}</span>
            <h2 style={h2(true)}>{t.changeTitle}</h2>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {t.changes.map((b) => (
              <div key={b.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: "38px 32px" }}>
                <h3 style={{ fontSize: 25, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>{b.title}</h3>
                <p style={{ marginTop: 12, fontSize: 16.5, lineHeight: 1.55, color: MUT_SOFT }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE PHOTOS */}
      <section style={{ background: "#0f0e0b", padding: "0 24px 24px" }}>
        <div className="photo-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[{ src: "/session-meet.jpg" }, { src: "/dinner.jpg" }, { src: "/event-group.jpg" }].map((p, i) => (
            <div key={p.src} className="photo-zoom" style={{ position: "relative", aspectRatio: "1/1", borderRadius: 12, overflow: "hidden" }}>
              <Image src={p.src} alt={t.dinnerCaps[i]} fill className="photo-grade" style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "18px 14px 10px", background: "linear-gradient(to top, rgba(10,9,7,0.75), transparent)" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>{t.dinnerCaps[i]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISION */}
      <section style={{ background: "#15130f", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(19px,2.5vw,25px)", lineHeight: 1.5, color: MUT_SOFT, fontWeight: 500 }}>{t.visionLine}</p>
          <p style={{ marginTop: 18, fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: "clamp(23px,3.2vw,32px)", lineHeight: 1.3, color: ACCENT, letterSpacing: "-0.01em" }}>{t.visionQ}</p>
        </div>
      </section>

      {/* WHO'S IN THE ROOM */}
      <section style={{ background: "#fff", color: INK, padding: SEC }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 40px" }}>
            <h2 style={{ ...h2(false), marginTop: 0 }}>{t.roomTitle}</h2>
            <p style={{ marginTop: 12, fontSize: 17, lineHeight: 1.5, color: INK, fontWeight: 700 }}>{t.roomSub}</p>
          </div>
          <div style={{ position: "relative" }}>
          <button aria-label="Previous" onClick={() => scrollMembers(-1)} style={arrowBtn("left")}>‹</button>
          <button aria-label="Next" onClick={() => scrollMembers(1)} style={arrowBtn("right")}>›</button>
          <div ref={scroller} className="member-scroll" style={{ display: "flex", gap: 18, overflowX: "auto", scrollSnapType: "x mandatory", padding: "4px 8px 12px", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            {members.map((m) => (
              <div key={m.name} style={{ flex: "0 0 auto", width: 170, textAlign: "center", scrollSnapAlign: "center" }}>
                <div style={{ position: "relative", width: 118, height: 118, borderRadius: "50%", margin: "0 auto", overflow: "hidden", background: `color-mix(in srgb, ${ACCENT} 20%, #e7e0d4)`, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(0,0,0,0.05)" }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: ACCENT }}>{m.name.slice(0, 1)}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: m.pos || "center", transform: m.scale ? `scale(${m.scale})` : undefined }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                </div>
                <h3 style={{ marginTop: 14, fontSize: 17, fontWeight: 800 }}>{m.name}</h3>
                <p style={{ marginTop: 3, fontSize: 12.5, fontWeight: 600, color: INK_MUT, lineHeight: 1.35 }}>{m.tag}</p>
              </div>
            ))}
          </div>
          </div>

          {/* Selected on more than track record */}
          <div style={{ marginTop: 56, paddingTop: 44, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 32px" }}>
              <h3 style={{ fontSize: "clamp(23px,3.2vw,32px)", fontWeight: 800, letterSpacing: "-0.02em", color: INK }}>{t.selTitle}</h3>
              <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.55, color: INK_MUT }}>{t.selSub}</p>
            </div>
            <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
              {t.selItems.map((s) => (
                <div key={s.title} style={{ background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, padding: "24px 22px" }}>
                  <h4 style={{ fontSize: 17, fontWeight: 800, color: INK, letterSpacing: "-0.01em" }}>{s.title}</h4>
                  <p style={{ marginTop: 7, fontSize: 14.5, lineHeight: 1.5, color: INK_MUT }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section style={{ background: "#15130f", padding: SEC }}>
        <div style={{ maxWidth: 940, margin: "0 auto" }}>
          <Head eye={t.proofEyebrow} title={t.proofTitle} dark center />
          <div style={{ ...mediaBox, aspectRatio: "16/9", maxWidth: 820, margin: "0 auto 10px" }}>
            <iframe src="https://drive.google.com/file/d/144mWmikXCAq_pEbl_U1d19YJ33m62y55/preview" allow="autoplay; fullscreen" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} title="Member testimonial" />
          </div>
          <p style={{ textAlign: "center", fontSize: 12.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 26 }}>{t.videoCaption}</p>
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

      {/* HOW IT WORKS */}
      <section style={{ background: "#0f0e0b", padding: "32px 24px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Head eye={t.howEyebrow} title={t.howTitle} dark center />
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
            {t.how.map((s) => (
              <div key={s.n} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "28px 26px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: "50%", background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 18 }}>{s.n}</span>
                <h3 style={{ fontSize: 19, fontWeight: 800, marginTop: 16, color: "#fff", letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.55, color: MUT }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YOUR HOST */}
      <section style={{ background: "#15130f", padding: "56px 24px 88px" }}>
        <div className="flex-wrap-col" style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 44, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 auto" }}>
            <div style={{ position: "relative", width: 200, height: 240, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Image src="/lennart.jpg" alt={t.hostName} fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
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

      {/* FAQ */}
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

      {/* EVENT VIDEO */}
      <section style={{ background: "#0f0e0b", padding: "20px 24px 48px" }}>
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

      {/* FINAL CTA */}
      <section id="book" style={{ position: "relative", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/mastermind.jpg" alt="" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,7,0.93)" }} />
        <div style={{ position: "relative", maxWidth: 620, margin: "0 auto", padding: "62px 24px 92px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,48px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fff" }}>{t.finalTitle}</h2>
          <p style={{ margin: "16px auto 0", maxWidth: 400, fontSize: 16.5, lineHeight: 1.5, color: MUT }}>{t.finalSub}</p>
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
            <a href="/shoulder-to-shoulder" style={{ textDecoration: "none", color: "#9a9389", fontSize: 13 }}>{t.fullDetails}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

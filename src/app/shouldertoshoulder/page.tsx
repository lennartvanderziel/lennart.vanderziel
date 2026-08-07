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

const members = [
  { name: "David", img: "/members/David.png" },
  { name: "Zach", img: "/members/Zach.png" },
  { name: "Kibet", img: "/members/Kibet.png" },
  { name: "Dane", img: "/members/Dane.jpeg" },
  { name: "Samer", img: "/members/Samer.png" },
  { name: "Demian", img: "/members/Demian.jpeg" },
];

const copy = {
  en: {
    apply: "Apply",
    applyArrow: "Apply for a fit call →",
    byInvite: "By invitation only",

    heroTitleA: "Your weekly ",
    heroTitleB: "board of founders.",
    heroSub: "Grow faster, with more confidence and more fun. Beside founders who have been there.",
    freeNote: "Free · 30 min",

    painEyebrow: "Sound familiar?",
    painLine: "Building alone is slow. You hit the same walls, second-guess the big calls, and lose weeks no one helps you avoid.",

    changeEyebrow: "What you get",
    changeTitle: "Faster growth. A real team. More fun.",
    changes: [
      { title: "Exponential growth", desc: "You compound with the room, instead of growing alone, one linear step at a time." },
      { title: "A real team", desc: "Six founders who know your business and have your back on every hard call." },
      { title: "More fun", desc: "Wins shared, the journey lighter. You're not doing this alone anymore." },
    ],

    roomEyebrow: "Who's in the room",
    roomTitle: "The founders beside you.",
    roomSub: "Real operators building real businesses. Founders like David, Zach, Samer and Kibet. This is who you grow with, every week.",

    proofEyebrow: "Proof",
    proofTitle: "What it does for them.",
    videoCaption: "Zach · Member",
    testimonials: [
      { quote: "I'd been stuck on a real estate idea for months. With the circle it became land I now own and a 14-unit project.", name: "Samer", type: "Member" },
      { quote: "I started thinking like the founder I need to become to raise €40M. It changed everything.", name: "Kibet", type: "Member" },
    ],
    dinnerCaps: ["Founder dinner", "The club", "Together"],
    storyLine: "I built the room I wish I'd had as a founder.",
    storyName: "Lennart van der Ziel",

    ccEyebrow: "The circle & the club",
    ccTitle: "You're never in it alone.",
    ccCircleTitle: "Your circle",
    ccCircleDesc: "A weekly session with your six, plus a monthly 1-on-1 with Lennart. Online, because members are everywhere.",
    ccClubTitle: "The club",
    ccClubDesc: "The whole community together: events, dinners and sidequests, in person.",

    hostEyebrow: "Your host",
    hostName: "Lennart van der Ziel",
    hostChips: ["Founder & CEO", "Best of CES", "100+ founders guided"],
    hostDesc: "I built and led an award-winning tech startup. I made costly mistakes and often felt alone. Shoulder to Shoulder is the room I wish I'd had.",

    faqEyebrow: "FAQ",
    faqTitle: "Good questions.",
    faqs: [
      { q: "I already have a strong network.", a: "Networks create conversations. A circle creates progress: the same people every week who know your business and hold you to your word." },
      { q: "I'm looking into a coach or mentor.", a: "This works alongside them. A coach gives one perspective. Here you get a whole circle plus weekly accountability." },
      { q: "Is this coaching?", a: "No. It's peers, not a coach talking at you." },
      { q: "I'm too busy.", a: "It's one focused hour a week. It saves you the weeks you lose to the wrong priorities." },
    ],

    finalTitle: "Ready to grow faster?",
    finalSub: "Apply for a fit call. 30 minutes, no pitch.",
    footer: "Shoulder to Shoulder · By invitation only",
    fullDetails: "Full details",
  },

  nl: {
    apply: "Aanmelden",
    applyArrow: "Meld je aan voor een fit call →",
    byInvite: "Alleen op uitnodiging",

    heroTitleA: "Je wekelijkse ",
    heroTitleB: "raad van founders.",
    heroSub: "Sneller groeien, met meer vertrouwen en meer plezier. Naast founders die er al geweest zijn.",
    freeNote: "Gratis · 30 min",

    painEyebrow: "Herkenbaar?",
    painLine: "Alleen bouwen is traag. Je loopt tegen dezelfde muren aan, twijfelt over de grote keuzes, en verliest weken die niemand je helpt voorkomen.",

    changeEyebrow: "Wat je krijgt",
    changeTitle: "Sneller groeien. Een echt team. Meer plezier.",
    changes: [
      { title: "Exponentiële groei", desc: "Je compound met de groep, in plaats van alleen, stap voor stap lineair." },
      { title: "Een echt team", desc: "Zes founders die je business kennen en achter je staan bij elke lastige keuze." },
      { title: "Meer plezier", desc: "Wins gedeeld, de reis lichter. Je doet dit niet langer alleen." },
    ],

    roomEyebrow: "Wie er in de kamer zit",
    roomTitle: "De founders naast je.",
    roomSub: "Echte ondernemers die echte bedrijven bouwen. Founders zoals David, Zach, Samer en Kibet. Met hen groei je, elke week.",

    proofEyebrow: "Bewijs",
    proofTitle: "Wat het voor hen doet.",
    videoCaption: "Zach · Lid",
    testimonials: [
      { quote: "Ik zat al maanden vast op een vastgoedidee. Met de kring werd het grond die ik nu bezit en een project van 14 units.", name: "Samer", type: "Lid" },
      { quote: "Ik begon te denken als de founder die ik moet worden om €40M op te halen. Dat veranderde alles.", name: "Kibet", type: "Lid" },
    ],
    dinnerCaps: ["Founder-diner", "De club", "Samen"],
    storyLine: "Ik bouwde de groep die ik zelf had willen hebben als founder.",
    storyName: "Lennart van der Ziel",

    ccEyebrow: "De circle & de club",
    ccTitle: "Je staat er nooit alleen voor.",
    ccCircleTitle: "Je circle",
    ccCircleDesc: "Een wekelijkse sessie met je zes, plus een maandelijkse 1-op-1 met Lennart. Online, omdat members overal zitten.",
    ccClubTitle: "De club",
    ccClubDesc: "De hele community samen: events, diners en sidequests, in het echt.",

    hostEyebrow: "Je host",
    hostName: "Lennart van der Ziel",
    hostChips: ["Founder & CEO", "Best of CES", "100+ founders begeleid"],
    hostDesc: "Ik bouwde en leidde een bekroonde tech-startup. Ik maakte dure fouten en voelde me vaak alleen. Shoulder to Shoulder is de groep die ik zelf had willen hebben.",

    faqEyebrow: "FAQ",
    faqTitle: "Goede vragen.",
    faqs: [
      { q: "Ik heb al een sterk netwerk.", a: "Netwerken leveren gesprekken op. Een kring levert progressie op: dezelfde mensen elke week die je business kennen en je aan je woord houden." },
      { q: "Ik denk ook aan een coach of mentor.", a: "Dit werkt daarnaast. Een coach geeft één perspectief. Hier krijg je een hele kring plus wekelijkse accountability." },
      { q: "Is dit coaching?", a: "Nee. Het zijn peers, geen coach die tegen je praat." },
      { q: "Ik heb geen tijd.", a: "Het is één gefocust uur per week. Het bespaart je de weken die je verliest aan de verkeerde prioriteiten." },
    ],

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

  function book() {
    if (CAL_LINK) { window.open(CAL_LINK, "_blank"); return; }
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  }

  const SEC = "100px 24px";
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
      <header style={{ position: "relative", width: "100%", minHeight: "94vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <Image src="/founders.jpg" alt="Founders together" fill className="ken-burns photo-grade" style={{ objectFit: "cover" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,9,7,0.6) 0%, rgba(10,9,7,0.35) 40%, rgba(10,9,7,0.8) 74%, rgba(10,9,7,0.98) 100%)" }} />
        <div className="fade-up" style={{ position: "relative", maxWidth: 1080, margin: "0 auto", width: "100%", padding: "0 24px 90px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.4)", borderRadius: 100, padding: "7px 15px", marginBottom: 24, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.14)" }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff" }}>{t.byInvite}</span>
          </div>
          <h1 style={{ fontSize: "clamp(46px,7.6vw,88px)", fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.035em", color: "#fff", maxWidth: 820, marginBottom: 22, textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>
            {t.heroTitleA}<span style={{ color: ACCENT }}>{t.heroTitleB}</span>
          </h1>
          <p style={{ maxWidth: 540, fontSize: "clamp(18px,2.2vw,22px)", lineHeight: 1.4, color: "#f0ece4", marginBottom: 34, fontWeight: 500, textShadow: "0 1px 16px rgba(0,0,0,0.6)" }}>{t.heroSub}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button onClick={book} className="btn-light" style={btnLight({ padding: "17px 34px", fontSize: 16 })}>{t.applyArrow}</button>
            <span style={{ fontSize: 13.5, color: MUT, fontWeight: 600 }}>{t.freeNote}</span>
          </div>
        </div>
      </header>

      {/* PAINPOINT */}
      <section style={{ background: "#0f0e0b", padding: "80px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <span style={eyebrowS}>{t.painEyebrow}</span>
          <p style={{ marginTop: 16, fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, lineHeight: 1.35, letterSpacing: "-0.02em", color: "#fff" }}>{t.painLine}</p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ background: "#0f0e0b", padding: SEC }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Head eye={t.changeEyebrow} title={t.changeTitle} dark center />
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
            {t.changes.map((b, i) => (
              <div key={b.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "30px 26px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: `color-mix(in srgb, ${ACCENT} 18%, transparent)`, color: ACCENT, fontWeight: 800, fontSize: 15 }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginTop: 16, letterSpacing: "-0.01em", color: "#fff" }}>{b.title}</h3>
                <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.55, color: MUT }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO'S IN THE ROOM */}
      <section style={{ background: "#fff", color: INK, padding: SEC }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 48px" }}>
            <span style={eyebrowS}>{t.roomEyebrow}</span>
            <h2 style={h2(false)}>{t.roomTitle}</h2>
            <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.55, color: INK_MUT }}>{t.roomSub}</p>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16 }}>
            {members.map((m) => (
              <div key={m.name} style={{ textAlign: "center" }}>
                <div style={{ position: "relative", width: 104, height: 104, borderRadius: "50%", margin: "0 auto", overflow: "hidden", background: `color-mix(in srgb, ${ACCENT} 20%, #e7e0d4)`, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(0,0,0,0.05)" }}>
                  <span style={{ fontSize: 34, fontWeight: 800, color: ACCENT }}>{m.name.slice(0, 1)}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                </div>
                <h3 style={{ marginTop: 14, fontSize: 16.5, fontWeight: 800 }}>{m.name}</h3>
              </div>
            ))}
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
          <div className="photo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 18 }}>
            {[{ src: "/dinner.jpg" }, { src: "/event-group.jpg" }, { src: "/mastermind.jpg" }].map((p, i) => (
              <div key={p.src} className="photo-zoom" style={{ position: "relative", aspectRatio: "1/1", borderRadius: 12, overflow: "hidden" }}>
                <Image src={p.src} alt={t.dinnerCaps[i]} fill className="photo-grade" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIRCLE & CLUB */}
      <section style={{ background: "#0f0e0b", padding: SEC }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Head eye={t.ccEyebrow} title={t.ccTitle} dark center />
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            <div style={{ background: "rgba(232,116,43,0.08)", border: `1px solid ${ACCENT}`, borderRadius: 16, padding: "30px 28px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 19 }}>6</span>
              <h3 style={{ marginTop: 16, fontSize: 21, fontWeight: 800, color: "#fff" }}>{t.ccCircleTitle}</h3>
              <p style={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.55, color: MUT_SOFT }}>{t.ccCircleDesc}</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "30px 28px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 800, fontSize: 22 }}>∞</span>
              <h3 style={{ marginTop: 16, fontSize: 21, fontWeight: 800, color: "#fff" }}>{t.ccClubTitle}</h3>
              <p style={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.55, color: MUT }}>{t.ccClubDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* YOUR HOST */}
      <section style={{ background: "#15130f", padding: SEC }}>
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

      {/* FINAL CTA */}
      <section id="book" style={{ position: "relative", padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/event-group.jpg" alt="" fill className="photo-grade" style={{ objectFit: "cover", objectPosition: "center 60%" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,7,0.93)" }} />
        <div style={{ position: "relative", maxWidth: 620, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
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

"use client";
import { useState } from "react";
import Image from "next/image";
import { useLang, LanguageToggle } from "@/components/i18n";

const ACCENT = "#E8742B";
const CAL_LINK = "https://calendar.app.google/wguaVQyvxW8Rbsxx9"; // Google Calendar booking (auto-adds Meet)

// Readable muted tones (brighter than before for contrast on dark)
const MUT = "#c2bbae";
const MUT_SOFT = "#d8d2c7";

const copy = {
  en: {
    book: "Book a Founder Fit Call",
    bookArrow: "Book a Founder Fit Call →",
    bySelection: "By selection only",

    heroKicker: "For entrepreneurs who refuse to grow slowly.",
    heroTitleA: "Your own weekly ",
    heroTitleB: "board of founders.",
    heroSub: "A hand-picked circle of founders who make the big decisions with you and hold you accountable — inside a proven system built to make your growth inevitable.",
    freeNoPitch: "Free · No pitch · 30 minutes",

    probEyebrow: "The real reason growth stalls",
    probTitle: "At some point, you become your own bottleneck.",
    probP1: "It's rarely talent or effort. It's that no one consistently challenges your thinking, makes the hard calls with you, or shows you the blind spot you can't see from inside your own business.",
    probP2: "So you settle for good-enough decisions. You lose weeks to the wrong priority. You put off the hard call too long. Alone, none of it gets corrected — because no one's job is to correct it.",

    netEyebrow: "“But I already know entrepreneurs”",
    netTitle: "Knowing people isn't having a crew.",
    netP: "You have contacts. A few WhatsApp groups. The occasional dinner. That creates conversations — not progress, not accountability, and not decisions made together.",
    netLeftTitle: "Networking",
    netLeft: ["Different people each time", "Surface-level advice", "You decide alone", "Forgotten by next week"],
    netRightTitle: "Shoulder to Shoulder",
    netRight: ["The same crew, every week", "They know your business deeply", "Big decisions made together", "A system that compounds"],

    workEyebrow: "Why it works",
    workTitleA: "The right people — and a ",
    workTitleB: "system",
    workTitleC: " behind how you grow.",
    workP: "The founders who grow fastest never decide alone. With a committed crew and a clear system around you, you think bigger, decide better, and move faster. And better decisions compound — avoiding one expensive mistake can pay for years.",
    workItems: [
      { title: "You think bigger", desc: "The room raises your standard. You set the targets you're capable of, not the ones you're comfortable with." },
      { title: "You decide together", desc: "Every big call gets pressure-tested by people who've been there. You stop guessing alone." },
      { title: "You move faster", desc: "Bottlenecks that would cost you weeks get cleared in a single conversation." },
    ],

    sysEyebrow: "The system",
    sysTitle: "How growth becomes inevitable.",
    sysIntro: "It's not just the right room. There's a system behind every single week.",
    sysItems: [
      { n: "1", title: "Set your 10 goals", desc: "Clear 90-day targets, so every week points somewhere real." },
      { n: "2", title: "Outside-the-box strategies", desc: "The crew helps you find the moves you'd never see alone." },
      { n: "3", title: "Needle-moving actions", desc: "Each week, the one or two actions that truly move the business." },
      { n: "4", title: "Accountability dashboard", desc: "Your goals and progress, visible. You do what you said you would." },
      { n: "5", title: "Bottlenecks cleared together", desc: "Whatever's blocking you, the room solves it — fast." },
    ],
    sysClose: "So growth becomes inevitable.",
    meetCaption: "Your weekly session runs on Google Meet — screenshot coming",

    circleEyebrow: "How it's built",
    circleTitle: "Your inner circle of six. Plus the whole community.",
    circleCrewTitle: "Your crew of six",
    circleCrewDesc: "You're placed in a close circle of six founders at your level — same faces every week, deep trust, everyone knows your business. This is your board, your close family in business.",
    circleCommTitle: "The community",
    circleCommDesc: "Around your crew: the full Shoulder to Shoulder community. Monthly dinners for the social side, real friendships, and an annual summit where everyone comes together.",
    dinnerCaps: ["Founder dinner", "The community", "Together"],

    stayEyebrow: "Why founders stay",
    stayTitle: "After a few weeks, something changes.",
    stayItems: [
      "You stop second-guessing your decisions.",
      "You stop having weeks where you work hard but make little progress.",
      "You start thinking bigger — because the people around you expect more.",
      "You build real friendships with founders who genuinely want you to win.",
    ],
    stayClose: "That's the difference between a membership you keep for years and a course you forget in a month.",

    aboutEyebrow: "Who runs it",
    aboutName: "Lennart van der Ziel",
    aboutRole: "Founder & host of Shoulder to Shoulder",
    aboutChips: ["5 years founder & CEO", "Award-winning tech startup", "100+ founders guided"],
    aboutP1: "I spent five years building an award-winning technology company as founder and CEO — through the highs, the near-death moments, and everything in between. What I learned is simple: the businesses that make it are never built alone.",
    aboutP2: "Since then I've worked with 100+ business owners on their strategy, their growth, and their mental and physical performance. Shoulder to Shoulder is the room — and the system — I wish I'd had.",

    fitEyebrow: "Who belongs here",
    fitTitle: "This is for you if…",
    fitItems: [
      "You know you've become your own bottleneck — and you're done operating that way.",
      "You know you'd grow far faster building alongside the right people.",
      "You'd rather hear the truth than protect your ego.",
      "You're ambitious, committed, and in it to build something exceptional.",
    ],

    resultsEyebrow: "Results",
    resultsTitle: "The change members see.",
    videoCaption: "A member's story",
    testimonials: [
      { quote: "I'd been circling the real estate idea for a while without moving. With the support of the group it turned into land I now own and a 14-unit project underway.", name: "Samer", type: "Member · Real estate" },
      { quote: "I stopped thinking like an operator and started thinking like the founder I need to become to raise €40M. That changed how I do everything.", name: "Kibet", type: "Member · Agritech" },
    ],

    selEyebrow: "Why we select",
    selTitle: "One wrong member lowers the value for everyone.",
    selP: "This isn't fake scarcity. The entire value of the room depends on who's in it. So we only accept founders who will genuinely make the crew stronger — which is exactly why it starts with a conversation, not a checkout.",

    faqEyebrow: "Honest answers",
    faqTitle: "What founders ask before joining.",
    faqs: [
      { q: "I already know entrepreneurs.", a: "Knowing people creates conversations. This creates consistent progress — the same crew, every week, who know your business and make the big decisions with you." },
      { q: "I'm already in WhatsApp groups.", a: "Those are noise you scroll past. This is one focused hour a week on your business, with a real system and accountability behind it." },
      { q: "I already have a mentor.", a: "A mentor gives you one perspective. Here you get a crew solving the same problems right now — plus the weekly system a mentor rarely provides." },
      { q: "I'm too busy.", a: "Being buried is the symptom, not the reason to skip this. One focused hour a week stops you losing whole weeks to the wrong priorities." },
      { q: "Is it really worth it?", a: "Avoiding one expensive mistake — a bad hire, a wrong bet — pays for years. Most members say the accountability alone is worth it." },
      { q: "I'm not sure about the other members.", a: "That's exactly why we select carefully. Everyone here earns their place by making the crew better." },
    ],

    finalKicker: "The honest question:",
    finalTitleA: "How much faster could you move",
    finalTitleB: "with the right people around you?",
    finalSub: "Book a Founder Fit Call — a relaxed, no-pitch conversation to see if you belong in the room. If it's a fit, you'll feel it.",
    freeBySelection: "Free · By selection only",
    fullDetails: "Full details",
    footer: "Shoulder to Shoulder · By selection only",
  },

  nl: {
    book: "Boek een Founder Fit Call",
    bookArrow: "Boek een Founder Fit Call →",
    bySelection: "Alleen op selectie",

    heroKicker: "Voor ondernemers die weigeren langzaam te groeien.",
    heroTitleA: "Je eigen wekelijkse ",
    heroTitleB: "raad van founders.",
    heroSub: "Een zorgvuldig geselecteerde kring founders die de grote beslissingen mét je nemen en je scherp houden — binnen een bewezen systeem gebouwd om je groei onvermijdelijk te maken.",
    freeNoPitch: "Gratis · Geen pitch · 30 minuten",

    probEyebrow: "De echte reden dat groei stokt",
    probTitle: "Op een gegeven moment word je je eigen bottleneck.",
    probP1: "Het ligt zelden aan talent of inzet. Het is dat niemand consequent je denken uitdaagt, de moeilijke keuzes mét je maakt, of je de blinde vlek laat zien die je van binnenuit je eigen bedrijf niet kunt zien.",
    probP2: "Dus neem je genoegen met goed-genoeg beslissingen. Je verliest weken aan de verkeerde prioriteit. Je stelt de moeilijke keuze te lang uit. Alleen wordt niets daarvan gecorrigeerd — want er is niemand wiens taak het is om je te corrigeren.",

    netEyebrow: "“Maar ik ken al ondernemers”",
    netTitle: "Mensen kennen is geen crew hebben.",
    netP: "Je hebt contacten. Een paar WhatsApp-groepen. Af en toe een diner. Dat levert gesprekken op — geen progressie, geen accountability, en geen beslissingen die je samen neemt.",
    netLeftTitle: "Netwerken",
    netLeft: ["Elke keer andere mensen", "Oppervlakkig advies", "Je beslist alleen", "Volgende week vergeten"],
    netRightTitle: "Shoulder to Shoulder",
    netRight: ["Dezelfde crew, elke week", "Ze kennen je business door en door", "Grote beslissingen samen genomen", "Een systeem dat compound"],

    workEyebrow: "Waarom het werkt",
    workTitleA: "De juiste mensen — én een ",
    workTitleB: "systeem",
    workTitleC: " achter hoe je groeit.",
    workP: "De founders die het snelst groeien beslissen nooit alleen. Met een toegewijde crew en een helder systeem om je heen denk je groter, beslis je beter en beweeg je sneller. En betere beslissingen compound — één dure fout vermijden kan jaren terugverdienen.",
    workItems: [
      { title: "Je denkt groter", desc: "De groep verhoogt je standaard. Je zet de doelen waar je toe in staat bent, niet die waar je je comfortabel bij voelt." },
      { title: "Je beslist samen", desc: "Elke grote keuze wordt getoetst door mensen die er al geweest zijn. Je stopt met alleen gokken." },
      { title: "Je beweegt sneller", desc: "Bottlenecks die je weken zouden kosten, ruim je op in één gesprek." },
    ],

    sysEyebrow: "Het systeem",
    sysTitle: "Hoe groei onvermijdelijk wordt.",
    sysIntro: "Het is niet alleen de juiste groep. Er zit een systeem achter elke week.",
    sysItems: [
      { n: "1", title: "Stel je 10 doelen", desc: "Heldere 90-dagen doelen, zodat elke week ergens naartoe wijst." },
      { n: "2", title: "Outside-the-box strategieën", desc: "De crew helpt je de zetten te vinden die je alleen nooit zou zien." },
      { n: "3", title: "Needle-moving acties", desc: "Elke week de één of twee acties die de business écht bewegen." },
      { n: "4", title: "Accountability-dashboard", desc: "Je doelen en progressie, zichtbaar. Je doet wat je zei." },
      { n: "5", title: "Bottlenecks samen opgelost", desc: "Wat je ook blokkeert, de groep lost het op — snel." },
    ],
    sysClose: "Zo wordt groei onvermijdelijk.",
    meetCaption: "Je wekelijkse sessie draait op Google Meet — screenshot volgt",

    circleEyebrow: "Hoe het is opgebouwd",
    circleTitle: "Je inner circle van zes. Plus de hele community.",
    circleCrewTitle: "Je crew van zes",
    circleCrewDesc: "Je wordt geplaatst in een hechte kring van zes founders op jouw niveau — dezelfde gezichten elke week, diep vertrouwen, iedereen kent je business. Dit is je board, je close family in business.",
    circleCommTitle: "De community",
    circleCommDesc: "Om je crew heen: de volledige Shoulder to Shoulder community. Maandelijkse diners voor het sociale, echte vriendschappen, en een jaarlijkse summit waar iedereen samenkomt.",
    dinnerCaps: ["Founder-diner", "De community", "Samen"],

    stayEyebrow: "Waarom founders blijven",
    stayTitle: "Na een paar weken verandert er iets.",
    stayItems: [
      "Je stopt met twijfelen aan je beslissingen.",
      "Je hebt geen weken meer waarin je hard werkt maar weinig vooruitgang boekt.",
      "Je begint groter te denken — omdat de mensen om je heen meer verwachten.",
      "Je bouwt echte vriendschappen met founders die oprecht willen dat jij wint.",
    ],
    stayClose: "Dat is het verschil tussen een lidmaatschap dat je jaren houdt en een cursus die je binnen een maand vergeet.",

    aboutEyebrow: "Wie het leidt",
    aboutName: "Lennart van der Ziel",
    aboutRole: "Founder & host van Shoulder to Shoulder",
    aboutChips: ["5 jaar founder & CEO", "Bekroonde tech-startup", "100+ founders begeleid"],
    aboutP1: "Ik heb vijf jaar een bekroond technologiebedrijf gebouwd als founder en CEO — door de hoogtepunten, de bijna-fatale momenten, en alles daartussenin. Wat ik leerde is simpel: de bedrijven die het redden worden nooit alleen gebouwd.",
    aboutP2: "Sindsdien heb ik met 100+ ondernemers gewerkt aan hun strategie, hun groei, en hun mentale en fysieke prestaties. Shoulder to Shoulder is de groep — én het systeem — dat ik zelf had willen hebben.",

    fitEyebrow: "Wie hier thuishoort",
    fitTitle: "Dit is voor jou als…",
    fitItems: [
      "Je weet dat je je eigen bottleneck bent geworden — en daar klaar mee bent.",
      "Je weet dat je veel sneller zou groeien naast de juiste mensen.",
      "Je liever de waarheid hoort dan je ego beschermt.",
      "Je ambitieus en toegewijd bent, en iets uitzonderlijks wil bouwen.",
    ],

    resultsEyebrow: "Resultaten",
    resultsTitle: "De verandering die leden zien.",
    videoCaption: "Het verhaal van een lid",
    testimonials: [
      { quote: "Ik liep al een tijd rond met het vastgoedidee zonder in beweging te komen. Met de steun van de groep werd het grond die ik nu bezit en een project van 14 units dat loopt.", name: "Samer", type: "Lid · Vastgoed" },
      { quote: "Ik stopte met denken als operator en begon te denken als de founder die ik moet worden om €40M op te halen. Dat veranderde alles in hoe ik werk.", name: "Kibet", type: "Lid · Agritech" },
    ],

    selEyebrow: "Waarom we selecteren",
    selTitle: "Eén verkeerd lid verlaagt de waarde voor iedereen.",
    selP: "Dit is geen nep-schaarste. De hele waarde van de groep hangt af van wie erin zit. Dus we accepteren alleen founders die de crew echt sterker maken — precies daarom begint het met een gesprek, niet met een afrekenscherm.",

    faqEyebrow: "Eerlijke antwoorden",
    faqTitle: "Wat founders vragen voor ze meedoen.",
    faqs: [
      { q: "Ik ken al ondernemers.", a: "Mensen kennen levert gesprekken op. Dit levert consistente progressie op — dezelfde crew, elke week, die je business kent en de grote beslissingen mét je maakt." },
      { q: "Ik zit al in WhatsApp-groepen.", a: "Dat is ruis waar je langs scrollt. Dit is één gefocust uur per week op jouw business, met een echt systeem en accountability erachter." },
      { q: "Ik heb al een mentor.", a: "Een mentor geeft je één perspectief. Hier krijg je een crew die nú dezelfde problemen oplost — plus het wekelijkse systeem dat een mentor zelden biedt." },
      { q: "Ik heb geen tijd.", a: "Bedolven zijn is het symptoom, niet de reden om dit over te slaan. Eén gefocust uur per week voorkomt dat je hele weken verliest aan de verkeerde prioriteiten." },
      { q: "Is het het echt waard?", a: "Eén dure fout vermijden — een verkeerde hire, een verkeerde gok — verdient zich jaren terug. De meeste leden zeggen dat alleen de accountability het al waard is." },
      { q: "Ik twijfel over de andere leden.", a: "Precies daarom selecteren we zorgvuldig. Iedereen hier verdient z'n plek door de crew beter te maken." },
    ],

    finalKicker: "De eerlijke vraag:",
    finalTitleA: "Hoeveel sneller zou je bewegen",
    finalTitleB: "met de juiste mensen om je heen?",
    finalSub: "Boek een Founder Fit Call — een ontspannen gesprek zonder pitch om te kijken of je in de groep thuishoort. Als het klopt, voel je het.",
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
          <p style={{ maxWidth: 600, fontSize: 18.5, lineHeight: 1.55, color: MUT_SOFT, marginBottom: 36, fontWeight: 500 }}>{t.heroSub}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button onClick={book} className="btn-light" style={btnLight()}>{t.bookArrow}</button>
            <span style={{ fontSize: 13.5, color: MUT, fontWeight: 600 }}>{t.freeNoPitch}</span>
          </div>
        </div>
      </header>

      {/* PROBLEM — YOU BECOME YOUR OWN BOTTLENECK */}
      <section style={{ background: "#0f0e0b", padding: "100px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span style={eyebrow()}>{t.probEyebrow}</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,4.6vw,50px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>{t.probTitle}</h2>
          <p style={{ marginTop: 22, fontSize: 18, lineHeight: 1.65, color: MUT }}>{t.probP1}</p>
          <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.65, color: "#f0ece4" }}>{t.probP2}</p>
        </div>
      </section>

      {/* NETWORKING ISN'T ENOUGH — SIDE BY SIDE */}
      <section style={{ background: "#fff", color: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: ACCENT }}>{t.netEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.netTitle}</h2>
            <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.6, color: "#54504a" }}>{t.netP}</p>
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

      {/* WHY IT WORKS — RIGHT PEOPLE + SYSTEM */}
      <section style={{ background: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span style={eyebrow()}>{t.workEyebrow}</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,4.6vw,50px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>
            {t.workTitleA}<span style={{ color: ACCENT }}>{t.workTitleB}</span>{t.workTitleC}
          </h2>
          <p style={{ margin: "22px auto 0", maxWidth: 680, fontSize: 18, lineHeight: 1.65, color: MUT }}>{t.workP}</p>
          <div className="grid-auto" style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, textAlign: "left" }}>
            {t.workItems.map((c) => (
              <div key={c.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "28px 26px" }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>{c.title}</h3>
                <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: MUT }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SYSTEM — 5 STEP PATH */}
      <section style={{ background: "#fff", color: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 44px" }}>
            <span style={eyebrow()}>{t.sysEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.sysTitle}</h2>
            <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.6, color: "#54504a" }}>{t.sysIntro}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {t.sysItems.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: 18, alignItems: "center", background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, padding: "20px 24px" }}>
                <span style={{ flex: "0 0 auto", width: 42, height: 42, borderRadius: "50%", background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.n}</span>
                <div>
                  <h3 style={{ fontSize: 18.5, fontWeight: 800, letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ marginTop: 3, fontSize: 15, lineHeight: 1.5, color: "#6b665d" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 30, textAlign: "center", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#15130f" }}>
            {t.sysClose.replace(/\.$/, "")}<span style={{ color: ACCENT }}>.</span>
          </p>
          <div style={{ marginTop: 34, ...mediaBox, aspectRatio: "16/9", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ textAlign: "center", padding: 24 }}>
              <span style={{ fontSize: 30 }}>🎥</span>
              <p style={{ marginTop: 10, fontSize: 12.5, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{t.meetCaption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* YOUR CIRCLE OF 6 + COMMUNITY */}
      <section style={{ background: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 48px" }}>
            <span style={eyebrow()}>{t.circleEyebrow}</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff" }}>{t.circleTitle}</h2>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            <div style={{ background: "rgba(232,116,43,0.08)", border: `1px solid ${ACCENT}`, borderRadius: 18, padding: "34px 30px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 12, background: ACCENT, color: "#fff", fontWeight: 800, fontSize: 20 }}>6</span>
              <h3 style={{ marginTop: 18, fontSize: 22, fontWeight: 800, color: "#fff" }}>{t.circleCrewTitle}</h3>
              <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, color: MUT_SOFT }}>{t.circleCrewDesc}</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: "34px 30px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 800, fontSize: 20 }}>∞</span>
              <h3 style={{ marginTop: 18, fontSize: 22, fontWeight: 800, color: "#fff" }}>{t.circleCommTitle}</h3>
              <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, color: MUT }}>{t.circleCommDesc}</p>
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

      {/* WHY FOUNDERS STAY */}
      <section style={{ background: "#0f0e0b", padding: "100px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>{t.stayEyebrow}</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4.2vw,46px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fff" }}>{t.stayTitle}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {t.stayItems.map((x) => (
              <div key={x} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "20px 24px" }}>
                <span style={{ flex: "0 0 auto", marginTop: 2, color: ACCENT, fontSize: 18, fontWeight: 800 }}>→</span>
                <span style={{ fontSize: 17.5, fontWeight: 600, color: "#f0ece4", lineHeight: 1.4 }}>{x}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28, textAlign: "center", fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 20, lineHeight: 1.5, color: MUT, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>{t.stayClose}</p>
        </div>
      </section>

      {/* ABOUT LENNART */}
      <section style={{ background: "#15130f", padding: "100px 24px" }}>
        <div className="flex-wrap-col" style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 56, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px", minWidth: 260 }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Image src="/lennart.jpg" alt="Lennart van der Ziel" fill className="photo-grade" style={{ objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ flex: "1 1 420px" }}>
            <span style={eyebrow()}>{t.aboutEyebrow}</span>
            <h2 style={{ marginTop: 12, fontSize: "clamp(28px,3.8vw,40px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fff" }}>{t.aboutName}</h2>
            <p style={{ marginTop: 6, fontSize: 14.5, fontWeight: 700, color: ACCENT, letterSpacing: "0.03em" }}>{t.aboutRole}</p>
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {t.aboutChips.map((c) => (
                <span key={c} style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 100, padding: "6px 13px" }}>{c}</span>
              ))}
            </div>
            <p style={{ marginTop: 20, fontSize: 16.5, lineHeight: 1.65, color: MUT }}>{t.aboutP1}</p>
            <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.65, color: "#f0ece4" }}>{t.aboutP2}</p>
          </div>
        </div>
      </section>

      {/* WHO BELONGS */}
      <section style={{ background: "#fff", color: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 40px" }}>
            <span style={eyebrow()}>{t.fitEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.fitTitle}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {t.fitItems.map((f) => (
              <div key={f} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: "18px 24px" }}>
                <span style={{ flex: "0 0 auto", marginTop: 1, color: ACCENT, fontSize: 17, fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: 16.5, fontWeight: 600, lineHeight: 1.45 }}>{f}</span>
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
          <div style={{ ...mediaBox, aspectRatio: "16/9", maxWidth: 820, margin: "0 auto 12px" }}>
            <iframe src="https://drive.google.com/file/d/144mWmikXCAq_pEbl_U1d19YJ33m62y55/preview" allow="autoplay; fullscreen" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} title="Member testimonial" />
          </div>
          <p style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 28 }}>{t.videoCaption}</p>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
            {t.testimonials.map((tt) => (
              <div key={tt.name} style={{ background: "rgba(232,116,43,0.07)", border: "1px solid rgba(232,116,43,0.35)", borderRadius: 16, padding: "30px 30px" }}>
                <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 40, color: ACCENT, lineHeight: 0.4, display: "block" }}>&quot;</span>
                <p style={{ marginTop: 10, fontSize: 16.5, lineHeight: 1.5, fontWeight: 500, color: "#f0ece4" }}>{tt.quote}</p>
                <p style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: "0.04em" }}>{tt.name.toUpperCase()} · {tt.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WE SELECT */}
      <section style={{ background: "#fff", color: "#15130f", padding: "90px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <span style={eyebrow()}>{t.selEyebrow}</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(26px,3.8vw,40px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em" }}>{t.selTitle}</h2>
          <p style={{ marginTop: 18, fontSize: 17.5, lineHeight: 1.65, color: "#54504a" }}>{t.selP}</p>
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
              {openFaq === i && <p style={{ padding: "0 4px 24px", maxWidth: 640, fontSize: 16, lineHeight: 1.6, color: MUT }}>{f.a}</p>}
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
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 22, color: ACCENT }}>{t.finalKicker}</p>
          <h2 style={{ marginTop: 8, fontSize: "clamp(30px,4.6vw,52px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>{t.finalTitleA}<br />{t.finalTitleB}</h2>
          <p style={{ margin: "18px auto 0", maxWidth: 460, fontSize: 17, lineHeight: 1.55, color: MUT }}>{t.finalSub}</p>
          <div style={{ marginTop: 34, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
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

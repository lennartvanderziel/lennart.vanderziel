"use client";
import { useState } from "react";
import Image from "next/image";
import { useLang, LanguageToggle } from "@/components/i18n";

const ACCENT = "#E8742B";
const CAL_LINK = "https://calendar.app.google/wguaVQyvxW8Rbsxx9"; // Google Calendar booking (auto-adds Meet)

const copy = {
  en: {
    book: "Book a Founder Fit Call",
    bookArrow: "Book a Founder Fit Call →",
    bySelection: "By selection only",

    heroKicker: "For founders who refuse to grow slowly.",
    heroTitleA: "Your own weekly ",
    heroTitleB: "board of founders.",
    heroSub: "A small, hand-picked group of founders who challenge your thinking, hold you accountable, and help you see the blind spots you can't see alone — every single week.",
    freeNoPitch: "Free · No pitch · 30 minutes",

    probEyebrow: "The real reason growth stalls",
    probTitle: "At some point, you become your own bottleneck.",
    probP1: "It's rarely a lack of intelligence or effort. It's that no one consistently challenges your thinking, keeps you accountable, or shows you the blind spot you can't see from inside your own business.",
    probP2: "So you make good-enough decisions instead of great ones. You spend weeks on the wrong priority. You put off the hard call a little too long. Alone, none of it gets corrected — because there's no one whose job it is to correct it.",

    netEyebrow: "“But I already know founders”",
    netTitle: "Knowing people isn't having a team.",
    netP: "You have contacts. A few WhatsApp groups. The occasional dinner. That creates conversations. It doesn't create progress. There's a difference between people you know and people who are in it with you.",
    netLeftTitle: "Networking",
    netLeft: ["Different people each time", "Surface-level advice", "Nobody tracks your goals", "Forgotten by next week"],
    netRightTitle: "Shoulder to Shoulder",
    netRight: ["The same founders, every week", "Deep trust — they know your business", "Held accountable to your word", "Strategic feedback that compounds"],

    workEyebrow: "Why the model works",
    workTitleA: "Your own ",
    workTitleB: "board of advisors",
    workTitleC: " — for your business.",
    workP: "The founders who grow fastest never operate alone. Surrounded by peers who expect more from you, you think bigger, decide better, and move faster. And better decisions compound — avoiding one expensive mistake can pay for years of membership. This is the single biggest lever most founders never pull.",
    workItems: [
      { title: "You think bigger", desc: "The room raises your standard. You stop setting the targets you're comfortable with and start setting the ones you're capable of." },
      { title: "You decide better", desc: "Every big call gets pressure-tested by people who've been there. One avoided mistake — a bad hire, a wrong bet — can pay for years." },
      { title: "You move faster", desc: "Bottlenecks that would cost you weeks get solved in a single conversation. Progress compounds, week over week." },
    ],

    sysEyebrow: "The system",
    sysTitle: "Exactly how the growth happens.",
    sysIntro: "Nothing here is random. Every part exists to keep you moving on what actually matters — plus a monthly 1-on-1 with me, dinners, events and an annual summit.",
    sysItems: [
      { title: "90-day goals", desc: "A clear destination for the quarter, so every single week points somewhere real." },
      { title: "Monthly targets", desc: "The milestones that tell you you're on track — or not — while there's still time to adjust." },
      { title: "Weekly strategy sessions", desc: "One focused hour where the group works on your hardest problem, not just their own." },
      { title: "Needle-moving actions", desc: "Each week you commit to the one or two actions that truly move the business. No busywork." },
      { title: "Hot seats", desc: "The full attention of the room on one founder's biggest challenge. This is where breakthroughs happen." },
      { title: "Accountability & tracking", desc: "Your goals and progress are visible. You do what you said you'd do — because people are watching, in the best possible way." },
    ],

    stayEyebrow: "Why founders stay",
    stayTitle: "After a few weeks, something changes.",
    stayItems: [
      "You stop second-guessing your decisions.",
      "You stop having weeks where you work hard but make little progress.",
      "You start thinking bigger — because the people around you expect more from you.",
      "You build real friendships with founders who genuinely want you to win.",
    ],
    stayClose: "That's the difference between a membership you renew for years and a course you forget in a month.",

    aboutEyebrow: "Who runs it",
    aboutName: "Lennart van der Ziel",
    aboutRole: "Founder & host of Shoulder to Shoulder",
    aboutP1: "I spent five years building an award-winning technology company as founder and CEO — through the highs, the near-death moments, and everything in between. What I learned is simple: the businesses that make it are never built alone.",
    aboutP2: "Since then I've worked with 100+ business owners on their strategy, their growth, and their mental and physical performance. Shoulder to Shoulder is the room I wish I'd had — a small circle of serious founders who make each other sharper, faster and braver, every single week.",

    fitEyebrow: "Who belongs here",
    fitTitle: "It's about mindset, not revenue.",
    fitIntro: "We don't select on the size of your business. We select on how you show up.",
    fitItems: [
      "Ambitious — you want to build something exceptional",
      "Open — you'd rather hear the truth than protect your ego",
      "Generous — you challenge and support others, not just take",
      "Committed — you show up and do what you said",
      "Hungry to think bigger, alongside founders who raise your game",
    ],

    resultsEyebrow: "Results",
    resultsTitle: "The change members see.",
    testimonials: [
      { quote: "I'd been circling the real estate idea for a while without moving. With the support of the group it turned into land I now own and a 14-unit project underway.", name: "Samer", type: "Real estate" },
      { quote: "I stopped thinking like an operator and started thinking like the founder I need to become to raise €40M. That changed how I do everything.", name: "Kibet", type: "Agritech" },
    ],

    selEyebrow: "Why we select",
    selTitle: "One wrong member lowers the value for everyone.",
    selP: "This isn't fake scarcity. The entire value of the room depends on who's in it. So we only accept founders who will genuinely make the group stronger — which is exactly why it starts with a conversation, not a checkout.",

    faqEyebrow: "Honest answers",
    faqTitle: "What founders ask before joining.",
    faqs: [
      { q: "I already know entrepreneurs.", a: "Knowing people creates conversations. This creates consistent progress — the same committed group, every week, who actually know your business and hold you to your word." },
      { q: "I'm already in WhatsApp groups.", a: "Those are noise you scroll past. This is one focused hour a week on your business, with real accountability and strategy behind it." },
      { q: "I already have a mentor.", a: "A mentor gives you one perspective. Here you get a room of founders solving the same problems right now — plus the weekly accountability a mentor rarely provides." },
      { q: "I'm too busy.", a: "Being buried is the symptom, not the reason to skip this. One focused hour a week is what stops you losing whole weeks to the wrong priorities." },
      { q: "Is it really worth it?", a: "Avoiding one expensive mistake — a bad hire, a wrong bet — pays for years. Most members say the accountability alone is worth it." },
      { q: "I'm not sure about the other members.", a: "That's exactly why we select carefully. Everyone here earns their place by making the group better. One wrong member lowers it for all." },
    ],

    finalKicker: "The honest question:",
    finalTitleA: "How much faster could you move",
    finalTitleB: "with the right people around you?",
    finalSub: "Book a Founder Fit Call — a relaxed, no-pitch conversation to see if you belong in the room. If it's a fit, you'll feel it.",
    received: "Received.",
    receivedSub: "Lennart will reach out personally to lock in your Founder Fit Call. Keep an eye on your WhatsApp and inbox.",
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
    runCaption: "A weekly session in progress",
  },

  nl: {
    book: "Boek een Founder Fit Call",
    bookArrow: "Boek een Founder Fit Call →",
    bySelection: "Alleen op selectie",

    heroKicker: "Voor founders die weigeren langzaam te groeien.",
    heroTitleA: "Je eigen wekelijkse ",
    heroTitleB: "raad van founders.",
    heroSub: "Een kleine, zorgvuldig geselecteerde groep founders die je denken uitdaagt, je scherp houdt en je helpt de blinde vlekken te zien die je alleen niet ziet — elke week opnieuw.",
    freeNoPitch: "Gratis · Geen pitch · 30 minuten",

    probEyebrow: "De echte reden dat groei stokt",
    probTitle: "Op een gegeven moment word je je eigen bottleneck.",
    probP1: "Het ligt zelden aan gebrek aan intelligentie of inzet. Het is dat niemand consequent je denken uitdaagt, je aan je woord houdt, of je de blinde vlek laat zien die je van binnenuit je eigen bedrijf niet kunt zien.",
    probP2: "Dus neem je goed-genoeg beslissingen in plaats van uitstekende. Je verliest weken aan de verkeerde prioriteit. Je stelt de moeilijke keuze net iets te lang uit. Alleen wordt niets daarvan gecorrigeerd — want er is niemand wiens taak het is om je te corrigeren.",

    netEyebrow: "“Maar ik ken al founders”",
    netTitle: "Mensen kennen is geen team hebben.",
    netP: "Je hebt contacten. Een paar WhatsApp-groepen. Af en toe een diner. Dat levert gesprekken op. Geen progressie. Er is een verschil tussen mensen die je kent en mensen die er samen met jou in zitten.",
    netLeftTitle: "Netwerken",
    netLeft: ["Elke keer andere mensen", "Oppervlakkig advies", "Niemand volgt je doelen", "Volgende week vergeten"],
    netRightTitle: "Shoulder to Shoulder",
    netRight: ["Dezelfde founders, elke week", "Diep vertrouwen — ze kennen je business", "Aan je woord gehouden", "Strategische feedback die compound"],

    workEyebrow: "Waarom het model werkt",
    workTitleA: "Je eigen ",
    workTitleB: "raad van adviseurs",
    workTitleC: " — voor je business.",
    workP: "De founders die het snelst groeien opereren nooit alleen. Omringd door peers die meer van je verwachten, denk je groter, beslis je beter en beweeg je sneller. En betere beslissingen compound — één dure fout vermijden kan jaren lidmaatschap terugverdienen. Dit is de grootste hefboom die de meeste founders nooit gebruiken.",
    workItems: [
      { title: "Je denkt groter", desc: "De groep verhoogt je standaard. Je stopt met de doelen waar je je comfortabel bij voelt en zet de doelen waar je toe in staat bent." },
      { title: "Je beslist beter", desc: "Elke grote keuze wordt getoetst door mensen die er al geweest zijn. Eén vermeden fout — een verkeerde hire, een verkeerde gok — kan jaren terugverdienen." },
      { title: "Je beweegt sneller", desc: "Bottlenecks die je weken zouden kosten, los je op in één gesprek. Progressie compound, week na week." },
    ],

    sysEyebrow: "Het systeem",
    sysTitle: "Precies hoe de groei ontstaat.",
    sysIntro: "Niets hier is willekeurig. Elk onderdeel bestaat om je in beweging te houden op wat er echt toe doet — plus een maandelijkse 1-op-1 met mij, diners, events en een jaarlijkse summit.",
    sysItems: [
      { title: "90-dagen doelen", desc: "Een heldere bestemming voor het kwartaal, zodat elke week ergens naartoe wijst." },
      { title: "Maanddoelen", desc: "De mijlpalen die je vertellen of je op koers ligt — of niet — terwijl er nog tijd is om bij te sturen." },
      { title: "Wekelijkse strategiesessies", desc: "Eén gefocust uur waarin de groep aan jouw moeilijkste probleem werkt, niet alleen aan dat van henzelf." },
      { title: "Needle-moving acties", desc: "Elke week commit je aan de één of twee acties die de business écht bewegen. Geen bezigheidstherapie." },
      { title: "Hot seats", desc: "De volledige aandacht van de groep op de grootste uitdaging van één founder. Hier ontstaan de doorbraken." },
      { title: "Accountability & tracking", desc: "Je doelen en progressie zijn zichtbaar. Je doet wat je zei — omdat mensen meekijken, op de best mogelijke manier." },
    ],

    stayEyebrow: "Waarom founders blijven",
    stayTitle: "Na een paar weken verandert er iets.",
    stayItems: [
      "Je stopt met twijfelen aan je beslissingen.",
      "Je hebt geen weken meer waarin je hard werkt maar weinig vooruitgang boekt.",
      "Je begint groter te denken — omdat de mensen om je heen meer van je verwachten.",
      "Je bouwt echte vriendschappen met founders die oprecht willen dat jij wint.",
    ],
    stayClose: "Dat is het verschil tussen een lidmaatschap dat je jaren verlengt en een cursus die je binnen een maand vergeet.",

    aboutEyebrow: "Wie het leidt",
    aboutName: "Lennart van der Ziel",
    aboutRole: "Founder & host van Shoulder to Shoulder",
    aboutP1: "Ik heb vijf jaar een bekroond technologiebedrijf gebouwd als founder en CEO — door de hoogtepunten, de bijna-fatale momenten, en alles daartussenin. Wat ik leerde is simpel: de bedrijven die het redden worden nooit alleen gebouwd.",
    aboutP2: "Sindsdien heb ik met 100+ ondernemers gewerkt aan hun strategie, hun groei, en hun mentale en fysieke prestaties. Shoulder to Shoulder is de groep die ik zelf had willen hebben — een kleine kring serieuze founders die elkaar scherper, sneller en moediger maken, elke week opnieuw.",

    fitEyebrow: "Wie hier thuishoort",
    fitTitle: "Het gaat om mindset, niet om omzet.",
    fitIntro: "We selecteren niet op de grootte van je bedrijf. We selecteren op hoe je je opstelt.",
    fitItems: [
      "Ambitieus — je wil iets uitzonderlijks bouwen",
      "Open — je hoort liever de waarheid dan dat je je ego beschermt",
      "Gul — je daagt anderen uit en steunt ze, je komt niet alleen halen",
      "Toegewijd — je komt opdagen en doet wat je zei",
      "Hongerig om groter te denken, naast founders die je niveau optillen",
    ],

    resultsEyebrow: "Resultaten",
    resultsTitle: "De verandering die leden zien.",
    testimonials: [
      { quote: "Ik liep al een tijd rond met het vastgoedidee zonder in beweging te komen. Met de steun van de groep werd het grond die ik nu bezit en een project van 14 units dat loopt.", name: "Samer", type: "Vastgoed" },
      { quote: "Ik stopte met denken als operator en begon te denken als de founder die ik moet worden om €40M op te halen. Dat veranderde alles in hoe ik werk.", name: "Kibet", type: "Agritech" },
    ],

    selEyebrow: "Waarom we selecteren",
    selTitle: "Eén verkeerd lid verlaagt de waarde voor iedereen.",
    selP: "Dit is geen nep-schaarste. De hele waarde van de groep hangt af van wie erin zit. Dus we accepteren alleen founders die de groep echt sterker maken — precies daarom begint het met een gesprek, niet met een afrekenscherm.",

    faqEyebrow: "Eerlijke antwoorden",
    faqTitle: "Wat founders vragen voor ze meedoen.",
    faqs: [
      { q: "Ik ken al ondernemers.", a: "Mensen kennen levert gesprekken op. Dit levert consistente progressie op — dezelfde toegewijde groep, elke week, die je business kent en je aan je woord houdt." },
      { q: "Ik zit al in WhatsApp-groepen.", a: "Dat is ruis waar je langs scrollt. Dit is één gefocust uur per week op jouw business, met echte accountability en strategie erachter." },
      { q: "Ik heb al een mentor.", a: "Een mentor geeft je één perspectief. Hier krijg je een groep founders die nú dezelfde problemen oplossen — plus de wekelijkse accountability die een mentor zelden biedt." },
      { q: "Ik heb geen tijd.", a: "Bedolven zijn is het symptoom, niet de reden om dit over te slaan. Eén gefocust uur per week voorkomt dat je hele weken verliest aan de verkeerde prioriteiten." },
      { q: "Is het het echt waard?", a: "Eén dure fout vermijden — een verkeerde hire, een verkeerde gok — verdient zich jaren terug. De meeste leden zeggen dat alleen de accountability het al waard is." },
      { q: "Ik twijfel over de andere leden.", a: "Precies daarom selecteren we zorgvuldig. Iedereen hier verdient z'n plek door de groep beter te maken. Eén verkeerd lid verlaagt het voor iedereen." },
    ],

    finalKicker: "De eerlijke vraag:",
    finalTitleA: "Hoeveel sneller zou je bewegen",
    finalTitleB: "met de juiste mensen om je heen?",
    finalSub: "Boek een Founder Fit Call — een ontspannen gesprek zonder pitch om te kijken of je in de groep thuishoort. Als het klopt, voel je het.",
    received: "Ontvangen.",
    receivedSub: "Lennart neemt persoonlijk contact op om je Founder Fit Call in te plannen. Houd je WhatsApp en inbox in de gaten.",
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
    runCaption: "Een wekelijkse sessie in volle gang",
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
  const eyebrow = (color = ACCENT): React.CSSProperties => ({ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color });

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
          <p style={{ maxWidth: 600, fontSize: 18.5, lineHeight: 1.55, color: "rgba(255,255,255,0.8)", marginBottom: 36, fontWeight: 500 }}>{t.heroSub}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <button onClick={book} className="btn-light" style={btnLight()}>{t.bookArrow}</button>
            <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{t.freeNoPitch}</span>
          </div>
        </div>
      </header>

      {/* PROBLEM — YOU BECOME YOUR OWN BOTTLENECK */}
      <section style={{ background: "#0f0e0b", padding: "100px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span style={eyebrow()}>{t.probEyebrow}</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,4.6vw,50px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>{t.probTitle}</h2>
          <p style={{ marginTop: 22, fontSize: 18, lineHeight: 1.65, color: "#a59e93" }}>{t.probP1}</p>
          <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.65, color: "#f0ece4" }}>{t.probP2}</p>
        </div>
      </section>

      {/* NETWORKING ISN'T ENOUGH — SIDE BY SIDE */}
      <section style={{ background: "#fff", color: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 23, color: ACCENT }}>{t.netEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.netTitle}</h2>
            <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.6, color: "#5f5a51" }}>{t.netP}</p>
          </div>
          <div className="grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            <div style={{ background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: "30px 28px" }}>
              <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a39b8e" }}>{t.netLeftTitle}</p>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                {t.netLeft.map((x) => (
                  <div key={x} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 15.5, color: "#6b665d" }}>
                    <span style={{ flex: "0 0 auto", width: 20, height: 20, borderRadius: "50%", border: "1.5px solid rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#a39b8e" }}>✕</span>
                    {x}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#15130f", border: `1px solid ${ACCENT}`, borderRadius: 16, padding: "30px 28px" }}>
              <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT }}>{t.netRightTitle}</p>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                {t.netRight.map((x) => (
                  <div key={x} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 15.5, color: "#f0ece4", fontWeight: 500 }}>
                    <span style={{ flex: "0 0 auto", width: 20, height: 20, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 800 }}>✓</span>
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THE MODEL WORKS — BOARD OF ADVISORS + PSYCHOLOGY */}
      <section style={{ background: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span style={eyebrow()}>{t.workEyebrow}</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(30px,4.6vw,50px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>
            {t.workTitleA}<span style={{ color: ACCENT }}>{t.workTitleB}</span>{t.workTitleC}
          </h2>
          <p style={{ margin: "22px auto 0", maxWidth: 680, fontSize: 18, lineHeight: 1.65, color: "#a59e93" }}>{t.workP}</p>
          <div className="grid-auto" style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, textAlign: "left" }}>
            {t.workItems.map((c) => (
              <div key={c.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "28px 26px" }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>{c.title}</h3>
                <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: "#9a9389" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SYSTEM */}
      <section style={{ background: "#fff", color: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 20px" }}>
            <span style={eyebrow()}>{t.sysEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.sysTitle}</h2>
            <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.6, color: "#5f5a51" }}>{t.sysIntro}</p>
          </div>
          <div className="grid-auto" style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {t.sysItems.map((s, i) => (
              <div key={s.title} className="card-lift" style={{ background: "#f4f1ea", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: "26px 26px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 9, background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`, color: ACCENT, fontWeight: 800, fontSize: 15 }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontSize: 19, fontWeight: 800, marginTop: 16, letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.55, color: "#6b665d" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 34, ...mediaBox, aspectRatio: "16/9", maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
            <Image src="/session.jpg" alt="Live group session" fill className="photo-grade" style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,9,7,0.7), transparent 55%)", display: "flex", alignItems: "flex-end", padding: 22 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#fff" }}>{t.runCaption}</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FOUNDERS STAY — TRANSFORMATION / IDENTITY */}
      <section style={{ background: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 24, color: ACCENT }}>{t.stayEyebrow}</span>
            <h2 style={{ marginTop: 8, fontSize: "clamp(28px,4.2vw,46px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fff" }}>{t.stayTitle}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {t.stayItems.map((x) => (
              <div key={x} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "20px 24px" }}>
                <span style={{ flex: "0 0 auto", marginTop: 2, color: ACCENT, fontSize: 18, fontWeight: 800 }}>→</span>
                <span style={{ fontSize: 17.5, fontWeight: 600, color: "#f0ece4", lineHeight: 1.4 }}>{x}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28, textAlign: "center", fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 20, lineHeight: 1.5, color: "#a59e93", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>{t.stayClose}</p>
        </div>
      </section>

      {/* ABOUT LENNART */}
      <section style={{ background: "#0f0e0b", padding: "100px 24px" }}>
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
            <p style={{ marginTop: 20, fontSize: 16.5, lineHeight: 1.65, color: "#a59e93" }}>{t.aboutP1}</p>
            <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.65, color: "#f0ece4" }}>{t.aboutP2}</p>
          </div>
        </div>
      </section>

      {/* WHO BELONGS — MINDSET */}
      <section style={{ background: "#fff", color: "#15130f", padding: "100px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 40px" }}>
            <span style={eyebrow()}>{t.fitEyebrow}</span>
            <h2 style={{ marginTop: 10, fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em" }}>{t.fitTitle}</h2>
            <p style={{ marginTop: 14, fontSize: 16.5, lineHeight: 1.6, color: "#5f5a51" }}>{t.fitIntro}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {t.fitItems.map((f) => (
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

      {/* WHY WE SELECT — EXCLUSIVITY */}
      <section style={{ background: "#fff", color: "#15130f", padding: "90px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <span style={eyebrow()}>{t.selEyebrow}</span>
          <h2 style={{ marginTop: 12, fontSize: "clamp(26px,3.8vw,40px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em" }}>{t.selTitle}</h2>
          <p style={{ marginTop: 18, fontSize: 17.5, lineHeight: 1.65, color: "#5f5a51" }}>{t.selP}</p>
        </div>
      </section>

      {/* FAQ — OBJECTIONS */}
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
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: 22, color: ACCENT }}>{t.finalKicker}</p>
          <h2 style={{ marginTop: 8, fontSize: "clamp(30px,4.6vw,52px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>{t.finalTitleA}<br />{t.finalTitleB}</h2>
          <p style={{ margin: "18px auto 0", maxWidth: 460, fontSize: 17, lineHeight: 1.55, color: "#a59e93" }}>{t.finalSub}</p>
          <div style={{ marginTop: 34, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <button onClick={book} className="btn-light" style={btnLight()}>{t.bookArrow}</button>
            <span style={{ fontSize: 12.5, color: "#8a847a" }}>{t.freeBySelection}</span>
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

import type { Metadata } from "next";
import { Schibsted_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://lennartvanderziel.com"),
  title: {
    default: "Lennart van der Ziel · Developing Founders, Not Technology",
    template: "%s · Lennart van der Ziel",
  },
  description:
    "Former founder & CEO of an award-winning tech startup, now developing the people behind businesses — strategy, masterminds and founder communities. Home of Shoulder to Shoulder.",
  keywords: [
    "founder coaching",
    "founder development",
    "executive performance",
    "entrepreneur coaching",
    "Shoulder to Shoulder",
    "founder circle",
    "business coaching",
    "Lennart van der Ziel",
  ],
  authors: [{ name: "Lennart van der Ziel" }],
  creator: "Lennart van der Ziel",
  alternates: { canonical: "https://lennartvanderziel.com" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lennartvanderziel.com",
    siteName: "Lennart van der Ziel",
    title: "Lennart van der Ziel · Developing Founders, Not Technology",
    description:
      "Strategy, masterminds and founder communities. I help business owners grow — surrounded by the right entrepreneurs.",
    images: [{ url: "/lennart.jpg", width: 1200, height: 630, alt: "Lennart van der Ziel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lennart van der Ziel · Developing Founders, Not Technology",
    description:
      "Strategy, masterminds and founder communities. I help business owners grow — surrounded by the right entrepreneurs.",
    images: ["/lennart.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://lennartvanderziel.com/#person",
      name: "Lennart van der Ziel",
      url: "https://lennartvanderziel.com",
      image: "https://lennartvanderziel.com/lennart.jpg",
      jobTitle: "Founder Coach & Mastermind Facilitator",
      description:
        "Former founder & CEO of an award-winning tech startup. Since 2020, develops founders through strategy coaching, masterminds and communities.",
      knowsAbout: ["Founder development", "Business strategy", "Masterminds", "Entrepreneur communities", "Health optimization"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://lennartvanderziel.com/#business",
      name: "Lennart van der Ziel Coaching",
      url: "https://lennartvanderziel.com",
      founder: { "@id": "https://lennartvanderziel.com/#person" },
      description:
        "Elite health performance coaching and the Shoulder to Shoulder Founder Circle — a private community for high-level founders.",
      areaServed: "Worldwide",
    },
    {
      "@type": "WebSite",
      "@id": "https://lennartvanderziel.com/#website",
      url: "https://lennartvanderziel.com",
      name: "Lennart van der Ziel",
      publisher: { "@id": "https://lennartvanderziel.com/#person" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${cormorant.variable}`}>
      <body style={{ fontFamily: "var(--font-sans), ui-sans-serif, sans-serif", background: "#ffffff", color: "#15130f", WebkitFontSmoothing: "antialiased" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

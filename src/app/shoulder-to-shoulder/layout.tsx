import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoulder to Shoulder · Founder Circle",
  description:
    "Scale further, alongside founders who've been there. A private Founder Circle that meets weekly — by application only. Make reaching your potential inevitable.",
  alternates: { canonical: "https://lennartvanderziel.com/shoulder-to-shoulder" },
  openGraph: {
    title: "Shoulder to Shoulder · Founder Circle",
    description:
      "Scale further, alongside founders who've been there. A private Founder Circle that meets weekly — by application only.",
    url: "https://lennartvanderziel.com/shoulder-to-shoulder",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "Shoulder to Shoulder Founder Circle" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

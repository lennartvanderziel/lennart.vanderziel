import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoulder to Shoulder · By Invitation",
  description:
    "You've met the room. Book your selection call and discover whether Shoulder to Shoulder is the right circle for you.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Shoulder to Shoulder · By Invitation",
    description: "A private circle of founders growing exponentially — together. By application only.",
    images: [{ url: "/founders.jpg", width: 1200, height: 630, alt: "Shoulder to Shoulder" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High Performance Mentoring",
  description:
    "Private 1-on-1 mentoring for founders who want to operate at their A-game — mentally, physically and emotionally. Built on real assessments, health testing and ongoing coaching.",
  alternates: { canonical: "https://lennartvanderziel.com/high-performance-mentoring" },
  openGraph: {
    title: "High Performance Mentoring · Lennart van der Ziel",
    description:
      "Private 1-on-1 mentoring for founders — assessments, health testing, and a plan for mental, physical and emotional peak performance.",
    url: "https://lennartvanderziel.com/high-performance-mentoring",
    images: [{ url: "/lennart.jpg", width: 1200, height: 630, alt: "High Performance Mentoring" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

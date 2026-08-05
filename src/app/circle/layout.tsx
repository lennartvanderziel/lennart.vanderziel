import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Accountability · Shoulder to Shoulder",
  description: "Fill in your week before the circle call and see where everyone else stands.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

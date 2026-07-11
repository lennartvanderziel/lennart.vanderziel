import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Platform · Shoulder to Shoulder",
  description: "Member access to the Shoulder to Shoulder Founder Circle platform.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

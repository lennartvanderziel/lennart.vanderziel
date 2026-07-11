import type { Metadata } from "next";
import { Schibsted_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  title: "Lennart van der Ziel",
  description: "Grow your business by growing the founder behind it. A private brotherhood for committed founders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${cormorant.variable}`}>
      <body style={{ fontFamily: "var(--font-sans), ui-sans-serif, sans-serif", background: "#ffffff", color: "#15130f", WebkitFontSmoothing: "antialiased" }}>
        {children}
      </body>
    </html>
  );
}

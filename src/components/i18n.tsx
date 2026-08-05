"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "nl";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("sts-lang")) as Lang | null;
    if (saved === "nl" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("sts-lang", l); } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

// Small EN | NL pill toggle. `dark` for use over dark backgrounds.
export function LanguageToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  const base: React.CSSProperties = {
    border: dark ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.15)",
    borderRadius: 100,
    padding: "3px",
    display: "inline-flex",
    gap: 2,
    background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
  };
  const pill = (active: boolean): React.CSSProperties => ({
    padding: "5px 11px",
    borderRadius: 100,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.03em",
    cursor: "pointer",
    border: "none",
    fontFamily: "inherit",
    background: active ? "#E8742B" : "transparent",
    color: active ? "#fff" : dark ? "rgba(255,255,255,0.7)" : "#6b665d",
    transition: "background .2s, color .2s",
  });
  return (
    <div style={base} role="group" aria-label="Language">
      <button style={pill(lang === "en")} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
      <button style={pill(lang === "nl")} onClick={() => setLang("nl")} aria-pressed={lang === "nl"}>NL</button>
    </div>
  );
}

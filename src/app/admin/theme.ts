import type { CSSProperties } from "react";

// "Command Center" — the admin CRM's own DARK theme. Kept separate from
// @/lib/theme (the light palette the public /circle view still uses), so
// re-skinning the CRM never touches the marketing site.
//
// Violet accent for active/interactive state, a gold CTA, on a near-black
// canvas with faint-blue undertones — modelled on the reference design.

export const ACCENT = "#8B5CF6"; // violet — active nav, links, focus
export const ACCENT_TEXT = "#A78BFA"; // lighter violet for text/icons on dark
export const ACCENT_TINT = "rgba(139,92,246,0.15)"; // active/hover fills
export const GOLD = "#F3C969"; // primary CTA (Add contact, New proposal…)
export const GREEN = "#34D399"; // won · whatsapp · positive
export const RED = "#F87171"; // lost · overdue
export const BLUE = "#60A5FA";
export const VIOLET = "#A78BFA";

export const INK = "#ECEDF3"; // primary text
export const MUTED = "#9B9CAB"; // secondary text
export const FAINT = "#666881"; // tertiary text / labels

export const PAGE = "#0A0A11"; // app background
export const CARD = "#14141E"; // card surface
export const CARD_2 = "#1B1B28"; // slightly raised surface
export const LINE = "rgba(255,255,255,0.08)"; // hairlines
export const FILL = "#1C1C29"; // inputs / inset fills

export const BORDER = `1px solid ${LINE}`;
export const SHADOW = "0 1px 2px rgba(0,0,0,0.5), 0 18px 44px rgba(0,0,0,0.5)";
export const RADIUS = 16;
export const SIDEBAR_W = 250;

export const inputS: CSSProperties = {
  width: "100%",
  background: FILL,
  border: BORDER,
  color: INK,
  padding: "11px 13px",
  fontSize: 13.5,
  fontFamily: "inherit",
  borderRadius: 10,
  outline: "none",
};

export const cardS: CSSProperties = {
  background: CARD,
  border: BORDER,
  borderRadius: RADIUS,
  padding: "22px 24px",
  boxShadow: SHADOW,
};

export const btnS: CSSProperties = {
  background: GOLD,
  color: "#1c1706",
  border: "none",
  padding: "10px 18px",
  fontSize: 13,
  fontWeight: 800,
  borderRadius: 12,
  cursor: "pointer",
  fontFamily: "inherit",
};

export const ghostS: CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: BORDER,
  color: INK,
  padding: "9px 16px",
  fontSize: 12.5,
  fontWeight: 600,
  borderRadius: 12,
  cursor: "pointer",
  fontFamily: "inherit",
};

export const labelS: CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  color: FAINT,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

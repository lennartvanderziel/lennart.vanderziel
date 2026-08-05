import type { CSSProperties } from "react";

// Light theme matched to the marketing site's warm-paper palette
// (#fbf9f5 page / #ffffff surfaces / #15130f ink) so the CRM and the
// public site read as one product rather than two.

export const ACCENT = "#E8742B"; // brand orange: fills, large numerals
export const ACCENT_TEXT = "#B4551A"; // darkened accent for small text (contrast)
export const ACCENT_TINT = "#FDF0E7";
export const GREEN = "#3f7a30";
export const RED = "#b83a32";
export const BLUE = "#3a6480";
export const VIOLET = "#5d4b8c";

export const INK = "#15130f"; // primary text
export const MUTED = "#7d766c"; // secondary text
export const FAINT = "#a39d92"; // tertiary text, labels

export const PAGE = "#fbf9f5"; // page background
export const CARD = "#ffffff"; // card surface
export const LINE = "#e7e3db"; // hairlines
export const FILL = "#f6f3ec"; // inset fills: inputs, table stripes

export const BORDER = `1px solid ${LINE}`;
export const SHADOW = "0 1px 2px rgba(21,19,15,0.04), 0 8px 24px rgba(21,19,15,0.06)";
export const RADIUS = 14;

export const SIDEBAR_W = 244;

export const inputS: CSSProperties = {
  width: "100%",
  background: FILL,
  border: BORDER,
  color: INK,
  padding: "11px 13px",
  fontSize: 13.5,
  fontFamily: "inherit",
  borderRadius: 8,
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
  background: ACCENT,
  color: "#ffffff",
  border: "none",
  padding: "10px 20px",
  fontSize: 13,
  fontWeight: 700,
  borderRadius: 100,
  cursor: "pointer",
  fontFamily: "inherit",
};

export const ghostS: CSSProperties = {
  background: "transparent",
  border: BORDER,
  color: MUTED,
  padding: "9px 18px",
  fontSize: 12.5,
  fontWeight: 600,
  borderRadius: 100,
  cursor: "pointer",
  fontFamily: "inherit",
};

export const labelS: CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  color: FAINT,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

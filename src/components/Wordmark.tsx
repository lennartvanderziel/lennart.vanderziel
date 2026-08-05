import { ACCENT, INK } from "@/lib/theme";

/**
 * The Shoulder 2 Shoulder wordmark: the "2" always carries the brand orange.
 * One component so the mark can never drift between the CRM and the member view.
 */
export function Wordmark({ size = 14, color = INK }: { size?: number; color?: string }) {
  return (
    <span style={{ fontSize: size, fontWeight: 800, color, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
      Shoulder <span style={{ color: ACCENT }}>2</span> Shoulder
    </span>
  );
}

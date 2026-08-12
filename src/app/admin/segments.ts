import { ACCENT, BLUE, VIOLET } from "./theme";
import type { Segment } from "./types";

/** The businesses/circles the CRM serves. Add or rename here and it flows
 * through the segment filter, the lead form and the pills automatically. */
export const SEGMENTS: { id: Segment; label: string; short: string; color: string }[] = [
  { id: "shoulder_to_shoulder", label: "Shoulder to Shoulder", short: "STS", color: ACCENT },
  { id: "one_on_one", label: "1:1 Coaching", short: "1:1", color: BLUE },
  { id: "womens_circle", label: "Women's Circle", short: "Women", color: VIOLET },
];

export const DEFAULT_SEGMENT: Segment = "shoulder_to_shoulder";

/** Meta for a segment, tolerating older records that predate the field. */
export const segmentMeta = (id: Segment | undefined) =>
  SEGMENTS.find((s) => s.id === id) ?? SEGMENTS[0];

import { ACCENT_TEXT, BLUE, GREEN, MUTED, RED, VIOLET } from "./theme";
import type { LeadStatus, MemberStatus } from "./types";

export const leadStatusConfig: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "New", color: MUTED },
  contacted: { label: "Contacted", color: BLUE },
  warming: { label: "Warming up", color: "#C07C2C" },
  exploratory: { label: "Exploratory call", color: VIOLET },
  decision: { label: "Decision call", color: ACCENT_TEXT },
  member: { label: "Member ✓", color: GREEN },
  later: { label: "Wants later", color: "#8A6D4B" },
  declined: { label: "Declined", color: RED },
};

/** Order the pipeline columns read left to right: the happy path first, then
 * the two side buckets (later / declined). */
export const PIPELINE_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "warming",
  "exploratory",
  "decision",
  "member",
  "later",
  "declined",
];

export const memberStatusColor: Record<MemberStatus, string> = {
  active: GREEN,
  paused: ACCENT_TEXT,
  churned: RED,
};

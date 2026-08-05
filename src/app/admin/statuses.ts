import { ACCENT_TEXT, BLUE, GREEN, MUTED, RED } from "./theme";
import type { LeadStatus, MemberStatus } from "./types";

export const leadStatusConfig: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "New", color: MUTED },
  reviewing: { label: "Reviewing", color: BLUE },
  call_booked: { label: "Call booked", color: ACCENT_TEXT },
  member: { label: "Member ✓", color: GREEN },
  declined: { label: "Declined", color: RED },
};

/** Order the pipeline columns read left to right. */
export const PIPELINE_ORDER: LeadStatus[] = ["new", "reviewing", "call_booked", "member", "declined"];

export const memberStatusColor: Record<MemberStatus, string> = {
  active: GREEN,
  paused: ACCENT_TEXT,
  churned: RED,
};

export type LeadStatus = "new" | "reviewing" | "call_booked" | "member" | "declined";
export type MemberStatus = "active" | "paused" | "churned";

export interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  instagram: string;
  business: string;
  revenue: string;
  source: string;
  status: LeadStatus;
  notes: string;
  createdAt: number;
  sequenceStep: number;
  lastEmailAt: number | null;
  sequenceActive: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  instagram: string;
  revenue: string;
  company: string;
  tier: string;
  price: string;
  circle: string;
  joinedAt: string;
  renewsAt: string;
  status: MemberStatus;
  engagement: string;
  needs: string;
  connections: string;
  notes: string;
}

export interface SeqStep {
  id: string;
  dayOffset: number;
  subject: string;
  body: string;
}

/** A weekly circle session. Attendance drives the engagement signal on Circles. */
export interface Session {
  id: string;
  circle: string;
  date: string;
  topic: string;
  attendeeIds: string[];
  notes: string;
}

export const CIRCLES = ["Circle A", "Circle B"] as const;
export const CIRCLE_CAPACITY = 8; // 6-8 founders per circle, per the STS page

export const TIERS = [
  "Founder Circle",
  "Founder Circle — Level 2",
  "High Performance Mentoring",
  "Mastermind",
] as const;

export const REVENUE_BRACKETS = [
  "Pre-revenue / Early stage",
  "Less than €10k / month",
  "€10k – €25k / month",
  "€25k – €100k / month",
  "€100k+ / month",
] as const;

export const LEAD_SOURCES = [
  "Application form",
  "Referral",
  "Instagram",
  "Event / dinner",
  "WhatsApp",
  "Never officially applied",
  "Other",
] as const;

export const DAY = 24 * 60 * 60 * 1000;

export const uid = () => Math.random().toString(36).slice(2, 10);

/** Parses "€450/mo" or "450" into a number. Returns 0 when unparseable. */
export function priceToNumber(price: string): number {
  return parseFloat(price.replace(/[^\d.]/g, "")) || 0;
}

export function formatEuro(n: number): string {
  return `€${Math.round(n).toLocaleString("en-GB")}`;
}

export function formatDate(value: string | number): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

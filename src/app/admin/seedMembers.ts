import { portalMembers } from "@/lib/portalRoster";
import type { Member } from "./types";

/**
 * The CRM's starting roster, derived from the member portal.
 *
 * Used as the `useLocalStore` fallback for `crm-members`, so the Command
 * Center opens with Lennart's existing circles instead of an empty table.
 * The moment he edits anyone, the edited roster is persisted and these
 * defaults stop applying.
 *
 * Commercial fields (price, tier, dates) are intentionally blank: the portal
 * never held them, and inventing numbers would put fake MRR on the dashboard.
 */
export const seedMembers: Member[] = portalMembers.map((m) => ({
  id: m.id,
  name: m.name,
  email: "",
  whatsapp: "",
  instagram: "",
  revenue: "",
  company: m.company,
  tier: "Founder Circle",
  price: "",
  circle: m.circle,
  joinedAt: "",
  renewsAt: "",
  status: "active",
  engagement: "",
  needs: "",
  connections: m.intro,
  notes: `Focus: ${m.focus} · Based: ${m.location}`,
}));

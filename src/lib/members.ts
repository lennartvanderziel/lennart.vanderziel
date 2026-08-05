/**
 * Read-only access to the member roster the CRM owns (`crm-members`).
 * The member-facing circle view needs the roster but must never write to it.
 */

export interface RosterMember {
  id: string;
  name: string;
  email: string;
  circle: string;
  status: "active" | "paused" | "churned";
}

export function readRoster(): RosterMember[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("crm-members");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RosterMember[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((m) => m && typeof m.id === "string" && typeof m.name === "string")
      .map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email ?? "",
        circle: m.circle ?? "—",
        status: m.status ?? "active",
      }));
  } catch {
    return [];
  }
}

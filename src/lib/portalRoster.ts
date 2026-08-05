/**
 * The real Shoulder 2 Shoulder roster.
 *
 * Source of truth: `lennartvanderziel/accountability-dashboard`, which runs the
 * live weekly accountability call against a Notion database
 * (`13f8a0be981782a397d60100a6ae1d0d`). These are the members its weekly cron
 * creates a row for every Monday.
 *
 * Both surfaces read this list: the member portal (`/platform/dashboard`) and
 * the CRM (`/admin`), so the Command Center opens with the actual crew rather
 * than placeholders.
 *
 * NOTE: the Notion database has no circle field, so `circle` is deliberately
 * left unset ("—") rather than guessed. Assign circles in the Circles view.
 */

export interface PortalMember {
  id: string;
  name: string;
  company: string;
  focus: string;
  location: string;
  intro: string;
  circle: string;
}

export interface PortalCircle {
  name: string;
  /** Focus of the circle, recovered from the portal's earlier "pods" model. */
  goal: string;
  meets: string;
  members: PortalMember[];
}

/**
 * Names exactly as the Notion `Member` select stores them. These strings must
 * match or rows will not line up when this is wired to the live database.
 *
 * Lennart runs the call and also participates, so he is on the list.
 */
export const MEMBER_NAMES = [
  "Alexander",
  "Lennart",
  "Grisha",
  "David",
  "Dane",
  "Samer",
  "Kibet",
  "Zach",
  "Demian",
] as const;

export const portalMembers: PortalMember[] = MEMBER_NAMES.map((name) => ({
  id: `sts-${name.toLowerCase()}`,
  name,
  company: "",
  focus: "",
  location: "",
  intro: "",
  circle: "—",
}));

/**
 * The circle structure the portal displays. Membership stays empty until
 * circles are assigned in the CRM, because the accountability database does
 * not record which circle anyone sits in.
 */
export const portalCircles: PortalCircle[] = [
  { name: "Circle A", goal: "Scale to €1M", meets: "Tuesday 16:00", members: [] },
  { name: "Circle B", goal: "Multiple 7 figures", meets: "Wednesday 17:00", members: [] },
];

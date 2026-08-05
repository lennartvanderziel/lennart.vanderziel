/**
 * The circle roster the member portal has always shown.
 *
 * This is the single source of truth for both surfaces: `/platform/dashboard`
 * renders it directly, and the CRM uses it as the starting roster so Lennart
 * opens the Command Center with his existing circles already in place rather
 * than an empty table.
 *
 * The names here are the anonymised placeholders the portal shipped with
 * ("Member 1" … "Member 6"). Renaming them in the CRM persists to
 * localStorage and takes over from these defaults.
 */

export interface PortalMember {
  id: string;
  name: string;
  company: string;
  focus: string;
  location: string;
  intro: string;
}

export interface PortalCircle {
  name: string;
  members: PortalMember[];
}

export const portalCircles: PortalCircle[] = [
  {
    name: "Circle A",
    members: [
      { id: "sts-1", name: "Member 1", company: "Company", focus: "E-commerce", location: "Southeast Asia", intro: "Building an e-com brand. Ask me about logistics & sourcing." },
      { id: "sts-2", name: "Member 2", company: "Company", focus: "Agency", location: "Netherlands", intro: "Runs a marketing agency. Strong in paid social." },
      { id: "sts-3", name: "Member 3", company: "Company", focus: "SaaS", location: "Southeast Asia", intro: "Bootstrapping a B2B SaaS. Loves product talk." },
    ],
  },
  {
    name: "Circle B",
    members: [
      { id: "sts-4", name: "Member 4", company: "Company", focus: "Real estate", location: "Netherlands", intro: "Developing property projects. Happy to share deal structures." },
      { id: "sts-5", name: "Member 5", company: "Company", focus: "Coaching", location: "Southeast Asia", intro: "Scaling a coaching business past €25k/mo." },
      { id: "sts-6", name: "Member 6", company: "Company", focus: "E-commerce", location: "Europe", intro: "Second e-com exit in progress. Ops nerd." },
    ],
  },
];

/** Flat roster, circle attached to each member. */
export const portalMembers = portalCircles.flatMap((circle) =>
  circle.members.map((m) => ({ ...m, circle: circle.name }))
);

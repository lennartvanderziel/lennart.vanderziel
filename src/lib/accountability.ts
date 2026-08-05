/**
 * Shared accountability model.
 *
 * Two surfaces read and write this exact store:
 *   /admin  → Lennart's tracking overview across every member
 *   /circle → the member's own weekly fill-in, plus everyone else's week
 *
 * STORAGE LIMITATION: this is localStorage, so "shared" means shared between
 * tabs on ONE browser. Members on their own laptops will not see each other's
 * entries until this is moved behind an API. Everything below is deliberately
 * written against `useLocalStore`, so that swap is a one-file change.
 */

export type ActionStatus = "open" | "intervention" | "done";

export interface WeeklyAction {
  label: string;
  status: ActionStatus;
}

/** Slow-moving direction. Set per quarter/month, not per week. */
export interface MemberPlan {
  memberId: string;
  name: string;
  circle: string;
  quarterObjective: string;
  monthlyTarget: string;
  pathway: string;
  metricName: string;
  metricTarget: string;
}

/** One member's promises for one week. This is the accountability record. */
export interface WeekEntry {
  memberId: string;
  weekId: string;
  actions: WeeklyAction[];
  metricValue: string;
  bottleneck: string;
  wins: string;
  lessons: string;
  submitted: boolean;
  updatedAt: number;
}

export interface AccountabilityStore {
  plans: Record<string, MemberPlan>;
  /** keyed `${memberId}::${weekId}` */
  weeks: Record<string, WeekEntry>;
}

export const STORE_KEY = "sts-accountability-v2";
export const LEGACY_KEY = "sts-accountability";
export const ACTIONS_PER_WEEK = 3;

export const emptyStore: AccountabilityStore = { plans: {}, weeks: {} };

export const actionStatusLabel: Record<ActionStatus, string> = {
  open: "Open",
  intervention: "Needs help",
  done: "Done",
};

/* ---------------------------------------------------------------- weeks -- */

/** ISO-8601 week id, e.g. "2026-W32". Weeks start Monday. */
export function weekIdOf(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7; // Sunday → 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum); // shift to the Thursday of this week
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

/** Monday of the given ISO week id. */
export function weekStart(weekId: string): Date {
  const [yearPart, weekPart] = weekId.split("-W");
  const year = Number(yearPart);
  const week = Number(weekPart);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7;
  const mondayWeek1 = new Date(jan4);
  mondayWeek1.setUTCDate(jan4.getUTCDate() - jan4Day + 1);
  const monday = new Date(mondayWeek1);
  monday.setUTCDate(mondayWeek1.getUTCDate() + (week - 1) * 7);
  return monday;
}

export function weekLabel(weekId: string): string {
  const start = weekStart(weekId);
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
  return `${fmt(start)} – ${fmt(end)}`;
}

/** The `count` most recent week ids, newest first, ending at `from`. */
export function recentWeekIds(from: Date, count: number): string[] {
  const ids: string[] = [];
  const cursor = new Date(from);
  for (let i = 0; i < count; i += 1) {
    ids.push(weekIdOf(cursor));
    cursor.setDate(cursor.getDate() - 7);
  }
  return ids;
}

/* ---------------------------------------------------------------- store -- */

export const entryKey = (memberId: string, weekId: string) => `${memberId}::${weekId}`;

export function blankEntry(memberId: string, weekId: string): WeekEntry {
  return {
    memberId,
    weekId,
    actions: Array.from({ length: ACTIONS_PER_WEEK }, () => ({ label: "", status: "open" as ActionStatus })),
    metricValue: "",
    bottleneck: "",
    wins: "",
    lessons: "",
    submitted: false,
    updatedAt: 0,
  };
}

export function blankPlan(memberId: string, name: string, circle = "—"): MemberPlan {
  return {
    memberId,
    name,
    circle,
    quarterObjective: "",
    monthlyTarget: "",
    pathway: "",
    metricName: "Monthly revenue (€)",
    metricTarget: "",
  };
}

/**
 * Pulls the old single-blob `sts-accountability` record into the new
 * per-member shape so nothing Lennart already typed is lost. Runs once:
 * the legacy key is left in place but only imported when the target member
 * has no plan yet.
 */
export function migrateLegacy(store: AccountabilityStore, memberId: string, name: string, weekId: string): AccountabilityStore {
  if (typeof window === "undefined") return store;
  if (store.plans[memberId]) return store;

  let legacy: Record<string, unknown> | null = null;
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    legacy = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
  } catch {
    legacy = null;
  }
  if (!legacy) return store;

  const str = (k: string) => (typeof legacy?.[k] === "string" ? (legacy[k] as string) : "");
  const legacyActions = Array.isArray(legacy.actions)
    ? (legacy.actions as WeeklyAction[]).map((a) => ({
        label: typeof a?.label === "string" ? a.label : "",
        status: (["open", "intervention", "done"] as ActionStatus[]).includes(a?.status) ? a.status : "open",
      }))
    : [];

  const plan: MemberPlan = {
    ...blankPlan(memberId, name),
    quarterObjective: str("q3Objective"),
    monthlyTarget: str("monthlyTarget"),
    pathway: str("pathway"),
    metricName: str("metricName") || "Monthly revenue (€)",
    metricTarget: str("metricTarget"),
  };

  const entry: WeekEntry = {
    ...blankEntry(memberId, weekId),
    actions: legacyActions.length ? legacyActions.slice(0, ACTIONS_PER_WEEK) : blankEntry(memberId, weekId).actions,
    metricValue: str("metricCurrent"),
    bottleneck: str("bottleneck"),
    wins: str("wins"),
    lessons: str("lessons"),
    updatedAt: Date.now(),
  };

  const hasContent =
    plan.quarterObjective || plan.monthlyTarget || plan.pathway || entry.bottleneck || entry.actions.some((a) => a.label);
  if (!hasContent) return store;

  return {
    plans: { ...store.plans, [memberId]: plan },
    weeks: { ...store.weeks, [entryKey(memberId, weekId)]: entry },
  };
}

/* ------------------------------------------------------------- derived -- */

export function completionOf(entry: WeekEntry | undefined): number {
  if (!entry) return 0;
  const filled = entry.actions.filter((a) => a.label.trim());
  if (filled.length === 0) return 0;
  return filled.filter((a) => a.status === "done").length / filled.length;
}

/** 0–10 execution score, matching the member portal's original scale. */
export function executionScore(entry: WeekEntry | undefined): string {
  if (!entry || !entry.actions.some((a) => a.label.trim())) return "—";
  return (completionOf(entry) * 10).toFixed(1);
}

export type LateReason = "not_submitted" | "actions_open" | "needs_help" | null;

/** Why this member is behind for the given week, or null when they are fine. */
export function lateReason(entry: WeekEntry | undefined): LateReason {
  if (!entry || !entry.submitted) return "not_submitted";
  if (entry.actions.some((a) => a.label.trim() && a.status === "intervention")) return "needs_help";
  if (entry.actions.some((a) => a.label.trim() && a.status === "open")) return "actions_open";
  return null;
}

export const lateReasonLabel: Record<Exclude<LateReason, null>, string> = {
  not_submitted: "Not filled in",
  actions_open: "Promises still open",
  needs_help: "Needs intervention",
};

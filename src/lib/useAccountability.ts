"use client";
import { useCallback, useMemo } from "react";
import {
  STORE_KEY,
  type AccountabilityStore,
  type MemberPlan,
  type WeekEntry,
  blankEntry,
  emptyStore,
  entryKey,
  weekIdOf,
} from "./accountability";
import { useLocalStore, useNow } from "@/lib/useLocalStore";

/**
 * Live view of the accountability store, shared by the admin overview and the
 * member circle view. Backed by `useLocalStore`, so a write in one window
 * updates the other without a refresh.
 */
export function useAccountability() {
  const now = useNow();
  const [raw, setStore] = useLocalStore<AccountabilityStore>(STORE_KEY, emptyStore);

  // A store written by an older build may be missing a top-level key.
  const store = useMemo<AccountabilityStore>(
    () => (raw?.plans && raw?.weeks ? raw : { plans: raw?.plans ?? {}, weeks: raw?.weeks ?? {} }),
    [raw]
  );

  const weekId = useMemo(() => (now ? weekIdOf(new Date(now)) : ""), [now]);
  const ready = now > 0;

  const savePlan = useCallback(
    (plan: MemberPlan) => {
      setStore({ ...store, plans: { ...store.plans, [plan.memberId]: plan } });
    },
    [setStore, store]
  );

  const saveEntry = useCallback(
    (entry: WeekEntry) => {
      const next = { ...entry, updatedAt: Date.now() };
      setStore({ ...store, weeks: { ...store.weeks, [entryKey(entry.memberId, entry.weekId)]: next } });
    },
    [setStore, store]
  );

  const entryFor = useCallback(
    (memberId: string, week: string = weekId): WeekEntry =>
      store.weeks?.[entryKey(memberId, week)] ?? blankEntry(memberId, week),
    [store.weeks, weekId]
  );

  return { store, setStore, weekId, ready, savePlan, saveEntry, entryFor };
}

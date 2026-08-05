"use client";
import { useCallback, useSyncExternalStore } from "react";

/**
 * localStorage as a React external store.
 *
 * Using `useSyncExternalStore` rather than "read in an effect, then setState"
 * means components stay pure, server render and hydration agree (the server
 * snapshot is always the fallback), and a write in one tab updates every other
 * tab automatically.
 *
 * `snapshots` caches the parsed value against the exact raw string it came
 * from, so `getSnapshot` returns a stable reference between renders. Without
 * that cache React re-renders forever.
 */
const snapshots = new Map<string, { raw: string | null; value: unknown }>();

/**
 * Same-tab writes are announced on `window`, not through a module-level
 * listener set. A bundler can hand out more than one instance of this module
 * (it is imported via both `./useLocalStore` and `@/lib/useLocalStore`), and a
 * per-instance Set would silently fail to notify subscribers registered
 * against the other copy. `window` is shared no matter how many copies exist.
 */
const CHANGE_EVENT = "local-store-change";

function emit() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange); // this tab
  window.addEventListener("storage", onChange); // other tabs
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    return fallback;
  }

  const cached = snapshots.get(key);
  if (cached && cached.raw === raw) return cached.value as T;

  let value = fallback;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  snapshots.set(key, { raw, value });
  return value;
}

export function writeLocal<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(value);
    localStorage.setItem(key, raw);
    snapshots.set(key, { raw, value });
  } catch {
    // Quota exceeded or private mode. Still notify so the in-memory snapshot
    // holders stay consistent with each other.
  }
  emit();
}

/** Reactive `[value, setValue]` backed by one localStorage key. */
export function useLocalStore<T>(key: string, fallback: T): [T, (next: T) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => readLocal(key, fallback),
    () => fallback
  );
  const setValue = useCallback((next: T) => writeLocal(key, next), [key]);
  return [value, setValue];
}

/**
 * Wall-clock time, resolved after mount.
 *
 * Returns 0 during SSR and the first client render so date maths never
 * produces server/client mismatches; every caller treats 0 as "not ready yet".
 */
export function useNow(): number {
  return useSyncExternalStore(
    subscribeToBoot,
    () => bootTime,
    () => 0
  );
}

let bootTime = 0;
const bootListeners = new Set<() => void>();

function subscribeToBoot(onChange: () => void) {
  bootListeners.add(onChange);
  if (bootTime === 0) {
    bootTime = Date.now();
    // Notify on the next tick so we never set state during React's own
    // subscribe pass.
    queueMicrotask(() => bootListeners.forEach((l) => l()));
  }
  return () => {
    bootListeners.delete(onChange);
  };
}

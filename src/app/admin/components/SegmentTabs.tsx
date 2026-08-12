"use client";
import { SEGMENTS } from "../segments";
import type { Segment } from "../types";
import { ACCENT_TEXT, ACCENT_TINT, BORDER, MUTED } from "../theme";

export type SegmentFilter = Segment | "all";

/** Pill tabs to filter a view by segment (or show all). Shared by Leads and
 * Pipeline so the whole CRM filters the same way. */
export function SegmentTabs({
  value,
  onChange,
  counts,
}: {
  value: SegmentFilter;
  onChange: (v: SegmentFilter) => void;
  counts?: Record<SegmentFilter, number>;
}) {
  const tabs: { id: SegmentFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...SEGMENTS.map((s) => ({ id: s.id as SegmentFilter, label: s.short })),
  ];

  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 22, flexWrap: "wrap" }}>
      {tabs.map((t) => {
        const active = value === t.id;
        const count = counts?.[t.id];
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            aria-pressed={active}
            style={{
              border: BORDER,
              background: active ? ACCENT_TINT : "transparent",
              color: active ? ACCENT_TEXT : MUTED,
              fontWeight: active ? 800 : 600,
              fontSize: 12.5,
              padding: "7px 15px",
              borderRadius: 100,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {t.label}
            {count !== undefined ? ` · ${count}` : ""}
          </button>
        );
      })}
    </div>
  );
}

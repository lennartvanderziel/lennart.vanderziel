"use client";
import { useState } from "react";
import type { Crm } from "../useCrm";
import { EmptyState, PageHeader } from "../components/ui";
import { PIPELINE_ORDER, leadStatusConfig } from "../statuses";
import { SegmentTabs, type SegmentFilter } from "../components/SegmentTabs";
import { DEFAULT_SEGMENT, SEGMENTS, segmentMeta } from "../segments";
import { BORDER, CARD, FAINT, FILL, INK, MUTED, RADIUS, SHADOW } from "../theme";
import { DAY, type LeadStatus } from "../types";

/** Board view of every lead, one column per stage. */
export function Pipeline({ crm }: { crm: Crm }) {
  const { leads, saveLeads, notify, now } = crm;
  const [seg, setSeg] = useState<SegmentFilter>("all");

  const segOf = (l: (typeof leads)[number]) => l.segment ?? DEFAULT_SEGMENT;
  const counts = { all: leads.length } as Record<SegmentFilter, number>;
  for (const s of SEGMENTS) counts[s.id] = leads.filter((l) => segOf(l) === s.id).length;
  const visible = seg === "all" ? leads : leads.filter((l) => segOf(l) === seg);

  function move(id: string, status: LeadStatus) {
    saveLeads(
      leads.map((l) => (l.id === id ? { ...l, status, ...(status === "member" ? { sequenceActive: false } : {}) } : l))
    );
    if (status === "member") notify("🎉 Converted! Add them under Members.");
  }

  return (
    <>
      <PageHeader title="Pipeline." subtitle="Every lead by stage. Move a card with the arrows to advance or send it back." />

      <SegmentTabs value={seg} onChange={setSeg} counts={counts} />

      {visible.length === 0 ? (
        <EmptyState>
          {leads.length === 0
            ? "No leads yet. Add one under Leads and it appears here."
            : "No leads in this segment yet."}
        </EmptyState>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${PIPELINE_ORDER.length}, minmax(190px, 1fr))`, gap: 14, overflowX: "auto", paddingBottom: 8 }}>
          {PIPELINE_ORDER.map((status, colIndex) => {
            const column = visible.filter((l) => l.status === status);
            const cfg = leadStatusConfig[status];
            return (
              <div key={status} style={{ background: FILL, borderRadius: RADIUS, padding: 12, minWidth: 190 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "0 3px" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: cfg.color }}>{cfg.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: FAINT }}>{column.length}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {column.length === 0 && <p style={{ fontSize: 12.5, color: FAINT, margin: "4px 3px" }}>Empty</p>}
                  {column.map((lead) => {
                    const age = now ? Math.floor((now - lead.createdAt) / DAY) : 0;
                    return (
                      <article
                        key={lead.id}
                        style={{
                          background: CARD,
                          border: BORDER,
                          borderRadius: 10,
                          padding: "12px 13px",
                          boxShadow: SHADOW,
                          borderLeft: `3px solid ${cfg.color}`,
                        }}
                      >
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: INK, lineHeight: 1.35 }}>{lead.name}</div>
                        <div style={{ fontSize: 11.5, color: MUTED, marginTop: 3 }}>
                          {seg === "all" && (
                            <span style={{ color: segmentMeta(lead.segment).color, fontWeight: 700 }}>
                              {segmentMeta(lead.segment).short}
                              {" · "}
                            </span>
                          )}
                          {lead.revenue || lead.source}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                          <span style={{ fontSize: 11, color: FAINT }}>{age}d old</span>
                          <span style={{ display: "flex", gap: 4 }}>
                            <button
                              aria-label={`Move ${lead.name} back`}
                              disabled={colIndex === 0}
                              onClick={() => move(lead.id, PIPELINE_ORDER[colIndex - 1])}
                              style={arrowBtn(colIndex === 0)}
                            >
                              ←
                            </button>
                            <button
                              aria-label={`Move ${lead.name} forward`}
                              disabled={colIndex === PIPELINE_ORDER.length - 1}
                              onClick={() => move(lead.id, PIPELINE_ORDER[colIndex + 1])}
                              style={arrowBtn(colIndex === PIPELINE_ORDER.length - 1)}
                            >
                              →
                            </button>
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

const arrowBtn = (disabled: boolean): React.CSSProperties => ({
  background: "transparent",
  border: BORDER,
  borderRadius: 6,
  width: 22,
  height: 22,
  fontSize: 11,
  color: disabled ? FAINT : MUTED,
  cursor: disabled ? "default" : "pointer",
  opacity: disabled ? 0.4 : 1,
  fontFamily: "inherit",
  lineHeight: 1,
});

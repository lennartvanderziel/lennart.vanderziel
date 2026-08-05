"use client";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { ACCENT, ACCENT_TINT, ACCENT_TEXT, BORDER, CARD, FAINT, MUTED, SIDEBAR_W } from "../theme";

export type View =
  | "dashboard"
  | "leads"
  | "pipeline"
  | "emails"
  | "members"
  | "accountability"
  | "circles"
  | "sessions"
  | "revenue";

interface NavItem {
  id: View;
  label: string;
  icon: string;
  badge?: number;
}

interface NavGroup {
  heading: string | null;
  items: NavItem[];
}

export function navGroups(counts: {
  dueEmails: number;
  openLeads: number;
  members: number;
  behind?: number;
}): NavGroup[] {
  return [
    { heading: null, items: [{ id: "dashboard", label: "Dashboard", icon: "◧" }] },
    {
      heading: "Grow",
      items: [
        { id: "leads", label: "Leads", icon: "⚡", badge: counts.openLeads || undefined },
        { id: "pipeline", label: "Pipeline", icon: "▦" },
        { id: "emails", label: "Nurture emails", icon: "✉", badge: counts.dueEmails || undefined },
      ],
    },
    {
      heading: "Members",
      items: [
        { id: "members", label: "Members", icon: "◍", badge: counts.members || undefined },
        { id: "accountability", label: "Accountability", icon: "◈", badge: counts.behind || undefined },
        { id: "circles", label: "Circles", icon: "◎" },
        { id: "sessions", label: "Sessions", icon: "⧉" },
      ],
    },
    {
      heading: "Money",
      items: [{ id: "revenue", label: "Revenue & renewals", icon: "€" }],
    },
  ];
}

export function Sidebar({
  view,
  onSelect,
  counts,
}: {
  view: View;
  onSelect: (v: View) => void;
  counts: { dueEmails: number; openLeads: number; members: number; behind?: number };
}) {
  return (
    <aside
      style={{
        width: SIDEBAR_W,
        flexShrink: 0,
        background: CARD,
        borderRight: BORDER,
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "22px 14px",
        gap: 4,
        overflowY: "auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "0 10px 20px" }}>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: ACCENT,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontSize: 15,
            fontWeight: 800,
            flexShrink: 0,
          }}
          aria-hidden
        >
          S
        </span>
        <span style={{ lineHeight: 1.25, minWidth: 0 }}>
          <span style={{ display: "block" }}>
            <Wordmark size={14} />
          </span>
          <span
            style={{
              display: "block",
              fontSize: 9.5,
              fontWeight: 800,
              color: FAINT,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            Command Center
          </span>
        </span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }} aria-label="CRM sections">
        {navGroups(counts).map((group) => (
          <div key={group.heading ?? "root"} style={{ marginTop: group.heading ? 18 : 0 }}>
            {group.heading && (
              <div
                style={{
                  fontSize: 9.5,
                  fontWeight: 800,
                  color: FAINT,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "0 10px 7px",
                }}
              >
                {group.heading}
              </div>
            )}
            {group.items.map((item) => {
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  aria-current={active ? "page" : undefined}
                  className="nav-item"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    background: active ? ACCENT_TINT : "transparent",
                    border: "none",
                    borderRadius: 9,
                    padding: "9px 11px",
                    fontSize: 13.5,
                    fontWeight: active ? 800 : 600,
                    color: active ? ACCENT_TEXT : MUTED,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 13, width: 15, flexShrink: 0 }} aria-hidden>
                    {item.icon}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        color: active ? ACCENT_TEXT : FAINT,
                        background: active ? "rgba(232,116,43,0.16)" : "#f0ece4",
                        borderRadius: 100,
                        padding: "2px 7px",
                        flexShrink: 0,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ marginTop: "auto", paddingTop: 20 }}>
        <Link
          href="/"
          style={{
            fontSize: 12.5,
            color: FAINT,
            textDecoration: "none",
            fontWeight: 600,
            padding: "0 10px",
          }}
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}

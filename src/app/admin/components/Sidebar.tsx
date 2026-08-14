"use client";
import Link from "next/link";
import { ACCENT, ACCENT_TEXT, ACCENT_TINT, BORDER, CARD, FAINT, MUTED, RED, SIDEBAR_W } from "../theme";

export type View =
  | "dashboard"
  | "proposals"
  | "invoices"
  | "finance"
  | "contacts"
  | "leads"
  | "emails"
  | "members"
  | "accountability"
  | "circles"
  | "sessions";

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
  contacts: number;
  members: number;
  behind?: number;
}): NavGroup[] {
  return [
    { heading: null, items: [{ id: "dashboard", label: "Dashboard", icon: "◧" }] },
    {
      heading: "Get paid",
      items: [
        { id: "proposals", label: "Proposals", icon: "▤" },
        { id: "invoices", label: "Invoices", icon: "❍" },
        { id: "finance", label: "Finance", icon: "€" },
      ],
    },
    {
      heading: "Sales",
      items: [
        { id: "contacts", label: "Contacts", icon: "◍", badge: counts.contacts || undefined },
        { id: "leads", label: "Leads", icon: "⚡", badge: counts.openLeads || undefined },
        { id: "emails", label: "Nurture emails", icon: "✉", badge: counts.dueEmails || undefined },
      ],
    },
    {
      heading: "Members",
      items: [
        { id: "members", label: "Members", icon: "◎", badge: counts.members || undefined },
        { id: "accountability", label: "Accountability", icon: "◈", badge: counts.behind || undefined },
        { id: "circles", label: "Circles", icon: "○" },
        { id: "sessions", label: "Sessions", icon: "⧉" },
      ],
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
  counts: { dueEmails: number; openLeads: number; contacts: number; members: number; behind?: number };
}) {
  return (
    <aside
      className="os-sidebar"
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
        padding: "20px 13px 16px",
        gap: 4,
        overflowY: "auto",
      }}
    >
      <div className="os-brand" style={{ display: "flex", alignItems: "center", gap: 11, padding: "0 8px 18px" }}>
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: `linear-gradient(140deg, ${ACCENT}, #6366F1)`,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontSize: 15,
            fontWeight: 800,
            flexShrink: 0,
            boxShadow: "0 4px 14px rgba(139,92,246,0.35)",
          }}
          aria-hidden
        >
          S
        </span>
        <span style={{ lineHeight: 1.25, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 14, fontWeight: 800, color: "#fff" }}>Shoulder 2 Shoulder</span>
          <span
            style={{
              display: "block",
              fontSize: 9,
              fontWeight: 800,
              color: FAINT,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            Command Center
          </span>
        </span>
      </div>

      <nav className="os-nav" style={{ display: "flex", flexDirection: "column", gap: 2 }} aria-label="CRM sections">
        {navGroups(counts).map((group) => (
          <div key={group.heading ?? "root"} className="os-nav-group" style={{ marginTop: group.heading ? 16 : 0 }}>
            {group.heading && (
              <div
                style={{
                  fontSize: 9.5,
                  fontWeight: 800,
                  color: FAINT,
                  letterSpacing: "0.15em",
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
                    border: active ? "1px solid rgba(139,92,246,0.35)" : "1px solid transparent",
                    borderRadius: 11,
                    padding: "9px 11px",
                    fontSize: 13.5,
                    fontWeight: active ? 700 : 600,
                    color: active ? "#fff" : MUTED,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 13, width: 16, flexShrink: 0, color: active ? ACCENT_TEXT : FAINT }} aria-hidden>
                    {item.icon}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        color: active ? "#fff" : MUTED,
                        background: active ? "rgba(139,92,246,0.28)" : "rgba(255,255,255,0.06)",
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

      <div style={{ marginTop: "auto", paddingTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px" }}>
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(140deg, #7C6CF6, #5B8DEF)",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 12.5,
              fontWeight: 800,
              flexShrink: 0,
            }}
            aria-hidden
          >
            L
          </span>
          <span style={{ lineHeight: 1.2, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#fff" }}>Lennart van der Ziel</span>
            <span style={{ display: "block", fontSize: 11, color: FAINT }}>Owner</span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 8px" }}>
          <Link href="/" style={{ fontSize: 12.5, color: FAINT, textDecoration: "none", fontWeight: 600 }}>
            ← Back to website
          </Link>
          <button
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.href = "/admin/login";
            }}
            style={{
              fontSize: 12.5,
              color: RED,
              background: "transparent",
              border: "none",
              fontWeight: 600,
              padding: 0,
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "inherit",
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}

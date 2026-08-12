"use client";
import { useState } from "react";
import { Sidebar, type View } from "./components/Sidebar";
import { useCrm } from "./useCrm";
import { isActiveLead } from "./types";
import { BORDER, CARD, INK, PAGE, SHADOW } from "./theme";
import { Dashboard } from "./views/Dashboard";
import { Leads } from "./views/Leads";
import { Pipeline } from "./views/Pipeline";
import { Emails } from "./views/Emails";
import { Members } from "./views/Members";
import { Circles } from "./views/Circles";
import { Sessions } from "./views/Sessions";
import { Revenue } from "./views/Revenue";
import { Accountability } from "./views/Accountability";

// Auth: /admin is gated by server-side middleware (src/middleware.ts) — a
// password unlocks it and a signed httpOnly cookie keeps the session. The page
// also stays noindex (see layout.tsx). Data persistence moves to Supabase next.

export default function Admin() {
  const crm = useCrm();
  const [view, setView] = useState<View>("dashboard");

  const openLeads = crm.leads.filter((l) => isActiveLead(l.status)).length;
  const activeMembers = crm.members.filter((m) => m.status === "active").length;

  return (
    <div
      className="os-shell"
      style={{
        minHeight: "100vh",
        background: PAGE,
        color: INK,
        fontFamily: "var(--font-sans), sans-serif",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Sidebar
        view={view}
        onSelect={setView}
        counts={{ dueEmails: crm.dueEmails.length, openLeads, members: activeMembers }}
      />

      <main className="os-main" style={{ flex: 1, minWidth: 0, padding: "36px 34px 90px", maxWidth: 1320, width: "100%" }}>
        {view === "dashboard" && <Dashboard crm={crm} onNavigate={setView} />}
        {view === "leads" && <Leads crm={crm} />}
        {view === "pipeline" && <Pipeline crm={crm} />}
        {view === "emails" && <Emails crm={crm} />}
        {view === "members" && <Members crm={crm} />}
        {view === "accountability" && <Accountability crm={crm} />}
        {view === "circles" && <Circles crm={crm} />}
        {view === "sessions" && <Sessions crm={crm} />}
        {view === "revenue" && <Revenue crm={crm} />}
      </main>

      {crm.toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: CARD,
            border: BORDER,
            boxShadow: SHADOW,
            color: INK,
            padding: "12px 22px",
            borderRadius: 100,
            fontSize: 13.5,
            fontWeight: 600,
            zIndex: 100,
          }}
        >
          {crm.toast}
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { Sidebar, type View } from "./components/Sidebar";
import { useCrm } from "./useCrm";
import { isActiveLead } from "./types";
import { BORDER, CARD, FAINT, INK, MUTED, PAGE, SHADOW } from "./theme";
import { Dashboard } from "./views/Dashboard";
import { Pipeline } from "./views/Pipeline";
import { Emails } from "./views/Emails";
import { Members } from "./views/Members";
import { Circles } from "./views/Circles";
import { Sessions } from "./views/Sessions";
import { Accountability } from "./views/Accountability";
import { Contacts } from "./views/Contacts";

// Auth: /admin is gated by server-side middleware (src/middleware.ts). Dark
// "Command Center" theme lives in ./theme (separate from the public palette).

function ComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "60vh", textAlign: "center" }}>
      <div style={{ maxWidth: 420 }}>
        <div style={{ fontSize: 34, marginBottom: 14 }}>✦</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: INK, letterSpacing: "-0.02em", margin: 0 }}>{title}</h1>
        <p style={{ marginTop: 10, fontSize: 14.5, color: MUTED, lineHeight: 1.6 }}>{note}</p>
        <span style={{ display: "inline-block", marginTop: 16, fontSize: 11, fontWeight: 800, color: FAINT, letterSpacing: "0.14em", textTransform: "uppercase", border: BORDER, borderRadius: 100, padding: "6px 14px" }}>
          Coming in the next phase
        </span>
      </div>
    </div>
  );
}

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
        background: `radial-gradient(1100px 600px at 78% -8%, rgba(99,102,241,0.10), transparent 60%), ${PAGE}`,
        color: INK,
        fontFamily: "var(--font-sans), sans-serif",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Sidebar
        view={view}
        onSelect={setView}
        counts={{ dueEmails: crm.dueEmails.length, openLeads, contacts: crm.leads.length, members: activeMembers }}
      />

      <main className="os-main" style={{ flex: 1, minWidth: 0, padding: "34px 36px 90px", maxWidth: 1400, width: "100%" }}>
        {view === "dashboard" && <Dashboard crm={crm} onNavigate={setView} />}
        {view === "leads" && <Pipeline crm={crm} />}
        {view === "emails" && <Emails crm={crm} />}
        {view === "members" && <Members crm={crm} />}
        {view === "accountability" && <Accountability crm={crm} />}
        {view === "circles" && <Circles crm={crm} />}
        {view === "sessions" && <Sessions crm={crm} />}
        {view === "contacts" && <Contacts crm={crm} />}
        {view === "proposals" && <ComingSoon title="Proposals" note="Send proposals, track pipeline value, and see what's signed. Part of the Get-Paid phase." />}
        {view === "invoices" && <ComingSoon title="Invoices" note="Invoicing through Stripe, with payment status synced back here." />}
        {view === "finance" && <ComingSoon title="Finance" note="Revenue, costs and profit at a glance, feeding your dashboard." />}
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

"use client";
import { useState } from "react";
import type { Crm } from "../useCrm";
import { Card, EmptyState, PageHeader, Pill } from "../components/ui";
import { LeadForm } from "../forms/LeadForm";
import { leadStatusConfig } from "../statuses";
import { ACCENT_TEXT, BORDER, INK, MUTED, RED, btnS, ghostS, inputS } from "../theme";
import { formatDate, uid, type LeadStatus } from "../types";

export function Leads({ crm }: { crm: Crm }) {
  const { leads, saveLeads, notify, dueEmails, sendDue, sending, sequence } = crm;
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <PageHeader
        title="Leads."
        subtitle="Every application and enquiry. New leads enter the nurture sequence automatically."
        action={
          <button onClick={() => setShowAdd(!showAdd)} style={btnS}>
            {showAdd ? "Close" : "+ Add lead"}
          </button>
        }
      />

      {showAdd && (
        <LeadForm
          onAdd={(l) => {
            saveLeads([
              {
                ...l,
                id: uid(),
                status: "new",
                notes: "",
                createdAt: Date.now(),
                sequenceStep: 0,
                lastEmailAt: null,
                sequenceActive: true,
              },
              ...leads,
            ]);
            setShowAdd(false);
            notify("Lead added — nurture sequence started");
          }}
        />
      )}

      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {leads.length === 0 && (
          <EmptyState>
            No leads yet. Add applications here as they arrive in your inbox and the nurture sequence starts
            automatically.
          </EmptyState>
        )}

        {leads.map((lead) => {
          const isDue = dueEmails.some((d) => d.lead.id === lead.id);
          return (
            <Card key={lead.id}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: INK, margin: 0 }}>{lead.name}</h3>
                    <Pill label={leadStatusConfig[lead.status].label} color={leadStatusConfig[lead.status].color} />
                  </div>
                  <p style={{ fontSize: 12.5, color: MUTED, margin: "5px 0 0" }}>
                    {[lead.email, lead.whatsapp && `WA ${lead.whatsapp}`, lead.instagram && `IG ${lead.instagram}`]
                      .filter(Boolean)
                      .join(" · ") || "no contact details"}{" "}
                    · {lead.revenue} · via {lead.source} · added {formatDate(lead.createdAt)}
                  </p>
                  {lead.business && (
                    <p style={{ fontSize: 13.5, color: MUTED, margin: "9px 0 0", lineHeight: 1.55 }}>{lead.business}</p>
                  )}
                  {lead.email ? (
                    <p style={{ fontSize: 12, color: MUTED, margin: "9px 0 0" }}>
                      Sequence: step {Math.min(lead.sequenceStep + 1, sequence.length)}/{sequence.length}
                      {lead.sequenceActive ? " · active" : " · paused"}
                      {lead.lastEmailAt ? ` · last email ${formatDate(lead.lastEmailAt)}` : ""}
                    </p>
                  ) : (
                    <p style={{ fontSize: 12, color: ACCENT_TEXT, margin: "9px 0 0", fontWeight: 700 }}>
                      No email — follow up via{" "}
                      {lead.whatsapp ? "WhatsApp" : lead.instagram ? "Instagram" : "…add a contact channel"}
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  <select
                    aria-label={`Status for ${lead.name}`}
                    value={lead.status}
                    onChange={(e) => {
                      const status = e.target.value as LeadStatus;
                      saveLeads(
                        leads.map((l) =>
                          l.id === lead.id
                            ? { ...l, status, ...(status === "member" ? { sequenceActive: false } : {}) }
                            : l
                        )
                      );
                      if (status === "member") notify("🎉 Converted! Add them under Members.");
                    }}
                    style={{ ...inputS, width: "auto", padding: "8px 12px" }}
                  >
                    {(Object.keys(leadStatusConfig) as LeadStatus[]).map((st) => (
                      <option key={st} value={st}>
                        {leadStatusConfig[st].label}
                      </option>
                    ))}
                  </select>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {isDue && (
                      <button
                        onClick={() => sendDue(lead.id)}
                        style={{ ...btnS, padding: "8px 14px", fontSize: 12 }}
                        disabled={sending === lead.id}
                      >
                        {sending === lead.id ? "Sending…" : "Send due email"}
                      </button>
                    )}
                    <button
                      onClick={() =>
                        saveLeads(
                          leads.map((l) => (l.id === lead.id ? { ...l, sequenceActive: !l.sequenceActive } : l))
                        )
                      }
                      style={{ ...ghostS, padding: "8px 14px", fontSize: 12 }}
                    >
                      {lead.sequenceActive ? "Pause emails" : "Resume emails"}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete lead ${lead.name}?`)) saveLeads(leads.filter((l) => l.id !== lead.id));
                      }}
                      style={{ ...ghostS, padding: "8px 14px", fontSize: 12, color: RED, borderColor: RED }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div style={{ borderBottom: BORDER, marginTop: 4 }} />
    </>
  );
}

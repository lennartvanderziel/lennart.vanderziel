"use client";
import { useState } from "react";
import type { Crm } from "../useCrm";
import { Card, PageHeader } from "../components/ui";
import { ACCENT, ACCENT_TEXT, ACCENT_TINT, BLUE, INK, MUTED, btnS, ghostS, inputS } from "../theme";
import { uid } from "../types";

export function Emails({ crm }: { crm: Crm }) {
  const { sequence, saveSequence, dueEmails, sendDue, sending } = crm;
  const [editStep, setEditStep] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        title="Nurture emails."
        subtitle='Every new lead enters this sequence automatically. Open the CRM after new applications and hit "Send all due" — it knows exactly who is due for which email. Use {name} for personalisation.'
      />

      {dueEmails.length > 0 && (
        <Card style={{ marginBottom: 20, borderColor: ACCENT, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: INK }}>
            {dueEmails.length} email{dueEmails.length > 1 ? "s" : ""} ready to send
          </span>
          <button onClick={() => sendDue()} style={btnS} disabled={!!sending}>
            {sending ? "Sending…" : "Send all due →"}
          </button>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {sequence.map((step, i) => (
          <Card key={step.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: ACCENT_TINT,
                    border: `1px solid ${ACCENT}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 800,
                    color: ACCENT_TEXT,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {step.dayOffset === 0 ? "Immediately on entry" : `Day ${step.dayOffset}`}
                  </span>
                  <h3 style={{ fontSize: 15.5, fontWeight: 800, color: INK, margin: "2px 0 0" }}>{step.subject}</h3>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEditStep(editStep === step.id ? null : step.id)} style={ghostS}>
                  {editStep === step.id ? "Done" : "Edit"}
                </button>
                {sequence.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${step.subject}"?`)) saveSequence(sequence.filter((s) => s.id !== step.id));
                    }}
                    style={ghostS}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {editStep === step.id ? (
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="number"
                    min={0}
                    aria-label="Day offset"
                    value={step.dayOffset}
                    onChange={(e) =>
                      saveSequence(sequence.map((s) => (s.id === step.id ? { ...s, dayOffset: parseInt(e.target.value) || 0 } : s)))
                    }
                    style={{ ...inputS, width: 110 }}
                  />
                  <input
                    aria-label="Subject"
                    value={step.subject}
                    onChange={(e) => saveSequence(sequence.map((s) => (s.id === step.id ? { ...s, subject: e.target.value } : s)))}
                    style={{ ...inputS, flex: 1 }}
                  />
                </div>
                <textarea
                  rows={8}
                  aria-label="Body"
                  value={step.body}
                  onChange={(e) => saveSequence(sequence.map((s) => (s.id === step.id ? { ...s, body: e.target.value } : s)))}
                  style={{ ...inputS, resize: "vertical", lineHeight: 1.55 }}
                />
              </div>
            ) : (
              <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6, color: MUTED, whiteSpace: "pre-line" }}>
                {step.body.slice(0, 220)}
                {step.body.length > 220 ? "…" : ""}
              </p>
            )}
          </Card>
        ))}

        <button
          onClick={() =>
            saveSequence([
              ...sequence,
              {
                id: uid(),
                dayOffset: (sequence[sequence.length - 1]?.dayOffset ?? 0) + 14,
                subject: "New email",
                body: "Hi {name},\n\n",
              },
            ])
          }
          style={{ ...ghostS, alignSelf: "flex-start" }}
        >
          + Add sequence step
        </button>
      </div>
    </>
  );
}

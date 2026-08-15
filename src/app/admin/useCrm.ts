"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DAY, type Lead, type Member, type SeqStep, type Session } from "./types";
import { defaultSequence } from "./defaultSequence";
import { useNow } from "@/lib/useLocalStore";

const NO_LEADS: Lead[] = [];
const NO_MEMBERS: Member[] = [];
const NO_SESSIONS: Session[] = [];

/**
 * A CRM collection backed by Supabase (via /api/crm/:name).
 *
 * Loads once on mount; `save(next)` optimistically updates local state and
 * persists the whole array to the server (which upserts and prunes). Because
 * every view already calls `saveX(nextArray)`, swapping the storage engine
 * here left the rest of the CRM untouched.
 *
 * `fallback` is shown only until the first load returns AND only when the
 * server is empty (used to surface the default email sequence). It is never
 * auto-persisted, so clearing a collection stays cleared after a real save.
 */
function useCollection<T extends { id: string }>(name: string, fallback: T[]): [T[], (next: T[]) => void, boolean] {
  const [items, setItems] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    // Retry a couple of times: the first hit after the serverless function has
    // gone cold can 500 on the Supabase connection, and we don't want that to
    // leave the CRM showing an empty list until a manual reload.
    const load = (attempt: number) => {
      fetch(`/api/crm/${name}`)
        .then((r) => r.json())
        .then((j) => {
          if (!alive) return;
          if (j.ok) {
            const recs = j.records as T[];
            setItems(recs.length === 0 && fallback.length > 0 ? fallback : recs);
            setLoading(false);
          } else if (attempt < 3) {
            setTimeout(() => load(attempt + 1), 700 * attempt);
          } else {
            setLoading(false);
          }
        })
        .catch(() => {
          if (!alive) return;
          if (attempt < 3) setTimeout(() => load(attempt + 1), 700 * attempt);
          else setLoading(false);
        });
    };
    load(1);
    return () => {
      alive = false;
    };
    // fallback is a stable module constant; name is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const save = useCallback(
    (next: T[]) => {
      setItems(next);
      fetch(`/api/crm/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      })
        .then((r) => r.json())
        .then((j) => {
          if (!j.ok) console.error(`Save failed for ${name}:`, j.error);
        })
        .catch((e) => console.error(`Save failed for ${name}:`, e));
    },
    [name]
  );

  return [items, save, loading];
}

/**
 * Owns every piece of CRM state plus its persistence, now backed by Supabase.
 */
export function useCrm() {
  const now = useNow();
  const [leads, saveLeads, leadsLoading] = useCollection<Lead>("leads", NO_LEADS);
  const [members, saveMembers] = useCollection<Member>("members", NO_MEMBERS);
  const [sequence, saveSequence] = useCollection<SeqStep>("sequence", defaultSequence);
  const [sessions, saveSessions] = useCollection<Session>("sessions", NO_SESSIONS);

  const [toast, setToast] = useState("");
  const [sending, setSending] = useState<string | null>(null);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  }, []);

  /** Leads whose next nurture step has come due. */
  const dueEmails = useMemo(() => {
    if (!now) return [];
    return leads.flatMap((lead) => {
      if (!lead.sequenceActive || !lead.email) return [];
      if (lead.status === "member" || lead.status === "declined") return [];
      const step = sequence[lead.sequenceStep];
      if (!step) return [];
      const anchor = lead.lastEmailAt ?? lead.createdAt;
      const prevOffset = sequence[lead.sequenceStep - 1]?.dayOffset ?? 0;
      const dueAt =
        lead.sequenceStep === 0
          ? lead.createdAt + step.dayOffset * DAY
          : anchor + (step.dayOffset - prevOffset) * DAY;
      return now >= dueAt ? [{ lead, step }] : [];
    });
  }, [leads, sequence, now]);

  const sendEmail = useCallback(
    async (to: string, subject: string, body: string): Promise<boolean> => {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, body }),
      });
      const json = await res.json().catch(() => ({ ok: false, error: "Network error" }));
      if (!json.ok) notify(`⚠ ${json.error?.slice(0, 90) ?? "Send failed"}`);
      return !!json.ok;
    },
    [notify]
  );

  const sendDue = useCallback(
    async (leadId?: string) => {
      const queue = leadId ? dueEmails.filter((d) => d.lead.id === leadId) : dueEmails;
      let working = leads;
      for (const { lead, step } of queue) {
        setSending(lead.id);
        const personalised = step.body.replaceAll("{name}", lead.name.split(" ")[0]);
        const ok = await sendEmail(lead.email, step.subject, personalised);
        if (!ok) {
          setSending(null);
          break;
        }
        working = working.map((l) =>
          l.id === lead.id ? { ...l, sequenceStep: l.sequenceStep + 1, lastEmailAt: Date.now() } : l
        );
        saveLeads(working);
        notify(`✓ Sent "${step.subject}" to ${lead.name}`);
        setSending(null);
      }
    },
    [dueEmails, leads, notify, saveLeads, sendEmail]
  );

  return {
    now,
    leads,
    members,
    sequence,
    sessions,
    dueEmails,
    loading: leadsLoading,
    toast,
    sending,
    notify,
    saveLeads,
    saveMembers,
    saveSequence,
    saveSessions,
    sendDue,
  };
}

export type Crm = ReturnType<typeof useCrm>;

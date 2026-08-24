import { NextResponse } from "next/server";
import { createHmac, randomUUID } from "crypto";
import { getSupabase } from "@/lib/supabaseServer";

// Public endpoint: a prospect submits the Shoulder to Shoulder application form.
// We store it as a "lead" in the same Supabase CRM the admin reads, and email
// Lennart a notification with a one-click "Approve & send call link" button.

const SITE = "https://www.lennartvanderziel.com";
const NOTIFY_TO = "lennart@shouldertoshoulder.club";

export function signId(id: string): string {
  return createHmac("sha256", process.env.APPROVE_SECRET || "sts-dev-secret")
    .update(id)
    .digest("hex")
    .slice(0, 32);
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Shoulder to Shoulder <lennart@shouldertoshoulder.club>",
      to: [to],
      reply_to: NOTIFY_TO,
      subject,
      html,
    }),
  });
  return res.ok;
}

export async function POST(req: Request) {
  let b: Record<string, string>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot — bots (and occasionally an overzealous autofill) fill this
  // hidden field. We never silently drop a submission on this alone: a false
  // positive here would mean losing a real applicant with no trace. Instead
  // we flag it in the source so it still shows up for manual review.
  const flaggedAsSpam = Boolean(b.hp_field_sts);

  const name = (b.name || `${b.firstName || ""} ${b.lastName || ""}`).trim();
  const email = (b.email || "").trim();
  if (!name || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ ok: false, error: "Name and a valid email are required" }, { status: 400 });
  }

  const id = randomUUID();
  const now = Date.now();
  const lead = {
    id,
    name,
    email,
    whatsapp: (b.whatsapp || "").trim(),
    instagram: (b.instagram || "").trim(),
    business: (b.business || "").trim(),
    revenue: (b.revenue || "").trim(),
    source: (flaggedAsSpam ? "⚠️ Flagged (honeypot) — " : "") + (b.source || "Landing page").trim(),
    segment: "shoulder_to_shoulder",
    status: "new",
    notes: (b.why || "").trim() ? `Why join: ${(b.why || "").trim()}` : "",
    createdAt: now,
    sequenceStep: 0,
    lastEmailAt: null,
    sequenceActive: false,
  };

  const db = getSupabase();
  if (!db) {
    return NextResponse.json(
      { ok: false, error: "Storage not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)." },
      { status: 501 }
    );
  }

  const { error } = await db
    .from("crm_records")
    .upsert(
      { collection: "leads", id, data: lead, updated_at: new Date(now).toISOString() },
      { onConflict: "collection,id" }
    );
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  // Notify Lennart with a one-click approve button.
  const approveUrl = `${SITE}/api/apply/approve?id=${id}&token=${signId(id)}`;
  const row = (k: string, v: string) => (v ? `<tr><td style="padding:4px 12px 4px 0;color:#888">${k}</td><td style="padding:4px 0"><strong>${v}</strong></td></tr>` : "");
  await sendEmail(
    NOTIFY_TO,
    `New STS application — ${name}`,
    `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#15130f">
      <h2 style="margin:0 0 12px">New application</h2>
      <table style="border-collapse:collapse">
        ${row("Name", name)}${row("Email", email)}${row("WhatsApp", lead.whatsapp)}
        ${row("Instagram", lead.instagram)}${row("Business", lead.business)}${row("Revenue", lead.revenue)}
        ${row("Source", lead.source)}${row("Why join", (b.why || "").trim())}
      </table>
      <p style="margin:22px 0 0">
        <a href="${approveUrl}" style="background:#E8742B;color:#fff;text-decoration:none;padding:12px 22px;border-radius:100px;font-weight:700;display:inline-block">✅ Approve &amp; send call link</a>
      </p>
      <p style="margin:14px 0 0;color:#888;font-size:12px">This lead is now in your CRM pipeline (Shoulder to Shoulder · New).</p>
    </div>`
  );

  return NextResponse.json({ ok: true });
}

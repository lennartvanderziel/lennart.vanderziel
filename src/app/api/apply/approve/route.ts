import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabaseServer";
import { signId } from "../route";

// Token-protected (link only Lennart has, from the notification email).
// Emails the applicant the Google Calendar booking link and advances the lead.

const CAL_URL = process.env.CAL_BOOKING_URL || "https://calendar.app.google/wguaVQyvxW8Rbsxx9";

function page(title: string, body: string) {
  return new NextResponse(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:system-ui,sans-serif;background:#0f0e0b;color:#f0ece4;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;margin:0"><div style="max-width:420px;padding:24px"><h1 style="color:#E8742B;font-size:22px">${title}</h1><p style="color:#c2bbae;line-height:1.5">${body}</p></div></body>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Lennart van der Ziel <lennart@shouldertoshoulder.club>",
      to: [to],
      reply_to: "lennart@shouldertoshoulder.club",
      subject,
      html,
    }),
  });
  return res.ok;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") || "";
  const token = url.searchParams.get("token") || "";
  if (!id || token !== signId(id)) return page("Invalid link", "This approval link is not valid.");

  const db = getSupabase();
  if (!db) return page("Not configured", "Storage is not configured.");

  const { data, error } = await db
    .from("crm_records")
    .select("data")
    .eq("collection", "leads")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return page("Not found", "This application could not be found.");

  const lead = data.data as Record<string, unknown>;
  const email = String(lead.email || "");
  const firstName = String(lead.name || "there").split(" ")[0];

  if (lead.callLinkSentAt) {
    return page("Already approved", `The call link was already sent to ${email}.`);
  }

  const sent = await sendEmail(
    email,
    "You're invited — book your Shoulder to Shoulder call",
    `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#15130f;line-height:1.6">
      <p>Hi ${firstName},</p>
      <p>Thanks for applying to <strong>Shoulder to Shoulder</strong>. I'd love to speak with you.</p>
      <p>Pick a time that works for you here:</p>
      <p style="margin:22px 0"><a href="${CAL_URL}" style="background:#E8742B;color:#fff;text-decoration:none;padding:14px 26px;border-radius:100px;font-weight:700;display:inline-block">Book your call →</a></p>
      <p>Talk soon,<br/>Lennart</p>
    </div>`
  );

  // Advance the lead in the pipeline and mark the link as sent.
  const updated = { ...lead, status: "exploratory", callLinkSentAt: Date.now() };
  await db
    .from("crm_records")
    .update({ data: updated, updated_at: new Date().toISOString() })
    .eq("collection", "leads")
    .eq("id", id);

  return page(
    sent ? "Approved ✓" : "Approved (email not sent)",
    sent
      ? `The booking link was emailed to ${email}, and the lead moved to “Exploratory call” in your CRM.`
      : `The lead was advanced, but the email could not be sent (set RESEND_API_KEY). You can send ${email} the booking link manually: ${CAL_URL}`
  );
}

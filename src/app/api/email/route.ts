import { NextResponse } from "next/server";

// Sends email via Resend (resend.com) — no external email program needed.
// Setup (one-time): create a free Resend account, verify shouldertoshoulder.club,
// then add RESEND_API_KEY in Vercel → Settings → Environment Variables.

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "RESEND_API_KEY not configured. Add it in Vercel → Settings → Environment Variables." },
      { status: 501 }
    );
  }

  try {
    const { to, subject, body } = await req.json();
    if (!to || !subject || !body) {
      return NextResponse.json({ ok: false, error: "Missing to/subject/body" }, { status: 400 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Lennart van der Ziel <lennart@shouldertoshoulder.club>",
        to: [to],
        reply_to: "l.vanderziel@gmail.com",
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ ok: false, error: err }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

import { NextResponse } from "next/server";

// Form notifications → Lennart's inbox.
// Spam protection: honeypot field + per-IP rate limit.
// Uses Resend (no ads) when RESEND_API_KEY is set; falls back to FormSubmit otherwise.

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 10 * 60 * 1000; // 10 minutes
  const list = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5; // max 5 submissions / 10 min / IP
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Try again later." }, { status: 429 });
  }

  let data: { subject?: string; payload?: Record<string, string>; hp?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (data.hp) return NextResponse.json({ ok: true });
  if (!data.subject || !data.payload) return NextResponse.json({ ok: false }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const lines = Object.entries(data.payload).map(([k, v]) => `${k}: ${v}`).join("\n");

  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Website <lennart@shouldertoshoulder.club>",
        to: ["l.vanderziel@gmail.com"],
        subject: data.subject,
        text: lines,
      }),
    });
    return NextResponse.json({ ok: res.ok });
  }

  // Fallback: FormSubmit (until Resend is configured)
  const res = await fetch("https://formsubmit.co/ajax/l.vanderziel@gmail.com", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ _subject: data.subject, _template: "table", ...data.payload }),
  });
  return NextResponse.json({ ok: res.ok });
}

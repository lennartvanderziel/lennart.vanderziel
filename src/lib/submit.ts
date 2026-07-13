// Delivers form submissions to Lennart's inbox via our own /api/notify endpoint
// (honeypot + rate limiting; uses Resend when configured, FormSubmit as fallback).

export async function submitToInbox(subject: string, payload: Record<string, string>, hp = ""): Promise<boolean> {
  try {
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, payload, hp }),
    });
    const json = await res.json().catch(() => ({ ok: false }));
    return !!json.ok;
  } catch {
    return false;
  }
}

// Delivers form submissions to Lennart's inbox via FormSubmit (no API key required).
// First submission triggers a one-time activation email from FormSubmit — click it once to enable delivery.

const ENDPOINT = "https://formsubmit.co/ajax/l.vanderziel@gmail.com";

export async function submitToInbox(subject: string, payload: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, _template: "table", ...payload }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

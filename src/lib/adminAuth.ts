// Admin session token — an HMAC-signed value that both the Edge middleware and
// the Node route handlers can create and verify, using Web Crypto (available in
// both runtimes). The cookie is httpOnly, so the browser never exposes it to JS.
//
// This is deliberately small: one shared password (ADMIN_PASSWORD) unlocks the
// CRM, and a signed cookie (ADMIN_SESSION_SECRET) keeps you logged in. It gates
// access; Supabase (data layer) handles persistence separately.

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function base64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64url(s: string): Uint8Array<ArrayBuffer> {
  let t = s.replace(/-/g, "+").replace(/_/g, "/");
  while (t.length % 4) t += "=";
  const bin = atob(t);
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

/** Mint a signed session token that stays valid for `ttlMs`. */
export async function createSession(secret: string, ttlMs = THIRTY_DAYS): Promise<string> {
  const payload = base64url(encoder.encode(JSON.stringify({ exp: Date.now() + ttlMs })));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(payload));
  return `${payload}.${base64url(new Uint8Array(sig))}`;
}

/** Verify signature and expiry. Returns false for anything malformed. */
export async function verifySession(secret: string, token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  let valid = false;
  try {
    valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(secret),
      fromBase64url(sig),
      encoder.encode(payload)
    );
  } catch {
    return false;
  }
  if (!valid) return false;
  try {
    const { exp } = JSON.parse(decoder.decode(fromBase64url(payload)));
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}

/** Timing-safe string compare (avoids leaking the password via response time). */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  // HMAC both sides with a random key: equal inputs → equal digests, and the
  // comparison runs over fixed-length digests regardless of input length.
  const k = await hmacKey(crypto.randomUUID());
  const da = new Uint8Array(await crypto.subtle.sign("HMAC", k, encoder.encode(a)));
  const db = new Uint8Array(await crypto.subtle.sign("HMAC", k, encoder.encode(b)));
  let diff = 0;
  for (let i = 0; i < da.length; i++) diff |= da[i] ^ db[i];
  return diff === 0;
}

export const ADMIN_COOKIE = "admin_session";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service_role key. This bypasses Row
// Level Security, so it must NEVER be imported into a client component — only
// route handlers (which run on the server) may touch it.
//
// Returns null when env vars are missing, so the app degrades gracefully
// (the CRM keeps working off its last loaded state) instead of crashing.

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export const isSupabaseConfigured = () =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

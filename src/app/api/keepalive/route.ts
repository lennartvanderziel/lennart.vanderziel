import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabaseServer";

// Public, unauthenticated on purpose: a trivial read against Supabase so the
// free-tier project's activity clock never lets it auto-pause (which happens
// after 7+ days with no database activity). Returns a count only — no lead
// data — so it's safe to ping from anywhere, including GitHub Actions
// (see .github/workflows/keepalive.yml) with no secrets involved.
export async function GET() {
  const db = getSupabase();
  if (!db) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 501 });

  const { count, error } = await db
    .from("crm_records")
    .select("id", { count: "exact", head: true });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, count });
}

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabaseServer";

// Persistence for the CRM collections. Access is gated by the admin cookie in
// middleware (see src/middleware.ts); here we just read/write Supabase.
//
// GET  /api/crm/:collection        → array of records (the `data` blobs)
// PUT  /api/crm/:collection  [..]  → replace the whole collection: upsert every
//                                    incoming record and delete the rest.

const COLLECTIONS = new Set(["leads", "members", "sessions", "sequence"]);

type Params = { params: Promise<{ collection: string }> };

function guard(collection: string) {
  if (!COLLECTIONS.has(collection)) {
    return NextResponse.json({ ok: false, error: "Unknown collection" }, { status: 404 });
  }
  const db = getSupabase();
  if (!db) {
    return NextResponse.json(
      { ok: false, error: "Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
      { status: 501 }
    );
  }
  return db;
}

export async function GET(_req: Request, { params }: Params) {
  const { collection } = await params;
  const db = guard(collection);
  if (db instanceof NextResponse) return db;

  const { data, error } = await db
    .from("crm_records")
    .select("data")
    .eq("collection", collection);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, records: (data ?? []).map((r) => r.data) });
}

export async function PUT(req: Request, { params }: Params) {
  const { collection } = await params;
  const db = guard(collection);
  if (db instanceof NextResponse) return db;

  let records: Array<{ id: string }>;
  try {
    records = await req.json();
    if (!Array.isArray(records)) throw new Error("expected an array");
  } catch {
    return NextResponse.json({ ok: false, error: "Body must be a JSON array" }, { status: 400 });
  }

  const ids = records.map((r) => String(r.id));

  // Upsert everything in the incoming set.
  if (records.length > 0) {
    const rows = records.map((r) => ({
      collection,
      id: String(r.id),
      data: r,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await db.from("crm_records").upsert(rows, { onConflict: "collection,id" });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  // Delete anything in this collection that's no longer present. Compute the
  // difference explicitly (safe against odd ids, no string-built filters).
  const { data: existing, error: exErr } = await db
    .from("crm_records")
    .select("id")
    .eq("collection", collection);
  if (exErr) return NextResponse.json({ ok: false, error: exErr.message }, { status: 500 });

  const incoming = new Set(ids);
  const toDelete = (existing ?? []).map((r) => r.id).filter((id) => !incoming.has(id));
  if (toDelete.length > 0) {
    const { error: delErr } = await db
      .from("crm_records")
      .delete()
      .eq("collection", collection)
      .in("id", toDelete);
    if (delErr) return NextResponse.json({ ok: false, error: delErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

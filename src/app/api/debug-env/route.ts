import { NextResponse } from "next/server";
export async function GET() {
  const k = process.env.RESEND_API_KEY || "";
  return NextResponse.json({ present: Boolean(k), length: k.length, prefix: k.slice(0, 3) });
}

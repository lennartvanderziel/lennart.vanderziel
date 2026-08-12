import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createSession, safeEqual } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!expected || !secret) {
    return NextResponse.json(
      { ok: false, error: "Admin auth is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." },
      { status: 501 }
    );
  }

  let password = "";
  try {
    ({ password } = await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (typeof password !== "string" || !(await safeEqual(password, expected))) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }

  const token = await createSession(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
  return res;
}

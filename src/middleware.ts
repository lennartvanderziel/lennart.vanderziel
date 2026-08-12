import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/adminAuth";

// Gate everything under /admin behind the login. The login page itself and the
// auth API routes are excluded (see matcher + the early return below) so you can
// actually get in.
export const config = {
  matcher: ["/admin/:path*", "/api/crm/:path*"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApi = pathname.startsWith("/api/");

  // The login page must stay reachable while logged out.
  if (pathname === "/admin/login") return NextResponse.next();

  const secret = process.env.ADMIN_SESSION_SECRET;
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin/login";

  // Fail closed: a missing secret means we can't trust any cookie.
  if (!secret) {
    if (isApi) return NextResponse.json({ ok: false, error: "Auth not configured" }, { status: 401 });
    loginUrl.searchParams.set("error", "config");
    return NextResponse.redirect(loginUrl);
  }

  const ok = await verifySession(secret, req.cookies.get(ADMIN_COOKIE)?.value);
  if (ok) return NextResponse.next();

  // API calls get a clean 401; page requests get bounced to the login screen.
  if (isApi) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Edge-runtime SHA-256 (Node's crypto isn't available in middleware).
async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Each gated area has its own cookie, password and token salt. Salts must match
// the server-side token helpers (admin-auth: "atx", agent-auth: "atxa").
const AREAS = [
  { prefix: "/admin", loginPath: "/admin/login", cookie: "atx_admin", salt: "atx", envKey: "ADMIN_PASSWORD" },
  { prefix: "/agent", loginPath: "/agent/login", cookie: "atx_agent", salt: "atxa", envKey: "AGENT_PASSWORD" },
] as const;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const area = AREAS.find(
    (a) => pathname === a.prefix || pathname.startsWith(`${a.prefix}/`),
  );
  if (!area) return NextResponse.next();

  const password = process.env[area.envKey] ?? "";
  const expected = password ? await sha256Hex(`${area.salt}:${password}`) : null;
  const cookie = req.cookies.get(area.cookie)?.value;
  const authed = !!expected && cookie === expected;

  // The login page is always reachable; bounce already-authed users inward.
  if (pathname === area.loginPath) {
    if (authed) {
      const url = req.nextUrl.clone();
      url.pathname = area.prefix;
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Everything else in the area needs a valid session — blocked BEFORE any
  // page renders, so no protected data is ever streamed to the client.
  if (!authed) {
    const url = req.nextUrl.clone();
    url.pathname = area.loginPath;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/agent", "/agent/:path*"],
};

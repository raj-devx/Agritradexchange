import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Password-gated areas (admin + agent).
const PW_AREAS = [
  { prefix: "/admin", loginPath: "/admin/login", cookie: "atx_admin", salt: "atx", envKey: "ADMIN_PASSWORD" },
  { prefix: "/agent", loginPath: "/agent/login", cookie: "atx_agent", salt: "atxa", envKey: "AGENT_PASSWORD" },
] as const;

// Cookie-gated areas (farmer + buyer dashboards — OTP session).
const COOKIE_AREAS = [
  { prefix: "/farmer/dashboard", loginPath: "/farmer/login", cookie: "atx_farmer", rolePrefix: "farmer:" },
  { prefix: "/buyer/dashboard", loginPath: "/buyer/login", cookie: "atx_buyer", rolePrefix: "buyer:" },
] as const;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- Password-gated areas (admin / agent) ---
  const pwArea = PW_AREAS.find(
    (a) => pathname === a.prefix || pathname.startsWith(`${a.prefix}/`),
  );
  if (pwArea) {
    const password = process.env[pwArea.envKey] ?? "";
    const expected = password ? await sha256Hex(`${pwArea.salt}:${password}`) : null;
    const cookie = req.cookies.get(pwArea.cookie)?.value;
    const authed = !!expected && cookie === expected;

    if (pathname === pwArea.loginPath) {
      if (authed) {
        const url = req.nextUrl.clone();
        url.pathname = pwArea.prefix;
        url.search = "";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = pwArea.loginPath;
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // --- OTP cookie-gated areas (farmer / buyer dashboards) ---
  const ckArea = COOKIE_AREAS.find(
    (a) => pathname === a.prefix || pathname.startsWith(`${a.prefix}/`),
  );
  if (ckArea) {
    const cookie = req.cookies.get(ckArea.cookie)?.value;
    const valid = !!cookie && cookie.startsWith(ckArea.rolePrefix);
    if (!valid) {
      const url = req.nextUrl.clone();
      url.pathname = ckArea.loginPath;
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/agent",
    "/agent/:path*",
    "/farmer/dashboard",
    "/farmer/dashboard/:path*",
    "/buyer/dashboard",
    "/buyer/dashboard/:path*",
  ],
};

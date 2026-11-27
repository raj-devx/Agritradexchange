import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp";
import { createSession } from "@/lib/user-auth";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ name: "verify-otp", max: 10 });

const MOBILE_RE = /^[6-9]\d{9}$/;
const ROLES = ["farmer", "buyer"] as const;

export async function POST(req: Request) {
  const limited = await limiter();
  if (limited) return limited;
  let body: { mobile?: string; role?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const mobile = String(body.mobile ?? "").trim();
  const role = String(body.role ?? "") as (typeof ROLES)[number];
  const code = String(body.code ?? "").trim();

  if (!MOBILE_RE.test(mobile) || !ROLES.includes(role) || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 422 });
  }

  const result = await verifyOtp(mobile, role, code);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  await createSession(mobile, role);
  return NextResponse.json({ ok: true, redirect: `/${role}/dashboard` });
}

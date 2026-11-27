import { NextResponse } from "next/server";
import { createAndSendOtp } from "@/lib/otp";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ name: "send-otp", max: 3 });

const MOBILE_RE = /^[6-9]\d{9}$/;
const ROLES = ["farmer", "buyer"] as const;

export async function POST(req: Request) {
  const limited = await limiter();
  if (limited) return limited;
  let body: { mobile?: string; role?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const mobile = String(body.mobile ?? "").trim();
  const role = String(body.role ?? "") as (typeof ROLES)[number];

  if (!MOBILE_RE.test(mobile)) {
    return NextResponse.json({ ok: false, error: "Enter a valid 10-digit mobile number." }, { status: 422 });
  }
  if (!ROLES.includes(role)) {
    return NextResponse.json({ ok: false, error: "Invalid role." }, { status: 422 });
  }

  const result = await createAndSendOtp(mobile, role);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 429 });
  }

  return NextResponse.json({ ok: true });
}

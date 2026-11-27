import "server-only";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";

type Role = "farmer" | "buyer";

const COOKIE: Record<Role, string> = { farmer: "atx_farmer", buyer: "atx_buyer" };
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(mobile: string, role: Role): Promise<void> {
  const token = `${role}:${mobile}:${randomBytes(16).toString("hex")}`;
  const jar = await cookies();
  jar.set(COOKIE[role], token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getSession(role: Role): Promise<{ mobile: string } | null> {
  const jar = await cookies();
  const value = jar.get(COOKIE[role])?.value;
  if (!value) return null;
  const parts = value.split(":");
  if (parts[0] !== role || !parts[1]) return null;
  return { mobile: parts[1] };
}

export async function destroySession(role: Role): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE[role]);
}

export const FARMER_COOKIE = COOKIE.farmer;
export const BUYER_COOKIE = COOKIE.buyer;

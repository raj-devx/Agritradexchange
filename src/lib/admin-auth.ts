import "server-only";
import { cookies } from "next/headers";
import { createHash } from "crypto";

export const ADMIN_COOKIE = "atx_admin";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function adminConfigured(): boolean {
  return adminPassword().length > 0;
}

/** Opaque session token derived from the passcode — not reversible to it. */
export function tokenFor(password: string): string {
  return createHash("sha256").update(`atx:${password}`).digest("hex");
}

export function expectedToken(): string {
  return tokenFor(adminPassword());
}

export function passwordMatches(candidate: string): boolean {
  return adminConfigured() && tokenFor(candidate) === expectedToken();
}

export async function isAuthed(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const jar = await cookies();
  const value = jar.get(ADMIN_COOKIE)?.value;
  return !!value && value === expectedToken();
}

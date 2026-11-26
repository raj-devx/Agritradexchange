import "server-only";
import { cookies } from "next/headers";
import { createHash } from "crypto";

// Field-agent session — separate role/password from the admin console.
export const AGENT_COOKIE = "atx_agent";
export const AGENT_SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours (a field shift)

function agentPassword(): string {
  return process.env.AGENT_PASSWORD ?? "";
}

export function agentConfigured(): boolean {
  return agentPassword().length > 0;
}

export function agentTokenFor(password: string): string {
  return createHash("sha256").update(`atxa:${password}`).digest("hex");
}

export function agentExpectedToken(): string {
  return agentTokenFor(agentPassword());
}

export function agentPasswordMatches(candidate: string): boolean {
  return agentConfigured() && agentTokenFor(candidate) === agentExpectedToken();
}

export async function isAgentAuthed(): Promise<boolean> {
  if (!agentConfigured()) return false;
  const jar = await cookies();
  const value = jar.get(AGENT_COOKIE)?.value;
  return !!value && value === agentExpectedToken();
}

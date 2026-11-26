import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Lock, ClipboardCheck } from "lucide-react";
import { agentLogin } from "@/app/agent/actions";
import { isAgentAuthed, agentConfigured } from "@/lib/agent-auth";

export const metadata: Metadata = { title: "Field agent sign in", robots: { index: false } };
export const instant = false;

export default async function AgentLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAgentAuthed()) redirect("/agent");
  const { error } = await searchParams;
  const configured = agentConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl shadow-black/30">
        <div className="flex items-center gap-2 text-leaf">
          <ClipboardCheck className="size-6" />
          <span className="font-display text-lg font-extrabold text-brand">
            Field Agent
          </span>
        </div>
        <h1 className="mt-6 font-display text-xl font-bold text-ink">Workspace sign in</h1>
        <p className="mt-1 text-sm text-ink/60">
          Register farmers and record on-site inspections.
        </p>

        {!configured && (
          <p className="mt-4 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-xs text-ink/70">
            No <code>AGENT_PASSWORD</code> is set. Add one to your environment to
            enable sign-in.
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Incorrect passcode. Please try again.
          </p>
        )}

        <form action={agentLogin} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink">
              Passcode
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-black/15 bg-white px-3 shadow-sm focus-within:border-leaf focus-within:ring-2 focus-within:ring-leaf/25">
              <Lock className="size-4 text-ink/40" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full bg-transparent py-3 text-base text-ink outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!configured}
            className="w-full rounded-lg bg-leaf px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-leaf-600 disabled:opacity-60"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

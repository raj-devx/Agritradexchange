import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Sprout, Lock } from "lucide-react";
import { login } from "@/app/admin/actions";
import { isAuthed, adminConfigured } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false } };

export const instant = false;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthed()) redirect("/admin");
  const { error } = await searchParams;
  const configured = adminConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand text-white">
            <Sprout className="size-5" />
          </span>
          <span className="font-display text-lg font-extrabold text-brand">
            AgriTrade<span className="text-leaf">Xchange</span>
          </span>
        </div>
        <h1 className="mt-6 font-display text-xl font-bold text-ink">Admin console</h1>
        <p className="mt-1 text-sm text-ink/60">Enter the admin passcode to continue.</p>

        {!configured && (
          <p className="mt-4 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-xs text-ink/70">
            No <code>ADMIN_PASSWORD</code> is set. Add one to your environment to
            enable sign-in.
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Incorrect passcode. Please try again.
          </p>
        )}

        <form action={login} className="mt-6 space-y-4">
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
                className="w-full bg-transparent py-2.5 text-sm text-ink outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!configured}
            className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

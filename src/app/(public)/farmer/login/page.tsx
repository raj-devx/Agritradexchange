import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Sprout } from "lucide-react";
import { getSession } from "@/lib/user-auth";
import { Container } from "@/components/container";
import { Aurora } from "@/components/aurora";
import { OtpLoginForm } from "@/components/otp-login-form";

export const metadata: Metadata = { title: "Farmer Login" };
export const instant = false;

export default async function FarmerLoginPage() {
  const session = await getSession("farmer");
  if (session) redirect("/farmer/dashboard");

  return (
    <section className="grain relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-brand py-16">
      <Aurora />
      <Container className="relative z-[1] max-w-sm">
        <div className="gborder animate-fade-up rounded-3xl bg-white p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/40">
          <div className="flex items-center gap-3">
            <span className="live-dot flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-leaf to-brand-600 text-white shadow-md">
              <Sprout className="size-5" />
            </span>
            <span className="font-display text-xl font-extrabold text-brand">
              Farmer Login
            </span>
          </div>
          <p className="mt-4 text-sm text-ink/60">
            Enter your registered mobile number. We&apos;ll send a 6-digit OTP to verify your identity.
          </p>
          <div className="mt-6">
            <OtpLoginForm role="farmer" />
          </div>
          <p className="mt-5 text-center text-xs text-ink/50">
            New here?{" "}
            <a href="/register/farmer" className="font-medium text-leaf underline">
              Register your produce
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

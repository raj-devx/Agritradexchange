import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Building2 } from "lucide-react";
import { getSession } from "@/lib/user-auth";
import { Container } from "@/components/container";
import { Aurora } from "@/components/aurora";
import { OtpLoginForm } from "@/components/otp-login-form";

export const metadata: Metadata = { title: "Buyer Login" };
export const instant = false;

export default async function BuyerLoginPage() {
  const session = await getSession("buyer");
  if (session) redirect("/buyer/dashboard");

  return (
    <section className="grain relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-brand py-16">
      <Aurora />
      <Container className="relative z-[1] max-w-sm">
        <div className="gborder animate-fade-up rounded-3xl bg-white p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/40">
          <div className="flex items-center gap-3">
            <span className="live-dot flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-600 text-white shadow-md">
              <Building2 className="size-5" />
            </span>
            <span className="font-display text-xl font-extrabold text-brand">
              Buyer Login
            </span>
          </div>
          <p className="mt-4 text-sm text-ink/60">
            Enter your registered mobile number. We&apos;ll send a 6-digit OTP to verify your identity.
          </p>
          <div className="mt-6">
            <OtpLoginForm role="buyer" />
          </div>
          <p className="mt-5 text-center text-xs text-ink/50">
            New here?{" "}
            <a href="/register/buyer" className="font-medium text-brand underline">
              Register as a buyer
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

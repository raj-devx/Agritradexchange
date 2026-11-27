import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Building2 } from "lucide-react";
import { getSession } from "@/lib/user-auth";
import { Container } from "@/components/container";
import { OtpLoginForm } from "@/components/otp-login-form";

export const metadata: Metadata = { title: "Buyer Login" };
export const instant = false;

export default async function BuyerLoginPage() {
  const session = await getSession("buyer");
  if (session) redirect("/buyer/dashboard");

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-16">
      <Container className="max-w-sm">
        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-brand text-white">
              <Building2 className="size-5" />
            </span>
            <span className="font-display text-lg font-extrabold text-brand">
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

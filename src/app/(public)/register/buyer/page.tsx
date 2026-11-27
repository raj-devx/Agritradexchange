import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { BuyerRegistrationForm } from "@/components/forms/buyer-registration-form";

export const metadata: Metadata = {
  title: "Register as a Buyer",
  description: "Create a buyer account to source verified agricultural supply in bulk.",
};

export default function RegisterBuyerPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Buyers"
        title="Register as a buyer"
        subtitle="Create an account so our team can verify you and share matched, quality-checked supply."
      />
      <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
        <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_80%)]" />
        <Container className="relative max-w-3xl">
          <div className="gborder animate-fade-up rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10" style={{ animationDelay: "200ms" }}>
            <BuyerRegistrationForm />
          </div>
        </Container>
      </section>
    </>
  );
}

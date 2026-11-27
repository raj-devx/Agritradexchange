import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { FarmerRegistrationForm } from "@/components/forms/farmer-registration-form";

export const metadata: Metadata = {
  title: "Register Your Produce",
  description: "Free farmer registration — reach more buyers with quality-based pricing.",
};

export default function RegisterFarmerPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Farmers"
        title="Register your produce"
        subtitle="Free and mobile-friendly. An agent will follow up to inspect quality and share a transparent offer."
      />
      <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
        <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_80%)]" />
        <Container className="relative max-w-3xl">
          <div className="gborder animate-fade-up rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10" style={{ animationDelay: "200ms" }}>
            <FarmerRegistrationForm />
          </div>
        </Container>
      </section>
    </>
  );
}

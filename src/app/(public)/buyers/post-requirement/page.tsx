import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { BuyerRequirementForm } from "@/components/forms/buyer-requirement-form";

export const metadata: Metadata = {
  title: "Post a Buying Requirement",
  description: "Tell us what you need to source — commodity, quality, quantity, location and delivery.",
};

export default function PostRequirementPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Buyers"
        title="Post a buying requirement"
        subtitle="Specify what you need to source. Our procurement team validates the requirement and begins matching verified farmer supply."
      />
      <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
        <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_80%)]" />
        <Container className="relative max-w-3xl">
          <div className="gborder animate-fade-up rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10" style={{ animationDelay: "200ms" }}>
            <BuyerRequirementForm />
          </div>
        </Container>
      </section>
    </>
  );
}

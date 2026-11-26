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
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
            <FarmerRegistrationForm />
          </div>
        </Container>
      </section>
    </>
  );
}

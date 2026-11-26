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
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
            <BuyerRegistrationForm />
          </div>
        </Container>
      </section>
    </>
  );
}

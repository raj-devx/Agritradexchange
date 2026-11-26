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
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
            <BuyerRequirementForm />
          </div>
        </Container>
      </section>
    </>
  );
}

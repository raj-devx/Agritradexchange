import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { FarmerRegistrationForm } from "@/components/forms/farmer-registration-form";
import { FARMER_STATUS_PIPELINE } from "@/lib/status";

export const metadata: Metadata = {
  title: "For Farmers",
  description:
    "Register your produce free, get a transparent quality-based offer, and reach a wider network of verified buyers.",
};

const traditional = [
  "Register and haul produce to the mandi yourself",
  "Queue tractors/trucks 2–3 days (sometimes more) for an auction slot",
  "Diesel, rent and labour costs pile up while you wait",
  "Uncertain auction price and multiple intermediaries",
  "Payment can take 15–30 days",
];

const withUs = [
  "Free registration — our agent comes to you",
  "On-site quality inspection and sampling",
  "A clear, grade-based price offer you can accept or reject",
  "Deliver to a nearby collection point, not across the state",
  "Payment on agreed terms with a traceable record",
];

export default function ForFarmersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Farmers"
        title="Sell your produce with less hassle and more clarity"
        subtitle="Register the crop you have available. Our field team inspects quality, shares a transparent offer, and connects you to real buyer demand."
      />

      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-ink">Traditional mandi selling</h2>
            <ul className="mt-5 space-y-3">
              {traditional.map((t) => (
                <li key={t} className="flex gap-3 text-sm text-ink/70">
                  <X className="mt-0.5 size-4 shrink-0 text-red-500" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-leaf/30 bg-cream p-7">
            <h2 className="font-display text-xl font-bold text-brand">With AgriTradeXchange</h2>
            <ul className="mt-5 space-y-3">
              {withUs.map((t) => (
                <li key={t} className="flex gap-3 text-sm text-ink/80">
                  <Check className="mt-0.5 size-4 shrink-0 text-leaf" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16">
        <Container>
          <h2 className="text-2xl font-bold text-brand">What happens after you register</h2>
          <p className="mt-2 max-w-2xl text-ink/70">
            You can follow your produce through each stage. A registration is not a
            guaranteed purchase — you always see and approve the offer first.
          </p>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FARMER_STATUS_PIPELINE.map((status, i) => (
              <li key={status} className="rounded-xl border border-black/5 bg-white p-4">
                <span className="font-display text-sm font-bold text-leaf">Step {i + 1}</span>
                <p className="mt-1 text-sm font-medium text-ink">{status}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="register" className="py-16">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-brand">Register your produce</h2>
          <p className="mt-2 text-ink/70">
            Mobile-friendly and free. Full OTP verification and Gujarati / Hindi
            interfaces are planned for the next version.
          </p>
          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
            <FarmerRegistrationForm />
          </div>
        </Container>
      </section>
    </>
  );
}

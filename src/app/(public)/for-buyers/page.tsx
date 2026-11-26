import type { Metadata } from "next";
import Link from "next/link";
import {
  Boxes,
  ClipboardList,
  FlaskConical,
  Layers,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button";
import { BuyerRegistrationForm } from "@/components/forms/buyer-registration-form";

export const metadata: Metadata = {
  title: "For Buyers",
  description:
    "Source agricultural commodities through one connected procurement network — quality-specified, aggregated and delivered.",
};

const benefits = [
  { icon: Boxes, title: "Multiple supply sources", text: "Reach distributed farmer supply across production clusters through one channel." },
  { icon: ClipboardList, title: "Crop-specific specifications", text: "Define commodity, grade, moisture, quantity, packaging and delivery needs." },
  { icon: Layers, title: "Aggregated procurement", text: "Many small farmer lots consolidated to meet your bulk requirement." },
  { icon: FlaskConical, title: "Sample coordination", text: "Request and evaluate samples before committing to an order." },
  { icon: Truck, title: "Delivery coordination", text: "Consolidation and delivery to your plant or warehouse location." },
];

const audience = [
  "Food processing factories",
  "Flour, oil & rice mills",
  "Spice manufacturers",
  "Textile businesses",
  "Commodity traders",
  "Exporters",
  "Wholesale distributors",
];

export default function ForBuyersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Buyers"
        title="Source agricultural commodities through one connected network"
        subtitle="Submit your purchasing requirement and let our procurement team match verified farmer supply by quality, quantity, location and price."
      />

      <section className="py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <b.icon className="size-7 text-leaf" />
                <h3 className="mt-3 font-display font-bold text-brand">{b.title}</h3>
                <p className="mt-1.5 text-sm text-ink/70">{b.text}</p>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-2xl bg-brand p-6 text-cream">
              <p className="font-display text-lg font-bold">Have a live requirement?</p>
              <p className="mt-1 text-sm text-cream/80">Post it now — no account needed to start.</p>
              <div className="mt-4">
                <ButtonLink href="/buyers/post-requirement" variant="gold">
                  Post a requirement <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-14">
        <Container>
          <h2 className="text-xl font-bold text-brand">Who sources through AgriTradeXchange</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {audience.map((a) => (
              <span key={a} className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm text-ink/75">
                {a}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section id="register" className="py-16">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-brand">Register as a buyer</h2>
          <p className="mt-2 text-ink/70">
            Create a buyer account so our team can verify you and share matched,
            quality-checked supply. Already registered?{" "}
            <Link href="/buyers/post-requirement" className="font-semibold text-leaf hover:underline">
              Post a requirement
            </Link>
            .
          </p>
          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
            <BuyerRegistrationForm />
          </div>
        </Container>
      </section>
    </>
  );
}

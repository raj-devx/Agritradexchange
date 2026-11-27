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
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { BuyerRegistrationForm } from "@/components/forms/buyer-registration-form";

export const metadata: Metadata = {
  title: "For Buyers",
  description:
    "Source agricultural commodities through one connected procurement network — quality-specified, aggregated and delivered.",
};

const benefits = [
  {
    icon: Boxes,
    title: "Multiple supply sources",
    text: "Reach distributed farmer supply across production clusters through one channel.",
    accent: "bg-leaf/10 text-leaf border-leaf/20",
  },
  {
    icon: ClipboardList,
    title: "Crop-specific specifications",
    text: "Define commodity, grade, moisture, quantity, packaging and delivery needs.",
    accent: "bg-gold/15 text-gold-600 border-gold/20",
  },
  {
    icon: Layers,
    title: "Aggregated procurement",
    text: "Many small farmer lots consolidated to meet your bulk requirement.",
    accent: "bg-brand/10 text-brand border-brand/20",
  },
  {
    icon: FlaskConical,
    title: "Sample coordination",
    text: "Request and evaluate samples before committing to an order.",
    accent: "bg-terracotta-100 text-terracotta border-terracotta/20",
  },
  {
    icon: Truck,
    title: "Delivery coordination",
    text: "Consolidation and delivery to your plant or warehouse location.",
    accent: "bg-spice-100 text-spice border-spice/20",
  },
];

const audience = [
  "Food processing factories",
  "Flour, oil & rice mills",
  "Spice manufacturers",
  "Textile businesses",
  "Commodity traders",
  "Exporters",
  "Wholesale distributors",
  "Institutional / Government buyers",
];

export default function ForBuyersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Buyers"
        title="Source agricultural commodities through one connected network"
        subtitle="Submit your purchasing requirement and let our procurement team match verified farmer supply by quality, quantity, location and price."
      />

      {/* Benefits */}
      <section className="py-16">
        <Container>
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${b.accent}`}
                >
                  <b.icon className="size-6" />
                </span>
                <h3 className="mt-4 font-display font-bold text-brand">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink/70">{b.text}</p>
              </div>
            ))}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand to-brand-600 p-6 text-cream">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gold/10 blur-2xl"
              />
              <div className="relative">
                <p className="font-display text-lg font-bold">
                  Have a live requirement?
                </p>
                <p className="mt-1 text-sm text-cream/80">
                  Post it now — no account needed to start.
                </p>
                <div className="mt-4">
                  <ButtonLink
                    href="/buyers/post-requirement"
                    variant="gold"
                    className="shadow-lg shadow-gold/20"
                  >
                    Post a requirement <ArrowRight className="size-4" />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Audience */}
      <section className="bg-cream py-14">
        <Container>
          <div className="section-divider mb-4" />
          <h2 className="text-xl font-bold text-brand">
            Who sources through AgriTradeXchange
          </h2>
          <Reveal className="mt-5 flex flex-wrap gap-2">
            {audience.map((a) => (
              <span
                key={a}
                className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm text-ink/75 transition-all hover:border-leaf/30 hover:bg-leaf/5 hover:text-brand"
              >
                {a}
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Registration */}
      <section id="register" className="py-16">
        <Container className="max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand">
              Register as a buyer
            </h2>
            <p className="mt-2 text-ink/70">
              Create a buyer account so our team can verify you and share
              matched, quality-checked supply. Already registered?{" "}
              <Link
                href="/buyers/post-requirement"
                className="font-semibold text-leaf hover:underline"
              >
                Post a requirement
              </Link>
              .
            </p>
          </div>
          <Reveal className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <BuyerRegistrationForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

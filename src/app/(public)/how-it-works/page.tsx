import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The end-to-end AgriTradeXchange procurement workflow — demand secured first, quality verified, supply matched, delivered and settled.",
};

const workflow = [
  {
    n: 1,
    title: "Buyer submits a requirement",
    text: "Commodity, quantity, quality/grade, delivery location, deadline and price expectations.",
    color: "bg-brand",
  },
  {
    n: 2,
    title: "Requirement is reviewed",
    text: "Our team checks buyer credibility and commercial viability before matching supply.",
    color: "bg-brand-500",
  },
  {
    n: 3,
    title: "Matching farmer supply is identified",
    text: "Based on location, quantity and quality parameters across registered produce.",
    color: "bg-leaf",
  },
  {
    n: 4,
    title: "Agent inspection & sampling",
    text: "On-site quality records and samples support a transparent, grade-based quotation.",
    color: "bg-leaf-600",
  },
  {
    n: 5,
    title: "Buyer and farmer confirm",
    text: "Agreed price, quantity and terms are confirmed. Farmers approve their offer first.",
    color: "bg-gold-600",
  },
  {
    n: 6,
    title: "Collection, weighing & dispatch",
    text: "Lots are consolidated at a nearby point, weighed, recorded and delivered to the buyer.",
    color: "bg-terracotta",
  },
  {
    n: 7,
    title: "Payment & closure",
    text: "Farmer settlement and buyer receivable are recorded, closing a fully traceable transaction.",
    color: "bg-brand",
  },
];

const principles = [
  "A registration is never a guaranteed purchase.",
  "Farmers see the final price and quality adjustments before accepting.",
  "We never display unverified crop availability or buyer demand.",
  "Farmer personal, bank and farm-location details are not publicly searchable.",
  "Every accepted lot carries a traceable record from farm to settlement.",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How It Works"
        title="Demand-led procurement, end to end"
        subtitle="The model is built on one principle: secure buyer demand before committing to supply — so farmers sell into real orders and capital isn't locked in unsold stock."
      />

      {/* Timeline */}
      <section className="py-16">
        <Container className="max-w-3xl">
          <Reveal as="ol" className="relative space-y-6 border-l-2 border-leaf/25 pl-8">
            {workflow.map((w, i) => (
              <li key={w.n} className="group relative">
                <span
                  className={`absolute -left-[41px] flex size-8 items-center justify-center rounded-full font-display text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${w.color}`}
                >
                  {w.n}
                </span>
                <div className="rounded-xl border border-transparent p-3 transition-all group-hover:border-black/5 group-hover:bg-cream/50">
                  <h3 className="font-display text-lg font-bold text-brand">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/70">{w.text}</p>
                </div>
                {i < workflow.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute -left-[33px] top-10 h-full w-0.5 bg-gradient-to-b from-leaf/20 to-transparent"
                  />
                )}
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Principles */}
      <section className="relative overflow-hidden bg-brand py-16 text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, var(--color-gold) 0%, transparent 50%)",
          }}
        />
        <Container className="relative max-w-3xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-7 text-gold" />
            <h2 className="text-2xl font-bold text-white">
              The rules we build into the platform
            </h2>
          </div>
          <Reveal as="ul" className="mt-6 space-y-3">
            {principles.map((p) => (
              <li
                key={p}
                className="rounded-xl bg-white/10 px-5 py-4 text-sm text-cream/90 backdrop-blur-sm transition-all hover:bg-white/15"
              >
                {p}
              </li>
            ))}
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/register/farmer"
              variant="gold"
              className="shadow-lg shadow-gold/20"
            >
              Register produce
            </ButtonLink>
            <ButtonLink
              href="/buyers/post-requirement"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Post a requirement
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

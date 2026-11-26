import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The end-to-end AgriTradeXchange procurement workflow — demand secured first, quality verified, supply matched, delivered and settled.",
};

const workflow = [
  { n: 1, title: "Buyer submits a requirement", text: "Commodity, quantity, quality/grade, delivery location, deadline and price expectations." },
  { n: 2, title: "Requirement is reviewed", text: "Our team checks buyer credibility and commercial viability before matching supply." },
  { n: 3, title: "Matching farmer supply is identified", text: "Based on location, quantity and quality parameters across registered produce." },
  { n: 4, title: "Agent inspection & sampling", text: "On-site quality records and samples support a transparent, grade-based quotation." },
  { n: 5, title: "Buyer and farmer confirm", text: "Agreed price, quantity and terms are confirmed. Farmers approve their offer first." },
  { n: 6, title: "Collection, weighing & dispatch", text: "Lots are consolidated at a nearby point, weighed, recorded and delivered to the buyer." },
  { n: 7, title: "Payment & closure", text: "Farmer settlement and buyer receivable are recorded, closing a fully traceable transaction." },
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

      <section className="py-16">
        <Container className="max-w-3xl">
          <ol className="relative space-y-6 border-l-2 border-leaf/25 pl-8">
            {workflow.map((w) => (
              <li key={w.n} className="relative">
                <span className="absolute -left-[41px] flex size-8 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-cream">
                  {w.n}
                </span>
                <h3 className="font-display text-lg font-bold text-brand">{w.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{w.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-cream py-16">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-brand">The rules we build into the platform</h2>
          <ul className="mt-6 space-y-3">
            {principles.map((p) => (
              <li key={p} className="rounded-xl border border-black/5 bg-white px-5 py-4 text-sm text-ink/80">
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/register/farmer" variant="primary">Register produce</ButtonLink>
            <ButtonLink href="/buyers/post-requirement" variant="outline">Post a requirement</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

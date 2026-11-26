import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AgriTradeXchange is building trusted digital infrastructure for agricultural trade — starting as a managed procurement network and scaling toward a global marketplace.",
};

const phases = [
  { tag: "Phase 0", title: "Research & validation", text: "Current stage — market, commodity and demand research, business model and buyer/farmer validation.", now: true },
  { tag: "Phase 1", title: "Assisted trade network (India)", text: "Agent-led procurement: register, verify, sample, match buyers, collect and deliver." },
  { tag: "Phase 2", title: "Digital India", text: "The full platform — digital onboarding, buyer search, RFQs, quality reports, logistics and payments across a pan-India agent network." },
  { tag: "Phase 3", title: "Global expansion", text: "Connecting Indian supply with international buyers, and eventually suppliers from other countries." },
  { tag: "Phase 4", title: "Global agricultural infrastructure", text: "Commodity intelligence, quality networks, trade finance, warehousing and logistics ecosystem." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Trusted digital infrastructure for agricultural trade"
        subtitle="We start where the real problem is — helping farmers sell more easily and buyers source more reliably — and build toward a connected global ecosystem."
      />

      <section className="py-16">
        <Container className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
            <h2 className="font-display text-lg font-bold text-brand">Mission</h2>
            <p className="mt-3 text-sm text-ink/70">
              To simplify agricultural trade by creating a unified platform where
              every farmer, trader, processor, exporter and importer can trade
              efficiently and confidently.
            </p>
          </div>
          <div className="rounded-2xl border border-leaf/30 bg-cream p-7 lg:col-span-2">
            <h2 className="font-display text-lg font-bold text-brand">Vision</h2>
            <p className="mt-3 text-ink/80">{BRAND.vision}</p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16">
        <Container>
          <h2 className="text-2xl font-bold text-brand">Our phased approach</h2>
          <p className="mt-2 max-w-2xl text-ink/70">
            We&apos;re deliberately building the operating model before the large
            marketplace — proving the trade works before scaling it.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {phases.map((p) => (
              <div
                key={p.tag}
                className={`rounded-2xl border p-5 ${
                  p.now ? "border-leaf bg-white ring-2 ring-leaf/20" : "border-black/5 bg-white"
                }`}
              >
                <span className="font-display text-sm font-bold text-leaf">{p.tag}</span>
                {p.now && (
                  <span className="ml-2 rounded-full bg-leaf/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-leaf">
                    Now
                  </span>
                )}
                <h3 className="mt-2 font-display text-sm font-bold text-brand">{p.title}</h3>
                <p className="mt-1.5 text-xs text-ink/70">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-brand">What makes us different</h2>
          <p className="mt-4 text-ink/70">
            Existing channels solve only part of the trade. AgriTradeXchange brings
            discovery, quality, sampling, matching, aggregation, logistics and trade
            support into one network — differentiated by{" "}
            <strong className="text-ink">
              confirmed buyer demand, transparent quality-based pricing, local
              collection infrastructure, faster farmer payment and reliable
              fulfilment
            </strong>
            .
          </p>
          <p className="mt-4 text-sm text-ink/50">
            AgriTradeXchange is a concept-stage venture. Nothing here claims current
            operations, users or revenue. Procurement will operate only where
            permitted by applicable state agricultural-marketing law.
          </p>
        </Container>
      </section>
    </>
  );
}

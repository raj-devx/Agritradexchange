import type { Metadata } from "next";
import { Target, Eye, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AgriTradeXchange is building trusted digital infrastructure for agricultural trade — starting as a managed procurement network and scaling toward a global marketplace.",
};

const phases = [
  {
    tag: "Phase 0",
    title: "Research & validation",
    text: "Current stage — market, commodity and demand research, business model and buyer/farmer validation.",
    now: true,
  },
  {
    tag: "Phase 1",
    title: "Assisted trade network (India)",
    text: "Agent-led procurement: register, verify, sample, match buyers, collect and deliver.",
    now: false,
  },
  {
    tag: "Phase 2",
    title: "Digital India",
    text: "The full platform — digital onboarding, buyer search, RFQs, quality reports, logistics and payments across a pan-India agent network.",
    now: false,
  },
  {
    tag: "Phase 3",
    title: "Global expansion",
    text: "Connecting Indian supply with international buyers, and eventually suppliers from other countries.",
    now: false,
  },
  {
    tag: "Phase 4",
    title: "Global agricultural infrastructure",
    text: "Commodity intelligence, quality networks, trade finance, warehousing and logistics ecosystem.",
    now: false,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Trusted digital infrastructure for agricultural trade"
        subtitle="We start where the real problem is — helping farmers sell more easily and buyers source more reliably — and build toward a connected global ecosystem."
      />

      {/* Mission / Vision */}
      <section className="py-16">
        <Container>
          <Reveal className="grid gap-6 lg:grid-cols-3">
            <div className="group rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition-all hover:shadow-lg">
              <span className="flex size-12 items-center justify-center rounded-xl bg-leaf/10 text-leaf transition-transform duration-300 group-hover:scale-110">
                <Target className="size-6" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold text-brand">
                Mission
              </h2>
              <p className="mt-3 text-sm text-ink/70">
                To simplify agricultural trade by creating a unified platform
                where every farmer, trader, processor, exporter and importer can
                trade efficiently and confidently.
              </p>
            </div>
            <div className="group rounded-2xl border-2 border-leaf/20 bg-gradient-to-br from-cream to-white p-7 shadow-sm transition-all hover:shadow-lg lg:col-span-2">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                <Eye className="size-6" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold text-brand">
                Vision
              </h2>
              <p className="mt-3 text-ink/80">{BRAND.vision}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Phased approach */}
      <section className="relative overflow-hidden bg-brand py-16 text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, var(--color-leaf) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--color-gold) 0%, transparent 50%)",
          }}
        />
        <Container className="relative">
          <div className="mb-4 h-[3px] w-12 rounded bg-gold" />
          <h2 className="text-2xl font-bold text-white">
            Our phased approach
          </h2>
          <p className="mt-2 max-w-2xl text-cream/70">
            We&apos;re deliberately building the operating model before the
            large marketplace — proving the trade works before scaling it.
          </p>
          <Reveal className="mt-8 grid gap-4 md:grid-cols-5">
            {phases.map((p) => (
              <div
                key={p.tag}
                className={`group rounded-2xl p-5 transition-all ${
                  p.now
                    ? "bg-gold/20 ring-2 ring-gold/30 backdrop-blur-sm"
                    : "bg-white/10 backdrop-blur-sm hover:bg-white/15"
                }`}
              >
                <span className="font-display text-sm font-bold text-gold">
                  {p.tag}
                </span>
                {p.now && (
                  <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
                    Now
                  </span>
                )}
                <h3 className="mt-2 font-display text-sm font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs text-cream/70">{p.text}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Differentiators */}
      <section className="py-16">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <Sparkles className="size-6 text-gold" />
              <h2 className="text-2xl font-bold text-brand">
                What makes us different
              </h2>
            </div>
            <p className="mt-4 text-ink/70">
              Existing channels solve only part of the trade. AgriTradeXchange
              brings discovery, quality, sampling, matching, aggregation,
              logistics and trade support into one network — differentiated by{" "}
              <strong className="text-brand">
                confirmed buyer demand, transparent quality-based pricing, local
                collection infrastructure, faster farmer payment and reliable
                fulfilment
              </strong>
              .
            </p>
            <p className="mt-4 rounded-xl bg-cream px-5 py-4 text-sm text-ink/50">
              AgriTradeXchange is a concept-stage venture. Nothing here claims
              current operations, users or revenue. Procurement will operate only
              where permitted by applicable state agricultural-marketing law.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

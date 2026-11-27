import type { Metadata } from "next";
import { Info, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/commodities";

export const metadata: Metadata = {
  title: "Commodities",
  description:
    "The AgriTradeXchange commodity base — grains, oilseeds, fibre, spices, pulses and commercial crops. Non-perishable and trade-ready.",
};

const categoryAccents = [
  "border-l-leaf",
  "border-l-gold",
  "border-l-brand",
  "border-l-terracotta",
  "border-l-spice",
  "border-l-leaf-400",
];

export default function CommoditiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Commodities"
        title="Our commodity base"
        subtitle="A multi-commodity, non-perishable focus built for domestic and export trade. Fruits and vegetables are planned for a future phase."
      />

      <section className="py-16">
        <Container className="space-y-8">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.key}>
              <div
                className={`group rounded-2xl border-l-4 bg-white p-7 shadow-sm transition-all hover:shadow-lg ${categoryAccents[i % categoryAccents.length]}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl transition-transform duration-300 group-hover:scale-125">
                      {c.emoji}
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-bold text-brand">
                        {c.label}{" "}
                        <span className="rounded-full bg-cream px-2.5 py-0.5 text-sm font-medium text-ink/40">
                          {c.gujarati}
                        </span>
                      </h2>
                      <p className="text-sm text-ink/70">{c.description}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink/50">
                    {c.crops.length} commodities
                  </span>
                </div>

                {c.note && (
                  <p className="mt-4 flex items-start gap-2 rounded-lg bg-gold/10 px-4 py-2.5 text-sm text-ink/70">
                    <Info className="mt-0.5 size-4 shrink-0 text-gold-600" />{" "}
                    {c.note}
                  </p>
                )}

                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {c.crops.map((crop) => (
                    <div
                      key={crop.en}
                      className="flex items-center justify-between rounded-lg border border-black/5 px-3 py-2.5 text-sm transition-all hover:border-leaf/20 hover:bg-cream/50"
                    >
                      <span className="font-medium text-ink">{crop.en}</span>
                      <span className="text-ink/40">{crop.gu}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand to-brand-600 p-8 text-center text-cream">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gold/10 blur-2xl"
              />
              <div className="relative">
                <h2 className="text-xl font-bold text-white">
                  Looking for a specific commodity?
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-sm text-cream/75">
                  Buyers can post a precise requirement; farmers can register
                  produce in any of these categories.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <ButtonLink
                    href="/buyers/post-requirement"
                    variant="gold"
                    className="shadow-lg shadow-gold/20"
                  >
                    Post a requirement <ArrowRight className="size-4" />
                  </ButtonLink>
                  <ButtonLink
                    href="/register/farmer"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Register produce
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

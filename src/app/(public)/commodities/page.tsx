import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/commodities";

export const metadata: Metadata = {
  title: "Commodities",
  description:
    "The AgriTradeXchange commodity base — grains, oilseeds, fibre, spices, pulses and commercial crops. Non-perishable and trade-ready.",
};

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
          {CATEGORIES.map((c) => (
            <div key={c.key} className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{c.emoji}</span>
                  <div>
                    <h2 className="font-display text-xl font-bold text-brand">
                      {c.label}{" "}
                      <span className="text-base font-medium text-ink/40">{c.gujarati}</span>
                    </h2>
                    <p className="text-sm text-ink/70">{c.description}</p>
                  </div>
                </div>
              </div>

              {c.note && (
                <p className="mt-4 flex items-start gap-2 rounded-lg bg-cream px-4 py-2.5 text-sm text-ink/70">
                  <Info className="mt-0.5 size-4 shrink-0 text-gold-600" /> {c.note}
                </p>
              )}

              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {c.crops.map((crop) => (
                  <div
                    key={crop.en}
                    className="flex items-center justify-between rounded-lg border border-black/5 px-3 py-2.5 text-sm"
                  >
                    <span className="font-medium text-ink">{crop.en}</span>
                    <span className="text-ink/40">{crop.gu}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="rounded-2xl bg-cream p-8 text-center">
            <h2 className="text-xl font-bold text-brand">Looking for a specific commodity?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ink/70">
              Buyers can post a precise requirement; farmers can register produce in
              any of these categories.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/buyers/post-requirement" variant="primary">Post a requirement</ButtonLink>
              <ButtonLink href="/register/farmer" variant="outline">Register produce</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

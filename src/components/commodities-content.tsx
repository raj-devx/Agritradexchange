"use client";

import { Info, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/commodities";
import { useSiteT } from "@/lib/use-t";

const categoryAccents = [
  "border-l-leaf",
  "border-l-gold",
  "border-l-brand",
  "border-l-terracotta",
  "border-l-spice",
  "border-l-leaf-400",
];

export function CommoditiesContent() {
  const t = useSiteT();

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-black/5 bg-brand text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, var(--color-gold) 0%, transparent 50%), radial-gradient(circle at 20% 80%, var(--color-leaf) 0%, transparent 50%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
        <Container className="relative py-14 sm:py-20">
          <p className="mb-3 inline-flex animate-fade-up items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
            <span className="h-px w-5 bg-gold/60" />
            {t.comm_eyebrow}
          </p>
          <h1
            className="max-w-3xl animate-fade-up text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            {t.comm_title}
          </h1>
          <p
            className="mt-4 max-w-2xl animate-fade-up text-lg text-cream/75"
            style={{ animationDelay: "120ms" }}
          >
            {t.comm_subtitle}
          </p>
        </Container>
      </section>

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
                    {c.crops.length} {t.comm_commodities}
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
                  {t.comm_lookingTitle}
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-sm text-cream/75">
                  {t.comm_lookingSub}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <ButtonLink
                    href="/buyers/post-requirement"
                    variant="gold"
                    className="shadow-lg shadow-gold/20"
                  >
                    {t.comm_postReq} <ArrowRight className="size-4" />
                  </ButtonLink>
                  <ButtonLink
                    href="/register/farmer"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    {t.comm_regProduce}
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

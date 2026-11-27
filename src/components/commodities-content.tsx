"use client";

import { Info, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Aurora } from "@/components/aurora";
import { SpotlightCard } from "@/components/spotlight-card";
import { Magnetic } from "@/components/magnetic";
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
      <section className="grain relative overflow-hidden bg-brand text-cream">
        <Aurora />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        />
        <Container className="relative z-[1] py-16 sm:py-24">
          <p className="mb-4 inline-flex animate-fade-up items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur">
            <span className="live-dot size-1.5 rounded-full bg-gold" />
            {t.comm_eyebrow}
          </p>
          <h1
            className="max-w-3xl animate-fade-up text-4xl text-white sm:text-5xl md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {t.comm_title}
          </h1>
          <p
            className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-cream/75"
            style={{ animationDelay: "160ms" }}
          >
            {t.comm_subtitle}
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-8">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.key}>
              <SpotlightCard
                spot="rgba(55,132,81,0.1)"
                className={`group rounded-3xl border border-black/5 border-l-4 bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:p-8 ${categoryAccents[i % categoryAccents.length]}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-cream text-3xl shadow-sm ring-1 ring-black/5 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                      {c.emoji}
                    </span>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-brand">
                        {c.label}{" "}
                        <span className="rounded-full bg-cream px-2.5 py-0.5 text-sm font-medium text-ink/40">
                          {c.gujarati}
                        </span>
                      </h2>
                      <p className="text-sm text-ink/70">{c.description}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-brand/5 px-3.5 py-1 text-xs font-bold text-brand ring-1 ring-brand/10">
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
                      className="flex items-center justify-between rounded-xl border border-black/5 bg-cream/30 px-3.5 py-2.5 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-leaf/30 hover:bg-white hover:shadow-md"
                    >
                      <span className="font-medium text-ink">{crop.en}</span>
                      <span className="text-ink/40">{crop.gu}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[2rem] bg-brand p-10 text-center text-cream shadow-[0_40px_80px_-30px_rgba(18,62,45,0.7)] sm:p-14">
              <Aurora />
              <div className="relative z-[1]">
                <h2 className="text-2xl text-white sm:text-4xl">
                  {t.comm_lookingTitle}
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-sm text-cream/75">
                  {t.comm_lookingSub}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Magnetic>
                    <ButtonLink href="/buyers/post-requirement" variant="gold">
                      {t.comm_postReq} <ArrowRight className="size-4" />
                    </ButtonLink>
                  </Magnetic>
                  <Magnetic>
                    <ButtonLink
                      href="/register/farmer"
                      variant="outline"
                      className="glass border-white/30 text-white hover:bg-white/10"
                    >
                      {t.comm_regProduce}
                    </ButtonLink>
                  </Magnetic>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

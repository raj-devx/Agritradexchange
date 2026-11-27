"use client";

import { Target, Eye, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { Aurora } from "@/components/aurora";
import { SpotlightCard } from "@/components/spotlight-card";
import { Reveal } from "@/components/reveal";
import { BRAND } from "@/lib/brand";
import { useSiteT } from "@/lib/use-t";

export function AboutContent() {
  const t = useSiteT();

  const phases = [
    { tag: t.about_ph0tag, title: t.about_ph0, text: t.about_ph0t, now: true },
    { tag: t.about_ph1tag, title: t.about_ph1, text: t.about_ph1t, now: false },
    { tag: t.about_ph2tag, title: t.about_ph2, text: t.about_ph2t, now: false },
    { tag: t.about_ph3tag, title: t.about_ph3, text: t.about_ph3t, now: false },
    { tag: t.about_ph4tag, title: t.about_ph4, text: t.about_ph4t, now: false },
  ];

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
            {t.about_eyebrow}
          </p>
          <h1
            className="max-w-3xl animate-fade-up text-4xl text-white sm:text-5xl md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {t.about_title}
          </h1>
          <p
            className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-cream/75"
            style={{ animationDelay: "160ms" }}
          >
            {t.about_subtitle}
          </p>
        </Container>
      </section>

      {/* Mission / Vision */}
      <section className="py-20">
        <Container>
          <Reveal className="grid gap-6 lg:grid-cols-3">
            <SpotlightCard spot="rgba(55,132,81,0.14)" className="group gborder rounded-3xl border border-black/5 bg-white p-8 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-leaf/20 to-leaf/5 text-leaf ring-1 ring-leaf/15 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Target className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold text-brand">
                {t.about_mission}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{t.about_missionText}</p>
            </SpotlightCard>
            <SpotlightCard spot="rgba(233,198,90,0.2)" className="group gborder rounded-3xl bg-gradient-to-br from-cream to-white p-8 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] lg:col-span-2">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 text-brand ring-1 ring-brand/15 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Eye className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold text-brand">
                {t.about_vision}
              </h2>
              <p className="mt-3 leading-relaxed text-ink/80">{BRAND.vision}</p>
            </SpotlightCard>
          </Reveal>
        </Container>
      </section>

      {/* Phased approach */}
      <section className="grain relative overflow-hidden bg-brand py-24 text-cream">
        <Aurora />
        <Container className="relative z-[1]">
          <div className="section-divider mb-4" />
          <h2 className="text-3xl text-white sm:text-4xl">
            {t.about_phasedTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-cream/70">
            {t.about_phasedSub}
          </p>
          <div className="relative mt-12">
            <div aria-hidden className="absolute left-[8%] right-[8%] top-[1.6rem] hidden h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent md:block" />
          <Reveal className="relative grid gap-4 md:grid-cols-5">
            {phases.map((p) => (
              <SpotlightCard
                key={p.tag}
                className={`glass group rounded-3xl p-5 transition-all duration-500 hover:-translate-y-1.5 ${
                  p.now ? "!bg-gold/20 ring-2 ring-gold/40" : "hover:bg-white/15"
                }`}
              >
                <span className="font-display text-sm font-bold text-gold">
                  {p.tag}
                </span>
                {p.now && (
                  <span className="live-dot ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
                    {t.about_now}
                  </span>
                )}
                <h3 className="mt-2 font-display text-sm font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-cream/70">{p.text}</p>
              </SpotlightCard>
            ))}
          </Reveal>
          </div>
        </Container>
      </section>

      {/* Differentiators */}
      <section className="py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-gold/30"><Sparkles className="size-6 text-gold-600" /></span>
              <h2 className="text-3xl text-brand sm:text-4xl">
                {t.about_diffTitle}
              </h2>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">{t.about_diffText}</p>
            <p className="mt-6 rounded-2xl border border-gold/25 bg-gradient-to-r from-gold/10 to-cream px-6 py-4 text-sm text-ink/60">
              {t.about_diffDisclaimer}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

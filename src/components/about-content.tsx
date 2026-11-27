"use client";

import { Target, Eye, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
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
            {t.about_eyebrow}
          </p>
          <h1
            className="max-w-3xl animate-fade-up text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            {t.about_title}
          </h1>
          <p
            className="mt-4 max-w-2xl animate-fade-up text-lg text-cream/75"
            style={{ animationDelay: "120ms" }}
          >
            {t.about_subtitle}
          </p>
        </Container>
      </section>

      {/* Mission / Vision */}
      <section className="py-16">
        <Container>
          <Reveal className="grid gap-6 lg:grid-cols-3">
            <div className="group rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition-all hover:shadow-lg">
              <span className="flex size-12 items-center justify-center rounded-xl bg-leaf/10 text-leaf transition-transform duration-300 group-hover:scale-110">
                <Target className="size-6" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold text-brand">
                {t.about_mission}
              </h2>
              <p className="mt-3 text-sm text-ink/70">{t.about_missionText}</p>
            </div>
            <div className="group rounded-2xl border-2 border-leaf/20 bg-gradient-to-br from-cream to-white p-7 shadow-sm transition-all hover:shadow-lg lg:col-span-2">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                <Eye className="size-6" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold text-brand">
                {t.about_vision}
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
            {t.about_phasedTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-cream/70">
            {t.about_phasedSub}
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
                    {t.about_now}
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
                {t.about_diffTitle}
              </h2>
            </div>
            <p className="mt-4 text-ink/70">{t.about_diffText}</p>
            <p className="mt-4 rounded-xl bg-cream px-5 py-4 text-sm text-ink/50">
              {t.about_diffDisclaimer}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

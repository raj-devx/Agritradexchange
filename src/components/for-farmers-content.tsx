"use client";

import { Check, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Aurora } from "@/components/aurora";
import { SpotlightCard } from "@/components/spotlight-card";
import { FarmerRegistrationForm } from "@/components/forms/farmer-registration-form";
import { useLang } from "@/components/language-provider";
import { FARMER_T } from "@/lib/i18n";

const pipelineColors = [
  "bg-leaf/10 text-leaf",
  "bg-brand/10 text-brand",
  "bg-gold/15 text-gold-600",
  "bg-leaf/10 text-leaf-600",
  "bg-terracotta-100 text-terracotta",
  "bg-brand/10 text-brand-500",
  "bg-spice-100 text-spice",
  "bg-leaf/10 text-leaf",
];

export function ForFarmersContent() {
  const { lang } = useLang();
  const t = FARMER_T[lang];

  return (
    <>
      <PageHeader eyebrow={t.ff_eyebrow} title={t.ff_title} subtitle={t.ff_subtitle} />

      {/* Comparison */}
      <section className="relative overflow-hidden py-20">
        <div
          aria-hidden
          className="bg-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
        />
        <Container className="relative">
          <Reveal className="grid gap-6 lg:grid-cols-2">
            <SpotlightCard
              spot="rgba(239,68,68,0.08)"
              className="group rounded-3xl border border-black/10 bg-white p-8 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 ring-1 ring-red-100 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <X className="size-5" />
                </span>
                <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {t.ff_tradHeading}
                </h2>
              </div>
              <ul className="mt-6 space-y-2">
                {t.ff_trad.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/70 transition-all hover:translate-x-1 hover:bg-red-50/60"
                  >
                    <X className="mt-0.5 size-4 shrink-0 text-red-400" /> {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
            <SpotlightCard
              spot="rgba(55,132,81,0.16)"
              className="group gborder rounded-3xl border border-leaf/30 bg-gradient-to-br from-cream via-white to-white p-8 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-leaf/25 to-leaf/5 text-leaf ring-1 ring-leaf/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Check className="size-5" />
                </span>
                <h2 className="font-display text-xl font-bold text-brand sm:text-2xl">
                  {t.ff_withHeading}
                </h2>
              </div>
              <ul className="mt-6 space-y-2">
                {t.ff_with.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/80 transition-all hover:translate-x-1 hover:bg-leaf/10"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-leaf" /> {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </Container>
      </section>

      {/* Pipeline */}
      <section className="grain relative overflow-hidden bg-brand py-24 text-cream">
        <Aurora />
        <Container className="relative z-[1]">
          <div className="mb-4 h-[3px] w-12 rounded bg-gold" />
          <h2 className="text-3xl text-white sm:text-4xl lg:text-[2.75rem]">
            {t.ff_pipeHeading}
          </h2>
          <p className="mt-3 max-w-2xl text-cream/70">{t.ff_pipeSub}</p>
          <div className="relative mt-12">
            <Reveal
              as="ol"
              className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {t.pipeline.map((status, i) => (
                <SpotlightCard
                  as="li"
                  key={status}
                  className="glass group rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/15"
                >
                  <span
                    className={`inline-flex size-10 items-center justify-center rounded-xl font-display text-sm font-bold ring-4 ring-brand transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${pipelineColors[i]}`}
                  >
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm font-medium text-white">{status}</p>
                </SpotlightCard>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Registration form */}
      <section id="register" className="relative py-24">
        <Container className="max-w-3xl">
          <div className="text-center">
            <div className="section-divider mx-auto mb-4" />
            <h2 className="text-3xl text-brand sm:text-4xl">
              {t.ff_registerHeading}
            </h2>
            <p className="mt-3 text-ink/70">{t.ff_registerSub}</p>
          </div>
          <Reveal className="mt-10">
            <div className="gborder rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10">
              <FarmerRegistrationForm />
            </div>
          </Reveal>
          <div className="mt-8 text-center">
            <ButtonLink href="/how-it-works" variant="ghost">
              See the full process <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

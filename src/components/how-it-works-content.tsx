"use client";

import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Aurora } from "@/components/aurora";
import { Magnetic } from "@/components/magnetic";
import { SpotlightCard } from "@/components/spotlight-card";
import { useSiteT } from "@/lib/use-t";
import type { SiteDict } from "@/lib/i18n";

const WORKFLOW_KEYS: [keyof SiteDict, keyof SiteDict][] = [
  ["hiw_w1", "hiw_w1t"],
  ["hiw_w2", "hiw_w2t"],
  ["hiw_w3", "hiw_w3t"],
  ["hiw_w4", "hiw_w4t"],
  ["hiw_w5", "hiw_w5t"],
  ["hiw_w6", "hiw_w6t"],
  ["hiw_w7", "hiw_w7t"],
];

const WORKFLOW_COLORS = [
  "from-brand-500 to-brand",
  "from-brand-500 to-brand",
  "from-leaf-400 to-leaf",
  "from-leaf to-leaf-600",
  "from-gold-400 to-gold-600",
  "from-terracotta to-terracotta",
  "from-brand-500 to-brand",
];

const PRINCIPLE_KEYS: (keyof SiteDict)[] = [
  "hiw_p1",
  "hiw_p2",
  "hiw_p3",
  "hiw_p4",
  "hiw_p5",
];

export function HowItWorksContent() {
  const t = useSiteT();

  const workflow = WORKFLOW_KEYS.map(([titleKey, textKey], i) => ({
    n: i + 1,
    title: t[titleKey],
    text: t[textKey],
    color: WORKFLOW_COLORS[i],
  }));

  const principles = PRINCIPLE_KEYS.map((k) => t[k]);

  return (
    <>
      <PageHeader eyebrow={t.hiw_eyebrow} title={t.hiw_title} subtitle={t.hiw_subtitle} />

      {/* Timeline */}
      <section className="relative overflow-hidden py-24">
        <div
          aria-hidden
          className="bg-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
        />
        <Container className="relative max-w-3xl">
          <div className="relative">
            <div
              aria-hidden
              className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-gold via-leaf/40 to-gold/0"
            />
            <Reveal as="ol" className="relative space-y-6">
              {workflow.map((w) => (
                <SpotlightCard
                  as="li"
                  key={w.n}
                  spot="rgba(233,198,90,0.16)"
                  className="group relative ml-0 rounded-3xl border border-black/5 bg-white py-5 pl-20 pr-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:translate-x-1.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <span
                    className={`absolute left-0 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br font-serif text-xl font-semibold italic text-white shadow-lg ring-4 ring-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${w.color}`}
                    style={{ left: "0.5rem" }}
                  >
                    {w.n}
                  </span>
                  <h3 className="font-display text-lg font-bold text-brand">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{w.text}</p>
                </SpotlightCard>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="grain relative overflow-hidden bg-brand py-24 text-cream">
        <Aurora />
        <Container className="relative z-[1] max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-gold/25">
              <ShieldCheck className="size-6 text-gold" />
            </span>
            <h2 className="text-3xl text-white sm:text-4xl">{t.hiw_rulesTitle}</h2>
          </div>
          <Reveal as="ul" className="mt-8 space-y-3">
            {principles.map((p) => (
              <SpotlightCard
                as="li"
                key={p}
                className="glass rounded-2xl px-5 py-4 text-sm text-cream/90 transition-all duration-500 hover:translate-x-1.5 hover:bg-white/15"
              >
                {p}
              </SpotlightCard>
            ))}
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <ButtonLink href="/register/farmer" variant="gold">
                {t.hiw_regProduce}
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink
                href="/buyers/post-requirement"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/10"
              >
                {t.fb_postReq}
              </ButtonLink>
            </Magnetic>
          </div>
        </Container>
      </section>
    </>
  );
}

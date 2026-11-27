"use client";

import { ShieldCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
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
  "bg-brand",
  "bg-brand-500",
  "bg-leaf",
  "bg-leaf-600",
  "bg-gold-600",
  "bg-terracotta",
  "bg-brand",
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
            {t.hiw_eyebrow}
          </p>
          <h1
            className="max-w-3xl animate-fade-up text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            {t.hiw_title}
          </h1>
          <p
            className="mt-4 max-w-2xl animate-fade-up text-lg text-cream/75"
            style={{ animationDelay: "120ms" }}
          >
            {t.hiw_subtitle}
          </p>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <Container className="max-w-3xl">
          <Reveal
            as="ol"
            className="relative space-y-6 border-l-2 border-leaf/25 pl-8"
          >
            {workflow.map((w, i) => (
              <li key={w.n} className="group relative">
                <span
                  className={`absolute -left-[41px] flex size-8 items-center justify-center rounded-full font-display text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${w.color}`}
                >
                  {w.n}
                </span>
                <div className="rounded-xl border border-transparent p-3 transition-all group-hover:border-black/5 group-hover:bg-cream/50">
                  <h3 className="font-display text-lg font-bold text-brand">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/70">{w.text}</p>
                </div>
                {i < workflow.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute -left-[33px] top-10 h-full w-0.5 bg-gradient-to-b from-leaf/20 to-transparent"
                  />
                )}
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Principles */}
      <section className="relative overflow-hidden bg-brand py-16 text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, var(--color-gold) 0%, transparent 50%)",
          }}
        />
        <Container className="relative max-w-3xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-7 text-gold" />
            <h2 className="text-2xl font-bold text-white">
              {t.hiw_rulesTitle}
            </h2>
          </div>
          <Reveal as="ul" className="mt-6 space-y-3">
            {principles.map((p) => (
              <li
                key={p}
                className="rounded-xl bg-white/10 px-5 py-4 text-sm text-cream/90 backdrop-blur-sm transition-all hover:bg-white/15"
              >
                {p}
              </li>
            ))}
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/register/farmer"
              variant="gold"
              className="shadow-lg shadow-gold/20"
            >
              {t.hiw_regProduce}
            </ButtonLink>
            <ButtonLink
              href="/buyers/post-requirement"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t.fb_postReq}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

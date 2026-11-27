"use client";

import Link from "next/link";
import {
  UserCheck,
  Search,
  BadgeCheck,
  Truck,
  Wallet,
  ArrowRight,
  Sprout,
  Building2,
  ShieldCheck,
  MapPin,
  Clock,
  Scale,
  TrendingUp,
  Globe,
  Layers,
  Fingerprint,
} from "lucide-react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { CATEGORIES } from "@/lib/commodities";
import { CountUp } from "@/components/count-up";
import { MandiTicker } from "@/components/mandi-ticker";
import { Aurora } from "@/components/aurora";
import { SplitText } from "@/components/split-text";
import { Tilt } from "@/components/tilt";
import { Magnetic } from "@/components/magnetic";
import { SpotlightCard } from "@/components/spotlight-card";
import { useSiteT } from "@/lib/use-t";
import type { SiteDict } from "@/lib/i18n";

const STEP_ICONS = [UserCheck, Search, BadgeCheck, Truck, Wallet];
const STEP_COLORS = [
  "bg-leaf/10 text-leaf",
  "bg-gold/15 text-gold-600",
  "bg-brand/10 text-brand",
  "bg-terracotta-100 text-terracotta",
  "bg-leaf/10 text-leaf",
];
const STEP_KEYS: [keyof SiteDict, keyof SiteDict][] = [
  ["step1", "step1t"],
  ["step2", "step2t"],
  ["step3", "step3t"],
  ["step4", "step4t"],
  ["step5", "step5t"],
];

const WHY_ICONS = [ShieldCheck, Scale, MapPin, Clock];
const WHY_ACCENTS = [
  "border-l-leaf",
  "border-l-gold",
  "border-l-terracotta",
  "border-l-brand",
];
const WHY_KEYS: [keyof SiteDict, keyof SiteDict][] = [
  ["why1", "why1t"],
  ["why2", "why2t"],
  ["why3", "why3t"],
  ["why4", "why4t"],
];

const STAT_KEYS: (keyof SiteDict)[] = [
  "stat_economy",
  "stat_exports",
  "stat_categories",
  "stat_traceability",
];
const STAT_NUMS = [
  { end: 25, prefix: "₹", suffix: "L Cr+", icon: TrendingUp },
  { end: 52, prefix: "$", suffix: "B+", icon: Globe },
  { end: 7, prefix: "", suffix: "", icon: Layers },
  { end: 100, prefix: "", suffix: "%", icon: Fingerprint },
];

const categoryTints = [
  "from-leaf/5 to-transparent border-leaf/20 hover:border-leaf/40",
  "from-gold/5 to-transparent border-gold/20 hover:border-gold/40",
  "from-brand/5 to-transparent border-brand/20 hover:border-brand/40",
  "from-terracotta-100 to-transparent border-terracotta/20 hover:border-terracotta/40",
  "from-spice-100 to-transparent border-spice/20 hover:border-spice/40",
  "from-leaf/5 to-transparent border-leaf/20 hover:border-leaf/40",
];

export function HomeContent() {
  const t = useSiteT();

  return (
    <>
      {/* ── Hero ── */}
      <section className="grain relative overflow-hidden bg-brand text-cream">
        <Aurora />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        />

        <Container className="relative z-[1] grid items-center gap-14 pb-32 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-40 lg:pt-24">
          <div>
            <span className="glass inline-flex animate-fade-up items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              <span className="live-dot size-1.5 rounded-full bg-gold" />
              {t.home_eyebrow}
            </span>
            <h1 className="mt-6 text-[2.7rem] leading-[1.04] text-white sm:text-6xl lg:text-[4.2rem]">
              <SplitText text={t.home_title} delay={0.15} />{" "}
              <span className="italic text-gold">
                <SplitText text={t.home_titleHighlight} delay={0.45} />
              </span>{" "}
              <SplitText text={t.home_titleEnd} delay={0.65} />
            </h1>
            <p
              className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-cream/75"
              style={{ animationDelay: "700ms" }}
            >
              {t.home_subtitle}
            </p>
            <div
              className="mt-9 flex animate-fade-up flex-wrap gap-3"
              style={{ animationDelay: "850ms" }}
            >
              <Magnetic>
                <ButtonLink href="/register/farmer" variant="gold" size="lg">
                  {t.home_ctaList} <ArrowRight className="size-4" />
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink
                  href="/buyers/post-requirement"
                  variant="outline"
                  size="lg"
                  className="glass border-white/25 text-white hover:bg-white/10"
                >
                  {t.home_ctaSource}
                </ButtonLink>
              </Magnetic>
            </div>
            <ul
              className="mt-9 flex animate-fade-up flex-wrap items-center gap-x-7 gap-y-2.5 text-sm text-cream/70"
              style={{ animationDelay: "1000ms" }}
            >
              <li className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-gold" /> {t.home_badgeFree}
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-gold" />{" "}
                {t.home_badgeQuality}
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-gold" />{" "}
                {t.home_badgeDemand}
              </li>
            </ul>
          </div>

          {/* Product mock */}
          <div className="relative lg:pl-6">
            <div
              aria-hidden
              className="absolute inset-x-8 -bottom-6 top-10 rounded-[2rem] bg-gold/20 blur-3xl"
            />
            <Tilt>
            <div
              className="animate-fade-up rounded-3xl bg-white text-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/40"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center justify-between border-b border-black/5 px-5 py-3.5">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
                  <span className="live-dot size-2 rounded-full bg-leaf" />{" "}
                  Live requirement
                </span>
                <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold-600">
                  Matching
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg font-bold text-brand">
                    Groundnut
                  </h3>
                  <span className="font-mono text-xs text-ink/40">
                    ATX-R-2026-4F2A
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/60">
                  100&nbsp;tonne · Bold 40/50 · deliver to Ahmedabad
                </p>

                <div className="mt-5 flex items-center justify-between text-xs text-ink/60">
                  <span>Sourced from verified farmers</span>
                  <span className="font-semibold text-brand">65%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/10">
                  <div
                    className="animate-grow-x relative h-full overflow-hidden rounded-full bg-gradient-to-r from-leaf to-leaf-400"
                    style={{ width: "65%", animationDelay: "1.1s" }}
                  >
                    <span className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  </div>
                </div>
                <p className="mt-1 text-[11px] text-ink/40">
                  35 tonne remaining
                </p>

                <div className="mt-5 space-y-2">
                  {[
                    {
                      id: "RP",
                      name: "R. Patel",
                      place: "Rajkot",
                      qty: "35 t",
                      tone: "confirmed",
                    },
                    {
                      id: "SB",
                      name: "S. Bhai",
                      place: "Ahmedabad",
                      qty: "25 t",
                      tone: "confirmed",
                    },
                    {
                      id: "KP",
                      name: "K. Patel",
                      place: "Junagadh",
                      qty: "5 t",
                      tone: "proposed",
                    },
                  ].map((r, ri) => (
                    <div
                      key={r.id}
                      style={{ animationDelay: `${1000 + ri * 140}ms` }}
                      className="animate-fade-up flex items-center justify-between rounded-xl border border-black/5 bg-cream/60 px-3 py-2 transition-all hover:translate-x-1 hover:bg-cream hover:shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-7 items-center justify-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
                          {r.id}
                        </span>
                        <div className="leading-tight">
                          <p className="text-sm font-medium text-ink">
                            {r.name}
                          </p>
                          <p className="flex items-center gap-1 text-[11px] text-ink/50">
                            <MapPin className="size-3" /> {r.place}
                          </p>
                        </div>
                      </div>
                      <div className="text-right leading-tight">
                        <p className="text-sm font-semibold text-ink">
                          {r.qty}
                        </p>
                        <span
                          className={
                            r.tone === "confirmed"
                              ? "text-[10px] font-semibold uppercase tracking-wide text-leaf-600"
                              : "text-[10px] font-semibold uppercase tracking-wide text-gold-600"
                          }
                        >
                          {r.tone}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </Tilt>
            <p className="mt-4 text-center text-xs text-cream/45">
              Illustrative sourcing view — concept-stage, not live operations.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Stats band ── */}
      <section className="relative z-10 -mt-20 pb-14">
        <Container>
          <Reveal>
            <div className="gborder rounded-3xl bg-white p-2 shadow-[0_30px_70px_-25px_rgba(18,62,45,0.4)]">
              <div className="grid grid-cols-2 divide-black/5 lg:grid-cols-4 lg:divide-x">
                {STAT_NUMS.map((s, i) => (
                  <div
                    key={STAT_KEYS[i]}
                    className="group rounded-2xl px-3 py-6 text-center transition-colors hover:bg-cream/60 sm:px-6 sm:py-8"
                  >
                    <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 to-gold/5 text-gold-600 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                      <s.icon className="size-6" />
                    </span>
                    <p className="text-gradient-brand font-display text-3xl font-extrabold tracking-tight sm:text-[2.6rem]">
                      <CountUp
                        end={s.end}
                        prefix={s.prefix}
                        suffix={s.suffix}
                      />
                    </p>
                    <p className="mt-1.5 text-sm text-ink/60">
                      {t[STAT_KEYS[i]]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Mandi price ticker ── */}
      <MandiTicker />

      {/* ── Two sides, one network ── */}
      <section className="relative overflow-hidden bg-cream py-20">
        <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        <Container className="relative">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="section-divider mx-auto mb-4" />
            <h2 className="text-3xl text-brand sm:text-4xl lg:text-[2.75rem]">
              {t.home_twoSidesTitle}
            </h2>
            <p className="mt-2 text-ink/70">{t.home_twoSidesSub}</p>
          </div>
          <Reveal className="grid gap-6 md:grid-cols-2">
            <SpotlightCard
              href="/for-farmers"
              spot="rgba(55,132,81,0.14)"
              className="group gborder block overflow-hidden rounded-3xl border border-leaf/15 bg-white p-9 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-leaf/5 transition-transform duration-500 group-hover:scale-150"
              />
              <span className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-leaf/20 to-leaf/5 text-leaf ring-1 ring-leaf/15 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <Sprout className="size-7" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-brand">
                {t.home_farmerCard}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {t.home_farmerCardText}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-leaf transition-all group-hover:gap-2.5">
                {t.home_farmerCardCta}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </SpotlightCard>
            <SpotlightCard
              href="/for-buyers"
              spot="rgba(233,198,90,0.2)"
              className="group gborder block overflow-hidden rounded-3xl border border-brand/15 bg-white p-9 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-brand/5 transition-transform duration-500 group-hover:scale-150"
              />
              <span className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 text-brand ring-1 ring-brand/15 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Building2 className="size-7" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-brand">
                {t.home_buyerCard}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {t.home_buyerCardText}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-all group-hover:gap-2.5">
                {t.home_buyerCardCta}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </SpotlightCard>
          </Reveal>
        </Container>
      </section>

      {/* ── How it works ── */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="ornament text-xs font-bold uppercase tracking-[0.2em] text-leaf">
              {t.hiw_eyebrow}
            </p>
            <h2 className="mt-3 text-3xl text-brand sm:text-4xl lg:text-[2.75rem]">
              {t.home_howTitle}
            </h2>
            <p className="mt-3 text-ink/70">{t.home_howSub}</p>
          </div>
          <div className="relative mt-14">
            <div
              aria-hidden
              className="absolute left-[10%] right-[10%] top-[3.4rem] hidden h-px bg-gradient-to-r from-transparent via-gold to-transparent lg:block"
            />
          <Reveal
            as="ol"
            className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {STEP_KEYS.map(([titleK, textK], i) => {
              const Icon = STEP_ICONS[i];
              return (
                <SpotlightCard
                  as="li"
                  key={titleK}
                  spot="rgba(55,132,81,0.12)"
                  className="group overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="absolute right-4 top-3 font-serif text-5xl font-semibold italic text-cream-dark transition-colors duration-500 group-hover:text-gold/50">
                    0{i + 1}
                  </span>
                  <span
                    className={`flex size-14 items-center justify-center rounded-2xl ring-4 ring-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${STEP_COLORS[i]}`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-brand">
                    {t[titleK]}
                  </h3>
                  <p className="mt-2 text-sm text-ink/70">{t[textK]}</p>
                </SpotlightCard>
              );
            })}
          </Reveal>
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/how-it-works" variant="ghost">
              {t.home_howCta} <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ── Why section ── */}
      <section className="grain relative overflow-hidden bg-brand py-24 text-cream">
        <Aurora />
        <Container className="relative z-[1]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <div className="mb-4 h-[3px] w-12 rounded bg-gold" />
              <h2 className="text-3xl text-white sm:text-4xl lg:text-[2.75rem]">
                {t.home_whyTitle}
              </h2>
              <p className="mt-4 text-cream/75">{t.home_whySub}</p>
              <div className="mt-6">
                <ButtonLink
                  href="/about"
                  variant="gold"
                  className="shadow-lg shadow-gold/20"
                >
                  {t.home_whyCta}
                </ButtonLink>
              </div>
            </div>
            <Reveal className="grid gap-4 sm:grid-cols-2">
              {WHY_KEYS.map(([titleK, textK], i) => {
                const Icon = WHY_ICONS[i];
                return (
                  <SpotlightCard
                    key={titleK}
                    className={`glass group rounded-3xl border-l-4 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/15 ${WHY_ACCENTS[i]}`}
                  >
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-gold/25 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold/25"><Icon className="size-6 text-gold" /></span>
                    <h3 className="mt-4 font-display text-lg font-bold text-white">
                      {t[titleK]}
                    </h3>
                    <p className="mt-1.5 text-sm text-cream/70">{t[textK]}</p>
                  </SpotlightCard>
                );
              })}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Commodities ── */}
      <section className="py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="ornament text-xs font-bold uppercase tracking-[0.2em] text-leaf">
                {t.comm_eyebrow}
              </p>
              <h2 className="mt-3 text-3xl text-brand sm:text-4xl lg:text-[2.75rem]">
                {t.home_commTitle}
              </h2>
            </div>
            <ButtonLink href="/commodities" variant="ghost">
              {t.home_commCta} <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <SpotlightCard
                key={c.key}
                href="/commodities"
                className={`group block overflow-hidden rounded-3xl border bg-gradient-to-br p-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-lift)] ${categoryTints[i % categoryTints.length]}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-sm ring-1 ring-black/5 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                    {c.emoji}
                  </span>
                  <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-medium text-ink/50">
                    {c.gujarati}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-brand">
                  {c.label}
                </h3>
                <p className="mt-1.5 text-sm text-ink/70">{c.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs font-medium text-ink/50">
                    {c.crops.length} {t.comm_commodities}
                  </p>
                  <ArrowRight className="size-4 text-ink/30 transition-all group-hover:translate-x-1 group-hover:text-ink/60" />
                </div>
              </SpotlightCard>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ── Browse requirements banner ── */}
      <section className="py-6">
        <Container>
          <Reveal>
            <Link
              href="/requirements"
              className="group gborder flex items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-leaf/10 via-white to-gold/10 px-7 py-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div>
                <p className="font-display text-lg font-bold text-brand sm:text-xl">
                  <span className="live-dot mr-2.5 inline-block size-2 rounded-full bg-leaf align-middle" />
                  {t.req_browseReqs}
                </p>
                <p className="mt-0.5 text-sm text-ink/60">
                  {t.req_subtitle}
                </p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-leaf text-white transition-all duration-500 group-hover:translate-x-1 group-hover:bg-brand"><ArrowRight className="size-5" /></span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="pb-10 pt-6">
        <Container>
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[2rem] bg-brand px-8 py-20 text-center text-cream shadow-[0_40px_80px_-30px_rgba(18,62,45,0.7)]">
            <Aurora />
            <div className="relative z-[1]">
              <div className="section-divider mx-auto mb-6" />
              <h2 className="mx-auto max-w-3xl text-3xl text-white sm:text-4xl lg:text-5xl">
                {t.home_ctaBandTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-cream/80">
                {t.home_ctaBandSub}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <ButtonLink href="/register/farmer" variant="gold" size="lg">
                    {t.home_ctaFarmer}
                  </ButtonLink>
                </Magnetic>
                <Magnetic>
                  <ButtonLink
                    href="/register/buyer"
                    variant="outline"
                    size="lg"
                    className="glass border-white/30 text-white hover:bg-white/10"
                  >
                    {t.home_ctaBuyer}
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

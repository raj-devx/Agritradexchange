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
      <section className="relative overflow-hidden bg-brand text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage:
              "radial-gradient(120% 80% at 70% 0%, #000 40%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-leaf/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-gold/8 blur-3xl"
        />

        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <span className="inline-flex animate-fade-up items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              <span className="h-px w-6 bg-gold/60" /> {t.home_eyebrow}
            </span>
            <h1
              className="mt-5 animate-fade-up text-[2.6rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.4rem]"
              style={{ animationDelay: "70ms" }}
            >
              {t.home_title}{" "}
              <span className="text-gold">{t.home_titleHighlight}</span>{" "}
              {t.home_titleEnd}
            </h1>
            <p
              className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-cream/75"
              style={{ animationDelay: "140ms" }}
            >
              {t.home_subtitle}
            </p>
            <div
              className="mt-8 flex animate-fade-up flex-wrap gap-3"
              style={{ animationDelay: "210ms" }}
            >
              <ButtonLink href="/register/farmer" variant="gold" size="lg">
                {t.home_ctaList} <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="/buyers/post-requirement"
                variant="outline"
                size="lg"
                className="border-white/25 text-white hover:bg-white/10"
              >
                {t.home_ctaSource}
              </ButtonLink>
            </div>
            <ul
              className="mt-9 flex animate-fade-up flex-wrap items-center gap-x-7 gap-y-2.5 text-sm text-cream/70"
              style={{ animationDelay: "280ms" }}
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
              className="animate-fade-up rounded-2xl bg-white text-ink shadow-2xl shadow-black/30 ring-1 ring-black/5"
              style={{ animationDelay: "180ms" }}
            >
              <div className="flex items-center justify-between border-b border-black/5 px-5 py-3.5">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
                  <span className="size-2 animate-pulse rounded-full bg-leaf" />{" "}
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
                    className="h-full animate-grow-x rounded-full bg-gradient-to-r from-leaf to-leaf-400"
                    style={{ width: "65%" }}
                  />
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
                  ].map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between rounded-lg border border-black/5 bg-cream/60 px-3 py-2 transition-colors hover:bg-cream"
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
            <p className="mt-3 text-center text-xs text-cream/45">
              Illustrative sourcing view — concept-stage, not live operations.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Stats band ── */}
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-br from-brand via-brand to-brand-600 py-12 text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, var(--color-leaf) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--color-gold) 0%, transparent 50%)",
          }}
        />
        <Container className="relative">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STAT_NUMS.map((s, i) => (
              <div key={STAT_KEYS[i]} className="text-center">
                <s.icon className="mx-auto mb-3 size-6 text-gold" />
                <p className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  <CountUp
                    end={s.end}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </p>
                <p className="mt-1 text-sm text-cream/70">
                  {t[STAT_KEYS[i]]}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Two sides, one network ── */}
      <section className="bg-cream py-16">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="section-divider mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-brand">
              {t.home_twoSidesTitle}
            </h2>
            <p className="mt-2 text-ink/70">{t.home_twoSidesSub}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href="/for-farmers"
              className="group relative overflow-hidden rounded-2xl border border-leaf/20 bg-white p-8 shadow-sm transition-all hover:border-leaf/40 hover:shadow-lg"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-leaf/5 transition-transform duration-500 group-hover:scale-150"
              />
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-leaf/10 text-leaf transition-transform duration-300 group-hover:scale-110">
                <Sprout className="size-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-brand">
                {t.home_farmerCard}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {t.home_farmerCardText}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-leaf transition-all group-hover:gap-2.5">
                {t.home_farmerCardCta}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/for-buyers"
              className="group relative overflow-hidden rounded-2xl border border-brand/15 bg-white p-8 shadow-sm transition-all hover:border-brand/30 hover:shadow-lg"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-brand/5 transition-transform duration-500 group-hover:scale-150"
              />
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                <Building2 className="size-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-brand">
                {t.home_buyerCard}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {t.home_buyerCardText}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-all group-hover:gap-2.5">
                {t.home_buyerCardCta}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── How it works ── */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-leaf">
              {t.hiw_eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-brand">
              {t.home_howTitle}
            </h2>
            <p className="mt-3 text-ink/70">{t.home_howSub}</p>
          </div>
          <Reveal
            as="ol"
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {STEP_KEYS.map(([titleK, textK], i) => {
              const Icon = STEP_ICONS[i];
              return (
                <li
                  key={titleK}
                  className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <span className="absolute right-4 top-4 font-display text-3xl font-extrabold text-cream-dark">
                    0{i + 1}
                  </span>
                  <span
                    className={`flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${STEP_COLORS[i]}`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-brand">
                    {t[titleK]}
                  </h3>
                  <p className="mt-2 text-sm text-ink/70">{t[textK]}</p>
                  {i < STEP_KEYS.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute -bottom-3 -right-3 size-16 rounded-full bg-cream/80 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  )}
                </li>
              );
            })}
          </Reveal>
          <div className="mt-10 text-center">
            <ButtonLink href="/how-it-works" variant="ghost">
              {t.home_howCta} <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ── Why section ── */}
      <section className="relative overflow-hidden bg-brand py-20 text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, var(--color-gold) 0%, transparent 60%)",
          }}
        />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <div className="mb-4 h-[3px] w-12 rounded bg-gold" />
              <h2 className="text-3xl font-bold text-white">
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
                  <div
                    key={titleK}
                    className={`group rounded-2xl border-l-4 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/15 ${WHY_ACCENTS[i]}`}
                  >
                    <Icon className="size-7 text-gold transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="mt-3 font-display font-bold text-white">
                      {t[titleK]}
                    </h3>
                    <p className="mt-1.5 text-sm text-cream/70">{t[textK]}</p>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Commodities ── */}
      <section className="py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-leaf">
                {t.comm_eyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-brand">
                {t.home_commTitle}
              </h2>
            </div>
            <ButtonLink href="/commodities" variant="ghost">
              {t.home_commCta} <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Link
                key={c.key}
                href="/commodities"
                className={`group overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all hover:shadow-lg ${categoryTints[i % categoryTints.length]}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-125">
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
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="pb-6">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand to-brand-600 px-8 py-14 text-center text-cream">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-leaf/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -right-16 size-64 rounded-full bg-gold/10 blur-3xl"
            />
            <div className="relative">
              <div className="section-divider mx-auto mb-6" />
              <h2 className="mx-auto max-w-2xl text-3xl font-bold">
                {t.home_ctaBandTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-cream/80">
                {t.home_ctaBandSub}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink
                  href="/register/farmer"
                  variant="gold"
                  size="lg"
                  className="shadow-lg shadow-gold/20"
                >
                  {t.home_ctaFarmer}
                </ButtonLink>
                <ButtonLink
                  href="/register/buyer"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {t.home_ctaBuyer}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

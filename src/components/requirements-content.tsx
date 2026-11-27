"use client";

import { ArrowRight, Package, MapPin, Clock, FlaskConical, Layers } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Aurora } from "@/components/aurora";
import { SpotlightCard } from "@/components/spotlight-card";
import { ButtonLink } from "@/components/ui/button";
import { useSiteT } from "@/lib/use-t";

type Req = {
  id: string;
  commodity: string;
  requiredQuantity: number;
  unit: string;
  grade: string;
  deliveryLocation: string;
  packaging: string;
  status: string;
  sampleRequired: boolean;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  Submitted: "bg-blue-50 text-blue-700",
  "Under review": "bg-purple-50 text-purple-700",
  "Matching supply": "bg-amber-50 text-amber-700",
  "Quotation shared": "bg-gold/15 text-gold-600",
  "Order confirmed": "bg-green-50 text-green-700",
};

function relativeTime(dateStr: string, t: { req_today: string; req_yesterday: string; req_daysAgo: string }) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (diff === 0) return t.req_today;
  if (diff === 1) return t.req_yesterday;
  return `${diff} ${t.req_daysAgo}`;
}

function cityOnly(location: string): string {
  return location.split(",")[0].trim();
}

export function RequirementsContent({ requirements }: { requirements: Req[] }) {
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
            {t.req_eyebrow}
          </p>
          <h1
            className="max-w-3xl animate-fade-up text-4xl text-white sm:text-5xl md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {t.req_title}
          </h1>
          <p
            className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-cream/75"
            style={{ animationDelay: "160ms" }}
          >
            {t.req_subtitle}
          </p>
          <div className="mt-7 animate-fade-up" style={{ animationDelay: "240ms" }}>
            <span className="text-sm text-cream/60">{t.req_buyerCta}</span>{" "}
            <a
              href="/buyers/post-requirement"
              className="link-underline inline-flex items-center gap-1 pb-0.5 text-sm font-semibold text-gold"
            >
              {t.req_postReq} <ArrowRight className="size-3.5" />
            </a>
          </div>
        </Container>
      </section>

      {/* Requirement cards */}
      <section className="py-20">
        <Container>
          {requirements.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-black/15 bg-gradient-to-br from-cream to-white p-14 text-center">
              <Package className="mx-auto size-12 text-brand/30" />
              <h2 className="mt-4 font-display text-xl font-bold text-ink/70">{t.req_noReqs}</h2>
              <p className="mt-2 text-sm text-ink/50">{t.req_noReqsSub}</p>
            </div>
          ) : (
            <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {requirements.map((r) => (
                <SpotlightCard
                  key={r.id}
                  spot="rgba(55,132,81,0.12)"
                  className="group gborder rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-xl font-bold text-brand">
                      {r.commodity}
                    </h3>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-700"}`}
                    >
                      <span className="live-dot size-1.5 rounded-full bg-current" />
                      {r.status}
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm text-ink/70">
                    <span className="font-medium text-ink">
                      {r.requiredQuantity} {r.unit}
                    </span>{" "}
                    · {r.grade}
                  </p>

                  <div className="mt-4 space-y-2 text-xs text-ink/60">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-ink/40" />
                      {t.req_deliverTo}: {cityOnly(r.deliveryLocation)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="size-3.5 text-ink/40" />
                      {t.req_packaging}: {r.packaging}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-ink/40" />
                      {relativeTime(r.createdAt, t)}
                    </div>
                  </div>

                  {r.sampleRequired && (
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold-600">
                        <FlaskConical className="size-3" />
                        {t.req_sampleNeeded}
                      </span>
                    </div>
                  )}
                </SpotlightCard>
              ))}
            </Reveal>
          )}
        </Container>
      </section>

      {/* CTA for farmers */}
      <section className="pb-16">
        <Container>
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-brand-500 to-leaf p-10 text-center text-white shadow-[0_40px_80px_-30px_rgba(18,62,45,0.6)] sm:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl"
              />
              <div className="relative z-[1]">
                <h2 className="text-2xl text-white sm:text-4xl">{t.req_farmerCtaTitle}</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm text-white/80">
                  {t.req_farmerCtaSub}
                </p>
                <div className="mt-6">
                  <ButtonLink
                    href="/register/farmer"
                    variant="gold"
                    className="shadow-lg shadow-gold/20"
                  >
                    {t.req_farmerCtaBtn} <ArrowRight className="size-4" />
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

"use client";

import { ArrowRight, Package, MapPin, Clock, FlaskConical, Layers } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
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
            {t.req_eyebrow}
          </p>
          <h1
            className="max-w-3xl animate-fade-up text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            {t.req_title}
          </h1>
          <p
            className="mt-4 max-w-2xl animate-fade-up text-lg text-cream/75"
            style={{ animationDelay: "120ms" }}
          >
            {t.req_subtitle}
          </p>
          <div className="mt-6 animate-fade-up" style={{ animationDelay: "180ms" }}>
            <span className="text-sm text-cream/60">{t.req_buyerCta}</span>{" "}
            <a
              href="/buyers/post-requirement"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline"
            >
              {t.req_postReq} <ArrowRight className="size-3.5" />
            </a>
          </div>
        </Container>
      </section>

      {/* Requirement cards */}
      <section className="py-16">
        <Container>
          {requirements.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/15 bg-cream/50 p-14 text-center">
              <Package className="mx-auto size-12 text-brand/30" />
              <h2 className="mt-4 font-display text-xl font-bold text-ink/70">{t.req_noReqs}</h2>
              <p className="mt-2 text-sm text-ink/50">{t.req_noReqsSub}</p>
            </div>
          ) : (
            <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {requirements.map((r) => (
                <div
                  key={r.id}
                  className="group rounded-xl border border-black/10 bg-white p-5 shadow-sm transition-all hover:border-brand/20 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-brand">
                      {r.commodity}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-700"}`}
                    >
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
                </div>
              ))}
            </Reveal>
          )}
        </Container>
      </section>

      {/* CTA for farmers */}
      <section className="pb-16">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-leaf via-leaf to-leaf-400 p-8 text-center text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl"
              />
              <div className="relative">
                <h2 className="text-xl font-bold">{t.req_farmerCtaTitle}</h2>
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

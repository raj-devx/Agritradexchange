"use client";

import Link from "next/link";
import {
  Boxes,
  ClipboardList,
  FlaskConical,
  Layers,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Aurora } from "@/components/aurora";
import { Magnetic } from "@/components/magnetic";
import { SpotlightCard } from "@/components/spotlight-card";
import { BuyerRegistrationForm } from "@/components/forms/buyer-registration-form";
import { useSiteT } from "@/lib/use-t";

export function ForBuyersContent() {
  const t = useSiteT();

  const benefits = [
    {
      icon: Boxes,
      title: t.fb_b1,
      text: t.fb_b1t,
      accent: "bg-leaf/10 text-leaf ring-leaf/20",
    },
    {
      icon: ClipboardList,
      title: t.fb_b2,
      text: t.fb_b2t,
      accent: "bg-gold/15 text-gold-600 ring-gold/25",
    },
    {
      icon: Layers,
      title: t.fb_b3,
      text: t.fb_b3t,
      accent: "bg-brand/10 text-brand ring-brand/20",
    },
    {
      icon: FlaskConical,
      title: t.fb_b4,
      text: t.fb_b4t,
      accent: "bg-terracotta-100 text-terracotta ring-terracotta/20",
    },
    {
      icon: Truck,
      title: t.fb_b5,
      text: t.fb_b5t,
      accent: "bg-spice-100 text-spice ring-spice/20",
    },
  ];

  const audience = [
    t.fb_aud1,
    t.fb_aud2,
    t.fb_aud3,
    t.fb_aud4,
    t.fb_aud5,
    t.fb_aud6,
    t.fb_aud7,
    t.fb_aud8,
  ];

  return (
    <>
      <PageHeader eyebrow={t.fb_eyebrow} title={t.fb_title} subtitle={t.fb_subtitle} />

      {/* Benefits */}
      <section className="relative overflow-hidden py-20">
        <div
          aria-hidden
          className="bg-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
        />
        <Container className="relative">
          <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <SpotlightCard
                key={b.title}
                spot="rgba(233,198,90,0.18)"
                className="group rounded-3xl border border-black/5 bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]"
              >
                <span
                  className={`flex size-14 items-center justify-center rounded-2xl ring-1 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 ${b.accent}`}
                >
                  <b.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-brand">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{b.text}</p>
              </SpotlightCard>
            ))}
            <div className="grain relative overflow-hidden rounded-3xl bg-brand p-7 text-cream shadow-[var(--shadow-lift)] transition-transform duration-500 hover:-translate-y-2">
              <Aurora grid={false} />
              <div className="relative z-[1]">
                <p className="font-display text-xl font-bold">
                  <span className="live-dot mr-2.5 inline-block size-2 rounded-full bg-gold align-middle" />
                  {t.fb_liveReq}
                </p>
                <p className="mt-2 text-sm text-cream/80">{t.fb_liveReqSub}</p>
                <div className="mt-5">
                  <Magnetic>
                    <ButtonLink href="/buyers/post-requirement" variant="gold">
                      {t.fb_postReq} <ArrowRight className="size-4" />
                    </ButtonLink>
                  </Magnetic>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Audience */}
      <section className="relative overflow-hidden bg-cream py-20">
        <Container className="relative">
          <div className="section-divider mb-4" />
          <h2 className="text-2xl text-brand sm:text-3xl">{t.fb_whoTitle}</h2>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            {audience.map((a) => (
              <span
                key={a}
                className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm text-ink/75 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-leaf/40 hover:bg-leaf/5 hover:text-brand hover:shadow-md"
              >
                {a}
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Registration */}
      <section id="register" className="py-24">
        <Container className="max-w-3xl">
          <div className="text-center">
            <div className="section-divider mx-auto mb-4" />
            <h2 className="text-3xl text-brand sm:text-4xl">{t.fb_regTitle}</h2>
            <p className="mt-3 text-ink/70">
              {t.fb_regSub} {t.fb_alreadyReg}{" "}
              <Link
                href="/buyers/post-requirement"
                className="link-underline font-semibold text-leaf"
              >
                {t.fb_postReq}
              </Link>
              .
            </p>
          </div>
          <Reveal className="mt-10">
            <div className="gborder rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10">
              <BuyerRegistrationForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

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
import { BuyerRegistrationForm } from "@/components/forms/buyer-registration-form";
import { useSiteT } from "@/lib/use-t";

export function ForBuyersContent() {
  const t = useSiteT();

  const benefits = [
    {
      icon: Boxes,
      title: t.fb_b1,
      text: t.fb_b1t,
      accent: "bg-leaf/10 text-leaf border-leaf/20",
    },
    {
      icon: ClipboardList,
      title: t.fb_b2,
      text: t.fb_b2t,
      accent: "bg-gold/15 text-gold-600 border-gold/20",
    },
    {
      icon: Layers,
      title: t.fb_b3,
      text: t.fb_b3t,
      accent: "bg-brand/10 text-brand border-brand/20",
    },
    {
      icon: FlaskConical,
      title: t.fb_b4,
      text: t.fb_b4t,
      accent: "bg-terracotta-100 text-terracotta border-terracotta/20",
    },
    {
      icon: Truck,
      title: t.fb_b5,
      text: t.fb_b5t,
      accent: "bg-spice-100 text-spice border-spice/20",
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
            {t.fb_eyebrow}
          </p>
          <h1
            className="max-w-3xl animate-fade-up text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            {t.fb_title}
          </h1>
          <p
            className="mt-4 max-w-2xl animate-fade-up text-lg text-cream/75"
            style={{ animationDelay: "120ms" }}
          >
            {t.fb_subtitle}
          </p>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <Container>
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${b.accent}`}
                >
                  <b.icon className="size-6" />
                </span>
                <h3 className="mt-4 font-display font-bold text-brand">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink/70">{b.text}</p>
              </div>
            ))}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand to-brand-600 p-6 text-cream">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gold/10 blur-2xl"
              />
              <div className="relative">
                <p className="font-display text-lg font-bold">
                  {t.fb_liveReq}
                </p>
                <p className="mt-1 text-sm text-cream/80">
                  {t.fb_liveReqSub}
                </p>
                <div className="mt-4">
                  <ButtonLink
                    href="/buyers/post-requirement"
                    variant="gold"
                    className="shadow-lg shadow-gold/20"
                  >
                    {t.fb_postReq} <ArrowRight className="size-4" />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Audience */}
      <section className="bg-cream py-14">
        <Container>
          <div className="section-divider mb-4" />
          <h2 className="text-xl font-bold text-brand">{t.fb_whoTitle}</h2>
          <Reveal className="mt-5 flex flex-wrap gap-2">
            {audience.map((a) => (
              <span
                key={a}
                className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm text-ink/75 transition-all hover:border-leaf/30 hover:bg-leaf/5 hover:text-brand"
              >
                {a}
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Registration */}
      <section id="register" className="py-16">
        <Container className="max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand">{t.fb_regTitle}</h2>
            <p className="mt-2 text-ink/70">
              {t.fb_regSub} {t.fb_alreadyReg}{" "}
              <Link
                href="/buyers/post-requirement"
                className="font-semibold text-leaf hover:underline"
              >
                {t.fb_postReq}
              </Link>
              .
            </p>
          </div>
          <Reveal className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <BuyerRegistrationForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

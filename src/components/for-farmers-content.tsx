"use client";

import { Check, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
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
      {/* Comparison */}
      <section className="py-16">
        <Container>
          <Reveal className="grid gap-6 lg:grid-cols-2">
            <div className="group rounded-2xl border border-black/10 bg-white p-7 transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <X className="size-5" />
                </span>
                <h2 className="font-display text-xl font-bold text-ink">
                  {t.ff_tradHeading}
                </h2>
              </div>
              <ul className="mt-5 space-y-3">
                {t.ff_trad.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg px-3 py-2 text-sm text-ink/70 transition-colors hover:bg-red-50/50"
                  >
                    <X className="mt-0.5 size-4 shrink-0 text-red-400" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="group rounded-2xl border-2 border-leaf/30 bg-gradient-to-br from-cream to-white p-7 shadow-sm transition-shadow hover:shadow-lg">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-leaf/10 text-leaf">
                  <Check className="size-5" />
                </span>
                <h2 className="font-display text-xl font-bold text-brand">
                  {t.ff_withHeading}
                </h2>
              </div>
              <ul className="mt-5 space-y-3">
                {t.ff_with.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg px-3 py-2 text-sm text-ink/80 transition-colors hover:bg-leaf/5"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-leaf" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Pipeline */}
      <section className="relative overflow-hidden bg-brand py-16 text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, var(--color-gold) 0%, transparent 60%)",
          }}
        />
        <Container className="relative">
          <div className="mb-4 h-[3px] w-12 rounded bg-gold" />
          <h2 className="text-2xl font-bold text-white">
            {t.ff_pipeHeading}
          </h2>
          <p className="mt-2 max-w-2xl text-cream/70">{t.ff_pipeSub}</p>
          <Reveal
            as="ol"
            className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {t.pipeline.map((status, i) => (
              <li
                key={status}
                className="group rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15"
              >
                <span
                  className={`inline-flex size-8 items-center justify-center rounded-lg text-sm font-bold transition-transform duration-300 group-hover:scale-110 ${pipelineColors[i]}`}
                >
                  {i + 1}
                </span>
                <p className="mt-2 text-sm font-medium text-white">{status}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Registration form */}
      <section id="register" className="py-16">
        <Container className="max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand">
              {t.ff_registerHeading}
            </h2>
            <p className="mt-2 text-ink/70">{t.ff_registerSub}</p>
          </div>
          <Reveal className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <FarmerRegistrationForm />
          </Reveal>
          <div className="mt-6 text-center">
            <ButtonLink href="/how-it-works" variant="ghost">
              See the full process <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

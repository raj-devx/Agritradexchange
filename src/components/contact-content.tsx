"use client";

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/container";
import { Aurora } from "@/components/aurora";
import { SpotlightCard } from "@/components/spotlight-card";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { BRAND } from "@/lib/brand";
import { useSiteT } from "@/lib/use-t";

export function ContactContent() {
  const t = useSiteT();

  const details = [
    { icon: Mail, label: t.contact_emailLabel, value: BRAND.email, color: "bg-leaf/10 text-leaf" },
    { icon: Phone, label: t.contact_phoneLabel, value: BRAND.phone, color: "bg-brand/10 text-brand" },
    { icon: MessageCircle, label: t.contact_waLabel, value: BRAND.whatsapp, color: "bg-gold/15 text-gold-600" },
    { icon: MapPin, label: t.contact_locationLabel, value: BRAND.location, color: "bg-terracotta-100 text-terracotta" },
  ];

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
            {t.contact_eyebrow}
          </p>
          <h1
            className="max-w-3xl animate-fade-up text-4xl text-white sm:text-5xl md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {t.contact_title}
          </h1>
          <p
            className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-cream/75"
            style={{ animationDelay: "160ms" }}
          >
            {t.contact_subtitle}
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-4">
            {details.map((d) => (
              <SpotlightCard
                key={d.label}
                spot="rgba(233,198,90,0.18)"
                className="group gborder flex items-start gap-4 rounded-3xl border border-black/5 bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-black/5 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 ${d.color}`}
                >
                  <d.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                    {d.label}
                  </p>
                  <p className="mt-0.5 font-medium text-ink">{d.value}</p>
                </div>
              </SpotlightCard>
            ))}
            <p className="px-1 text-xs text-ink/50">
              {t.contact_helpline}
            </p>
          </Reveal>

          <Reveal className="gborder rounded-3xl bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10">
            <h2 className="text-2xl text-brand sm:text-3xl">
              {t.contact_sendMsg}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

"use client";

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/container";
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
            {t.contact_eyebrow}
          </p>
          <h1
            className="max-w-3xl animate-fade-up text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            {t.contact_title}
          </h1>
          <p
            className="mt-4 max-w-2xl animate-fade-up text-lg text-cream/75"
            style={{ animationDelay: "120ms" }}
          >
            {t.contact_subtitle}
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-4">
            {details.map((d) => (
              <div
                key={d.label}
                className="group flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${d.color}`}
                >
                  <d.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                    {d.label}
                  </p>
                  <p className="mt-0.5 font-medium text-ink">{d.value}</p>
                </div>
              </div>
            ))}
            <p className="px-1 text-xs text-ink/50">
              {t.contact_helpline}
            </p>
          </Reveal>

          <Reveal className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-bold text-brand">
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

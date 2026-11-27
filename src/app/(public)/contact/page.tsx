import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the AgriTradeXchange team — farmers, buyers and partners welcome.",
};

const details = [
  { icon: Mail, label: "Email", value: BRAND.email, color: "bg-leaf/10 text-leaf" },
  { icon: Phone, label: "Phone", value: BRAND.phone, color: "bg-brand/10 text-brand" },
  { icon: MessageCircle, label: "WhatsApp", value: BRAND.whatsapp, color: "bg-gold/15 text-gold-600" },
  { icon: MapPin, label: "Location", value: BRAND.location, color: "bg-terracotta-100 text-terracotta" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Talk to our team"
        subtitle="Whether you're a farmer, a buyer or a potential partner, we'd like to hear from you."
      />

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
              A dedicated farmer helpline and WhatsApp support are planned as
              the network goes live.
            </p>
          </Reveal>

          <Reveal className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-bold text-brand">
              Send us a message
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

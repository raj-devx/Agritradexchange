"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/brand";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { useSiteT } from "@/lib/use-t";

const COPYRIGHT_YEAR = 2026;

const NAV_KEYS = ["nav_home","nav_forFarmers","nav_forBuyers","nav_commodities","nav_howItWorks","nav_about","nav_contact"] as const;

export function SiteFooter() {
  const t = useSiteT();
  const farmerLinks = [
    { href: "/for-farmers", label: t.footer_whySell },
    { href: "/register/farmer", label: t.footer_regProduce },
    { href: "/how-it-works", label: t.footer_howItWorks },
  ];
  const buyerLinks = [
    { href: "/for-buyers", label: t.footer_sourceCommodities },
    { href: "/register/buyer", label: t.footer_regBuyer },
    { href: "/buyers/post-requirement", label: t.footer_postReq },
  ];
  const year = COPYRIGHT_YEAR;
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-brand text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, var(--color-leaf) 0%, transparent 50%), radial-gradient(circle at 90% 20%, var(--color-gold) 0%, transparent 50%)",
        }}
      />

      <Container className="relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            {t.footer_desc}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
            {t.footer_forFarmers}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {farmerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
            {t.footer_forBuyers}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {buyerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
            {t.footer_contact}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-gold" /> {BRAND.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-gold" /> {BRAND.phone}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-gold" /> {BRAND.location}
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/60 sm:flex-row">
          <p>
            © {year} {BRAND.name}. {t.footer_copyright}
          </p>
          <nav className="flex flex-wrap gap-4">
            {NAV_LINKS.slice(1).map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-white"
              >
                {t[NAV_KEYS[i + 1]]}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}

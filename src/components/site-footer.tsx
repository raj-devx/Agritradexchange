"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/brand";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { Aurora } from "@/components/aurora";
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
    <footer className="grain relative mt-20 overflow-hidden bg-brand text-cream">
      <Aurora grid={false} className="opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <Container className="relative z-[1] grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            {t.footer_desc}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
            {t.footer_forFarmers}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {farmerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-1 transition-all hover:translate-x-1 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
            {t.footer_forBuyers}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {buyerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-1 transition-all hover:translate-x-1 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
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

      <div className="relative z-[1] border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/60 sm:flex-row">
          <p>
            © {year} {BRAND.name}. {t.footer_copyright}
          </p>
          <nav className="flex flex-wrap gap-4">
            {NAV_LINKS.slice(1).map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-underline pb-0.5 transition-colors hover:text-white"
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

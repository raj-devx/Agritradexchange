import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/brand";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";

const farmerLinks = [
  { href: "/for-farmers", label: "Why sell with us" },
  { href: "/register/farmer", label: "Register your produce" },
  { href: "/how-it-works", label: "How it works" },
];

const buyerLinks = [
  { href: "/for-buyers", label: "Source commodities" },
  { href: "/register/buyer", label: "Register as a buyer" },
  { href: "/buyers/post-requirement", label: "Post a requirement" },
];

const COPYRIGHT_YEAR = 2026;

export function SiteFooter() {
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
            A farmer-first agricultural procurement and trade network connecting
            producers with domestic buyers and global importers.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
            For Farmers
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
            For Buyers
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
            Contact
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
            © {year} {BRAND.name}. Concept-stage platform — information shown
            is illustrative and not an offer to buy or sell.
          </p>
          <nav className="flex flex-wrap gap-4">
            {NAV_LINKS.slice(1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}

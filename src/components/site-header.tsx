"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/brand";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-50">
      {/* Utility strip */}
      <div className="hidden bg-brand text-cream md:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <p className="text-cream/70">
            Connecting Indian farms with domestic &amp; global buyers —{" "}
            <span className="text-cream/90">quality-based, transparent trade.</span>
          </p>
          <div className="flex items-center gap-5 text-cream/80">
            <a
              href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="size-3.5 text-gold" /> {BRAND.phone}
            </a>
            <span className="hidden text-cream/30 lg:inline">|</span>
            <a
              href={`mailto:${BRAND.email}`}
              className="hidden transition-colors hover:text-white lg:inline"
            >
              {BRAND.email}
            </a>
          </div>
        </Container>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-white/80",
          scrolled
            ? "border-black/[0.07] shadow-sm shadow-black/5"
            : "border-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo onClick={() => setOpen(false)} />

          <nav className="hidden h-16 items-center gap-0 xl:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link inline-flex h-16 items-center whitespace-nowrap px-3 text-[0.85rem] font-medium transition-colors",
                  isActive(link.href)
                    ? "active text-brand"
                    : "text-ink/65 hover:text-brand",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <Link
              href="/buyer/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/65 transition-colors hover:bg-cream hover:text-brand"
            >
              Sign in
            </Link>
            <Link
              href="/register/farmer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-ink shadow-sm transition-all hover:bg-gold-600 hover:shadow-md active:scale-[0.98]"
            >
              List produce <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-black/10 text-brand transition-colors hover:bg-cream xl:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </Container>

        {open && (
          <div className="animate-fade-in border-t border-black/5 bg-white xl:hidden">
            <Container className="flex flex-col py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-l-2 py-2.5 pl-3 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "border-gold bg-cream text-brand"
                      : "border-transparent text-ink/80 hover:bg-cream hover:text-brand",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-black/5 pt-3">
                <Link
                  href="/buyer/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-brand/20 px-4 py-2.5 text-center text-sm font-semibold text-brand transition-colors hover:bg-cream"
                >
                  Sign in
                </Link>
                <Link
                  href="/register/farmer"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-gold px-4 py-2.5 text-center text-sm font-bold text-ink transition-colors hover:bg-gold-600"
                >
                  List produce
                </Link>
              </div>
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}

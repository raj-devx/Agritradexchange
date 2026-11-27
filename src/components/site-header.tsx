"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { BRAND, NAV_LINKS } from "@/lib/brand";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useSiteT } from "@/lib/use-t";
import { cn } from "@/lib/cn";

const NAV_KEYS = [
  "nav_home",
  "nav_forFarmers",
  "nav_forBuyers",
  "nav_commodities",
  "nav_howItWorks",
  "nav_about",
  "nav_contact",
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useSiteT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navItems = NAV_LINKS.map((link, i) => ({
    ...link,
    label: t[NAV_KEYS[i]],
  }));

  return (
    <header className="relative z-50">
      {/* Utility strip */}
      <div className="hidden bg-gradient-to-r from-brand via-brand-600 to-brand text-cream md:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <p className="text-cream/70">
            {t.nav_strip}{" "}
            <span className="text-cream/90">{t.nav_stripBold}</span>
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
          "sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-500",
          scrolled
            ? "border-black/[0.06] bg-white/85 shadow-[0_8px_30px_-12px_rgba(18,62,45,0.25)]"
            : "border-transparent bg-white/95",
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-500",
            scrolled ? "h-14" : "h-16",
          )}
        >
          <Logo onClick={() => setOpen(false)} />

          <nav className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2 text-[0.85rem] font-medium transition-colors",
                    active ? "text-brand" : "text-ink/65 hover:text-brand",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand/[0.07] ring-1 ring-brand/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 xl:flex">
            <LanguageSwitcher />
            <Link
              href="/buyer/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/65 transition-colors hover:bg-cream hover:text-brand"
            >
              {t.nav_signIn}
            </Link>
            <Link
              href="/register/farmer"
              className="btn-shine inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-gold-400 to-gold px-5 py-2.5 text-sm font-bold text-ink shadow-[0_6px_18px_-6px_rgba(233,198,90,0.8)] hover:shadow-[0_12px_26px_-8px_rgba(233,198,90,0.9)]"
            >
              {t.nav_listProduce} <ArrowUpRight className="size-4" />
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

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-black/5 bg-white xl:hidden"
            >
              <Container className="flex flex-col py-3">
                {navItems.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-r-lg border-l-2 py-2.5 pl-3 text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "border-gold bg-cream text-brand"
                          : "border-transparent text-ink/80 hover:bg-cream hover:text-brand",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-3 flex items-center justify-center border-t border-black/5 pt-3 pb-2">
                  <LanguageSwitcher />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/buyer/login"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-brand/20 px-4 py-2.5 text-center text-sm font-semibold text-brand transition-colors hover:bg-cream"
                  >
                    {t.nav_signIn}
                  </Link>
                  <Link
                    href="/register/farmer"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-gold px-4 py-2.5 text-center text-sm font-bold text-ink transition-colors hover:bg-gold-600"
                  >
                    {t.nav_listProduce}
                  </Link>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

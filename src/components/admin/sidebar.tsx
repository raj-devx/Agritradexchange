"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout } from "lucide-react";
import { ADMIN_NAV_LIVE, ADMIN_NAV_PLANNED, type AdminNavItem } from "@/lib/admin-nav";
import { cn } from "@/lib/cn";

function NavItem({ item, active }: { item: AdminNavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-white/15 text-white"
          : "text-cream/70 hover:bg-white/10 hover:text-white",
      )}
    >
      <item.icon className="size-4 shrink-0" />
      {item.label}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-brand text-cream lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-white/10">
          <Sprout className="size-4 text-gold" />
        </span>
        <span className="font-display font-extrabold">
          AgriTrade<span className="text-gold">Xchange</span>
        </span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {ADMIN_NAV_LIVE.map((item) => (
          <NavItem key={item.href} item={item} active={isActive(item.href)} />
        ))}
        <p className="px-3 pb-1 pt-5 text-[10px] font-semibold uppercase tracking-wider text-cream/40">
          Planned (V2)
        </p>
        {ADMIN_NAV_PLANNED.map((item) => (
          <NavItem key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </nav>
      <div className="border-t border-white/10 p-4 text-[11px] text-cream/40">
        Admin console · concept stage
      </div>
    </aside>
  );
}

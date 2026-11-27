"use client";

import { TrendingUp } from "lucide-react";
import { MANDI_PRICES } from "@/lib/mandi-prices";

function formatPrice(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export function MandiTicker() {
  const items = MANDI_PRICES;

  return (
    <div className="marquee relative overflow-hidden border-y border-black/5 bg-gradient-to-b from-cream to-white">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-cream to-transparent" />
      <div className="marquee-track gap-4 py-3.5 pl-4">
        {[...items, ...items].map((p, i) => (
          <div
            key={i}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-white px-4 py-2 text-xs shadow-[0_2px_10px_-4px_rgba(18,62,45,0.25)] ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-leaf/30"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-leaf/10">
              <TrendingUp className="size-3 text-leaf" />
            </span>
            <span className="font-semibold text-ink">{p.commodity}</span>
            <span className="text-ink/45">{p.mandi}</span>
            <span className="font-mono font-bold text-brand">
              {formatPrice(p.modalPrice)}
            </span>
            <span className="text-ink/40">/{p.unit}</span>
            <span className="text-[10px] text-ink/30">
              ({formatPrice(p.minPrice)}–{formatPrice(p.maxPrice)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MandiPriceTable() {
  return (
    <div className="gborder overflow-x-auto rounded-3xl bg-white shadow-[var(--shadow-soft)]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-black/5 bg-gradient-to-r from-cream to-white">
            <th className="px-4 py-2.5 font-semibold text-ink/70">Commodity</th>
            <th className="px-4 py-2.5 font-semibold text-ink/70">Mandi</th>
            <th className="px-4 py-2.5 text-right font-semibold text-ink/70">Min</th>
            <th className="px-4 py-2.5 text-right font-semibold text-ink/70">Modal</th>
            <th className="px-4 py-2.5 text-right font-semibold text-ink/70">Max</th>
            <th className="px-4 py-2.5 text-right font-semibold text-ink/70">Unit</th>
          </tr>
        </thead>
        <tbody>
          {MANDI_PRICES.map((p, i) => (
            <tr key={i} className="border-b border-black/5 transition-colors last:border-0 hover:bg-leaf/5">
              <td className="px-4 py-2 font-medium text-ink">{p.commodity}</td>
              <td className="px-4 py-2 text-ink/60">
                {p.mandi}, {p.state}
              </td>
              <td className="px-4 py-2 text-right font-mono text-ink/60">{formatPrice(p.minPrice)}</td>
              <td className="px-4 py-2 text-right font-mono font-semibold text-brand">{formatPrice(p.modalPrice)}</td>
              <td className="px-4 py-2 text-right font-mono text-ink/60">{formatPrice(p.maxPrice)}</td>
              <td className="px-4 py-2 text-right text-ink/40">/{p.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

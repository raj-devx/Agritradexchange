"use client";

import { useEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";
import { MANDI_PRICES } from "@/lib/mandi-prices";

function formatPrice(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export function MandiTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    let pos = 0;
    const speed = 0.5;
    function step() {
      pos += speed;
      if (pos >= el!.scrollWidth / 2) pos = 0;
      el!.scrollLeft = pos;
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(raf);
    const resume = () => { raf = requestAnimationFrame(step); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  const items = MANDI_PRICES;

  return (
    <div className="relative overflow-hidden border-y border-black/5 bg-cream/80">
      <div className="absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-cream/80 to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-cream/80 to-transparent" />
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden whitespace-nowrap py-3 px-4"
      >
        {[...items, ...items].map((p, i) => (
          <div
            key={i}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs shadow-sm ring-1 ring-black/5"
          >
            <TrendingUp className="size-3.5 text-leaf" />
            <span className="font-semibold text-ink">{p.commodity}</span>
            <span className="text-ink/50">{p.mandi}</span>
            <span className="font-mono font-semibold text-brand">
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
    <div className="overflow-x-auto rounded-xl border border-black/10 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-black/5 bg-cream/50">
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
            <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-cream/30">
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

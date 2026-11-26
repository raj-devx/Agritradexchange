import Link from "next/link";
import { cn } from "@/lib/cn";

type Tone = "brand" | "light";

export function Logo({
  tone = "brand",
  className,
  href = "/",
  onClick,
}: {
  tone?: Tone;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const top = tone === "brand" ? "#123e2d" : "#ffffff";
  const bottom = tone === "brand" ? "#378451" : "#e9c65a";

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="AgriTradeXchange home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 28 28"
        className="size-7 shrink-0"
        fill="none"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* top arrow → (exchange out) — slides right on hover */}
        <g className="lm-top">
          <path d="M4 10.5h15" stroke={top} />
          <path d="M15.5 7l3.5 3.5-3.5 3.5" stroke={top} />
        </g>
        {/* bottom arrow ← (exchange in) — slides left on hover */}
        <g className="lm-bot">
          <path d="M24 17.5H9" stroke={bottom} />
          <path d="M12.5 14 9 17.5l3.5 3.5" stroke={bottom} />
        </g>
      </svg>
      <span
        className={cn(
          "font-display text-[1.15rem] font-extrabold leading-none tracking-tight",
          tone === "brand" ? "text-brand" : "text-white",
        )}
      >
        AgriTrade
        <span className={tone === "brand" ? "text-leaf" : "text-gold"}>
          Xchange
        </span>
      </span>
    </Link>
  );
}

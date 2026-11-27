import Link from "next/link";
import { cn } from "@/lib/cn";

type Tone = "brand" | "light";

/**
 * Seedling cradled in an exchange arc: leaves = farm, gold leaf = value,
 * arc with arrowheads = two-way trade.
 */
export function LogoMark({
  tone = "brand",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const light = tone === "light";
  const leafL = light ? "#1d6949" : "#7cc48f";
  const leafR = light ? "#d8b23e" : "#e9c65a";
  const arc = light ? "#123e2d" : "#f4f6f0";

  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("lg-badge size-9 shrink-0", className)}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lg-bg" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f8a5e" />
          <stop offset="1" stopColor="#0f3526" />
        </linearGradient>
        <linearGradient id="lg-bg-light" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e8ece2" />
        </linearGradient>
        <linearGradient id="lg-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="lg-clip">
          <rect width="40" height="40" rx="11" />
        </clipPath>
      </defs>

      <rect width="40" height="40" rx="11" fill={light ? "url(#lg-bg-light)" : "url(#lg-bg)"} />
      <rect
        x="0.6"
        y="0.6"
        width="38.8"
        height="38.8"
        rx="10.4"
        stroke={light ? "rgba(18,62,45,0.18)" : "rgba(255,255,255,0.2)"}
        strokeWidth="1.2"
      />

      {/* stem */}
      <path
        className="lg-stem"
        d="M20 27V17.5"
        stroke={light ? "#123e2d" : "#e8f3e6"}
        strokeWidth="2.2"
        strokeLinecap="round"
        pathLength={1}
      />

      {/* left leaf */}
      <g className="lg-in lg-in-l">
        <g className="lg-sway lg-sway-l">
          <g className="lg-leaf lg-leaf-l">
            <path d="M20 23.5C13 24 8.5 19.5 8 13c6.5-.5 11.5 3.5 12 10.5Z" fill={leafL} />
            <path d="M19.2 22C16 19 13 16.5 10.5 14.8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
          </g>
        </g>
      </g>

      {/* right (gold) leaf */}
      <g className="lg-in lg-in-r">
        <g className="lg-sway lg-sway-r">
          <g className="lg-leaf lg-leaf-r">
            <path d="M20 19c0-7.500 5-12 12-12.500.5 7-4 12-12 12.500Z" fill={leafR} />
            <path d="M21 17.600C24 14.600 27 11.800 29.600 9.600" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
          </g>
        </g>
      </g>

      {/* exchange arc */}
      <g className="lg-arc" stroke={arc} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path className="lg-arc-line" d="M10.500 29.500C14 34.500 26 34.500 29.500 29.500" pathLength={1} />
        <path className="lg-head-r" d="M29.140 33 29.500 29.500 26.300 30.800" />
        <path className="lg-head-l" d="M10.860 33 10.500 29.500 13.700 30.800" />
      </g>

      <g clipPath="url(#lg-clip)">
        <rect className="lg-sheen" x="-24" y="-4" width="20" height="48" fill="url(#lg-sheen)" transform="skewX(-18)" />
      </g>
    </svg>
  );
}

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
  const light = tone === "light";

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="AgriTradeXchange home"
      className={cn("lg inline-flex items-center gap-2.5", className)}
    >
      <LogoMark tone={tone} />
      <span
        className={cn(
          "lg-word font-display text-[1.2rem] font-extrabold leading-none tracking-tight",
          light ? "text-white" : "text-brand",
        )}
      >
        AgriTrade
        <span className={cn("lg-x inline-block", light ? "text-gold" : "text-gold-600")}>X</span>
        <span className={light ? "text-leaf-400" : "text-leaf"}>change</span>
      </span>
    </Link>
  );
}

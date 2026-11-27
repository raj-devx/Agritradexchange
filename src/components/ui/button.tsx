import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "btn-shine inline-flex items-center justify-center gap-2 rounded-xl font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-brand-500 to-brand text-white shadow-[0_6px_20px_-6px_rgba(18,62,45,0.55),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_12px_28px_-8px_rgba(18,62,45,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]",
  gold:
    "bg-gradient-to-b from-gold-400 to-gold text-ink shadow-[0_6px_20px_-6px_rgba(233,198,90,0.7),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_14px_30px_-8px_rgba(233,198,90,0.8),inset_0_1px_0_rgba(255,255,255,0.6)]",
  outline:
    "border border-brand/25 text-brand backdrop-blur-sm hover:border-brand/50 hover:bg-brand/5",
  ghost: "text-brand hover:bg-brand/5",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  );
}

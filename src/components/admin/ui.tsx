import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

export function AdminPageTitle({
  title,
  description,
  count,
}: {
  title: string;
  description?: string;
  count?: number;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl font-bold text-brand">{title}</h1>
        {typeof count === "number" && (
          <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-sm font-semibold text-brand">
            {count}
          </span>
        )}
      </div>
      {description && <p className="mt-1 text-sm text-ink/60">{description}</p>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  hint?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink/60">{label}</p>
        {Icon && (
          <span className="flex size-8 items-center justify-center rounded-lg bg-cream text-leaf">
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <p className="mt-2 font-display text-3xl font-extrabold text-brand">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink/50">{hint}</p>}
    </div>
  );
}

export function Card({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-black/5 bg-white shadow-sm", className)}>
      {title && (
        <div className="border-b border-black/5 px-5 py-3.5">
          <h2 className="font-display text-sm font-bold text-brand">{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}

export function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-left text-sm">{children}</table>
    </div>
  );
}

export function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        "border-b border-black/5 bg-cream px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink/50",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <td className={cn("border-b border-black/5 px-4 py-3 align-middle text-ink/80", className)}>
      {children}
    </td>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "gold" | "red";
}) {
  const tones = {
    neutral: "bg-ink/5 text-ink/70",
    green: "bg-leaf/10 text-leaf-600",
    gold: "bg-gold/20 text-gold-600",
    red: "bg-red-50 text-red-600",
  } as const;
  return (
    <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-white p-12 text-center">
      <p className="font-display font-bold text-ink">{title}</p>
      {hint && <p className="mt-1 text-sm text-ink/50">{hint}</p>}
    </div>
  );
}

export function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const done = clamped >= 100;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
      <div
        className={cn("h-full rounded-full transition-all", done ? "bg-leaf" : "bg-gold-600")}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

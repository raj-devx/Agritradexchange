"use client";

import { forwardRef } from "react";
import { CheckCircle2, Loader2, Share2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-[0.8rem] font-semibold tracking-wide text-brand/80">
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1.5 text-xs text-ink/50">{hint}</p>}
      {error && <p className="animate-fade-up mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

const control =
  "w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm text-ink shadow-[inset_0_1px_2px_rgba(18,62,45,0.06)] outline-none transition-all duration-300 placeholder:text-ink/35 hover:border-black/20 focus:border-leaf focus:ring-2 focus:ring-leaf/30 focus:shadow-[0_6px_18px_-8px_rgba(55,132,81,0.35)] disabled:bg-black/5";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(control, className)} {...props} />;
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(control, "pr-8", className)} {...props}>
      {children}
    </select>
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea ref={ref} className={cn(control, "min-h-24", className)} {...props} />
  );
});

export function SubmitButton({
  pending,
  children,
}: {
  pending: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-brand-500 to-brand px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_22px_-8px_rgba(18,62,45,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

export function SuccessPanel({
  title,
  reference,
  referenceLabel = "Reference number",
  shareText,
  children,
}: {
  title: string;
  reference?: string;
  referenceLabel?: string;
  shareText?: string;
  children?: React.ReactNode;
}) {
  const waUrl = shareText
    ? `https://wa.me/?text=${encodeURIComponent(shareText)}`
    : null;

  return (
    <div className="gborder grain animate-fade-up relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-cream p-8 text-center shadow-[var(--shadow-soft)] sm:p-10">
      <span className="live-dot mx-auto flex size-16 items-center justify-center rounded-full bg-leaf/10 ring-1 ring-leaf/20">
        <CheckCircle2 className="size-9 text-leaf" />
      </span>
      <h3 className="animate-fade-up mt-5 font-display text-2xl font-bold text-brand" style={{ animationDelay: "100ms" }}>{title}</h3>
      {reference && (
        <p className="animate-fade-up mt-4 text-sm text-ink/70" style={{ animationDelay: "180ms" }}>
          {referenceLabel}:{" "}
          <span className="rounded-lg bg-white px-2.5 py-1 font-mono font-semibold text-brand shadow-sm ring-1 ring-gold/40">
            {reference}
          </span>
        </p>
      )}
      {children && <div className="animate-fade-up mt-4 text-sm text-ink/70" style={{ animationDelay: "260ms" }}>{children}</div>}
      {waUrl && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ animationDelay: "340ms" }}
          className="animate-fade-up mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_-8px_rgba(37,211,102,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_-8px_rgba(37,211,102,0.8)] active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Share on WhatsApp
        </a>
      )}
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="animate-fade-up rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  );
}

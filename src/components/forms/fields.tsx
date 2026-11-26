"use client";

import { forwardRef } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
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
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1 text-xs text-ink/50">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

const control =
  "w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/25 disabled:bg-black/5";

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
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
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
  children,
}: {
  title: string;
  reference?: string;
  referenceLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-leaf/30 bg-cream p-8 text-center">
      <CheckCircle2 className="mx-auto size-12 text-leaf" />
      <h3 className="mt-4 font-display text-xl font-bold text-brand">{title}</h3>
      {reference && (
        <p className="mt-3 text-sm text-ink/70">
          {referenceLabel}:{" "}
          <span className="rounded-md bg-white px-2 py-1 font-mono font-semibold text-brand">
            {reference}
          </span>
        </p>
      )}
      {children && <div className="mt-4 text-sm text-ink/70">{children}</div>}
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  );
}

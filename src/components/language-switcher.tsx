"use client";

import { LANGS } from "@/lib/i18n";
import { useLang } from "@/components/language-provider";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div className={cn("flex items-center gap-0.5 rounded-full bg-cream p-0.5", className)}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold transition-all",
            lang === l.code
              ? "bg-brand text-white shadow-sm"
              : "text-ink/60 hover:text-brand",
          )}
          aria-label={l.label}
        >
          {l.native}
        </button>
      ))}
    </div>
  );
}

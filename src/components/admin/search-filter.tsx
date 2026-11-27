"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useRef, useCallback } from "react";
import { Search, X } from "lucide-react";

export function AdminSearchFilter({
  statuses,
  searchPlaceholder = "Search…",
}: {
  statuses: readonly string[];
  searchPlaceholder?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const q = searchParams.get("q") ?? "";
  const status = searchParams.get("status") ?? "";

  const push = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  function handleSearch(value: string) {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => push("q", value.trim()), 300);
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
        <input
          type="text"
          defaultValue={q}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-lg border border-black/15 bg-white py-2 pl-9 pr-8 text-sm text-ink shadow-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/25"
        />
        {q && (
          <button
            onClick={() => {
              push("q", "");
              const input = document.querySelector<HTMLInputElement>(
                'input[type="text"]',
              );
              if (input) input.value = "";
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-ink/40 hover:text-ink"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      <select
        value={status}
        onChange={(e) => push("status", e.target.value)}
        className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm text-ink shadow-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/25"
      >
        <option value="">All statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

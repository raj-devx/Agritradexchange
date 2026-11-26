"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function StatusSelect({
  id,
  value,
  options,
  action,
}: {
  id: string;
  value: string;
  options: readonly string[];
  action: (id: string, status: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <span className="inline-flex items-center gap-1.5">
      <select
        defaultValue={value}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value;
          startTransition(async () => {
            await action(id, next);
            router.refresh();
          });
        }}
        className={cn(
          "max-w-[12rem] rounded-md border border-black/15 bg-white px-2 py-1.5 text-xs text-ink outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/25 disabled:opacity-60",
        )}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {pending && <Loader2 className="size-3.5 animate-spin text-ink/40" />}
    </span>
  );
}

import { notFound } from "next/navigation";
import { Construction } from "lucide-react";
import { ADMIN_NAV_PLANNED } from "@/lib/admin-nav";
import { AdminPageTitle } from "@/components/admin/ui";

export const instant = false;

export default async function PlannedModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const item = ADMIN_NAV_PLANNED.find((n) => n.href === `/admin/${module}`);
  if (!item) notFound();

  return (
    <>
      <AdminPageTitle title={item.label} />
      <div className="rounded-2xl border border-dashed border-black/15 bg-white p-12 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-cream text-gold-600">
          <Construction className="size-6" />
        </span>
        <h2 className="mt-4 font-display text-lg font-bold text-brand">
          {item.label} — planned for V2
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
          This module is part of the Digital India phase. V1 focuses on intake
          (farmers, buyers, demand) and manual review; this becomes available as
          the operating workflow is built out.
        </p>
      </div>
    </>
  );
}

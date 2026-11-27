import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Info } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { recordInspection } from "@/app/agent/actions";
import { QUALITY_GRADES } from "@/lib/status";
import { UNITS } from "@/lib/validation";
import { ImageUpload } from "@/components/image-upload";

export const instant = false;

const control =
  "mt-1.5 w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-base text-ink shadow-sm outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/25";

export default async function InspectPage({
  params,
  searchParams,
}: {
  params: Promise<{ farmerId: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await connection();
  const { farmerId } = await params;
  const { error } = await searchParams;

  const farmer = await prisma.farmerRegistration.findUnique({
    where: { id: farmerId },
    include: { inspection: true },
  });
  if (!farmer) notFound();

  const prev = farmer.inspection;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="animate-fade-up">
      <Link
        href="/agent"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-brand"
      >
        <ArrowLeft className="size-4" /> Back to queue
      </Link>

      {/* Farmer summary */}
      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-xl font-bold text-brand">{farmer.fullName}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-ink/60">
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" /> {farmer.village}, {farmer.district}, {farmer.state}
              </span>
              <a href={`tel:${farmer.mobile}`} className="flex items-center gap-1 hover:text-brand">
                <Phone className="size-3.5" /> {farmer.mobile}
              </a>
            </p>
          </div>
          <span className="font-mono text-xs text-ink/40">{farmer.registrationNo}</span>
        </div>
        <p className="mt-3 border-t border-black/5 pt-3 text-sm text-ink/70">
          {farmer.cropName} ·{" "}
          <span className="font-medium text-ink">
            {farmer.expectedQuantity} {farmer.unit}
          </span>{" "}
          expected · {farmer.approxLocation}
        </p>
      </div>

      <h2 className="mt-6 mb-1 font-display text-lg font-bold text-brand">
        {prev ? "Update inspection" : "Record inspection"}
      </h2>
      <p className="mb-4 flex items-start gap-2 rounded-lg bg-white px-3 py-2 text-xs text-ink/60 ring-1 ring-black/5">
        <Info className="mt-0.5 size-3.5 shrink-0 text-gold-600" />
        Record quality findings only. Pricing is set later by an authorised admin.
      </p>

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Please fill in the required fields (inspector, sample no., grade, quantity).
        </p>
      )}

      <form action={recordInspection} className="space-y-4">
        <input type="hidden" name="farmerId" value={farmer.id} />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-ink">
            Inspected by *
            <input
              name="inspectedBy"
              required
              defaultValue={prev?.inspectedBy ?? ""}
              placeholder="Agent name"
              className={control}
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Sample no. *
            <input
              name="sampleNo"
              required
              defaultValue={prev?.sampleNo ?? ""}
              placeholder="e.g. S-2041"
              className={control}
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Preliminary grade *
            <select name="grade" required defaultValue={prev?.grade ?? ""} className={control}>
              <option value="" disabled>
                Select grade
              </option>
              {QUALITY_GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-ink">
            Moisture
            <input
              name="moisture"
              defaultValue={prev?.moisture ?? ""}
              placeholder="e.g. 7%"
              className={control}
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Assessed quantity *
            <input
              type="number"
              step="any"
              min="0"
              name="assessedQty"
              required
              defaultValue={prev?.assessedQty ?? farmer.expectedQuantity}
              className={control}
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Unit *
            <select name="unit" defaultValue={prev?.unit ?? farmer.unit} className={control}>
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-ink">
            Visit date
            <input
              type="date"
              name="visitDate"
              defaultValue={prev?.visitDate ?? today}
              className={control}
            />
          </label>
        </div>

        <label className="block text-sm font-medium text-ink">
          Notes
          <textarea
            name="notes"
            rows={3}
            defaultValue={prev?.notes ?? ""}
            placeholder="Impurities, variety observations, storage condition…"
            className={control}
          />
        </label>

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink">Produce photos</p>
          <ImageUpload
            name="images"
            existingImages={prev?.images ? JSON.parse(prev.images) : []}
          />
        </div>

        <label className="flex items-start gap-3 rounded-lg bg-white p-3 text-sm text-ink/80 ring-1 ring-black/5">
          <input
            type="checkbox"
            name="farmerAck"
            defaultChecked={prev?.farmerAck ?? false}
            className="mt-0.5 size-4 accent-leaf"
          />
          Farmer was present and acknowledged the inspection.
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-leaf px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-leaf-600"
        >
          {prev ? "Update inspection" : "Save inspection"}
        </button>
      </form>
    </div>
  );
}

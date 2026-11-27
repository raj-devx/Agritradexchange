import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Sprout, Package, Calendar, MapPin, LogOut, FileText } from "lucide-react";
import { getSession } from "@/lib/user-auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/container";
import { farmerLogout } from "@/app/(public)/farmer/actions";

export const metadata: Metadata = { title: "My Registrations" };
export const instant = false;

const STATUS_COLORS: Record<string, string> = {
  "Registration submitted": "bg-blue-50 text-blue-700",
  "Agent assigned": "bg-purple-50 text-purple-700",
  "Inspection scheduled": "bg-amber-50 text-amber-700",
  "Quality assessment completed": "bg-leaf/10 text-leaf",
  "Offer shared": "bg-gold/15 text-gold-600",
  "Quantity confirmed": "bg-brand/10 text-brand",
  "Collection scheduled": "bg-spice-100 text-spice",
  "Payment processed": "bg-green-50 text-green-700",
};

export default async function FarmerDashboardPage() {
  const session = await getSession("farmer");
  if (!session) redirect("/farmer/login");

  const registrations = await prisma.farmerRegistration.findMany({
    where: { mobile: session.mobile },
    orderBy: { createdAt: "desc" },
    include: { inspection: true },
  });

  return (
    <section className="py-10">
      <Container className="max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand">My Registrations</h1>
            <p className="mt-1 text-sm text-ink/60">Mobile: +91 {session.mobile}</p>
          </div>
          <form action={farmerLogout}>
            <button className="flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium text-ink/70 transition-colors hover:bg-red-50 hover:text-red-600">
              <LogOut className="size-3.5" /> Logout
            </button>
          </form>
        </div>

        {registrations.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-black/15 bg-cream/50 p-10 text-center">
            <Sprout className="mx-auto size-10 text-leaf/40" />
            <p className="mt-3 font-medium text-ink/70">No registrations yet</p>
            <p className="mt-1 text-sm text-ink/50">
              <a href="/register/farmer" className="font-medium text-leaf underline">Register your produce</a> to get started.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {registrations.map((r) => (
              <div key={r.id} className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-mono text-ink/40">{r.registrationNo}</p>
                    <h3 className="mt-1 font-display text-lg font-bold text-ink">{r.cropName}</h3>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-700"}`}>
                    {r.status}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-ink/70 sm:grid-cols-3">
                  <div className="flex items-center gap-1.5">
                    <Package className="size-3.5 text-ink/40" />
                    {r.expectedQuantity} {r.unit}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-ink/40" />
                    {r.village}, {r.district}
                  </div>
                  {r.harvestDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-ink/40" />
                      {r.harvestDate}
                    </div>
                  )}
                </div>
                {r.inspection && (
                  <div className="mt-3 rounded-lg bg-cream/60 px-3 py-2 text-xs text-ink/70">
                    <span className="font-semibold text-ink">Inspection:</span>{" "}
                    {r.inspection.grade} &middot; {r.inspection.assessedQty} {r.inspection.unit}
                    {r.inspection.moisture && ` &middot; Moisture: ${r.inspection.moisture}`}
                  </div>
                )}
                <div className="mt-3 border-t border-black/5 pt-3">
                  <a
                    href={`/api/receipt/farmer/${r.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-leaf hover:underline"
                  >
                    <FileText className="size-3.5" /> Download Receipt
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Sprout, Package, Calendar, MapPin, LogOut, FileText } from "lucide-react";
import { getSession } from "@/lib/user-auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/container";
import { Aurora } from "@/components/aurora";
import { SpotlightCard } from "@/components/spotlight-card";
import { Reveal } from "@/components/reveal";
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
    <>
    <section className="grain relative overflow-hidden bg-brand text-cream">
      <Aurora />
      <Container className="relative z-[1] max-w-3xl py-12 pb-16">
        <div className="flex items-center justify-between gap-3">
          <div className="animate-fade-up">
            <h1 className="text-3xl text-white sm:text-4xl">My Registrations</h1>
            <p className="mt-2 text-sm text-cream/70">Mobile: +91 {session.mobile}</p>
          </div>
          <form action={farmerLogout}>
            <button className="glass flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium text-cream/90 transition-all hover:bg-red-500/20 hover:text-white active:scale-95">
              <LogOut className="size-3.5" /> Logout
            </button>
          </form>
        </div>
      </Container>
    </section>
    <section className="relative bg-cream pb-16">
      <Container className="relative -mt-8 max-w-3xl">
        {registrations.length === 0 ? (
          <div className="gborder animate-fade-up rounded-3xl bg-white p-12 text-center shadow-[var(--shadow-soft)]">
            <Sprout className="mx-auto size-10 text-leaf/40" />
            <p className="mt-3 font-medium text-ink/70">No registrations yet</p>
            <p className="mt-1 text-sm text-ink/50">
              <a href="/register/farmer" className="font-medium text-leaf underline">Register your produce</a> to get started.
            </p>
          </div>
        ) : (
          <Reveal className="space-y-4">
            {registrations.map((r) => (
              <SpotlightCard key={r.id} spot="rgba(55,132,81,0.1)" className="gborder rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-mono text-ink/40">{r.registrationNo}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-brand">{r.cropName}</h3>
                  </div>
                  <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-700"}`}>
                    <span className="size-1.5 rounded-full bg-current" />
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
                  <div className="mt-3 rounded-xl bg-leaf/5 px-3 py-2 text-xs text-ink/70 ring-1 ring-leaf/10">
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
                    className="link-underline inline-flex items-center gap-1.5 pb-0.5 text-xs font-semibold text-leaf"
                  >
                    <FileText className="size-3.5" /> Download Receipt
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
    </>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Building2, Package, MapPin, Calendar, LogOut } from "lucide-react";
import { getSession } from "@/lib/user-auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/container";
import { buyerLogout } from "@/app/(public)/buyer/actions";

export const metadata: Metadata = { title: "Buyer Dashboard" };
export const instant = false;

const REQ_COLORS: Record<string, string> = {
  Submitted: "bg-blue-50 text-blue-700",
  "Under review": "bg-purple-50 text-purple-700",
  "Matching supply": "bg-amber-50 text-amber-700",
  "Quotation shared": "bg-gold/15 text-gold-600",
  "Order confirmed": "bg-green-50 text-green-700",
  Closed: "bg-gray-100 text-gray-500",
};

export default async function BuyerDashboardPage() {
  const session = await getSession("buyer");
  if (!session) redirect("/buyer/login");

  const [registration, requirements] = await Promise.all([
    prisma.buyerRegistration.findFirst({
      where: { mobile: session.mobile },
      orderBy: { createdAt: "desc" },
    }),
    prisma.buyerRequirement.findMany({
      where: { mobile: session.mobile },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <section className="py-10">
      <Container className="max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand">Buyer Dashboard</h1>
            <p className="mt-1 text-sm text-ink/60">Mobile: +91 {session.mobile}</p>
          </div>
          <form action={buyerLogout}>
            <button className="flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium text-ink/70 transition-colors hover:bg-red-50 hover:text-red-600">
              <LogOut className="size-3.5" /> Logout
            </button>
          </form>
        </div>

        {registration && (
          <div className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="size-5 text-brand" />
                <h3 className="font-display text-lg font-bold text-ink">{registration.companyName}</h3>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${registration.status === "Verified" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                {registration.status}
              </span>
            </div>
            <div className="mt-2 text-sm text-ink/60">
              {registration.companyType} &middot; {registration.buyerNo}
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">My Requirements</h2>
            <a href="/buyers/post-requirement" className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-600">
              + Post Requirement
            </a>
          </div>

          {requirements.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-black/15 bg-cream/50 p-10 text-center">
              <Package className="mx-auto size-10 text-brand/40" />
              <p className="mt-3 font-medium text-ink/70">No requirements posted yet</p>
              <p className="mt-1 text-sm text-ink/50">
                <a href="/buyers/post-requirement" className="font-medium text-brand underline">Post a requirement</a> to start sourcing.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {requirements.map((r) => (
                <div key={r.id} className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-mono text-ink/40">{r.requirementNo}</p>
                      <h3 className="mt-1 font-display font-bold text-ink">{r.commodity}</h3>
                    </div>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${REQ_COLORS[r.status] ?? "bg-gray-100 text-gray-700"}`}>
                      {r.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-ink/70 sm:grid-cols-3">
                    <div className="flex items-center gap-1.5">
                      <Package className="size-3.5 text-ink/40" />
                      {r.requiredQuantity} {r.unit} &middot; {r.grade}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-ink/40" />
                      {r.deliveryLocation}
                    </div>
                    {r.deliveryDeadline && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-ink/40" />
                        {r.deliveryDeadline}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!registration && (
          <p className="mt-6 text-center text-sm text-ink/50">
            Haven&apos;t registered yet?{" "}
            <a href="/register/buyer" className="font-medium text-brand underline">Register as a buyer</a>
          </p>
        )}
      </Container>
    </section>
  );
}

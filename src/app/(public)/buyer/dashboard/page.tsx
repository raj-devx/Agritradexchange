import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Building2, Package, MapPin, Calendar, LogOut, FileText } from "lucide-react";
import { getSession } from "@/lib/user-auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/container";
import { Aurora } from "@/components/aurora";
import { SpotlightCard } from "@/components/spotlight-card";
import { Reveal } from "@/components/reveal";
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
    <>
    <section className="grain relative overflow-hidden bg-brand text-cream">
      <Aurora />
      <Container className="relative z-[1] max-w-3xl py-12 pb-16">
        <div className="flex items-center justify-between gap-3">
          <div className="animate-fade-up">
            <h1 className="text-3xl text-white sm:text-4xl">Buyer Dashboard</h1>
            <p className="mt-2 text-sm text-cream/70">Mobile: +91 {session.mobile}</p>
          </div>
          <form action={buyerLogout}>
            <button className="glass flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium text-cream/90 transition-all hover:bg-red-500/20 hover:text-white active:scale-95">
              <LogOut className="size-3.5" /> Logout
            </button>
          </form>
        </div>
      </Container>
    </section>
    <section className="relative bg-cream pb-16">
      <Container className="relative -mt-8 max-w-3xl">
        {registration && (
          <SpotlightCard spot="rgba(233,198,90,0.18)" className="gborder animate-fade-up rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="size-5 text-brand" />
                <h3 className="font-display text-lg font-bold text-ink">{registration.companyName}</h3>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${registration.status === "Verified" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                <span className="size-1.5 rounded-full bg-current" />
                {registration.status}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-ink/60">
              <span>{registration.companyType} &middot; {registration.buyerNo}</span>
              <a
                href={`/api/receipt/buyer/${registration.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 pb-0.5 text-xs font-semibold text-leaf"
              >
                <FileText className="size-3.5" /> Receipt
              </a>
            </div>
          </SpotlightCard>
        )}

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="ornament font-display text-lg font-bold text-brand">My Requirements</h2>
            <a href="/buyers/post-requirement" className="btn-shine rounded-xl bg-gradient-to-b from-brand-500 to-brand px-4 py-2 text-xs font-semibold text-white shadow-[0_6px_18px_-6px_rgba(18,62,45,0.55)]">
              + Post Requirement
            </a>
          </div>

          {requirements.length === 0 ? (
            <div className="gborder animate-fade-up mt-6 rounded-3xl bg-white p-12 text-center shadow-[var(--shadow-soft)]">
              <Package className="mx-auto size-10 text-brand/40" />
              <p className="mt-3 font-medium text-ink/70">No requirements posted yet</p>
              <p className="mt-1 text-sm text-ink/50">
                <a href="/buyers/post-requirement" className="font-medium text-brand underline">Post a requirement</a> to start sourcing.
              </p>
            </div>
          ) : (
            <Reveal className="mt-4 space-y-4">
              {requirements.map((r) => (
                <SpotlightCard key={r.id} spot="rgba(55,132,81,0.1)" className="gborder rounded-3xl border border-black/5 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-mono text-ink/40">{r.requirementNo}</p>
                      <h3 className="mt-1 font-display text-lg font-bold text-brand">{r.commodity}</h3>
                    </div>
                    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${REQ_COLORS[r.status] ?? "bg-gray-100 text-gray-700"}`}>
                      <span className="size-1.5 rounded-full bg-current" />
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
                  <div className="mt-3 border-t border-black/5 pt-3">
                    <a
                      href={`/api/receipt/requirement/${r.id}`}
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
        </div>

        {!registration && (
          <p className="mt-6 text-center text-sm text-ink/50">
            Haven&apos;t registered yet?{" "}
            <a href="/register/buyer" className="font-medium text-brand underline">Register as a buyer</a>
          </p>
        )}
      </Container>
    </section>
    </>
  );
}

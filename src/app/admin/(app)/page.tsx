import { connection } from "next/server";
import Link from "next/link";
import { Sprout, Building2, ClipboardList, MessageSquare, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  AdminPageTitle,
  StatCard,
  Card,
  Badge,
  EmptyState,
  formatDate,
} from "@/components/admin/ui";

export const instant = false;

export default async function AdminOverviewPage() {
  await connection();

  const [
    farmers,
    buyers,
    requirements,
    messages,
    pendingInspections,
    pendingBuyers,
    openRequirements,
    recentFarmers,
    recentRequirements,
  ] = await Promise.all([
    prisma.farmerRegistration.count(),
    prisma.buyerRegistration.count(),
    prisma.buyerRequirement.count(),
    prisma.contactMessage.count(),
    prisma.farmerRegistration.count({
      where: {
        status: {
          in: ["Registration submitted", "Agent assigned", "Inspection scheduled"],
        },
      },
    }),
    prisma.buyerRegistration.count({ where: { status: "Pending verification" } }),
    prisma.buyerRequirement.count({ where: { NOT: { status: "Closed" } } }),
    prisma.farmerRegistration.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.buyerRequirement.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <>
      <AdminPageTitle
        title="Overview"
        description="Live snapshot of registrations and demand across the network."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Farmers / supply lots" value={farmers} icon={Sprout} hint={`${pendingInspections} awaiting inspection`} />
        <StatCard label="Buyers" value={buyers} icon={Building2} hint={`${pendingBuyers} pending verification`} />
        <StatCard label="Requirements (demand)" value={requirements} icon={ClipboardList} hint={`${openRequirements} open`} />
        <StatCard label="Messages" value={messages} icon={MessageSquare} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Recent produce registrations">
          {recentFarmers.length === 0 ? (
            <div className="p-5">
              <EmptyState title="No registrations yet" hint="Farmer submissions will appear here." />
            </div>
          ) : (
            <ul className="divide-y divide-black/5">
              {recentFarmers.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {f.fullName} · <span className="text-ink/60">{f.cropName}</span>
                    </p>
                    <p className="text-xs text-ink/50">
                      {f.expectedQuantity} {f.unit} · {f.district}, {f.state} · {formatDate(f.createdAt)}
                    </p>
                  </div>
                  <Badge tone="green">{f.status}</Badge>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-black/5 px-5 py-3 text-right">
            <Link href="/admin/farmers" className="text-sm font-semibold text-leaf hover:underline">
              View all farmers →
            </Link>
          </div>
        </Card>

        <Card title="Recent buyer requirements">
          {recentRequirements.length === 0 ? (
            <div className="p-5">
              <EmptyState title="No requirements yet" hint="Buyer demand will appear here." />
            </div>
          ) : (
            <ul className="divide-y divide-black/5">
              {recentRequirements.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {r.commodity} · <span className="text-ink/60">{r.companyName}</span>
                    </p>
                    <p className="text-xs text-ink/50">
                      {r.requiredQuantity} {r.unit} · {r.deliveryLocation} · {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <Badge tone="gold">{r.status}</Badge>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-black/5 px-5 py-3 text-right">
            <Link href="/admin/requirements" className="text-sm font-semibold text-leaf hover:underline">
              View all demand →
            </Link>
          </div>
        </Card>
      </div>

      <p className="mt-6 flex items-center gap-2 text-xs text-ink/40">
        <Search className="size-3.5" /> Matching supply to demand is done manually in V1 from the Farmers and Demand tabs.
      </p>
    </>
  );
}

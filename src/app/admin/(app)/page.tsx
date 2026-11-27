import { connection } from "next/server";
import Link from "next/link";
import {
  Sprout,
  Building2,
  ClipboardList,
  MessageSquare,
  Search,
  TrendingUp,
  BarChart3,
  Wheat,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { FARMER_STATUS_PIPELINE } from "@/lib/status";
import { categoryLabel } from "@/lib/commodities";
import {
  AdminPageTitle,
  StatCard,
  Card,
  Badge,
  EmptyState,
  formatDate,
} from "@/components/admin/ui";

export const instant = false;

const PIPELINE_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-leaf",
  "bg-gold-600",
  "bg-brand",
  "bg-spice",
  "bg-green-600",
];

export default async function AdminOverviewPage() {
  await connection();

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

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
    farmersThisWeek,
    buyersThisWeek,
    pipelineRaw,
    topCropsRaw,
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
    prisma.farmerRegistration.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.buyerRegistration.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.farmerRegistration.groupBy({
      by: ["status"],
      _count: { id: true },
    }),
    prisma.farmerRegistration.groupBy({
      by: ["cropCategory"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    }),
  ]);

  const pipelineCounts = new Map(
    pipelineRaw.map((r) => [r.status, r._count.id]),
  );
  const maxPipelineCount = Math.max(
    1,
    ...FARMER_STATUS_PIPELINE.map((s) => pipelineCounts.get(s) ?? 0),
  );

  return (
    <>
      <AdminPageTitle
        title="Overview"
        description="Live snapshot of registrations and demand across the network."
      />

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Farmers / supply lots" value={farmers} icon={Sprout} hint={`${pendingInspections} awaiting inspection`} />
        <StatCard label="Buyers" value={buyers} icon={Building2} hint={`${pendingBuyers} pending verification`} />
        <StatCard label="Requirements (demand)" value={requirements} icon={ClipboardList} hint={`${openRequirements} open`} />
        <StatCard label="Messages" value={messages} icon={MessageSquare} />
      </div>

      {/* This week + Pipeline funnel + Top commodities */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* This week */}
        <Card>
          <div className="p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-brand">
              <TrendingUp className="size-4" /> This Week
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-leaf/10 p-4 text-center">
                <p className="font-display text-2xl font-extrabold text-leaf">{farmersThisWeek}</p>
                <p className="mt-1 text-xs font-medium text-ink/60">New Farmers</p>
              </div>
              <div className="rounded-xl bg-brand/10 p-4 text-center">
                <p className="font-display text-2xl font-extrabold text-brand">{buyersThisWeek}</p>
                <p className="mt-1 text-xs font-medium text-ink/60">New Buyers</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Pipeline funnel */}
        <Card className="lg:col-span-2">
          <div className="p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-brand">
              <BarChart3 className="size-4" /> Farmer Pipeline
            </div>
            <div className="mt-4 space-y-2.5">
              {FARMER_STATUS_PIPELINE.map((status, i) => {
                const count = pipelineCounts.get(status) ?? 0;
                const pct = Math.round((count / maxPipelineCount) * 100);
                return (
                  <div key={status} className="flex items-center gap-3">
                    <p className="w-44 shrink-0 truncate text-xs text-ink/70">{status}</p>
                    <div className="relative h-5 flex-1 overflow-hidden rounded bg-black/5">
                      <div
                        className={`absolute inset-y-0 left-0 rounded ${PIPELINE_COLORS[i]} transition-all`}
                        style={{ width: `${Math.max(pct, count > 0 ? 4 : 0)}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs font-semibold text-ink/70">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Top commodities */}
      {topCropsRaw.length > 0 && (
        <div className="mt-6">
          <Card>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-brand">
                <Wheat className="size-4" /> Top Commodities
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {topCropsRaw.map((c) => (
                  <span
                    key={c.cropCategory}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-cream px-3 py-1.5 text-xs font-medium text-ink/80"
                  >
                    {categoryLabel(c.cropCategory)}
                    <span className="rounded-full bg-leaf/15 px-1.5 text-[10px] font-bold text-leaf">
                      {c._count.id}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Recent lists */}
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

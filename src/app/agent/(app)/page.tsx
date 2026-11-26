import { connection } from "next/server";
import Link from "next/link";
import {
  ClipboardList,
  UserCheck,
  CheckCircle2,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AGENT_QUEUE_STATUSES } from "@/lib/status";
import { StatCard, EmptyState, Badge, formatDate } from "@/components/admin/ui";

export const instant = false;

export default async function AgentDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ done?: string }>;
}) {
  await connection();
  const { done } = await searchParams;

  const since = new Date();
  since.setHours(0, 0, 0, 0);

  const [queue, assigned, inspectedToday] = await Promise.all([
    prisma.farmerRegistration.findMany({
      where: { status: { in: [...AGENT_QUEUE_STATUSES] } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.farmerRegistration.count({ where: { status: "Agent assigned" } }),
    prisma.inspection.count({ where: { createdAt: { gte: since } } }),
  ]);

  return (
    <div className="animate-fade-up">
      {done && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-leaf/30 bg-leaf/10 px-4 py-3 text-sm text-leaf-600">
          <CheckCircle2 className="size-5" /> Inspection saved. The lot has moved to
          quality-assessed.
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand">Today&apos;s work</h1>
          <p className="text-sm text-ink/60">Farmer lots waiting for an on-site visit.</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatCard label="In queue" value={queue.length} icon={ClipboardList} />
        <StatCard label="Assigned" value={assigned} icon={UserCheck} />
        <StatCard label="Inspected today" value={inspectedToday} icon={CheckCircle2} />
      </div>

      <h2 className="mt-8 mb-3 font-display text-lg font-bold text-brand">
        Visit queue
      </h2>

      {queue.length === 0 ? (
        <EmptyState
          title="Queue is clear"
          hint="New farmer registrations awaiting inspection will appear here."
        />
      ) : (
        <ul className="space-y-3">
          {queue.map((f, i) => (
            <li
              key={f.id}
              className="animate-fade-up rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
              style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{f.fullName}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-ink/55">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" /> {f.village}, {f.district}
                    </span>
                    <a href={`tel:${f.mobile}`} className="flex items-center gap-1 hover:text-brand">
                      <Phone className="size-3" /> {f.mobile}
                    </a>
                  </p>
                </div>
                <Badge tone="gold">{f.status}</Badge>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
                <p className="text-sm text-ink/70">
                  {f.cropName} ·{" "}
                  <span className="font-medium text-ink">
                    {f.expectedQuantity} {f.unit}
                  </span>
                  <span className="block text-xs text-ink/40">
                    Registered {formatDate(f.createdAt)} · {f.preferredLanguage}
                  </span>
                </p>
                <Link
                  href={`/agent/inspect/${f.id}`}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-leaf px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-leaf-600"
                >
                  Inspect <ArrowRight className="size-4" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

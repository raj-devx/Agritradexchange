import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, MapPin, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  categoryForCommodity,
  categoryLabel,
} from "@/lib/commodities";
import { toKg, fromKg, formatQty, convertAndFormat } from "@/lib/units";
import { allocateSupply, confirmMatch, removeMatch } from "@/app/admin/actions";
import {
  AdminPageTitle,
  Card,
  Badge,
  TableWrap,
  Th,
  Td,
  EmptyState,
  ProgressBar,
  formatDate,
} from "@/components/admin/ui";

export const instant = false;

export default async function MatchingDetailPage({
  params,
}: {
  params: Promise<{ requirementId: string }>;
}) {
  await connection();
  const { requirementId } = await params;

  const requirement = await prisma.buyerRequirement.findUnique({
    where: { id: requirementId },
    include: { matches: { include: { farmer: true }, orderBy: { createdAt: "asc" } } },
  });
  if (!requirement) notFound();

  const categoryKey = categoryForCommodity(requirement.commodity);
  const requiredKg = toKg(requirement.requiredQuantity, requirement.unit);
  const allocatedKg = requirement.matches.reduce(
    (sum, m) => sum + toKg(m.allocatedQty, m.unit),
    0,
  );
  const remainingKg = Math.max(0, requiredKg - allocatedKg);
  const percent = requiredKg > 0 ? (allocatedKg / requiredKg) * 100 : 0;
  const allocatedIds = new Set(requirement.matches.map((m) => m.farmerId));

  const candidates = categoryKey
    ? await prisma.farmerRegistration.findMany({
        where: {
          cropCategory: categoryKey,
          status: { not: "Payment processed" },
          id: { notIn: [...allocatedIds] },
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const deliveryLc = requirement.deliveryLocation.toLowerCase();

  return (
    <>
      <Link
        href="/admin/matching"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-brand"
      >
        <ArrowLeft className="size-4" /> Back to matching
      </Link>

      <AdminPageTitle title={`Source: ${requirement.commodity}`} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Requirement summary */}
        <Card title="Requirement">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 p-5 text-sm">
            <Detail label="Reference" value={requirement.requirementNo} mono />
            <Detail label="Buyer" value={requirement.companyName} />
            <Detail label="Contact" value={`${requirement.contactPerson} · ${requirement.mobile}`} />
            <Detail label="Email" value={requirement.email} />
            <Detail label="Required quantity" value={formatQty(requirement.requiredQuantity, requirement.unit)} />
            <Detail label="Grade" value={requirement.grade} />
            <Detail label="Moisture" value={requirement.moistureSpec ?? "—"} />
            <Detail label="Delivery" value={requirement.deliveryLocation} />
            <Detail label="Deadline" value={requirement.deliveryDeadline ?? "—"} />
            <Detail label="Packaging" value={requirement.packaging} />
            <Detail label="Target price" value={requirement.targetPrice ?? "—"} />
            <Detail label="Sample" value={requirement.sampleRequired ? "Requested" : "No"} />
          </dl>
          {requirement.additionalSpecs && (
            <div className="border-t border-black/5 px-5 py-3 text-sm text-ink/70">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                Notes
              </span>
              <p className="mt-1 whitespace-pre-wrap">{requirement.additionalSpecs}</p>
            </div>
          )}
        </Card>

        {/* Progress */}
        <Card title="Sourcing progress">
          <div className="p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-display text-3xl font-extrabold text-brand">
                  {Math.round(percent)}%
                </p>
                <p className="text-sm text-ink/60">sourced</p>
              </div>
              <Badge tone={percent >= 100 ? "green" : "gold"}>{requirement.status}</Badge>
            </div>
            <div className="mt-4">
              <ProgressBar percent={percent} />
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-lg bg-cream p-3">
                <dt className="text-xs text-ink/50">Required</dt>
                <dd className="font-semibold text-ink">{formatQty(requirement.requiredQuantity, requirement.unit)}</dd>
              </div>
              <div className="rounded-lg bg-cream p-3">
                <dt className="text-xs text-ink/50">Allocated</dt>
                <dd className="font-semibold text-ink">{formatQty(fromKg(allocatedKg, requirement.unit), requirement.unit)}</dd>
              </div>
              <div className="rounded-lg bg-cream p-3">
                <dt className="text-xs text-ink/50">Remaining</dt>
                <dd className="font-semibold text-ink">{formatQty(fromKg(remainingKg, requirement.unit), requirement.unit)}</dd>
              </div>
            </dl>
          </div>
        </Card>
      </div>

      {/* Current allocations */}
      <h2 className="mt-8 mb-3 font-display text-lg font-bold text-brand">
        Allocated supply ({requirement.matches.length})
      </h2>
      {requirement.matches.length === 0 ? (
        <EmptyState title="No supply allocated yet" hint="Allocate candidate lots below to start sourcing." />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Farmer</Th>
              <Th>Location</Th>
              <Th>Allocated</Th>
              <Th>Status</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {requirement.matches.map((m) => (
              <tr key={m.id} className="hover:bg-cream/50">
                <Td className="font-medium text-ink">
                  {m.farmer.fullName}
                  <span className="block text-xs font-normal text-ink/40">
                    {m.farmer.cropName} · {m.farmer.mobile}
                  </span>
                </Td>
                <Td className="text-xs">
                  {m.farmer.village}, {m.farmer.district}
                  <span className="block text-ink/40">{m.farmer.state}</span>
                </Td>
                <Td className="whitespace-nowrap">
                  {formatQty(m.allocatedQty, m.unit)}
                  {m.unit !== requirement.unit && (
                    <span className="block text-xs text-ink/40">
                      ≈ {convertAndFormat(m.allocatedQty, m.unit, requirement.unit)}
                    </span>
                  )}
                </Td>
                <Td>
                  <Badge tone={m.status === "Confirmed" ? "green" : "gold"}>{m.status}</Badge>
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    {m.status !== "Confirmed" && (
                      <form action={confirmMatch}>
                        <input type="hidden" name="matchId" value={m.id} />
                        <button className="inline-flex items-center gap-1 rounded-md border border-leaf/30 px-2.5 py-1 text-xs font-medium text-leaf-600 hover:bg-leaf/10">
                          <Check className="size-3.5" /> Confirm
                        </button>
                      </form>
                    )}
                    <form action={removeMatch}>
                      <input type="hidden" name="matchId" value={m.id} />
                      <button className="inline-flex items-center gap-1 rounded-md border border-black/10 px-2.5 py-1 text-xs font-medium text-ink/60 hover:bg-red-50 hover:text-red-600">
                        <X className="size-3.5" /> Remove
                      </button>
                    </form>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}

      {/* Candidate supply */}
      <h2 className="mt-8 mb-3 font-display text-lg font-bold text-brand">
        Candidate supply{categoryKey ? ` · ${categoryLabel(categoryKey)}` : ""}
      </h2>
      {!categoryKey ? (
        <EmptyState
          title="Could not infer a category for this commodity"
          hint="Candidate matching is category-based; this commodity isn't in the catalogue."
        />
      ) : candidates.length === 0 ? (
        <EmptyState
          title="No candidate lots available"
          hint="Registered produce in this category will appear here once available."
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Farmer</Th>
              <Th>Crop</Th>
              <Th>Location</Th>
              <Th>Available</Th>
              <Th>Registered</Th>
              <Th className="min-w-[14rem]">Allocate</Th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((f) => {
              const nearby = deliveryLc.includes(f.district.toLowerCase());
              return (
                <tr key={f.id} className="hover:bg-cream/50">
                  <Td className="font-medium text-ink">
                    {f.fullName}
                    <span className="block text-xs font-normal text-ink/40">{f.mobile}</span>
                  </Td>
                  <Td className="text-xs">{f.cropName}</Td>
                  <Td className="text-xs">
                    <span className="flex items-center gap-1">
                      {f.village}, {f.district}
                      {nearby && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-leaf/10 px-1.5 text-[10px] font-medium text-leaf-600">
                          <MapPin className="size-2.5" /> near
                        </span>
                      )}
                    </span>
                    <span className="block text-ink/40">{f.state}</span>
                  </Td>
                  <Td className="whitespace-nowrap">
                    {formatQty(f.expectedQuantity, f.unit)}
                    {f.unit !== requirement.unit && (
                      <span className="block text-xs text-ink/40">
                        ≈ {convertAndFormat(f.expectedQuantity, f.unit, requirement.unit)}
                      </span>
                    )}
                  </Td>
                  <Td className="whitespace-nowrap text-xs text-ink/50">{formatDate(f.createdAt)}</Td>
                  <Td>
                    <form action={allocateSupply} className="flex items-center gap-1.5">
                      <input type="hidden" name="requirementId" value={requirement.id} />
                      <input type="hidden" name="farmerId" value={f.id} />
                      <input type="hidden" name="unit" value={f.unit} />
                      <input
                        type="number"
                        name="allocatedQty"
                        step="any"
                        min="0"
                        defaultValue={f.expectedQuantity}
                        className="w-20 rounded-md border border-black/15 px-2 py-1 text-xs outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/25"
                      />
                      <span className="text-xs text-ink/50">{f.unit}</span>
                      <button className="inline-flex items-center gap-1 rounded-md bg-brand px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-600">
                        <Plus className="size-3.5" /> Allocate
                      </button>
                    </form>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      )}
    </>
  );
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink/40">{label}</dt>
      <dd className={mono ? "font-mono text-ink/80" : "text-ink/80"}>{value}</dd>
    </div>
  );
}

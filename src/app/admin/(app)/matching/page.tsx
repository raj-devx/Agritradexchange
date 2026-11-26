import { connection } from "next/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toKg, fromKg, formatQty } from "@/lib/units";
import {
  AdminPageTitle,
  TableWrap,
  Th,
  Td,
  Badge,
  EmptyState,
  ProgressBar,
} from "@/components/admin/ui";

export const instant = false;

export default async function MatchingListPage() {
  await connection();
  const requirements = await prisma.buyerRequirement.findMany({
    where: { NOT: { status: "Closed" } },
    orderBy: { createdAt: "desc" },
    include: { matches: true },
  });

  return (
    <>
      <AdminPageTitle
        title="Matching Engine"
        description="Pair open buyer demand with available farmer supply. Matching is done manually by the ops team in V1."
        count={requirements.length}
      />

      {requirements.length === 0 ? (
        <EmptyState
          title="No open requirements"
          hint="Open buyer requirements will appear here for sourcing."
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Requirement</Th>
              <Th>Buyer</Th>
              <Th>Required</Th>
              <Th className="min-w-[14rem]">Sourced</Th>
              <Th>Status</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {requirements.map((r) => {
              const requiredKg = toKg(r.requiredQuantity, r.unit);
              const allocatedKg = r.matches.reduce(
                (sum, m) => sum + toKg(m.allocatedQty, m.unit),
                0,
              );
              const percent = requiredKg > 0 ? (allocatedKg / requiredKg) * 100 : 0;
              return (
                <tr key={r.id} className="hover:bg-cream/50">
                  <Td className="font-medium text-ink">
                    {r.commodity}
                    <span className="block font-mono text-xs font-normal text-ink/40">
                      {r.requirementNo}
                    </span>
                  </Td>
                  <Td className="text-xs">{r.companyName}</Td>
                  <Td className="whitespace-nowrap">
                    {formatQty(r.requiredQuantity, r.unit)}
                  </Td>
                  <Td>
                    <div className="flex items-center justify-between text-xs text-ink/60">
                      <span>{formatQty(fromKg(allocatedKg, r.unit), r.unit)}</span>
                      <span>{Math.round(percent)}%</span>
                    </div>
                    <div className="mt-1">
                      <ProgressBar percent={percent} />
                    </div>
                    <span className="mt-1 block text-[11px] text-ink/40">
                      {r.matches.length} lot{r.matches.length === 1 ? "" : "s"} allocated
                    </span>
                  </Td>
                  <Td>
                    <Badge tone="gold">{r.status}</Badge>
                  </Td>
                  <Td>
                    <Link
                      href={`/admin/matching/${r.id}`}
                      className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-leaf hover:underline"
                    >
                      Match <ArrowRight className="size-4" />
                    </Link>
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

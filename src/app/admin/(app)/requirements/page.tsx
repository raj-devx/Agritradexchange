import { connection } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { REQUIREMENT_STATUSES } from "@/lib/status";
import { updateRequirementStatus } from "@/app/admin/actions";
import { StatusSelect } from "@/components/admin/status-select";
import { AdminSearchFilter } from "@/components/admin/search-filter";
import {
  AdminPageTitle,
  TableWrap,
  Th,
  Td,
  Badge,
  EmptyState,
  formatDate,
} from "@/components/admin/ui";

export const instant = false;

export default async function AdminRequirementsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await connection();
  const { q, status } = await searchParams;

  const where: Prisma.BuyerRequirementWhereInput = {};

  if (q) {
    where.OR = [
      { companyName: { contains: q, mode: "insensitive" } },
      { contactPerson: { contains: q, mode: "insensitive" } },
      { commodity: { contains: q, mode: "insensitive" } },
      { requirementNo: { contains: q, mode: "insensitive" } },
      { deliveryLocation: { contains: q, mode: "insensitive" } },
    ];
  }

  if (status) {
    where.status = status;
  }

  const requirements = await prisma.buyerRequirement.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminPageTitle
        title="Demand"
        description="Buyer requirements. Review, then match verified farmer supply before confirming."
        count={requirements.length}
      />

      <AdminSearchFilter
        statuses={REQUIREMENT_STATUSES}
        searchPlaceholder="Search by company, commodity, location…"
      />

      {requirements.length === 0 ? (
        <EmptyState
          title="No requirements yet"
          hint="Submissions from the &ldquo;Post Buying Requirement&rdquo; form will appear here."
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Ref</Th>
              <Th>Buyer</Th>
              <Th>Commodity</Th>
              <Th>Quantity</Th>
              <Th>Grade</Th>
              <Th>Delivery</Th>
              <Th>Sample</Th>
              <Th>Posted</Th>
              <Th className="min-w-[12rem]">Status</Th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((r) => (
              <tr key={r.id} className="hover:bg-cream/50">
                <Td className="font-mono text-xs text-ink/60">{r.requirementNo}</Td>
                <Td className="font-medium text-ink">
                  {r.companyName}
                  <span className="block text-xs font-normal text-ink/40">
                    {r.contactPerson} · {r.mobile}
                  </span>
                </Td>
                <Td>{r.commodity}</Td>
                <Td className="whitespace-nowrap">
                  {r.requiredQuantity} {r.unit}
                </Td>
                <Td className="text-xs">
                  {r.grade}
                  {r.moistureSpec && (
                    <span className="block text-ink/40">Moisture: {r.moistureSpec}</span>
                  )}
                </Td>
                <Td className="text-xs">
                  {r.deliveryLocation}
                  {r.deliveryDeadline && (
                    <span className="block text-ink/40">by {r.deliveryDeadline}</span>
                  )}
                  <span className="block text-ink/40">{r.packaging}</span>
                </Td>
                <Td>
                  {r.sampleRequired ? <Badge tone="gold">Yes</Badge> : <Badge>No</Badge>}
                </Td>
                <Td className="whitespace-nowrap text-xs text-ink/50">{formatDate(r.createdAt)}</Td>
                <Td>
                  <StatusSelect
                    id={r.id}
                    value={r.status}
                    options={REQUIREMENT_STATUSES}
                    action={updateRequirementStatus}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </>
  );
}

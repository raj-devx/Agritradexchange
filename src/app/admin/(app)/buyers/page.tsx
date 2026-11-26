import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { BUYER_STATUSES } from "@/lib/status";
import { CATEGORIES } from "@/lib/commodities";
import { updateBuyerStatus } from "@/app/admin/actions";
import { StatusSelect } from "@/components/admin/status-select";
import {
  AdminPageTitle,
  TableWrap,
  Th,
  Td,
  Badge,
  EmptyState,
  formatDate,
} from "@/components/admin/ui";

const CATEGORY_LABEL = new Map(CATEGORIES.map((c) => [c.key, c.label]));

export const instant = false;

export default async function AdminBuyersPage() {
  await connection();
  const buyers = await prisma.buyerRegistration.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminPageTitle
        title="Buyers"
        description="Registered buyer accounts. Verify credible buyers before matching supply."
        count={buyers.length}
      />

      {buyers.length === 0 ? (
        <EmptyState
          title="No buyers registered yet"
          hint="Submissions from the buyer registration form will appear here."
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Ref</Th>
              <Th>Company</Th>
              <Th>Contact</Th>
              <Th>Type</Th>
              <Th>Categories</Th>
              <Th>Registered</Th>
              <Th className="min-w-[11rem]">Status</Th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((b) => {
              const cats = b.procurementCategories
                .split(",")
                .filter(Boolean)
                .map((k) => CATEGORY_LABEL.get(k) ?? k);
              return (
                <tr key={b.id} className="hover:bg-cream/50">
                  <Td className="font-mono text-xs text-ink/60">{b.buyerNo}</Td>
                  <Td className="font-medium text-ink">
                    {b.companyName}
                    {b.gstin && (
                      <span className="block text-xs font-normal text-ink/40">GSTIN {b.gstin}</span>
                    )}
                  </Td>
                  <Td className="text-xs">
                    {b.contactPerson}
                    <span className="block text-ink/40">{b.mobile}</span>
                    <span className="block text-ink/40">{b.email}</span>
                  </Td>
                  <Td className="text-xs">{b.companyType}</Td>
                  <Td>
                    <span className="flex flex-wrap gap-1">
                      {cats.map((c) => (
                        <Badge key={c}>{c}</Badge>
                      ))}
                    </span>
                  </Td>
                  <Td className="whitespace-nowrap text-xs text-ink/50">{formatDate(b.createdAt)}</Td>
                  <Td>
                    <StatusSelect
                      id={b.id}
                      value={b.status}
                      options={BUYER_STATUSES}
                      action={updateBuyerStatus}
                    />
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

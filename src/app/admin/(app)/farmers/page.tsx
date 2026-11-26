import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { FARMER_STATUS_PIPELINE } from "@/lib/status";
import { updateFarmerStatus } from "@/app/admin/actions";
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

export const instant = false;

export default async function AdminFarmersPage() {
  await connection();
  const farmers = await prisma.farmerRegistration.findMany({
    orderBy: { createdAt: "desc" },
    include: { inspection: true },
  });

  return (
    <>
      <AdminPageTitle
        title="Farmers & Supply"
        description="Registered produce lots. A registration is not a purchase — move each lot through the pipeline."
        count={farmers.length}
      />

      {farmers.length === 0 ? (
        <EmptyState
          title="No produce registered yet"
          hint="Submissions from the public “Register Your Produce” form will appear here."
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <Th>Ref</Th>
              <Th>Farmer</Th>
              <Th>Contact</Th>
              <Th>Commodity</Th>
              <Th>Quantity</Th>
              <Th>Location</Th>
              <Th>Inspection</Th>
              <Th>Registered</Th>
              <Th className="min-w-[13rem]">Status</Th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((f) => (
              <tr key={f.id} className="hover:bg-cream/50">
                <Td className="font-mono text-xs text-ink/60">{f.registrationNo}</Td>
                <Td className="font-medium text-ink">
                  {f.fullName}
                  <span className="block text-xs font-normal text-ink/40">
                    {f.preferredLanguage}
                  </span>
                </Td>
                <Td className="text-xs">{f.mobile}</Td>
                <Td>
                  {f.cropName}
                  <span className="block text-xs text-ink/40 capitalize">{f.cropCategory}</span>
                </Td>
                <Td className="whitespace-nowrap">
                  {f.expectedQuantity} {f.unit}
                </Td>
                <Td className="text-xs">
                  {f.village}, {f.district}
                  <span className="block text-ink/40">{f.state}</span>
                </Td>
                <Td>
                  {f.inspection ? (
                    <span className="whitespace-nowrap">
                      <Badge tone="green">{f.inspection.grade}</Badge>
                      <span className="mt-0.5 block text-[11px] text-ink/40">
                        {f.inspection.assessedQty} {f.inspection.unit}
                        {f.inspection.moisture ? ` · ${f.inspection.moisture}` : ""}
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs text-ink/30">—</span>
                  )}
                </Td>
                <Td className="whitespace-nowrap text-xs text-ink/50">{formatDate(f.createdAt)}</Td>
                <Td>
                  <StatusSelect
                    id={f.id}
                    value={f.status}
                    options={FARMER_STATUS_PIPELINE}
                    action={updateFarmerStatus}
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

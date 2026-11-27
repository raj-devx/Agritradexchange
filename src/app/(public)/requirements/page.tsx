import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { RequirementsContent } from "@/components/requirements-content";

export const metadata: Metadata = {
  title: "Buyer Requirements",
  description:
    "Live buyer procurement requirements on AgriTradeXchange. Farmers can browse what buyers need and register their produce to fulfil demand.",
};

export const instant = false;

export default async function RequirementsPage() {
  const rows = await prisma.buyerRequirement.findMany({
    where: { status: { not: "Closed" } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      commodity: true,
      requiredQuantity: true,
      unit: true,
      grade: true,
      deliveryLocation: true,
      packaging: true,
      status: true,
      sampleRequired: true,
      createdAt: true,
    },
  });

  const requirements = rows.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  return <RequirementsContent requirements={requirements} />;
}

import type { Metadata } from "next";
import { ForBuyersContent } from "@/components/for-buyers-content";

export const metadata: Metadata = {
  title: "For Buyers",
  description:
    "Source agricultural commodities through one connected procurement network — quality-specified, aggregated and delivered.",
};

export default function ForBuyersPage() {
  return <ForBuyersContent />;
}

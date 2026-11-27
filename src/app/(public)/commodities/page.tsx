import type { Metadata } from "next";
import { CommoditiesContent } from "@/components/commodities-content";

export const metadata: Metadata = {
  title: "Commodities",
  description:
    "The AgriTradeXchange commodity base — grains, oilseeds, fibre, spices, pulses and commercial crops. Non-perishable and trade-ready.",
};

export default function CommoditiesPage() {
  return <CommoditiesContent />;
}

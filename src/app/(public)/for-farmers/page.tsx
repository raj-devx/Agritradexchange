import type { Metadata } from "next";
import { ForFarmersContent } from "@/components/for-farmers-content";

export const metadata: Metadata = {
  title: "For Farmers",
  description:
    "Register your produce free, get a transparent quality-based offer, and reach a wider network of verified buyers.",
};

export default function ForFarmersPage() {
  return <ForFarmersContent />;
}

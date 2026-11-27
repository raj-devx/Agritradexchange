import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ForFarmersContent } from "@/components/for-farmers-content";

export const metadata: Metadata = {
  title: "For Farmers",
  description:
    "Register your produce free, get a transparent quality-based offer, and reach a wider network of verified buyers.",
};

export default function ForFarmersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Farmers"
        title="Sell your produce with less hassle and more clarity"
        subtitle="Register the crop you have available. Our field team inspects quality, shares a transparent offer, and connects you to real buyer demand."
      />
      <ForFarmersContent />
    </>
  );
}

import type { Metadata } from "next";
import { HowItWorksContent } from "@/components/how-it-works-content";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The end-to-end AgriTradeXchange procurement workflow — demand secured first, quality verified, supply matched, delivered and settled.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}

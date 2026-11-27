import type { Metadata } from "next";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AgriTradeXchange is building trusted digital infrastructure for agricultural trade — starting as a managed procurement network and scaling toward a global marketplace.",
};

export default function AboutPage() {
  return <AboutContent />;
}

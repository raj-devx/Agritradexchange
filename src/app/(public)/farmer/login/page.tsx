import type { Metadata } from "next";
import { LoginPlaceholder } from "@/components/login-placeholder";

export const metadata: Metadata = { title: "Farmer Login" };

export default function FarmerLoginPage() {
  return <LoginPlaceholder role="Farmer" registerHref="/register/farmer" />;
}

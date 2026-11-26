import type { Metadata } from "next";
import { LoginPlaceholder } from "@/components/login-placeholder";

export const metadata: Metadata = { title: "Buyer Login" };

export default function BuyerLoginPage() {
  return <LoginPlaceholder role="Buyer" registerHref="/register/buyer" />;
}

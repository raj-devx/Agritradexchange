import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the AgriTradeXchange team — farmers, buyers and partners welcome.",
};

export default function ContactPage() {
  return <ContactContent />;
}

import type { Metadata } from "next";
import { Manrope, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { LanguageProvider } from "@/components/language-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "A farmer-first, buyer-backed agricultural procurement network connecting Indian producers with domestic buyers and global importers through quality-based, transparent trade.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-ink">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

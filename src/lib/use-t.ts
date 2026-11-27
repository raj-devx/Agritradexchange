"use client";

import { useLang } from "@/components/language-provider";
import { FARMER_T, SITE_T } from "@/lib/i18n";

export function useSiteT() {
  const { lang } = useLang();
  return SITE_T[lang];
}

export function useFarmerT() {
  const { lang } = useLang();
  return FARMER_T[lang];
}

export type Crop = { en: string; gu: string };
export type CommodityCategory = {
  key: string;
  label: string;
  gujarati: string;
  emoji: string;
  description: string;
  crops: Crop[];
  note?: string;
};

// Core product list locked during ideation. No fruits & vegetables in V1
// (perishable — future). Wheat is domestic-only; tobacco is a single
// regulated category, never core branding.
export const CATEGORIES: CommodityCategory[] = [
  {
    key: "grains",
    label: "Grains",
    gujarati: "અનાજ",
    emoji: "🌾",
    description: "Staple food grains for domestic and, where permitted, export trade.",
    note: "Wheat is listed for domestic buyers only.",
    crops: [
      { en: "Wheat (domestic only)", gu: "ઘઉં" },
      { en: "Basmati Rice", gu: "બાસમતી ચોખા" },
      { en: "Non-Basmati Rice", gu: "સામાન્ય ચોખા" },
      { en: "Maize (Corn)", gu: "મકાઈ" },
      { en: "Barley", gu: "જૌ" },
      { en: "Jowar (Sorghum)", gu: "જુવાર" },
      { en: "Bajra (Pearl Millet)", gu: "બાજરી" },
      { en: "Ragi (Finger Millet)", gu: "નાચણી" },
    ],
  },
  {
    key: "oilseeds",
    label: "Oilseeds",
    gujarati: "તેલબીજ",
    emoji: "🥜",
    description: "Strong export-potential oilseeds, plus processed oil cakes and meals.",
    crops: [
      { en: "Groundnut (Peanut)", gu: "શીંગદાણા" },
      { en: "Soybean", gu: "સોયાબીન" },
      { en: "Mustard Seed", gu: "રાઈ / સરસવ" },
      { en: "Sesame Seed", gu: "તલ" },
      { en: "Sunflower Seed", gu: "સૂર્યમુખી બીજ" },
      { en: "Castor Seed", gu: "એરંડા બીજ" },
      { en: "Linseed", gu: "અલસી" },
      { en: "Groundnut / Soybean / Mustard Oil Cake", gu: "ખલ" },
    ],
  },
  {
    key: "fiber",
    label: "Fibre Crops",
    gujarati: "તંતુ પાક",
    emoji: "🧵",
    description: "Industrial fibre commodities suited to bulk and exchange-style trade.",
    crops: [
      { en: "Raw Cotton", gu: "કપાસ" },
      { en: "Cotton Bales", gu: "કપાસ ગાંઠ" },
      { en: "Cottonseed", gu: "કપાસ બીજ" },
      { en: "Cottonseed Oil Cake", gu: "કપાસ ખલ" },
    ],
  },
  {
    key: "spices",
    label: "Spices",
    gujarati: "મસાલા",
    emoji: "🌶️",
    description: "High-margin, high global-demand spice commodities.",
    crops: [
      { en: "Turmeric", gu: "હળદર" },
      { en: "Cumin (Jeera)", gu: "જીરુ" },
      { en: "Coriander", gu: "ધાણા" },
      { en: "Red Chilli", gu: "લાલ મરચું" },
      { en: "Black Pepper", gu: "કાળા મરી" },
      { en: "Cardamom", gu: "એલચી" },
      { en: "Fennel (Saunf)", gu: "વરીયાળી" },
      { en: "Fenugreek (Methi)", gu: "મેથી" },
    ],
  },
  {
    key: "pulses",
    label: "Pulses",
    gujarati: "કઠોળ",
    emoji: "🫘",
    description: "Domestic-strong pulses with selective export demand.",
    crops: [
      { en: "Chana (Chickpea)", gu: "ચણા" },
      { en: "Toor (Pigeon Pea)", gu: "તુવેર" },
      { en: "Moong", gu: "મૂંગ" },
      { en: "Urad", gu: "અડદ" },
      { en: "Masoor", gu: "મસૂર" },
    ],
  },
  {
    key: "commercial",
    label: "Commercial & Regulated",
    gujarati: "વેપારી પાક",
    emoji: "🍬",
    description: "Sugar and regulated commodities handled under applicable compliance.",
    note: "Tobacco is traded only where legally permitted, under a compliance section.",
    crops: [
      { en: "Raw Sugar", gu: "કાચી ખાંડ" },
      { en: "Refined Sugar", gu: "શુદ્ધ ખાંડ" },
      { en: "Jaggery", gu: "ગોળ" },
      { en: "Raw Tobacco (FCV)", gu: "કાચું તમાકુ" },
    ],
  },
];

export const CATEGORY_KEYS = CATEGORIES.map((c) => c.key);

export const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({
  key: c.key,
  label: c.label,
}));

// Flat commodity names for the buyer requirement dropdown.
export const ALL_COMMODITIES = CATEGORIES.flatMap((c) =>
  c.crops.map((crop) => crop.en),
);

// Map a commodity name (as stored on a requirement) back to its category key,
// used to find candidate farmer supply during manual matching.
const COMMODITY_TO_CATEGORY = new Map<string, string>();
CATEGORIES.forEach((c) =>
  c.crops.forEach((crop) => COMMODITY_TO_CATEGORY.set(crop.en, c.key)),
);

export function categoryForCommodity(commodity: string): string | undefined {
  return COMMODITY_TO_CATEGORY.get(commodity);
}

export function categoryLabel(key: string): string {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

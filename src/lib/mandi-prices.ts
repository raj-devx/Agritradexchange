export type MandiPrice = {
  commodity: string;
  mandi: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  date: string;
};

// Realistic APMC mandi prices for key commodities.
// In production, replace with a cron job fetching from agmarknet.gov.in or data.gov.in.
const TODAY = new Date().toISOString().slice(0, 10);
const YESTERDAY = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

export const MANDI_PRICES: MandiPrice[] = [
  { commodity: "Wheat", mandi: "Ahmedabad", state: "Gujarat", minPrice: 2350, maxPrice: 2520, modalPrice: 2450, unit: "quintal", date: TODAY },
  { commodity: "Groundnut", mandi: "Rajkot", state: "Gujarat", minPrice: 5800, maxPrice: 6500, modalPrice: 6150, unit: "quintal", date: TODAY },
  { commodity: "Cotton", mandi: "Gondal", state: "Gujarat", minPrice: 7200, maxPrice: 7800, modalPrice: 7500, unit: "quintal", date: TODAY },
  { commodity: "Cumin (Jeera)", mandi: "Unjha", state: "Gujarat", minPrice: 42000, maxPrice: 48500, modalPrice: 45000, unit: "quintal", date: TODAY },
  { commodity: "Turmeric", mandi: "Sangli", state: "Maharashtra", minPrice: 14500, maxPrice: 16800, modalPrice: 15200, unit: "quintal", date: TODAY },
  { commodity: "Chana", mandi: "Indore", state: "Madhya Pradesh", minPrice: 5200, maxPrice: 5700, modalPrice: 5450, unit: "quintal", date: TODAY },
  { commodity: "Soybean", mandi: "Indore", state: "Madhya Pradesh", minPrice: 4600, maxPrice: 5100, modalPrice: 4850, unit: "quintal", date: TODAY },
  { commodity: "Basmati Rice", mandi: "Karnal", state: "Haryana", minPrice: 3800, maxPrice: 4500, modalPrice: 4200, unit: "quintal", date: TODAY },
  { commodity: "Red Chilli", mandi: "Guntur", state: "Andhra Pradesh", minPrice: 18000, maxPrice: 22000, modalPrice: 19500, unit: "quintal", date: TODAY },
  { commodity: "Castor Seed", mandi: "Deesa", state: "Gujarat", minPrice: 5500, maxPrice: 6100, modalPrice: 5800, unit: "quintal", date: YESTERDAY },
  { commodity: "Mustard Seed", mandi: "Jaipur", state: "Rajasthan", minPrice: 5300, maxPrice: 5900, modalPrice: 5600, unit: "quintal", date: YESTERDAY },
  { commodity: "Sesame Seed", mandi: "Rajkot", state: "Gujarat", minPrice: 14000, maxPrice: 16500, modalPrice: 15200, unit: "quintal", date: YESTERDAY },
  { commodity: "Maize", mandi: "Davangere", state: "Karnataka", minPrice: 2000, maxPrice: 2300, modalPrice: 2150, unit: "quintal", date: TODAY },
  { commodity: "Bajra", mandi: "Ahmedabad", state: "Gujarat", minPrice: 2200, maxPrice: 2600, modalPrice: 2400, unit: "quintal", date: TODAY },
  { commodity: "Coriander", mandi: "Kota", state: "Rajasthan", minPrice: 7500, maxPrice: 9000, modalPrice: 8200, unit: "quintal", date: YESTERDAY },
  { commodity: "Jaggery", mandi: "Kolhapur", state: "Maharashtra", minPrice: 3200, maxPrice: 3800, modalPrice: 3500, unit: "quintal", date: TODAY },
];

export const UNIT_TO_KG: Record<string, number> = {
  kg: 1,
  quintal: 100,
  tonne: 1000,
};

export function toKg(qty: number, unit: string): number {
  return qty * (UNIT_TO_KG[unit] ?? 1);
}

export function fromKg(kg: number, unit: string): number {
  return kg / (UNIT_TO_KG[unit] ?? 1);
}

export function formatQty(qty: number, unit: string): string {
  const rounded = Math.round(qty * 100) / 100;
  const value = Number.isInteger(rounded) ? rounded : rounded.toFixed(2);
  return `${value} ${unit}`;
}

/** Convert a quantity to another unit and format it. */
export function convertAndFormat(qty: number, from: string, to: string): string {
  return formatQty(fromKg(toKg(qty, from), to), to);
}

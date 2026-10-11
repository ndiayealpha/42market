import { formatShortDay } from "../lib/format";

export interface PreorderCampaign {
  id: string;
  title: string;
  image: { src: string; alt: string };
  price: number;
  originalPrice: number;
  milestone: { kind: "arrival" | "pickup"; date: string };
  reservedPercent: number;
  remaining: number;
  unit: "dispo" | "colis";
}

export type StockLevel = "normal" | "low" | "urgent";

/** Rounded percentage off, e.g. (24.90, 38.00) → 34. */
export function getDiscountPercent(price: number, originalPrice: number): number {
  return Math.round((1 - price / originalPrice) * 100);
}

/** `reservedPercent >= 90` → urgent; else `remaining <= 10` → low; else normal. */
export function getStockLevel(reservedPercent: number, remaining: number): StockLevel {
  if (reservedPercent >= 90) return "urgent";
  if (remaining <= 10) return "low";
  return "normal";
}

/** "Reste {n} !" (urgent) / "Reste {n}" (low) / "{n} dispo|colis" (normal). */
export function getStockLabel(level: StockLevel, remaining: number, unit: PreorderCampaign["unit"]): string {
  if (level === "urgent") return `Reste ${remaining} !`;
  if (level === "low") return `Reste ${remaining}`;
  return `${remaining} ${unit}`;
}

/** "Arrivage Ven. 24" / "Retrait Jeu. 30". */
export function getMilestoneLabel(milestone: PreorderCampaign["milestone"]): string {
  const prefix = milestone.kind === "arrival" ? "Arrivage" : "Retrait";
  return `${prefix} ${formatShortDay(milestone.date)}`;
}

import type { Media } from "@/src/domain/store-merchandising";

/** Editorial tags shown bottom-left on a catalog ProductCard — content, not styling; `formatEditorialTag` turns it into display copy. */
export type EditorialTag = "frais" | "mur-a-point" | "fort" | "arrivage" | "en-cas" | "top-vente" | "parfume-doux" | "artisanal";

const EDITORIAL_TAG_LABELS: Record<EditorialTag, string> = {
  frais: "FRAIS",
  "mur-a-point": "Mûr à point",
  fort: "Fort",
  arrivage: "Arrivage",
  "en-cas": "En-cas",
  "top-vente": "Top Vente",
  "parfume-doux": "Parfumé doux",
  artisanal: "Artisanat",
};

export function formatEditorialTag(tag: EditorialTag): string {
  return EDITORIAL_TAG_LABELS[tag];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  packagingLabel: string;
  price: number;
  compareAtPrice?: number;
  image: Media;
  tag?: EditorialTag;
  isOutOfStock: boolean;
  aisleSlug: string;
  storeSlug: string;
  storeName: string;
}

/** Union, not `type: "all" | "rayon"` + optional slug — an "all" scope can never carry a stray slug (rule O: extend by union member, not by loosening one shared shape). */
export type CatalogScope = { type: "all" } | { type: "rayon"; slug: string };

export type CatalogSortOption = "populaires" | "nouveautes";

/** Unknown/missing value → "populaires" (the default sort), never a crash (rule 10). */
export function parseCatalogSort(value: string | string[] | undefined): CatalogSortOption {
  return value === "nouveautes" ? "nouveautes" : "populaires";
}

/** "Retrait immédiat 15 min" when open, a closed-store alternative otherwise — never hardcoded inline at the call site (rule 10: "Boutique fermée : libellé de retrait alternatif"). */
export function getPickupAvailabilityLabel(isOpen: boolean, pickupMinutes: number): string {
  return isOpen ? `Retrait immédiat ${pickupMinutes} min` : "Retrait dès la réouverture de la boutique";
}

/** "-28%" from a current/compare-at pair — negative or zero compareAt is not a real discount. */
export function computeDiscountPercent(price: number, compareAtPrice: number): number {
  if (compareAtPrice <= price) return 0;
  return Math.round((1 - price / compareAtPrice) * 100);
}

import type { Media } from "@/src/domain/store-merchandising";

/**
 * Shared by `ProductCard`'s new "related" (P9) and "search" (R4) presets —
 * one badge union instead of two near-identical ones, since both maquettes
 * reuse the same three kinds (a computed discount, a certification, or a
 * free-text editorial label).
 */
export type ProductCardBadge = { kind: "discount"; percent: number } | { kind: "bio" } | { kind: "label"; text: string };

export function formatProductCardBadge(badge: ProductCardBadge): string {
  switch (badge.kind) {
    case "discount":
      return `-${badge.percent}%`;
    case "bio":
      return "BIO";
    case "label":
      return badge.text;
    default: {
      const exhaustive: never = badge;
      throw new Error(`Unhandled product card badge kind: ${JSON.stringify(exhaustive)}`);
    }
  }
}

/** The footer's price annotation — a union, not 3 optional fields, so a card never shows two contradictory annotations at once (rule O). */
export type PriceAnnotation = { kind: "compareAt"; amount: number } | { kind: "inStock" } | { kind: "unitPrice"; label: string };

export interface RelatedProduct {
  id: string;
  slug: string;
  name: string;
  packagingLabel: string;
  price: number;
  image: Media;
  storeSlug: string;
  storeName: string;
  isOutOfStock: boolean;
  badge?: ProductCardBadge;
  annotation?: PriceAnnotation;
  rating?: { average: number };
}

export interface SearchResultProduct {
  id: string;
  slug: string;
  name: string;
  packagingLabel: string;
  price: number;
  image: Media;
  storeSlug: string;
  storeName: string;
  isOutOfStock: boolean;
  badge?: ProductCardBadge;
  annotation?: PriceAnnotation;
  /** Bottom-left editorial tag — always that one position (incohérence #3: la maquette la place tantôt en haut, tantôt en bas). */
  editorialTag?: string;
}

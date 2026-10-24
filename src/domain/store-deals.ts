import type { LoyaltyTier } from "@/src/domain/profile";
import type { PromoProduct } from "@/src/domain/promotions";

/** The mono-store Click & Collect pickup config (D1's meta chips) — one source, not hardcoded in the component. */
export const EXPRESS_PICKUP_CONFIG = {
  etaRangeLabel: "15-30 min",
  freeFeeLabel: "0 € de frais de retrait",
};

export type DealLabelTone = "neutral" | "success" | "warning" | "danger";

export interface DealLabel {
  text: string;
  tone: DealLabelTone;
}

/**
 * A promo product on the global "Bons plans par épiceries" page — same
 * shape as `PromoProduct`, plus the footer's short colored label (shown
 * there instead of the "+" sitting on the image, unlike the per-store Page
 * B). `badge` is optional here (unlike `PromoProduct`, where it's
 * required): the deal preset falls back to a computed discount percent
 * when a product has none (rule: "sans badge fourni, retombe sur le %
 * calculé", incohérence #3).
 */
export interface DealProduct extends Omit<PromoProduct, "badge"> {
  badge?: PromoProduct["badge"];
  dealLabel?: DealLabel;
}

export interface StoreDealsSummary {
  slug: string;
  name: string;
  address: string;
  pickupMinutes: number;
  tagline: string;
  promoCount: number;
  /** The ranking key (rule: "remise maximale décroissante") — the single highest discount percent among this store's deal products. */
  maxDiscountPercent: number;
  products: DealProduct[];
}

/** "42 promos" / "1 promo" — fr-FR treats 0 as plural, same convention as the rest of the app. */
export function formatPromoCountLabel(count: number): string {
  return count === 1 ? "1 promo" : `${count} promos`;
}

/** Pure, tested: highest discount first (rule: "ordre des tuiles = ordre des sections = remise maximale décroissante"). */
export function rankStoresByMaxDiscount(stores: StoreDealsSummary[]): StoreDealsSummary[] {
  return [...stores].sort((a, b) => b.maxDiscountPercent - a.maxDiscountPercent);
}

export type DealsBlock = { kind: "store"; store: StoreDealsSummary } | { kind: "loyalty-banner" };

/**
 * Assembles the page's section order: stores (already ranked) with the
 * loyalty banner (D4) inserted after the 2nd store, or appended at the end
 * if there are fewer than 2 — a pure union-typed list, rendered by an
 * exhaustive switch (rule: "fonction pure d'assemblage de blocs typés").
 * The banner is omitted entirely once the user already has an active
 * loyalty card (rule 10's "ou Voir ma cagnotte" alternative is not
 * implemented — see compte-rendu).
 */
/** The anchor id a `StoreDealsTile` links to and its matching `StoreDealsSection` renders — one function, not a string template repeated at both call sites. */
export function getStoreDealsAnchorId(slug: string): string {
  return `boutique-${slug}`;
}

export function assembleDealsBlocks(stores: StoreDealsSummary[], loyaltyTier: LoyaltyTier): DealsBlock[] {
  const storeBlocks: DealsBlock[] = stores.map((store) => ({ kind: "store", store }));
  if (loyaltyTier === "vip") return storeBlocks;

  const insertAt = Math.min(2, storeBlocks.length);
  return [...storeBlocks.slice(0, insertAt), { kind: "loyalty-banner" }, ...storeBlocks.slice(insertAt)];
}

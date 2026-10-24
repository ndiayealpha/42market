/**
 * Everything merchandised on the store detail page besides the store's
 * own identity (→ store-detail.ts) and the preorder campaigns (→ the
 * existing preorder.ts — this page reuses that section as-is).
 *
 * Deliberately NOT using a `Cents` integer amount (as a generic "Price"
 * model might suggest): every other price in this repo (recipes,
 * preorders, promo cards) is a plain euro float consumed by the existing
 * `formatPrice`. Introducing cents here would need a second, incompatible
 * price formatter for one page — repo convention wins.
 */

export interface Media {
  src?: string;
  alt: string;
}

export interface Category {
  id: string;
  label: string;
  hint: string;
  /** "Fruits & tubercules" — the promo page's section heading for this aisle; unset for aisles with no promo section (rule 12 #4: one shared source for the short rail label and the long section title, not two near-duplicate strings). */
  promoSectionTitle?: string;
  variant: "default" | "deals";
  href: string;
  image: Media;
}

export interface Price {
  amount: number;
  compareAt?: number;
  weightGrams?: number;
}

interface OfferBase {
  id: string;
  title: string;
  badge: string;
  price: Price;
  image: Media;
}

/** "basket" (e.g. "Panier Solidaire") gets a tinted card and an extra "Tous les paniers" link the plain "product" kind doesn't have. */
export type Offer =
  | (OfferBase & { kind: "product" })
  | (OfferBase & { kind: "basket"; approxWeightKg: number; sellerName: string; allBasketsHref: string });

export type HighlightEmphasis = "highlight" | "strong" | "link" | "accent";
export interface HighlightSegment {
  text: string;
  emphasis?: HighlightEmphasis;
}

/**
 * Distinct from `favorites.ts`'s own `StockStatus` ("in-stock" |
 * "low-stock" | "out-of-stock" | "unknown") — same general idea, different
 * vocabulary for a different screen's limited-stock rail. Named
 * `LimitedStockStatus` specifically to avoid two same-named, differently-
 * shaped exports from adjacent domain modules (a real collision risk for
 * auto-import).
 */
export type LimitedStockStatus = "in-stock" | "arrived-today" | "out-of-stock";

export interface LimitedStockItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  status: LimitedStockStatus;
  remaining?: number;
  restockAt?: string;
  image: Media;
}

/** "En stock (4 restants)" / "Arrivé ce matin (Dernier lot)" / "Rupture temporaire". */
export function getStockStatusLabel(item: Pick<LimitedStockItem, "status" | "remaining">): string {
  if (item.status === "out-of-stock") return "Rupture temporaire";
  if (item.status === "arrived-today") return "Arrivé ce matin (Dernier lot)";
  return item.remaining != null ? `En stock (${item.remaining} restants)` : "En stock";
}

export interface BestSeller {
  id: string;
  rank: number;
  name: string;
  price: number;
  /** "100g", "le filet"… */
  unitLabel: string;
  image: Media;
}

export interface SponsoredParcel {
  origin: string;
  destination: string;
  departureDate: string;
  pickupDeadline: string;
  href: string;
}

export interface PromoBannerContent {
  badge: string;
  title: HighlightSegment[];
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: Media;
}

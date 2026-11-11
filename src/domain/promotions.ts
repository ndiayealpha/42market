import type { Media } from "@/src/domain/store-merchandising";
import type { Product } from "@/src/domain/catalog";
import type { OpeningStatus, StoreDetail } from "@/src/domain/store-detail";
import { getOpeningStatus } from "@/src/domain/store-detail";
import { FEATURE_FLAGS } from "@/src/config/feature-flags";
import { formatPrice } from "@/src/lib/format";

/** Discriminated union, not a free-text string — `formatPromoBadge`'s exhaustive switch is what guarantees every kind renders correctly. */
export type PromoBadge =
  | { kind: "percent"; percent: number }
  | { kind: "multibuy"; quantity: number; price: number }
  | { kind: "bogo" }
  | { kind: "pack"; size: number }
  | { kind: "lot"; size: number }
  | { kind: "label"; text: string };

export function formatPromoBadge(badge: PromoBadge): string {
  switch (badge.kind) {
    case "percent":
      return `-${badge.percent}%`;
    case "multibuy":
      return `${badge.quantity} pour ${formatPrice(badge.price)}`;
    case "bogo":
      return "1+1 Offert";
    case "pack":
      return `Pack x${badge.size}`;
    case "lot":
      return `Lot x${badge.size}`;
    case "label":
      return badge.text;
    default: {
      const exhaustive: never = badge;
      throw new Error(`Unhandled promo badge kind: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export interface PromoProduct extends Product {
  badge: PromoBadge;
  /** Powers the "Ventes Flash" filter — distinct from the flash-sale countdown itself (`FlashSale`). */
  isFlashSale?: boolean;
}

/** Pure, testable classifier behind the promo-type filter chips (rule: "des filtres d'URL qui rechargent les données"). "discovery" (paniers découverte) has no matching data yet — it's a legitimate always-empty filter, not a bug. */
export function matchesPromoFilter(product: PromoProduct, filter: PromoFilterType): boolean {
  switch (filter) {
    case "all":
      return true;
    case "flash":
      return product.isFlashSale === true;
    case "multibuy":
      return product.badge.kind === "bogo";
    case "anti-gaspi":
      return product.badge.kind === "label" && product.badge.text === "Anti-gaspi";
    case "discovery":
      return false;
    default: {
      const exhaustive: never = filter;
      throw new Error(`Unhandled promo filter type: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export type PromoFilterType = "all" | "flash" | "multibuy" | "anti-gaspi" | "discovery";

export interface PromoFilterTypeConfig {
  label: string;
  icon: "sparkle" | "zap" | "basket" | "timer" | "glass";
}

/** Table, not a switch — one line per filter type (rule O). Counts/ranges are data, read from the repo, never hardcoded in the label here. */
export const PROMO_FILTER_TYPE_CONFIG: Record<PromoFilterType, PromoFilterTypeConfig> = {
  all: { label: "Toutes les promos", icon: "sparkle" },
  flash: { label: "Ventes Flash", icon: "zap" },
  multibuy: { label: "1 acheté = 1 offert", icon: "basket" },
  "anti-gaspi": { label: "Dates courtes anti-gaspi", icon: "timer" },
  discovery: { label: "Paniers découverte", icon: "glass" },
};

/** Unknown/missing value → "all", never a crash. */
export function parsePromoFilterType(value: string | string[] | undefined): PromoFilterType {
  const candidates: PromoFilterType[] = ["all", "flash", "multibuy", "anti-gaspi", "discovery"];
  return candidates.includes(value as PromoFilterType) ? (value as PromoFilterType) : "all";
}

export interface FlashSale {
  endsAtIso: string;
}

const flashDayFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "Europe/Paris" });
const flashHourFormatter = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", timeZone: "Europe/Paris", hour12: false });

function parisDayKey(date: Date): string {
  return new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris" }).format(date); // "YYYY-MM-DD", stable sort/compare key
}

/** "ce soir 20H" / "demain 20H" / "le 12 nov. 20H" — `now` is always injected, this never reads the clock itself. */
export function formatFlashDeadline(endsAtIso: string, now: Date): string {
  const endsAt = new Date(endsAtIso);
  const hour = flashHourFormatter.format(endsAt).replace(/\D/g, "");
  const todayKey = parisDayKey(now);
  const endsAtKey = parisDayKey(endsAt);
  if (endsAtKey === todayKey) return `ce soir ${hour}H`;

  const tomorrow = new Date(now.getTime() + 86_400_000);
  if (endsAtKey === parisDayKey(tomorrow)) return `demain ${hour}H`;

  return `le ${flashDayFormatter.format(endsAt)} ${hour}H`;
}

export interface PromoCategorySectionData {
  aisleSlug: string;
  title: string;
  chipLabel: string;
  subtitle: string;
  totalCount: number;
  products: PromoProduct[];
}

export interface StoreTopProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: Media;
}

export interface StorePromoSummary {
  slug: string;
  name: string;
  address: string;
  storeKindLabel: string;
  rating: { average: number; reviewCount: number };
  image: Media;
  pickupMinutes: number;
  discountLabel: string;
  itemsOnPromoCount: number;
  productTags: string[];
  /** The fields below back the Favoris "Épiceries" tab's richer card — unused by `StorePromoCard` (Bons Plans listing). */
  distanceMeters: number;
  description: string;
  openingHours: StoreDetail["openingHours"];
  /** Data-driven, per store — never a single hardcoded string across every card. */
  trustLabel: string;
  deliversToHome: boolean;
  /** Only meaningful when `deliversToHome` is true; the badge itself also requires `FEATURE_FLAGS.homeDelivery` (see `getDeliveryBadgeLabel`). */
  deliveryMinutes?: number;
  /** Max 3 — enforced by the fixture, not re-sliced at render time. */
  topProducts: StoreTopProduct[];
}

/** "● Ouvert" / "Fermé" — the one place a store's open/closed state is computed, reusing the fiche-boutique's own `getOpeningStatus`. */
export function getStorePromoOpeningStatus(store: StorePromoSummary, now: Date): OpeningStatus {
  return getOpeningStatus(store.openingHours, now);
}

/** `null` unless both the store carries delivery AND the global flag is on — the FAQ's "Bientôt disponible" promise stays true everywhere else in the app. */
export function getDeliveryBadgeLabel(store: StorePromoSummary): string | null {
  if (!FEATURE_FLAGS.homeDelivery || !store.deliversToHome || store.deliveryMinutes === undefined) return null;
  return `Livraison ${store.deliveryMinutes} min`;
}

/** Same Google Maps deep-link convention as `buildDirectionsUrl` (store-detail.ts), adapted for `StorePromoSummary.address`'s single free-text string instead of a `{street, city}` shape. */
export function buildStorePromoDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export interface PromoScopeOption {
  slug: string;
  name: string;
}

/** "LoirIvoire & 4 autres" when everything is selected, a count otherwise — never built inline at the call site. */
export function formatScopeLabel(primaryStoreName: string, selectedCount: number, totalCount: number): string {
  if (selectedCount >= totalCount) {
    return totalCount <= 1 ? primaryStoreName : `${primaryStoreName} & ${totalCount - 1} autres`;
  }
  if (selectedCount <= 1) return primaryStoreName;
  return `${selectedCount} épiceries sélectionnées`;
}

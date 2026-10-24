import type { Media } from "@/src/domain/store-merchandising";
import type { TerroirRegionSlug } from "@/src/domain/terroir";
import { computeUnitPricePerKg, formatPrice, formatUnitPrice } from "@/src/lib/format";

export type FavoriteKind = "product" | "store" | "recipe";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock" | "unknown";

export const STOCK_STATUS_CONFIG: Record<Exclude<StockStatus, "unknown">, { label: string; tone: "success" | "warning" | "danger" }> = {
  "in-stock": { label: "En stock", tone: "success" },
  "low-stock": { label: "Stock limité", tone: "warning" },
  "out-of-stock": { label: "Indisponible", tone: "danger" },
};

/** `null` for "unknown" — no stock line is shown at all (rule: "aucune ligne si le stock est inconnu"), never a 4th config entry pretending to be a status. */
export function getStockStatusConfig(status: StockStatus) {
  return status === "unknown" ? null : STOCK_STATUS_CONFIG[status];
}

export interface FavoriteProductUnitBasis {
  quantity: number;
  unit: "g" | "ml";
}

export interface FavoriteProduct {
  id: string;
  slug: string;
  name: string;
  packagingLabel: string;
  price: number;
  storeSlug: string;
  storeName: string;
  stockStatus: StockStatus;
  terroirRegion: TerroirRegionSlug;
  image: Media;
  /** Omitted for non-weighed items (e.g. "la botte") — `formatFavoriteUnitPrice` falls back to "Prix unitaire". */
  unitBasis?: FavoriteProductUnitBasis;
}

/**
 * "10,25 €/kg" / "4,50 €/L" / "Prix unitaire" — standard rounding (not the
 * maquette's truncation, see compte-rendu écart). Reuses
 * `computeUnitPricePerKg`/`formatUnitPrice` from `format.ts` for the "g"
 * case (same per-kg formula every other per-weight price in the app uses)
 * rather than restating the division — "ml" has no per-liter formatter
 * there yet, so that suffix is still built locally.
 */
export function formatFavoriteUnitPrice(price: number, unitBasis?: FavoriteProductUnitBasis): string {
  if (!unitBasis) return "Prix unitaire";
  if (unitBasis.unit === "g") return formatUnitPrice(computeUnitPricePerKg(price, unitBasis.quantity));
  const perLiterPrice = computeUnitPricePerKg(price, unitBasis.quantity);
  return `${formatPrice(perLiterPrice)}/L`;
}

export interface FavoriteRecipe {
  id: string;
  name: string;
  servings: number;
  totalPrice: number;
  image: Media;
  href: string;
}

export type FavoritesSortOption = "recent" | "price-asc" | "price-desc" | "name-asc";

export const FAVORITES_SORT_CONFIG: Record<FavoritesSortOption, { label: string }> = {
  recent: { label: "Derniers ajouts" },
  "price-asc": { label: "Prix croissant" },
  "price-desc": { label: "Prix décroissant" },
  "name-asc": { label: "Nom A→Z" },
};

/** `recentOrder` is the ids in "last added" order (index 0 = most recent) — `recent` can't be derived from `FavoriteProduct` fields alone. */
export function sortFavoriteProducts(products: FavoriteProduct[], sort: FavoritesSortOption, recentOrder: string[]): FavoriteProduct[] {
  const sorted = [...products];
  switch (sort) {
    case "recent":
      return sorted.sort((a, b) => recentOrder.indexOf(a.id) - recentOrder.indexOf(b.id));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    default: {
      const exhaustive: never = sort;
      throw new Error(`Unhandled sort option: ${exhaustive}`);
    }
  }
}

export function parseFavoritesSort(value: string | undefined): FavoritesSortOption {
  if (value === "price-asc" || value === "price-desc" || value === "name-asc") return value;
  return "recent";
}

export type FavoritesTab = "produits" | "epiceries" | "recettes";

export function parseFavoritesTab(value: string | undefined): FavoritesTab {
  if (value === "epiceries" || value === "recettes") return value;
  return "produits";
}

export function parseTerroirRegionFilter(value: string | undefined): TerroirRegionSlug | "all" {
  if (value === "afrique-ouest" || value === "caraibes-ocean-indien" || value === "maghreb") return value;
  return "all";
}

export interface BulkSelectionStoreSummary {
  storeSlug: string;
  storeName: string;
  count: number;
  totalPrice: number;
}

export interface BulkSelectionSummary {
  count: number;
  totalPrice: number;
  byStore: BulkSelectionStoreSummary[];
}

/**
 * Always computed from the actual selection, never a fixture number (rule:
 * "le total affiché est TOUJOURS calculé" — fixes the maquette's own
 * 32,70 €/35,50 € discrepancy, see compte-rendu écart). Out-of-stock items
 * can't be selected in the first place (callers filter them out of
 * `selectedIds` before calling this), so there's no separate skip logic here.
 */
export function computeBulkSelection(products: FavoriteProduct[], selectedIds: Set<string>): BulkSelectionSummary {
  const selected = products.filter((product) => selectedIds.has(product.id));
  const byStoreMap = new Map<string, BulkSelectionStoreSummary>();

  for (const product of selected) {
    const existing = byStoreMap.get(product.storeSlug);
    if (existing) {
      existing.count += 1;
      existing.totalPrice += product.price;
    } else {
      byStoreMap.set(product.storeSlug, { storeSlug: product.storeSlug, storeName: product.storeName, count: 1, totalPrice: product.price });
    }
  }

  return {
    count: selected.length,
    totalPrice: selected.reduce((sum, product) => sum + product.price, 0),
    byStore: Array.from(byStoreMap.values()),
  };
}

export interface FavoriteProductFilters {
  terroirRegion: TerroirRegionSlug | "all";
  inStockOnly: boolean;
  storeSlugs: string[];
  query: string;
}

/** Pure, tested — every Favoris toolbar control (terroir chip, "En stock uniquement", boutiques, search) narrows the same list, never client-only state hidden from the URL. */
export function filterFavoriteProducts(products: FavoriteProduct[], filters: FavoriteProductFilters): FavoriteProduct[] {
  const normalizedQuery = filters.query.trim().toLowerCase();
  return products.filter((product) => {
    if (filters.terroirRegion !== "all" && product.terroirRegion !== filters.terroirRegion) return false;
    if (filters.inStockOnly && product.stockStatus !== "in-stock") return false;
    if (filters.storeSlugs.length > 0 && !filters.storeSlugs.includes(product.storeSlug)) return false;
    if (normalizedQuery && !product.name.toLowerCase().includes(normalizedQuery)) return false;
    return true;
  });
}

export interface FavoritesCounts {
  products: number;
  stores: number;
  recipes: number;
}

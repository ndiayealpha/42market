import type { SearchResultProduct } from "@/src/domain/product-cards";

export interface SearchCampaign {
  storeSlug: string;
  storeName: string;
  title: string;
  body: string;
  highlightedPhrase: string;
  code: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Union, not a free-text string — a store's one headline fact, rendered by an exhaustive switch (rule O). */
export type StoreHighlight = { kind: "promo"; text: string } | { kind: "neutral"; text: string } | { kind: "tagline"; text: string };

export type StoreResultsLink =
  | { kind: "catalog"; totalCount: number; href: string }
  | { kind: "search"; foundCount: number; href: string }
  | { kind: "aisle"; aisleLabel: string; href: string };

/** Fallback when the data gives no explicit link kind: more matches than shown → "search", otherwise "catalog" (rule: never a dangling "voir tout" with nothing more to show). */
export function resolveStoreResultsLink(displayedCount: number, foundCount: number, catalogHref: string, searchHref: string): StoreResultsLink {
  return foundCount > displayedCount ? { kind: "search", foundCount, href: searchHref } : { kind: "catalog", totalCount: foundCount, href: catalogHref };
}

export interface SearchStoreGroup {
  slug: string;
  name: string;
  rating?: { average: number; reviewCount?: number };
  pickupLabel: string;
  distanceLabel: string;
  highlight: StoreHighlight;
  resultsLink: StoreResultsLink;
  products: SearchResultProduct[];
}

export const SEARCH_GROUP_MAX_PRODUCTS = 6;

export type SearchSortOption = "distance" | "pickup" | "rating" | "price-asc";

export const SEARCH_SORT_CONFIG: Record<SearchSortOption, { label: string }> = {
  distance: { label: "Distance croissante" },
  pickup: { label: "Retrait le plus rapide" },
  rating: { label: "Mieux notées" },
  "price-asc": { label: "Prix croissant" },
};

export function parseSearchSort(value: string | undefined): SearchSortOption {
  if (value === "pickup" || value === "rating" || value === "price-asc") return value;
  return "distance";
}

export interface SearchFiltersState {
  pickupWithin2h: boolean;
  promoOnly: boolean;
  bulkOnly: boolean;
  storeSlug: string | "all";
  sort: SearchSortOption;
}

/** Unknown/missing values fall back to their defaults, never a crash (rule 10) — every control's state lives in the URL, never hidden client-only state. */
export function parseSearchFilters(params: {
  retrait?: string;
  promo?: string;
  gros?: string;
  epicerie?: string;
  tri?: string;
}): SearchFiltersState {
  return {
    pickupWithin2h: params.retrait === "2h",
    promoOnly: params.promo === "1",
    bulkOnly: params.gros === "1",
    storeSlug: params.epicerie ?? "all",
    sort: parseSearchSort(params.tri),
  };
}

/** Trims, compacts internal whitespace, and caps length — the query is only ever rendered as text, never injected as markup. */
export function normalizeSearchQuery(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, 80);
}

export interface SearchResultsSummary {
  query: string;
  totalResults: number;
  totalStoresWithResults: number;
  cityLabel: string;
  campaign?: SearchCampaign;
  groups: SearchStoreGroup[];
}

/** Pure sort over already-filtered groups — unknown option never reached thanks to `parseSearchSort`. */
export function sortSearchGroups(groups: SearchStoreGroup[], sort: SearchSortOption): SearchStoreGroup[] {
  const sorted = [...groups];
  switch (sort) {
    case "distance":
      return sorted;
    case "pickup":
      return sorted.sort((a, b) => a.pickupLabel.localeCompare(b.pickupLabel, "fr"));
    case "rating":
      return sorted.sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0));
    case "price-asc":
      return sorted.sort((a, b) => Math.min(...a.products.map((p) => p.price), Infinity) - Math.min(...b.products.map((p) => p.price), Infinity));
    default: {
      const exhaustive: never = sort;
      throw new Error(`Unhandled sort option: ${exhaustive}`);
    }
  }
}

/** A store filtered out entirely by "Promo en cours" / "Gros / Carton" has no matching products left — omitted, never an empty card (rule 10). */
export function filterSearchGroups(groups: SearchStoreGroup[], filters: SearchFiltersState): SearchStoreGroup[] {
  return groups
    .filter((group) => filters.storeSlug === "all" || group.slug === filters.storeSlug)
    .filter((group) => (filters.promoOnly ? group.products.some((product) => product.badge?.kind === "discount") : true));
}

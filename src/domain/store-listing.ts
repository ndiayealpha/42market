import type { Store } from "@/src/domain/store";

/** Below this, a store counts as "Retrait < 15 min" for the quick-pickup toggle. */
export const QUICK_PICKUP_MAX_MINUTES = 15;

export type StoreListingSort = "distance" | "rating" | "pickup";

export const STORE_LISTING_SORT_OPTIONS: { value: StoreListingSort; label: string }[] = [
  { value: "distance", label: "Distance (la plus proche)" },
  { value: "rating", label: "Note (la plus élevée)" },
  { value: "pickup", label: "Retrait (le plus rapide)" },
];

export interface StoreListingFilters {
  /** `null` = "Tous les quartiers". */
  neighborhood: string | null;
  openNow: boolean;
  quickPickup: boolean;
  activePromosOnly: boolean;
}

export const DEFAULT_STORE_LISTING_FILTERS: StoreListingFilters = {
  neighborhood: null,
  openNow: false,
  quickPickup: false,
  activePromosOnly: false,
};

/** Validates a `?tri=` URL param, same convention as `parsePromoFilterType`. */
export function parseStoreListingSort(value: string | string[] | undefined): StoreListingSort {
  const candidates: StoreListingSort[] = ["distance", "rating", "pickup"];
  return candidates.includes(value as StoreListingSort) ? (value as StoreListingSort) : "distance";
}

/** Validates a `?quartier=` URL param against the neighborhoods actually present — an unknown or stale value falls back to "tous les quartiers" rather than silently filtering to nothing. */
export function parseStoreListingNeighborhood(value: string | string[] | undefined, availableNeighborhoods: string[]): string | null {
  return typeof value === "string" && availableNeighborhoods.includes(value) ? value : null;
}

/** "true"/"1" → on, anything else → off — the 3 boolean toggle params (`ouvert`, `retrait`, `promos`). */
export function parseStoreListingToggle(value: string | string[] | undefined): boolean {
  return value === "true" || value === "1";
}

/** Distinct neighborhoods across every store, sorted for a stable `<select>` order. */
export function getStoreNeighborhoods(stores: Store[]): string[] {
  return Array.from(new Set(stores.map((store) => store.neighborhood))).sort((a, b) => a.localeCompare(b, "fr"));
}

export function filterStores(stores: Store[], filters: StoreListingFilters): Store[] {
  return stores
    .filter((store) => !filters.neighborhood || store.neighborhood === filters.neighborhood)
    .filter((store) => !filters.openNow || store.status.kind === "open")
    .filter((store) => !filters.quickPickup || store.pickupMinutes <= QUICK_PICKUP_MAX_MINUTES)
    .filter((store) => !filters.activePromosOnly || Boolean(store.promo));
}

export function sortStores(stores: Store[], sort: StoreListingSort): Store[] {
  const sorted = [...stores];
  switch (sort) {
    case "distance":
      return sorted.sort((a, b) => a.distanceMeters - b.distanceMeters);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "pickup":
      return sorted.sort((a, b) => a.pickupMinutes - b.pickupMinutes);
    default: {
      const exhaustive: never = sort;
      throw new Error(`Unhandled store listing sort: ${JSON.stringify(exhaustive)}`);
    }
  }
}

/** "18 épiceries" / "1 épicerie" — fr-FR treats 0 as plural, same convention as `formatPromoCountLabel`. */
export function formatStoreCountLabel(count: number): string {
  return count === 1 ? "1 épicerie" : `${count} épiceries`;
}

"use client";

import { useFavorites } from "@/src/hooks/useFavorites";
import { useStorePromos } from "@/src/hooks/useStorePromos";

/** Reuses the existing store-promos catalog (`StorePromoSummary`) rather than a new fixture — favorited stores are just a filtered view of it. */
export function useFavoriteStores(enabled = true) {
  const { favoriteIds, isLoading: isFavoriteIdsLoading } = useFavorites("store");
  const storesQuery = useStorePromos(enabled);

  const stores = storesQuery.stores.filter((store) => favoriteIds.has(store.slug));

  return {
    stores,
    isLoading: isFavoriteIdsLoading || storesQuery.isLoading,
    isError: storesQuery.isError,
    refetch: storesQuery.refetch,
  };
}

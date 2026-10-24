"use client";

import { useQuery } from "@tanstack/react-query";

import { useFavorites } from "@/src/hooks/useFavorites";
import { mockFavoritesCatalogRepository } from "@/src/services/favorites-catalog.repository";

/** Joins the favorited product ids with the favoritable-products catalog — only favorited ones render. `enabled` lets the Favoris page fetch only the active tab's data (rule F2). */
export function useFavoriteProducts(enabled = true) {
  const { favoriteIds, isLoading: isFavoriteIdsLoading } = useFavorites("product");
  const catalogQuery = useQuery({
    queryKey: ["favorites", "products-catalog"],
    queryFn: () => mockFavoritesCatalogRepository.getFavoriteProductsCatalog(),
    enabled,
  });
  const recentOrderQuery = useQuery({
    queryKey: ["favorites", "recent-order"],
    queryFn: () => mockFavoritesCatalogRepository.getRecentOrder(),
    enabled,
  });

  const products = (catalogQuery.data ?? []).filter((product) => favoriteIds.has(product.id));

  return {
    products,
    recentOrder: recentOrderQuery.data ?? [],
    isLoading: isFavoriteIdsLoading || catalogQuery.isPending || recentOrderQuery.isPending,
    isError: catalogQuery.isError || recentOrderQuery.isError,
    refetch: catalogQuery.refetch,
  };
}

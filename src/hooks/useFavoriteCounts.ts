"use client";

import { useQuery } from "@tanstack/react-query";

import type { FavoritesCounts } from "@/src/domain/favorites";
import { mockFavoritesRepository } from "@/src/services/favorites.repository";

/** One query for all 3 tab counts (rule F2: "les 3 compteurs viennent d'une requête légère unique"), not 3 separate hook calls each re-rendering the tabs independently. */
export function useFavoriteCounts() {
  const query = useQuery({
    queryKey: ["favorites", "counts"],
    queryFn: async (): Promise<FavoritesCounts> => {
      const [products, stores, recipes] = await Promise.all([
        mockFavoritesRepository.getFavoriteIds("product"),
        mockFavoritesRepository.getFavoriteIds("store"),
        mockFavoritesRepository.getFavoriteIds("recipe"),
      ]);
      return { products: products.size, stores: stores.size, recipes: recipes.size };
    },
  });
  return { counts: query.data ?? { products: 0, stores: 0, recipes: 0 }, isLoading: query.isPending, isError: query.isError };
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { useFavorites } from "@/src/hooks/useFavorites";
import { mockFavoritesCatalogRepository } from "@/src/services/favorites-catalog.repository";

export function useFavoriteRecipes(enabled = true) {
  const { favoriteIds, isLoading: isFavoriteIdsLoading } = useFavorites("recipe");
  const catalogQuery = useQuery({
    queryKey: ["favorites", "recipes-catalog"],
    queryFn: () => mockFavoritesCatalogRepository.getFavoriteRecipesCatalog(),
    enabled,
  });

  const recipes = (catalogQuery.data ?? []).filter((recipe) => favoriteIds.has(recipe.id));

  return {
    recipes,
    isLoading: isFavoriteIdsLoading || catalogQuery.isPending,
    isError: catalogQuery.isError,
    refetch: catalogQuery.refetch,
  };
}

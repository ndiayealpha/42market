"use client";

import { useQuery } from "@tanstack/react-query";

import { mockStoreCatalogRepository } from "@/src/services/store-catalog.repository";

export function useRecipeKit(storeSlug: string) {
  const query = useQuery({
    queryKey: ["catalog", "recipe-kit", storeSlug],
    queryFn: () => mockStoreCatalogRepository.getRecipeKit(storeSlug),
  });
  return { recipeKit: query.data ?? null, isLoading: query.isPending, isError: query.isError };
}

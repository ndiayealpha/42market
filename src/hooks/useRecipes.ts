"use client";

import { useQuery } from "@tanstack/react-query";

import { mockRecipesRepository } from "@/src/services/recipes.repository";

export function useRecipes() {
  const recipesQuery = useQuery({ queryKey: ["recipes", "list"], queryFn: () => mockRecipesRepository.list() });
  const recentOrderQuery = useQuery({ queryKey: ["recipes", "recent-order"], queryFn: () => mockRecipesRepository.getRecentOrder() });

  return {
    recipes: recipesQuery.data ?? [],
    recentOrder: recentOrderQuery.data ?? [],
    isLoading: recipesQuery.isPending || recentOrderQuery.isPending,
    isError: recipesQuery.isError || recentOrderQuery.isError,
    refetch: recipesQuery.refetch,
  };
}

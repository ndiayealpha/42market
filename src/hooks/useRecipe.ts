"use client";

import { useQuery } from "@tanstack/react-query";

import { mockRecipesRepository } from "@/src/services/recipes.repository";

export function useRecipe(slug: string) {
  const query = useQuery({ queryKey: ["recipes", "detail", slug], queryFn: () => mockRecipesRepository.getBySlug(slug) });
  return { recipe: query.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

"use client";

import { useQuery } from "@tanstack/react-query";

import type { SearchFiltersState } from "@/src/domain/search";
import { mockSearchRepository } from "@/src/services/search.repository";

/** Thin `useQuery` wrapper, same shape as the rest of the repo's data hooks — key includes every filter so a new URL state always refetches. */
export function useSearchResults(query: string, filters: SearchFiltersState) {
  const result = useQuery({
    queryKey: [
      "search",
      query,
      filters.pickupWithin2h,
      filters.promoOnly,
      filters.bulkOnly,
      filters.storeSlug,
      filters.sort,
    ],
    queryFn: () => mockSearchRepository.search(query, filters),
  });

  return {
    summary: result.data,
    isLoading: result.isPending,
    isError: result.isError,
    refetch: result.refetch,
  };
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

export function useStoreCategories(slug: string) {
  const query = useQuery({
    queryKey: ["store-detail", "categories", slug],
    queryFn: () => mockStoreDetailRepository.getCategories(slug),
  });
  return { categories: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

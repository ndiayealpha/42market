"use client";

import { useQuery } from "@tanstack/react-query";

import { mockStoreCatalogRepository } from "@/src/services/store-catalog.repository";

export function useAisles(storeSlug: string) {
  const query = useQuery({
    queryKey: ["catalog", "aisles", storeSlug],
    queryFn: () => mockStoreCatalogRepository.getAisles(storeSlug),
  });
  return { aisles: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { mockCatalogRepository } from "@/src/services/catalog.repository";

export function useAllStores() {
  const query = useQuery({
    queryKey: ["stores", "all"],
    queryFn: () => mockCatalogRepository.getAllStores(),
  });
  return { stores: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

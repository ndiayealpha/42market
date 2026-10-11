"use client";

import { useQuery } from "@tanstack/react-query";

import { mockCatalogRepository } from "@/src/services/catalog.repository";

export function useNearbyStores() {
  const query = useQuery({
    queryKey: ["stores", "nearby"],
    queryFn: () => mockCatalogRepository.getNearbyStores(),
  });
  return { stores: query.data ?? [], isLoading: query.isPending };
}

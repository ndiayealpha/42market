"use client";

import { useQuery } from "@tanstack/react-query";

import { mockCatalogRepository } from "@/src/services/catalog.repository";

export function useCityStores() {
  const query = useQuery({
    queryKey: ["stores", "city"],
    queryFn: () => mockCatalogRepository.getCityStores(),
  });
  return { stores: query.data ?? [], isLoading: query.isPending };
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { mockStoreDealsRepository } from "@/src/services/store-deals.repository";

export function useStoreDeals() {
  const query = useQuery({
    queryKey: ["store-deals"],
    queryFn: () => mockStoreDealsRepository.getStoreDeals(),
  });
  return { stores: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

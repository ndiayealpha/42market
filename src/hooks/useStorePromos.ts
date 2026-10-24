"use client";

import { useQuery } from "@tanstack/react-query";

import { mockPromotionsRepository } from "@/src/services/promotions.repository";

export function useStorePromos(enabled = true) {
  const query = useQuery({
    queryKey: ["promotions", "store-promos"],
    queryFn: () => mockPromotionsRepository.getStorePromos(),
    enabled,
  });
  return {
    stores: query.data?.stores ?? [],
    openForExpressPickupCount: query.data?.openForExpressPickupCount ?? 0,
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { mockPromotionsRepository } from "@/src/services/promotions.repository";

export function useFlashSale(storeSlug: string) {
  const query = useQuery({
    queryKey: ["promotions", "flash-sale", storeSlug],
    queryFn: () => mockPromotionsRepository.getFlashSale(storeSlug),
  });
  return { flashSale: query.data ?? null, isLoading: query.isPending };
}

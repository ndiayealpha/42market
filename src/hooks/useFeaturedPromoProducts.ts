"use client";

import { useQuery } from "@tanstack/react-query";

import type { PromoFilterType } from "@/src/domain/promotions";
import { mockPromotionsRepository } from "@/src/services/promotions.repository";

export function useFeaturedPromoProducts(storeSlug: string, type: PromoFilterType) {
  const query = useQuery({
    queryKey: ["promotions", "featured", storeSlug, type],
    queryFn: () => mockPromotionsRepository.getFeaturedPromoProducts(storeSlug, type),
  });
  return {
    products: query.data?.products ?? [],
    totalCount: query.data?.totalCount ?? 0,
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
}

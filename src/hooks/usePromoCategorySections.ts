"use client";

import { useQuery } from "@tanstack/react-query";

import type { PromoFilterType } from "@/src/domain/promotions";
import { mockPromotionsRepository } from "@/src/services/promotions.repository";

export function usePromoCategorySections(storeSlug: string, storeSlugs: string[], type: PromoFilterType) {
  const query = useQuery({
    queryKey: ["promotions", "sections", storeSlug, [...storeSlugs].sort(), type],
    queryFn: () => mockPromotionsRepository.getPromoCategorySections(storeSlug, storeSlugs, type),
  });
  return { sections: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

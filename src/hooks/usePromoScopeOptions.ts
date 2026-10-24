"use client";

import { useQuery } from "@tanstack/react-query";

import { mockPromotionsRepository } from "@/src/services/promotions.repository";

export function usePromoScopeOptions() {
  const query = useQuery({
    queryKey: ["promotions", "scope-options"],
    queryFn: () => mockPromotionsRepository.getScopeOptions(),
  });
  return { options: query.data ?? [], isLoading: query.isPending };
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { mockPromotionsRepository } from "@/src/services/promotions.repository";

export function useCatalogReassuranceCards() {
  const query = useQuery({
    queryKey: ["promotions", "reassurance-cards"],
    queryFn: () => mockPromotionsRepository.getReassuranceCards(),
  });
  return { items: query.data ?? [], isLoading: query.isPending };
}

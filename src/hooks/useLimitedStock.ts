"use client";

import { useQuery } from "@tanstack/react-query";

import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

export function useLimitedStock(slug: string) {
  const query = useQuery({
    queryKey: ["store-detail", "limited-stock", slug],
    queryFn: () => mockStoreDetailRepository.getLimitedStock(slug),
  });
  return { items: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

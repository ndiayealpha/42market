"use client";

import { useQuery } from "@tanstack/react-query";

import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

export function useBestSellers(slug: string) {
  const query = useQuery({
    queryKey: ["store-detail", "best-sellers", slug],
    queryFn: () => mockStoreDetailRepository.getBestSellers(slug),
  });
  return { bestSellers: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

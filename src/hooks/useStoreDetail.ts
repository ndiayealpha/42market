"use client";

import { useQuery } from "@tanstack/react-query";

import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

export function useStoreDetail(slug: string) {
  const query = useQuery({
    queryKey: ["store-detail", "store", slug],
    queryFn: () => mockStoreDetailRepository.getStore(slug),
  });
  return { store: query.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

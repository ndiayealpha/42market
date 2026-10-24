"use client";

import { useQuery } from "@tanstack/react-query";

import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

export function useStoreOffers(slug: string) {
  const query = useQuery({
    queryKey: ["store-detail", "offers", slug],
    queryFn: () => mockStoreDetailRepository.getOffers(slug),
  });
  return { offers: query.data?.offers ?? [], summary: query.data, isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

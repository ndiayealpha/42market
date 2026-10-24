"use client";

import { useQuery } from "@tanstack/react-query";

import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

export function usePromoBanner(slug: string) {
  const query = useQuery({
    queryKey: ["store-detail", "promo-banner", slug],
    queryFn: () => mockStoreDetailRepository.getPromoBanner(slug),
  });
  return { banner: query.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

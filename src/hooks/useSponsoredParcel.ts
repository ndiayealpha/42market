"use client";

import { useQuery } from "@tanstack/react-query";

import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

export function useSponsoredParcel(slug: string) {
  const query = useQuery({
    queryKey: ["store-detail", "sponsored-parcel", slug],
    queryFn: () => mockStoreDetailRepository.getSponsoredParcel(slug),
  });
  return { parcel: query.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

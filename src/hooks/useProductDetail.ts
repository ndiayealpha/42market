"use client";

import { useQuery } from "@tanstack/react-query";

import { mockProductDetailRepository } from "@/src/services/product-detail.repository";

/** Same shape as every other repository-backed hook (`useCatalogProducts`, `useStoreDetail`) — the route itself already resolved/validated the product server-side; this is the client-side re-fetch `ProductDetailView` renders from. */
export function useProductDetail(storeSlug: string, productSlug: string) {
  const query = useQuery({
    queryKey: ["product-detail", storeSlug, productSlug],
    queryFn: () => mockProductDetailRepository.getProduct(storeSlug, productSlug),
  });

  return {
    product: query.data ?? null,
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
}

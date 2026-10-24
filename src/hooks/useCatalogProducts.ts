"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import type { CatalogScope, CatalogSortOption } from "@/src/domain/catalog";
import { mockStoreCatalogRepository } from "@/src/services/store-catalog.repository";

function scopeKey(scope: CatalogScope): string {
  return scope.type === "all" ? "all" : `rayon:${scope.slug}`;
}

export function useCatalogProducts(storeSlug: string, scope: CatalogScope, sort: CatalogSortOption) {
  const query = useInfiniteQuery({
    queryKey: ["catalog", "products", storeSlug, scopeKey(scope), sort],
    queryFn: ({ pageParam }) => mockStoreCatalogRepository.getProducts(storeSlug, scope, sort, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * lastPage.pageSize;
      return loaded < lastPage.totalCount ? lastPage.page + 1 : undefined;
    },
  });

  const products = query.data?.pages.flatMap((page) => page.products) ?? [];
  const totalCount = query.data?.pages[0]?.totalCount ?? 0;

  return {
    products,
    totalCount,
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
    hasMore: Boolean(query.hasNextPage),
    isLoadingMore: query.isFetchingNextPage,
    loadMore: query.fetchNextPage,
  };
}

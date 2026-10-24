"use client";

import { useRouter } from "next/navigation";

import type { CatalogScope, CatalogSortOption } from "@/src/domain/catalog";
import type { StoreDetail } from "@/src/domain/store-detail";
import { useAisles } from "@/src/hooks/useAisles";
import { useCatalogProducts } from "@/src/hooks/useCatalogProducts";
import { useRecipeKit } from "@/src/hooks/useRecipeKit";
import { routes } from "@/src/lib/routing/routes";

import { StoreCatalogTemplate } from "./StoreCatalogTemplate";

export interface StoreCatalogViewProps {
  store: StoreDetail;
  now: Date;
  scope: CatalogScope;
  initialSort: CatalogSortOption;
}

/** Thin container: wires every hook, resolves the view model, and hands it to the pure `StoreCatalogTemplate` (same split as `ProfileView`/`StorePageView`). */
export function StoreCatalogView({ store, now, scope, initialSort }: StoreCatalogViewProps) {
  const router = useRouter();

  const aislesQuery = useAisles(store.id);
  const productsQuery = useCatalogProducts(store.id, scope, initialSort);
  const recipeKitQuery = useRecipeKit(store.id);

  function handleSortChange(sort: CatalogSortOption) {
    const target = scope.type === "all" ? routes.main.epicerieRayons(store.id) : routes.main.epicerieRayon(store.id, scope.slug);
    router.push(sort === "populaires" ? target : `${target}?sort=${sort}`);
  }

  return (
    <StoreCatalogTemplate
      store={store}
      now={now}
      scope={scope}
      aisles={aislesQuery.aisles}
      isAislesLoading={aislesQuery.isLoading}
      isAislesError={aislesQuery.isError}
      onRetryAisles={aislesQuery.refetch}
      products={productsQuery.products}
      totalCount={productsQuery.totalCount}
      isProductsLoading={productsQuery.isLoading}
      isProductsError={productsQuery.isError}
      onRetryProducts={productsQuery.refetch}
      hasMoreProducts={productsQuery.hasMore}
      isLoadingMoreProducts={productsQuery.isLoadingMore}
      onLoadMoreProducts={productsQuery.loadMore}
      sort={initialSort}
      onSortChange={handleSortChange}
      recipeKit={recipeKitQuery.recipeKit}
      isRecipeKitLoading={recipeKitQuery.isLoading}
    />
  );
}

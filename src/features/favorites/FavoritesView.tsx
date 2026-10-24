"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  computeBulkSelection,
  filterFavoriteProducts,
  sortFavoriteProducts,
  type FavoritesSortOption,
  type FavoritesTab,
} from "@/src/domain/favorites";
import type { TerroirRegionSlug } from "@/src/domain/terroir";
import { useFavoriteCounts } from "@/src/hooks/useFavoriteCounts";
import { useFavoriteProducts } from "@/src/hooks/useFavoriteProducts";
import { useFavoriteRecipes } from "@/src/hooks/useFavoriteRecipes";
import { useFavoriteStores } from "@/src/hooks/useFavoriteStores";
import { routes } from "@/src/lib/routing/routes";

import { FavoritesTemplate } from "./FavoritesTemplate";

export interface FavoritesViewProps {
  cityName: string;
  activeTab: FavoritesTab;
  sort: FavoritesSortOption;
  terroirRegion: TerroirRegionSlug | "all";
  inStockOnly: boolean;
  storeSlugs: string[];
  query: string;
  now: Date;
  lastSyncedAtIso: string;
}

interface UrlState {
  onglet?: FavoritesTab;
  tri?: FavoritesSortOption;
  terroir?: TerroirRegionSlug | "all";
  stock?: boolean;
  boutiques?: string[];
  q?: string;
}

/** Thin container: wires every hook, resolves the view model (filter/sort/bulk-selection), and hands it to the pure `FavoritesTemplate`. */
export function FavoritesView({ cityName, activeTab, sort, terroirRegion, inStockOnly, storeSlugs, query, now, lastSyncedAtIso }: FavoritesViewProps) {
  const router = useRouter();
  const [isSelectionMode, setSelectionMode] = useState(false);
  const [manualSelectedIds, setManualSelectedIds] = useState<Set<string> | null>(null);

  const { counts } = useFavoriteCounts();
  const productsQuery = useFavoriteProducts(activeTab === "produits");
  const storesQuery = useFavoriteStores(activeTab === "epiceries");
  const recipesQuery = useFavoriteRecipes(activeTab === "recettes");

  function buildHref(overrides: UrlState): string {
    const next: Required<UrlState> = {
      onglet: overrides.onglet ?? activeTab,
      tri: overrides.tri ?? sort,
      terroir: overrides.terroir ?? terroirRegion,
      stock: overrides.stock ?? inStockOnly,
      boutiques: overrides.boutiques ?? storeSlugs,
      q: overrides.q ?? query,
    };
    const params = new URLSearchParams();
    if (next.onglet !== "produits") params.set("onglet", next.onglet);
    if (next.tri !== "recent") params.set("tri", next.tri);
    if (next.terroir !== "all") params.set("terroir", next.terroir);
    if (next.stock) params.set("stock", "1");
    if (next.boutiques.length > 0) params.set("boutiques", next.boutiques.join(","));
    if (next.q) params.set("q", next.q);
    const search = params.toString();
    return search ? `${routes.main.favorites}?${search}` : routes.main.favorites;
  }

  function navigate(overrides: UrlState) {
    router.push(buildHref(overrides));
  }

  const filteredProducts = sortFavoriteProducts(
    filterFavoriteProducts(productsQuery.products, { terroirRegion, inStockOnly, storeSlugs, query }),
    sort,
    productsQuery.recentOrder
  );

  const defaultSelectedIds = new Set(filteredProducts.filter((product) => product.stockStatus !== "out-of-stock").map((product) => product.id));
  const selectedIds = manualSelectedIds ?? defaultSelectedIds;
  const bulkSelection = computeBulkSelection(filteredProducts, selectedIds);

  const storeOptions = Array.from(new Map(productsQuery.products.map((product) => [product.storeSlug, product.storeName])).entries()).map(
    ([slug, name]) => ({ slug, name })
  );

  return (
    <FavoritesTemplate
      cityName={cityName}
      availableCount={counts.products}
      activeTab={activeTab}
      getTabHref={(tab) => buildHref({ onglet: tab })}
      counts={counts}
      lastSyncedAtIso={lastSyncedAtIso}
      now={now}
      sort={sort}
      onSortChange={(value) => navigate({ tri: value })}
      terroirRegion={terroirRegion}
      getTerroirHref={(region) => buildHref({ terroir: region })}
      inStockOnly={inStockOnly}
      onInStockOnlyChange={(value) => navigate({ stock: value })}
      storeOptions={storeOptions}
      selectedStoreSlugs={storeSlugs}
      onStoreSlugsChange={(slugs) => navigate({ boutiques: slugs })}
      query={query}
      onQueryChange={(value) => navigate({ q: value })}
      onResetFilters={() => navigate({ tri: "recent", terroir: "all", stock: false, boutiques: [], q: "" })}
      resetFiltersHref={buildHref({ tri: "recent", terroir: "all", stock: false, boutiques: [], q: "" })}
      products={filteredProducts}
      isProductsLoading={productsQuery.isLoading}
      isProductsError={productsQuery.isError}
      onRetryProducts={productsQuery.refetch}
      isSelectionMode={isSelectionMode}
      onToggleSelectionMode={() => {
        setSelectionMode((value) => !value);
        setManualSelectedIds(null);
      }}
      selectedIds={selectedIds}
      onToggleSelect={(productId) => {
        const next = new Set(manualSelectedIds ?? defaultSelectedIds);
        if (next.has(productId)) next.delete(productId);
        else next.add(productId);
        setManualSelectedIds(next);
      }}
      bulkSelection={bulkSelection}
      favoriteStores={storesQuery.stores}
      isStoresLoading={storesQuery.isLoading}
      isStoresError={storesQuery.isError}
      onRetryStores={storesQuery.refetch}
      favoriteRecipes={recipesQuery.recipes}
      isRecipesLoading={recipesQuery.isLoading}
      isRecipesError={recipesQuery.isError}
      onRetryRecipes={recipesQuery.refetch}
    />
  );
}

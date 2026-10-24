import { Container } from "@/src/components/layout/Container/Container";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import type { BulkSelectionSummary, FavoriteProduct, FavoritesCounts, FavoritesSortOption, FavoritesTab } from "@/src/domain/favorites";
import type { FavoriteRecipe } from "@/src/domain/favorites";
import type { StorePromoSummary } from "@/src/domain/promotions";
import type { TerroirRegionSlug } from "@/src/domain/terroir";

import { BulkAddBar } from "./BulkAddBar";
import { FavoriteProductGrid } from "./FavoriteProductGrid";
import { FavoriteRecipeCard } from "./FavoriteRecipeCard";
import { FavoriteStoreCard } from "./FavoriteStoreCard";
import { FavoritesHeader } from "./FavoritesHeader";
import { FavoritesTabs } from "./FavoritesTabs";
import { FavoritesToolbar } from "./FavoritesToolbar";

export interface FavoritesTemplateProps {
  cityName: string;
  availableCount: number;
  activeTab: FavoritesTab;
  getTabHref: (tab: FavoritesTab) => string;
  counts: FavoritesCounts;
  lastSyncedAtIso: string;
  now: Date;

  // Produits tab
  sort: FavoritesSortOption;
  onSortChange: (sort: FavoritesSortOption) => void;
  terroirRegion: TerroirRegionSlug | "all";
  getTerroirHref: (region: TerroirRegionSlug | "all") => string;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
  storeOptions: { slug: string; name: string }[];
  selectedStoreSlugs: string[];
  onStoreSlugsChange: (slugs: string[]) => void;
  query: string;
  onQueryChange: (query: string) => void;
  onResetFilters: () => void;
  resetFiltersHref: string;
  products: FavoriteProduct[];
  isProductsLoading: boolean;
  isProductsError: boolean;
  onRetryProducts: () => void;
  isSelectionMode: boolean;
  onToggleSelectionMode: () => void;
  selectedIds: Set<string>;
  onToggleSelect: (productId: string) => void;
  bulkSelection: BulkSelectionSummary;

  // Épiceries tab
  favoriteStores: StorePromoSummary[];
  isStoresLoading: boolean;
  isStoresError: boolean;
  onRetryStores: () => void;

  // Recettes tab
  favoriteRecipes: FavoriteRecipe[];
  isRecipesLoading: boolean;
  isRecipesError: boolean;
  onRetryRecipes: () => void;
}

function StoreGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton height={320} radius="2xl" />
      <Skeleton height={320} radius="2xl" />
      <Skeleton height={320} radius="2xl" />
    </div>
  );
}

/** Pure template — `FavoritesView` wires every hook and the URL-driven filter state. */
export function FavoritesTemplate(props: FavoritesTemplateProps) {
  const { activeTab } = props;

  return (
    <Container className="flex flex-col gap-6 py-6">
      <FavoritesHeader cityName={props.cityName} availableCount={props.availableCount} />

      <FavoritesTabs active={activeTab} counts={props.counts} getTabHref={props.getTabHref} lastSyncedAtIso={props.lastSyncedAtIso} now={props.now} />

      {activeTab === "produits" && (
        <>
          <FavoritesToolbar
            sort={props.sort}
            onSortChange={props.onSortChange}
            terroirRegion={props.terroirRegion}
            getTerroirHref={props.getTerroirHref}
            inStockOnly={props.inStockOnly}
            onInStockOnlyChange={props.onInStockOnlyChange}
            storeOptions={props.storeOptions}
            selectedStoreSlugs={props.selectedStoreSlugs}
            onStoreSlugsChange={props.onStoreSlugsChange}
            query={props.query}
            onQueryChange={props.onQueryChange}
            onResetFilters={props.onResetFilters}
          />

          {props.products.length > 0 && (
            <BulkAddBar
              count={props.bulkSelection.count}
              totalPrice={props.bulkSelection.totalPrice}
              byStore={props.bulkSelection.byStore}
              isSelectionMode={props.isSelectionMode}
              onToggleSelectionMode={props.onToggleSelectionMode}
              isLoading={props.isProductsLoading}
              isError={props.isProductsError}
              onRetry={props.onRetryProducts}
            />
          )}

          <FavoriteProductGrid
            products={props.products}
            totalFavoritesCount={props.counts.products}
            isSelectionMode={props.isSelectionMode}
            selectedIds={props.selectedIds}
            onToggleSelect={props.onToggleSelect}
            isLoading={props.isProductsLoading}
            isError={props.isProductsError}
            onRetry={props.onRetryProducts}
            resetFiltersHref={props.resetFiltersHref}
          />
        </>
      )}

      {activeTab === "epiceries" && (
        <AsyncSection isLoading={props.isStoresLoading} isError={props.isStoresError} onRetry={props.onRetryStores} skeleton={<StoreGridSkeleton />}>
          {props.favoriteStores.length === 0 ? (
            <EmptyState icon="store" title="Aucune épicerie favorite pour le moment." />
          ) : (
            <CardGrid columns={3}>
              {props.favoriteStores.map((store) => (
                <li key={store.slug}>
                  <FavoriteStoreCard store={store} />
                </li>
              ))}
            </CardGrid>
          )}
        </AsyncSection>
      )}

      {activeTab === "recettes" && (
        <AsyncSection isLoading={props.isRecipesLoading} isError={props.isRecipesError} onRetry={props.onRetryRecipes} skeleton={<StoreGridSkeleton />}>
          {props.favoriteRecipes.length === 0 ? (
            <EmptyState icon="cooking" title="Aucune recette favorite pour le moment." />
          ) : (
            <CardGrid columns={3}>
              {props.favoriteRecipes.map((recipe) => (
                <li key={recipe.id}>
                  <FavoriteRecipeCard recipe={recipe} />
                </li>
              ))}
            </CardGrid>
          )}
        </AsyncSection>
      )}
    </Container>
  );
}

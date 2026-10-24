import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { Container } from "@/src/components/layout/Container/Container";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import type { Category } from "@/src/domain/store-merchandising";
import type { CatalogScope, CatalogSortOption, Product } from "@/src/domain/catalog";
import type { StoreDetail } from "@/src/domain/store-detail";
import { getOpeningStatus } from "@/src/domain/store-detail";
import type { RecipeKit } from "@/src/domain/recipe-kit";
import { CategoriesSection } from "@/src/features/store-page/CategoriesSection";
import { StoreHeaderCard } from "@/src/features/store-page/StoreHeaderCard";
import { routes } from "@/src/lib/routing/routes";

import { CatalogToolbar } from "./CatalogToolbar";
import { LoadMore } from "./LoadMore";
import { ProductGrid } from "./ProductGrid";
import { RecipeKitCard } from "./RecipeKitCard";
import { StoreContextBar } from "./StoreContextBar";

export interface StoreCatalogTemplateProps {
  store: StoreDetail;
  now: Date;
  scope: CatalogScope;
  aisles: Category[];
  isAislesLoading: boolean;
  isAislesError: boolean;
  onRetryAisles: () => void;
  products: Product[];
  totalCount: number;
  isProductsLoading: boolean;
  isProductsError: boolean;
  onRetryProducts: () => void;
  hasMoreProducts: boolean;
  isLoadingMoreProducts: boolean;
  onLoadMoreProducts: () => void;
  sort: CatalogSortOption;
  onSortChange: (sort: CatalogSortOption) => void;
  recipeKit: RecipeKit | null;
  isRecipeKitLoading: boolean;
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} height={260} radius="xl" />
      ))}
    </div>
  );
}

/**
 * Pure template — no data fetching of its own; `StoreCatalogView` wires
 * every hook and passes the resolved view model here (same split as
 * `ProfileTemplate`/`ProfileView`). `scope` is a `CatalogScope` (rule O:
 * `all | rayon`, ready to extend with e.g. "nouvel-arrivage" later
 * without touching this component's contract).
 */
export function StoreCatalogTemplate({
  store,
  now,
  scope,
  aisles,
  isAislesLoading,
  isAislesError,
  onRetryAisles,
  products,
  totalCount,
  isProductsLoading,
  isProductsError,
  onRetryProducts,
  hasMoreProducts,
  isLoadingMoreProducts,
  onLoadMoreProducts,
  sort,
  onSortChange,
  recipeKit,
  isRecipeKitLoading,
}: StoreCatalogTemplateProps) {
  const openingStatus = getOpeningStatus(store.openingHours, now);
  const activeAisleId = scope.type === "rayon" ? scope.slug : undefined;

  return (
    <Container className="flex flex-col gap-8 py-6">
      <h1 className="sr-only">Tous les rayons — {store.name}</h1>

      <StoreContextBar storeName={store.name} />

      <StoreHeaderCard store={store} now={now} />

      <CategoriesSection
        categories={aisles}
        isLoading={isAislesLoading}
        isError={isAislesError}
        onRetry={onRetryAisles}
        // On the "tous les rayons" view itself, the link would just point back here (rule 12: masque-le).
        viewAllHref={scope.type === "rayon" ? routes.main.epicerieRayons(store.id) : undefined}
        activeAisleId={activeAisleId}
      />

      <section aria-labelledby="catalog-toolbar-heading">
        <h2 id="catalog-toolbar-heading" className="sr-only">
          Filtrer et trier les produits
        </h2>
        <CatalogToolbar
          displayedCount={products.length}
          totalCount={totalCount}
          isOpen={openingStatus.isOpen}
          pickupMinutes={15}
          sort={sort}
          onSortChange={onSortChange}
        />
      </section>

      <AsyncSection isLoading={isProductsLoading} isError={isProductsError} onRetry={onRetryProducts} skeleton={<ProductGridSkeleton />}>
        {products.length === 0 ? (
          <EmptyState
            icon="basket"
            title="Aucun produit dans ce rayon pour le moment."
            description="Revenez bientôt ou explorez les autres rayons de la boutique."
            action={
              <ButtonLink href={routes.main.epicerieRayons(store.id)} variant="soft">
                Voir tous les rayons
              </ButtonLink>
            }
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </AsyncSection>

      {hasMoreProducts && (
        <LoadMore
          displayedCount={products.length}
          totalCount={totalCount}
          cityName="Saint-Étienne"
          hasMore={hasMoreProducts}
          isLoading={isLoadingMoreProducts}
          isError={false}
          onLoadMore={onLoadMoreProducts}
        />
      )}

      {!isRecipeKitLoading && recipeKit && <RecipeKitCard recipeKit={recipeKit} />}

      {/*
        Rule 4.1 C4 asks for this inline band "juste au-dessus du Footer".
        Deliberately NOT rendered here: the global `Footer` (every page,
        not just this one) already renders this exact bar via its own
        `FooterTrustBar` + the same `TRUST_ITEMS` fixture, immediately
        below. Rendering it again produced a visible duplicate (verified
        live). Existing Footer wins (rule 2: conflict between the maquette
        and an existing shared component) — écart signalé in the compte-rendu.
        `ReassuranceBand` itself is still exercised directly in Storybook
        (Organisms/ReassuranceBand) and in the Page B template below.
      */}
    </Container>
  );
}

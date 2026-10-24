import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { ProductCard } from "@/src/features/catalog/ProductCard";
import type { FavoriteProduct } from "@/src/domain/favorites";
import { routes } from "@/src/lib/routing/routes";

export interface FavoriteProductGridProps {
  products: FavoriteProduct[];
  totalFavoritesCount: number;
  isSelectionMode: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (productId: string) => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  resetFiltersHref: string;
}

function FavoriteProductGridSkeleton() {
  return (
    <CardGrid columns={5}>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index}>
          <Skeleton height={360} radius="xl" />
        </li>
      ))}
    </CardGrid>
  );
}

/** F5 — 5 → 4 → 3 → 2 columns (rule F5), `ProductCard`'s "favorite" preset. */
export function FavoriteProductGrid({
  products,
  totalFavoritesCount,
  isSelectionMode,
  selectedIds,
  onToggleSelect,
  isLoading,
  isError,
  onRetry,
  resetFiltersHref,
}: FavoriteProductGridProps) {
  return (
    <AsyncSection isLoading={isLoading} isError={isError} onRetry={onRetry} skeleton={<FavoriteProductGridSkeleton />}>
      {products.length === 0 ? (
        totalFavoritesCount === 0 ? (
          <EmptyState
            icon="heart"
            title="Vous n'avez pas encore de favoris."
            description="Parcourez le catalogue et ajoutez vos produits préférés en un cœur."
            action={
              <ButtonLink href={routes.main.epiceries} variant="soft">
                Découvrir le catalogue
              </ButtonLink>
            }
          />
        ) : (
          <EmptyState
            icon="search"
            title="Aucun favori ne correspond à ce filtre."
            action={
              <ButtonLink href={resetFiltersHref} variant="soft">
                Réinitialiser les filtres
              </ButtonLink>
            }
          />
        )
      ) : (
        <CardGrid columns={5}>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard
                variant="favorite"
                product={product}
                selectable={isSelectionMode}
                isSelected={selectedIds.has(product.id)}
                onToggleSelect={onToggleSelect}
              />
            </li>
          ))}
        </CardGrid>
      )}
    </AsyncSection>
  );
}

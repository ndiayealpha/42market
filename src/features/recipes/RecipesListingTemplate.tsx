import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { Container } from "@/src/components/layout/Container/Container";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import type { Recipe, RecipeRegionCount, RecipeSortOption } from "@/src/domain/recipe";
import type { TerroirRegionSlug } from "@/src/domain/terroir";

import { ChefTipsSection } from "./ChefTipsSection";
import { ProposeRecipeCta } from "./ProposeRecipeCta";
import { RecipeListingCard } from "./RecipeListingCard";
import { RecipeListingResultBar } from "./RecipeListingResultBar";
import { RecipePagination } from "./RecipePagination";
import { RecipeRegionFilters } from "./RecipeRegionFilters";
import { RecipeToCartBanner } from "./RecipeToCartBanner";
import { RecipesListingHero } from "./RecipesListingHero";

export interface RecipesListingTemplateProps {
  allRecipes: Recipe[];
  pageItems: Recipe[];
  filteredCount: number;
  from: number;
  to: number;
  sort: RecipeSortOption;
  onSortChange: (sort: RecipeSortOption) => void;
  regionCounts: RecipeRegionCount[];
  activeRegion: TerroirRegionSlug | "all";
  buildRegionHref: (region: TerroirRegionSlug | "all") => string;
  page: number;
  totalPages: number;
  buildPageHref: (page: number) => string;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

function ListingSkeleton() {
  return (
    <CardGrid columns={4}>
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index}>
          <Skeleton height={340} radius="2xl" />
        </li>
      ))}
    </CardGrid>
  );
}

export function RecipesListingTemplate({
  allRecipes,
  pageItems,
  filteredCount,
  from,
  to,
  sort,
  onSortChange,
  regionCounts,
  activeRegion,
  buildRegionHref,
  page,
  totalPages,
  buildPageHref,
  isLoading,
  isError,
  onRetry,
}: RecipesListingTemplateProps) {
  return (
    <Container className="flex flex-col gap-8 py-6">
      <RecipesListingHero totalCount={allRecipes.length} />
      <RecipeRegionFilters counts={regionCounts} activeRegion={activeRegion} buildHref={buildRegionHref} />
      <RecipeToCartBanner totalCount={allRecipes.length} />

      <div className="flex flex-col gap-6">
        <RecipeListingResultBar from={from} to={to} totalCount={filteredCount} sort={sort} onSortChange={onSortChange} />

        <AsyncSection isLoading={isLoading} isError={isError} onRetry={onRetry} skeleton={<ListingSkeleton />}>
          {pageItems.length === 0 ? (
            <EmptyState icon="search" title="Aucune recette ne correspond à ce terroir." description="Essayez un autre terroir ou revenez à « Tous les Terroirs »." />
          ) : (
            <CardGrid columns={4}>
              {pageItems.map((recipe) => (
                <li key={recipe.id}>
                  <RecipeListingCard recipe={recipe} />
                </li>
              ))}
            </CardGrid>
          )}
        </AsyncSection>

        <RecipePagination page={page} totalPages={totalPages} totalCount={filteredCount} buildHref={buildPageHref} />
      </div>

      <ChefTipsSection recipes={allRecipes} />
      <ProposeRecipeCta />
    </Container>
  );
}

"use client";

import { useRouter } from "next/navigation";

import {
  filterRecipesByRegion,
  getRecipeRegionCounts,
  paginateRecipes,
  sortRecipes,
  type RecipeSortOption,
} from "@/src/domain/recipe";
import type { TerroirRegionSlug } from "@/src/domain/terroir";
import { useRecipes } from "@/src/hooks/useRecipes";
import { routes } from "@/src/lib/routing/routes";

import { RecipesListingTemplate } from "./RecipesListingTemplate";

export interface RecipesListingViewProps {
  region: TerroirRegionSlug | "all";
  sort: RecipeSortOption;
  page: number;
}

export function RecipesListingView({ region, sort, page }: RecipesListingViewProps) {
  const router = useRouter();
  const { recipes, recentOrder, isLoading, isError, refetch } = useRecipes();

  const filtered = filterRecipesByRegion(recipes, region);
  const sorted = sortRecipes(filtered, sort, recentOrder);
  const { items: pageItems, totalPages } = paginateRecipes(sorted, page);
  const regionCounts = getRecipeRegionCounts(recipes);

  function buildHref(overrides: { region?: TerroirRegionSlug | "all"; sort?: RecipeSortOption; page?: number }): string {
    const nextRegion = overrides.region ?? region;
    const nextSort = overrides.sort ?? sort;
    const nextPage = overrides.page ?? (overrides.region || overrides.sort ? 1 : page);
    const params = new URLSearchParams();
    if (nextRegion !== "all") params.set("region", nextRegion);
    if (nextSort !== "popular") params.set("tri", nextSort);
    if (nextPage !== 1) params.set("page", String(nextPage));
    const query = params.toString();
    return query ? `${routes.main.recipes}?${query}` : routes.main.recipes;
  }

  const from = pageItems.length === 0 ? 0 : (page - 1) * 12 + 1;
  const to = pageItems.length === 0 ? 0 : from + pageItems.length - 1;

  return (
    <RecipesListingTemplate
      allRecipes={recipes}
      pageItems={pageItems}
      filteredCount={filtered.length}
      from={from}
      to={to}
      sort={sort}
      onSortChange={(nextSort) => router.push(buildHref({ sort: nextSort }))}
      regionCounts={regionCounts}
      activeRegion={region}
      buildRegionHref={(nextRegion) => buildHref({ region: nextRegion })}
      page={page}
      totalPages={totalPages}
      buildPageHref={(nextPage) => buildHref({ page: nextPage })}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
    />
  );
}

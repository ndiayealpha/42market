"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { parseSearchFilters, type SearchSortOption } from "@/src/domain/search";
import { useSearchResults } from "@/src/hooks/useSearchResults";
import { routes } from "@/src/lib/routing/routes";

import type { SearchFilterBarOverrides } from "./SearchFilterBar";
import { SearchResultsTemplate } from "./SearchResultsTemplate";

export interface SearchResultsViewProps {
  query: string;
}

interface FilterOverrides extends SearchFilterBarOverrides {
  sort?: SearchSortOption;
}

/**
 * Thin container: reads filters from the URL (`useSearchParams`), wires
 * `useSearchResults`, and hands the resolved view model to the pure
 * `SearchResultsTemplate` (same split as `StoreCatalogView`/`FavoritesView`).
 * Every filter/sort change is a real navigation (`buildHref`/`router.push`),
 * never client-only state — the URL stays the single source of truth, so a
 * refresh lands on the exact same results.
 */
export function SearchResultsView({ query }: SearchResultsViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = parseSearchFilters({
    retrait: searchParams.get("retrait") ?? undefined,
    promo: searchParams.get("promo") ?? undefined,
    gros: searchParams.get("gros") ?? undefined,
    epicerie: searchParams.get("epicerie") ?? undefined,
    tri: searchParams.get("tri") ?? undefined,
  });

  const { summary, isLoading, isError, refetch } = useSearchResults(query, filters);

  function buildHref(overrides: FilterOverrides): string {
    const next = {
      pickupWithin2h: overrides.pickupWithin2h ?? filters.pickupWithin2h,
      promoOnly: overrides.promoOnly ?? filters.promoOnly,
      bulkOnly: overrides.bulkOnly ?? filters.bulkOnly,
      storeSlug: overrides.storeSlug ?? filters.storeSlug,
      sort: overrides.sort ?? filters.sort,
    };
    const params = new URLSearchParams({ q: query });
    if (next.pickupWithin2h) params.set("retrait", "2h");
    if (next.promoOnly) params.set("promo", "1");
    if (next.bulkOnly) params.set("gros", "1");
    if (next.storeSlug !== "all") params.set("epicerie", next.storeSlug);
    if (next.sort !== "distance") params.set("tri", next.sort);
    return `${routes.main.search}?${params.toString()}`;
  }

  function handleSortChange(sort: SearchSortOption) {
    router.push(buildHref({ sort }));
  }

  return (
    <SearchResultsTemplate
      query={query}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      summary={summary}
      filters={filters}
      buildFilterHref={buildHref}
      onSortChange={handleSortChange}
    />
  );
}

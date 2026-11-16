import { Button } from "@/src/components/atoms/Button/Button";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { Container } from "@/src/components/layout/Container/Container";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import type { SearchCrossLink, SearchFiltersState, SearchResultsSummary, SearchSortOption } from "@/src/domain/search";

import { MultiStoreNotice } from "./MultiStoreNotice";
import { SearchFilterBar, type SearchFilterBarOverrides } from "./SearchFilterBar";
import { SearchResultsHeader } from "./SearchResultsHeader";
import { parsePickupMinutes } from "./search-copy";
import { SponsoredBanner } from "./SponsoredBanner";
import { StoreResultGroup } from "./StoreResultGroup";

export interface SearchResultsTemplateProps {
  query: string;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  summary?: SearchResultsSummary;
  filters: SearchFiltersState;
  buildFilterHref: (overrides: SearchFilterBarOverrides) => string;
  onSortChange: (sort: SearchSortOption) => void;
}

/** Exact-dimension placeholder (no CLS) for 2 store groups — same `Skeleton` atom as `StoreCatalogTemplate`'s own `ProductGridSkeleton`. */
function ResultsSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 2 }).map((_, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-4">
          <Skeleton height={84} radius="2xl" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, cardIndex) => (
              <Skeleton key={cardIndex} height={260} radius="xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** "Voir aussi dans le Carnet / Recettes" — rendered whenever the query also matched a recipe/article, whether or not any product did. */
function CrossLinksBand({ crossLinks }: { crossLinks: SearchCrossLink[] }) {
  if (crossLinks.length === 0) return null;
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface-subtle px-6 py-6 text-center">
      <p className="text-sm font-semibold text-foreground-strong">Voir aussi dans le Carnet du terroir et les Recettes</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {crossLinks.map((link) => (
          <ButtonLink key={link.href} href={link.href} variant="soft">
            {link.label}
          </ButtonLink>
        ))}
      </div>
    </div>
  );
}

/**
 * Pure template — no data fetching of its own; `SearchResultsView` wires
 * the hook and hands the resolved view model here (same split as
 * `StoreCatalogView`/`StoreCatalogTemplate`). One whole-page
 * loading/error state is enough for a page that's one single query —
 * each `StoreResultGroup` doesn't get its own Suspense boundary.
 */
export function SearchResultsTemplate({
  query,
  isLoading,
  isError,
  onRetry,
  summary,
  filters,
  buildFilterHref,
  onSortChange,
}: SearchResultsTemplateProps) {
  const groups = summary?.groups ?? [];
  const pickupWithin2hCount = groups.filter((group) => {
    const minutes = parsePickupMinutes(group.pickupLabel);
    return minutes !== null && minutes <= 120;
  }).length;

  return (
    <Container className="flex flex-col gap-8 py-6">
      <SearchResultsHeader
        query={query}
        totalResults={summary?.totalResults ?? 0}
        totalStoresWithResults={summary?.totalStoresWithResults ?? 0}
        cityLabel={summary?.cityLabel ?? "Saint-Étienne"}
      />

      <SponsoredBanner campaign={summary?.campaign} />

      <SearchFilterBar
        pickupWithin2h={filters.pickupWithin2h}
        promoOnly={filters.promoOnly}
        bulkOnly={filters.bulkOnly}
        storeSlug={filters.storeSlug}
        sort={filters.sort}
        totalStoresCount={groups.length}
        pickupWithin2hCount={pickupWithin2hCount}
        buildHref={buildFilterHref}
        onSortChange={onSortChange}
      />

      {isLoading ? (
        <ResultsSkeleton />
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="text-sm text-ink-muted">Une erreur est survenue pendant la recherche.</p>
          <Button variant="soft" onClick={onRetry}>
            Réessayer
          </Button>
        </div>
      ) : groups.length === 0 ? (
        <>
          <EmptyState
            icon="search"
            title={query ? `Aucun résultat pour « ${query} »` : "Que recherchez-vous ?"}
            description={
              query
                ? "Vérifiez l'orthographe ou essayez un terme plus général, comme le nom d'une catégorie ou d'un commerçant."
                : "Saisissez un produit, une épice ou le nom d'une recette dans la barre de recherche ci-dessus."
            }
          />
          <CrossLinksBand crossLinks={summary?.crossLinks ?? []} />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-10">
            {groups.map((group) => (
              <StoreResultGroup key={group.slug} group={group} />
            ))}
          </div>
          <CrossLinksBand crossLinks={summary?.crossLinks ?? []} />
          <MultiStoreNotice />
        </>
      )}
    </Container>
  );
}

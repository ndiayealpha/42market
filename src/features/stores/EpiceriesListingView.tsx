"use client";

import { useRouter } from "next/navigation";

import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Card } from "@/src/components/atoms/Card/Card";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { Container } from "@/src/components/layout/Container/Container";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { StoreMap } from "@/src/components/molecules/StoreMap/StoreMap";
import { ReassuranceBand } from "@/src/components/organisms/ReassuranceBand/ReassuranceBand";
import { filterStores, formatStoreCountLabel, sortStores, type StoreListingFilters as StoreListingFiltersValue, type StoreListingSort } from "@/src/domain/store-listing";
import { useAllStores } from "@/src/hooks/useAllStores";
import { useCatalogReassuranceCards } from "@/src/hooks/useCatalogReassuranceCards";
import { routes } from "@/src/lib/routing/routes";

import { FindStoreCta } from "./FindStoreCta";
import { StoreCard } from "./StoreCard";
import { StoreCardSkeleton } from "./StoreCardSkeleton";
import { StoreListingFilters, type StoreListingViewMode } from "./StoreListingFilters";
import { StoreListingResultBar } from "./StoreListingResultBar";

const SKELETON_KEYS = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4", "skeleton-5", "skeleton-6"];
const SAINT_ETIENNE_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Saint-Étienne, France")}`;

export interface EpiceriesListingViewProps {
  neighborhoods: string[];
  filters: StoreListingFiltersValue;
  sort: StoreListingSort;
  view: StoreListingViewMode;
}

/**
 * `/main/epiceries` — the "Voir tout" destination from the home page's
 * store grids and `StoreDealsNavigator`. Every filter/sort/view control is
 * a URL param, never client-only state (same rule `StorePromosView`
 * follows): `app/main/epiceries/page.tsx` parses and validates them server
 * side, this view only pushes new ones and reshapes the list already
 * fetched by `useAllStores`.
 */
export function EpiceriesListingView({ neighborhoods, filters, sort, view }: EpiceriesListingViewProps) {
  const router = useRouter();
  const { stores: allStores, isLoading, isError, refetch } = useAllStores();
  const reassurance = useCatalogReassuranceCards();

  const visibleStores = sortStores(filterStores(allStores, filters), sort);

  function navigate(nextFilters: StoreListingFiltersValue, nextSort: StoreListingSort, nextView: StoreListingViewMode) {
    const search = new URLSearchParams();
    if (nextFilters.neighborhood) search.set("quartier", nextFilters.neighborhood);
    if (nextFilters.openNow) search.set("ouvert", "true");
    if (nextFilters.quickPickup) search.set("retrait", "true");
    if (nextFilters.activePromosOnly) search.set("promos", "true");
    if (nextSort !== "distance") search.set("tri", nextSort);
    if (nextView !== "grid") search.set("vue", nextView);
    const query = search.toString();
    router.push(query ? `${routes.main.epiceries}?${query}` : routes.main.epiceries);
  }

  return (
    <Container className="flex flex-col gap-8 py-6">
      <Card variant="elevated" className="flex flex-col gap-3">
        <Breadcrumb
          items={[
            { label: "Accueil", href: routes.main.home },
            { label: "Saint-Étienne" },
            { label: "Épiceries de la ville & Agglomération" },
          ]}
        />
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-catalog-chip px-3 py-1 text-xs font-bold text-foreground-strong">
          <span aria-hidden className="h-2 w-2 rounded-full bg-catalog-success" />
          {formatStoreCountLabel(allStores.length)} partenaires prêtes pour votre Click &amp; Collect
        </span>
        <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
          Toutes les épiceries exotiques de Saint-Étienne &amp; Agglomération
        </h1>
        <p className="max-w-2xl text-sm text-ink-muted">
          Explorez les boutiques indépendantes africaines, antillaises, maghrébines, asiatiques et créoles de votre ville. Chaque commande est
          préparée avec soin et respect de la fraîcheur par votre commerçant pour un retrait sans frais en 10 à 30 minutes.
        </p>
      </Card>

      <StoreListingFilters
        neighborhoods={neighborhoods}
        filters={filters}
        sort={sort}
        view={view}
        onNeighborhoodChange={(neighborhood) => navigate({ ...filters, neighborhood }, sort, view)}
        onToggleChange={(key, value) => navigate({ ...filters, [key]: value }, sort, view)}
        onSortChange={(nextSort) => navigate(filters, nextSort, view)}
        onViewChange={(nextView) => navigate(filters, sort, nextView)}
      />

      <StoreListingResultBar count={visibleStores.length} neighborhood={filters.neighborhood} />

      <AsyncSection
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        skeleton={
          <CardGrid columns={3}>
            {SKELETON_KEYS.map((key) => (
              <li key={key}>
                <StoreCardSkeleton />
              </li>
            ))}
          </CardGrid>
        }
      >
        {view === "map" ? (
          <StoreMap directionsUrl={SAINT_ETIENNE_DIRECTIONS_URL} caption="Épiceries de Saint-Étienne & Agglomération" />
        ) : visibleStores.length === 0 ? (
          <EmptyState
            icon="store"
            title="Aucune épicerie ne correspond à ces critères."
            description="Essayez d'élargir votre recherche ou de réinitialiser les filtres."
          />
        ) : (
          <CardGrid columns={3}>
            {visibleStores.map((store) => (
              <li key={store.id}>
                <StoreCard store={store} />
              </li>
            ))}
          </CardGrid>
        )}
      </AsyncSection>

      <FindStoreCta />

      <ReassuranceBand items={reassurance.items} variant="cards" />
    </Container>
  );
}

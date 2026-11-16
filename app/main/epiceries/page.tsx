import type { Metadata } from "next";

import { getStoreNeighborhoods, parseStoreListingNeighborhood, parseStoreListingSort, parseStoreListingToggle } from "@/src/domain/store-listing";
import { EpiceriesListingView } from "@/src/features/stores/EpiceriesListingView";
import { routes } from "@/src/lib/routing/routes";
import { mockCatalogRepository } from "@/src/services/catalog.repository";

export const metadata: Metadata = {
  title: "Toutes les épiceries | 42 Markets",
  // Filters are a view preference, not a distinct page — same canonical-without-params rule as the per-store bons-plans page.
  alternates: { canonical: routes.main.epiceries },
};

interface PageProps {
  searchParams: Promise<{ quartier?: string; ouvert?: string; retrait?: string; promos?: string; tri?: string; vue?: string }>;
}

/** PUBLIC — the discovery funnel's CTAs need an anonymous visitor to reach this page, same reasoning as `epicerieDetail`. */
export default async function EpiceriesPage({ searchParams }: PageProps) {
  const { quartier, ouvert, retrait, promos, tri, vue } = await searchParams;
  const stores = await mockCatalogRepository.getAllStores();
  const neighborhoods = getStoreNeighborhoods(stores);

  return (
    <EpiceriesListingView
      neighborhoods={neighborhoods}
      filters={{
        neighborhood: parseStoreListingNeighborhood(quartier, neighborhoods),
        openNow: parseStoreListingToggle(ouvert),
        quickPickup: parseStoreListingToggle(retrait),
        activePromosOnly: parseStoreListingToggle(promos),
      }}
      sort={parseStoreListingSort(tri)}
      view={vue === "map" ? "map" : "grid"}
    />
  );
}

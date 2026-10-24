"use client";

import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Container } from "@/src/components/layout/Container/Container";
import { Eyebrow } from "@/src/components/layout/Eyebrow/Eyebrow";
import { useCityStores } from "@/src/hooks/useCityStores";
import { useNearbyStores } from "@/src/hooks/useNearbyStores";
import { routes } from "@/src/lib/routing/routes";

import { StoreGridSection } from "./StoreGridSection";

/**
 * `/main/epiceries` — the "Voir tout" destination from the home page's
 * store grids and `StoreDealsNavigator` (both previously pointed at this
 * route with no page behind it). Reuses the exact same
 * `StoreGridSection`/`StoreCard` already shown on the home page, just
 * without its other, unrelated sections (promos, recipes, ...).
 */
export function EpiceriesListingView() {
  const nearby = useNearbyStores();
  const city = useCityStores();

  return (
    <Container className="flex flex-col gap-10 py-6">
      <div>
        <Breadcrumb items={[{ label: "Accueil", href: routes.main.home }, { label: "Épiceries" }]} />
        <h1 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">Toutes les épiceries</h1>
      </div>

      <StoreGridSection
        id="nearby-stores"
        eyebrow={<Eyebrow tone="accent">Moins de 10 km de vous</Eyebrow>}
        title="Épiceries près de vous"
        stores={nearby.stores}
        isLoading={nearby.isLoading}
        emptyMessage="Aucune épicerie à moins de 10 km pour l'instant."
      />

      <StoreGridSection
        id="city-stores"
        eyebrow={<Eyebrow>Catalogue complet</Eyebrow>}
        title="Épiceries de la ville"
        stores={city.stores}
        isLoading={city.isLoading}
        emptyMessage="Aucune épicerie à afficher pour l'instant."
      />
    </Container>
  );
}

"use client";

import { useRouter } from "next/navigation";

import type { PromoFilterType } from "@/src/domain/promotions";
import type { StoreDetail } from "@/src/domain/store-detail";
import { useAisles } from "@/src/hooks/useAisles";
import { useCatalogReassuranceCards } from "@/src/hooks/useCatalogReassuranceCards";
import { useFeaturedPromoProducts } from "@/src/hooks/useFeaturedPromoProducts";
import { useFlashSale } from "@/src/hooks/useFlashSale";
import { usePromoCategorySections } from "@/src/hooks/usePromoCategorySections";
import { usePromoScopeOptions } from "@/src/hooks/usePromoScopeOptions";
import { useStorePromos } from "@/src/hooks/useStorePromos";
import { routes } from "@/src/lib/routing/routes";

import { StorePromosTemplate } from "./StorePromosTemplate";

export interface StorePromosViewProps {
  store: StoreDetail;
  now: Date;
  activeType: PromoFilterType;
  activeAisleId?: string;
  selectedScopeSlugs: string[];
}

/** Thin container: wires every hook, resolves the view model, and hands it to the pure `StorePromosTemplate`. */
export function StorePromosView({ store, now, activeType, activeAisleId, selectedScopeSlugs }: StorePromosViewProps) {
  const router = useRouter();

  const aislesQuery = useAisles(store.id);
  const flashSaleQuery = useFlashSale(store.id);
  const featuredQuery = useFeaturedPromoProducts(store.id, activeType);
  const sectionsQuery = usePromoCategorySections(store.id, selectedScopeSlugs, activeType);
  const storePromosQuery = useStorePromos();
  const scopeOptionsQuery = usePromoScopeOptions();
  const reassuranceQuery = useCatalogReassuranceCards();

  // The rayon chip (row 2) narrows down to that one aisle's promos — URL-driven like the type filter, applied here rather than in the repository since it's a pure, local reshaping of what the hooks already fetched.
  const featuredProducts = activeAisleId
    ? featuredQuery.products.filter((product) => product.aisleSlug === activeAisleId)
    : featuredQuery.products;
  const sections = activeAisleId ? sectionsQuery.sections.filter((section) => section.aisleSlug === activeAisleId) : sectionsQuery.sections;

  function handleScopeChange(slugs: string[]) {
    const search = new URLSearchParams();
    if (activeType !== "all") search.set("type", activeType);
    if (activeAisleId) search.set("rayon", activeAisleId);
    // The page's own default scope is "this store only" (`[store.id]`), not
    // every partner store — only omit the param when the selection matches
    // that default, otherwise a deliberate "toutes les épiceries" choice
    // would silently reset back to one store on the next navigation.
    const isDefaultScope = slugs.length === 1 && slugs[0] === store.id;
    if (!isDefaultScope) search.set("epiceries", slugs.join(","));
    const query = search.toString();
    router.push(query ? `${routes.main.epicerieBonsPlans(store.id)}?${query}` : routes.main.epicerieBonsPlans(store.id));
  }

  return (
    <StorePromosTemplate
      store={store}
      now={now}
      aisles={aislesQuery.aisles}
      isAislesLoading={aislesQuery.isLoading}
      isAislesError={aislesQuery.isError}
      onRetryAisles={aislesQuery.refetch}
      activeType={activeType}
      activeAisleId={activeAisleId}
      scopeOptions={scopeOptionsQuery.options}
      selectedScopeSlugs={selectedScopeSlugs}
      onScopeChange={handleScopeChange}
      flashSale={flashSaleQuery.flashSale}
      featuredProducts={featuredProducts}
      featuredTotalCount={featuredQuery.totalCount}
      isFeaturedLoading={featuredQuery.isLoading}
      isFeaturedError={featuredQuery.isError}
      onRetryFeatured={featuredQuery.refetch}
      sections={sections}
      storePromos={storePromosQuery.stores}
      openForExpressPickupCount={storePromosQuery.openForExpressPickupCount}
      isStorePromosLoading={storePromosQuery.isLoading}
      isStorePromosError={storePromosQuery.isError}
      onRetryStorePromos={storePromosQuery.refetch}
      reassuranceCards={reassuranceQuery.items}
    />
  );
}

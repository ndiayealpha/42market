import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Container } from "@/src/components/layout/Container/Container";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { ReassuranceBand } from "@/src/components/organisms/ReassuranceBand/ReassuranceBand";
import type { Category } from "@/src/domain/store-merchandising";
import type { FlashSale, PromoCategorySectionData, PromoFilterType, PromoScopeOption, StorePromoSummary } from "@/src/domain/promotions";
import type { StoreDetail } from "@/src/domain/store-detail";
import type { TrustItemConfig } from "@/src/components/organisms/Footer/Footer.types";
import { CategoriesSection } from "@/src/features/store-page/CategoriesSection";
import { StoreHeaderCard } from "@/src/features/store-page/StoreHeaderCard";
import { routes } from "@/src/lib/routing/routes";

import { FeaturedSelectionSection } from "./FeaturedSelectionSection";
import { PromoCategorySection } from "./PromoCategorySection";
import { PromoFilterBar } from "./PromoFilterBar";
import { StorePromoList } from "./StorePromoList";

export interface StorePromosTemplateProps {
  store: StoreDetail;
  now: Date;
  aisles: Category[];
  isAislesLoading: boolean;
  isAislesError: boolean;
  onRetryAisles: () => void;
  activeType: PromoFilterType;
  activeAisleId?: string;
  scopeOptions: PromoScopeOption[];
  selectedScopeSlugs: string[];
  onScopeChange: (slugs: string[]) => void;
  flashSale: FlashSale | null;
  featuredProducts: PromoCategorySectionData["products"];
  featuredTotalCount: number;
  isFeaturedLoading: boolean;
  isFeaturedError: boolean;
  onRetryFeatured: () => void;
  sections: PromoCategorySectionData[];
  storePromos: StorePromoSummary[];
  openForExpressPickupCount: number;
  isStorePromosLoading: boolean;
  isStorePromosError: boolean;
  onRetryStorePromos: () => void;
  reassuranceCards: TrustItemConfig[];
}

/** Pure template — no data fetching of its own; `StorePromosView` wires every hook (same split as `StoreCatalogTemplate`/`StoreCatalogView`). */
export function StorePromosTemplate({
  store,
  now,
  aisles,
  isAislesLoading,
  isAislesError,
  onRetryAisles,
  activeType,
  activeAisleId,
  scopeOptions,
  selectedScopeSlugs,
  onScopeChange,
  flashSale,
  featuredProducts,
  featuredTotalCount,
  isFeaturedLoading,
  isFeaturedError,
  onRetryFeatured,
  sections,
  storePromos,
  openForExpressPickupCount,
  isStorePromosLoading,
  isStorePromosError,
  onRetryStorePromos,
  reassuranceCards,
}: StorePromosTemplateProps) {
  const hasAnyPromoContent = featuredProducts.length > 0 || sections.some((section) => section.products.length > 0);
  const hasActiveFilter = activeType !== "all" || Boolean(activeAisleId);
  // Once the périmètre selector is down to one store, its name on every card is redundant (rule 9: "UneSeuleBoutique").
  const showStoreName = selectedScopeSlugs.length !== 1;

  return (
    <Container className="flex flex-col gap-8 py-6">
      <h1 className="sr-only">Bons plans de {store.name}</h1>

      <Breadcrumb
        items={[
          { label: "Accueil", href: routes.main.home },
          { label: "Épiceries", href: routes.main.epiceries },
          { label: `${store.name} (Saint-Étienne)`, href: routes.main.epicerieDetail(store.id) },
          { label: `Bons plans de ${store.name}` },
        ]}
      />

      <StoreHeaderCard store={store} now={now} />

      <CategoriesSection
        categories={aisles}
        isLoading={isAislesLoading}
        isError={isAislesError}
        onRetry={onRetryAisles}
        viewAllHref={routes.main.epicerieRayons(store.id)}
      />

      <PromoFilterBar
        storeSlug={store.id}
        activeType={activeType}
        activeAisleId={activeAisleId}
        aisles={aisles}
        scopeOptions={scopeOptions}
        selectedScopeSlugs={selectedScopeSlugs}
        onScopeChange={onScopeChange}
        primaryStoreName={store.name}
      />

      {!isFeaturedLoading && !hasAnyPromoContent ? (
        <EmptyState
          icon="zap"
          title={hasActiveFilter ? "Aucune promotion ne correspond à ce filtre." : "Aucune promotion active pour le moment."}
          description={hasActiveFilter ? undefined : "Explorez le catalogue complet de la boutique en attendant."}
          action={
            <ButtonLink
              href={hasActiveFilter ? routes.main.epicerieBonsPlans(store.id) : routes.main.epicerieRayons(store.id)}
              variant="soft"
            >
              {hasActiveFilter ? "Réinitialiser les filtres" : "Voir le catalogue"}
            </ButtonLink>
          }
        />
      ) : (
        <>
          <FeaturedSelectionSection
            flashSale={flashSale}
            now={now}
            products={featuredProducts}
            totalCount={featuredTotalCount}
            isLoading={isFeaturedLoading}
            isError={isFeaturedError}
            onRetry={onRetryFeatured}
            showStoreName={showStoreName}
          />

          {sections.map((section) => (
            <PromoCategorySection key={section.aisleSlug} storeSlug={store.id} section={section} showStoreName={showStoreName} />
          ))}
        </>
      )}

      <StorePromoList
        stores={storePromos}
        openForExpressPickupCount={openForExpressPickupCount}
        isLoading={isStorePromosLoading}
        isError={isStorePromosError}
        onRetry={onRetryStorePromos}
      />

      <ReassuranceBand items={reassuranceCards} variant="cards" />
    </Container>
  );
}

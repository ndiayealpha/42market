"use client";

import { useState } from "react";

import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Container } from "@/src/components/layout/Container/Container";
import { PreordersSection } from "@/src/features/preorders/PreordersSection";
import { BestSellersSection } from "@/src/features/store-page/BestSellersSection";
import { CategoriesSection } from "@/src/features/store-page/CategoriesSection";
import { LimitedStockSection } from "@/src/features/store-page/LimitedStockSection";
import { OffersBanner } from "@/src/features/store-page/OffersBanner";
import { PromoBanner } from "@/src/features/store-page/PromoBanner";
import { SponsoredParcelBanner } from "@/src/features/store-page/SponsoredParcelBanner";
import { StoreHeaderCard } from "@/src/features/store-page/StoreHeaderCard";
import { routes } from "@/src/lib/routing/routes";
import { useBestSellers } from "@/src/hooks/useBestSellers";
import { useLimitedStock } from "@/src/hooks/useLimitedStock";
import { usePreorderCampaigns } from "@/src/hooks/usePreorderCampaigns";
import { usePromoBanner } from "@/src/hooks/usePromoBanner";
import { useSponsoredParcel } from "@/src/hooks/useSponsoredParcel";
import { useStoreCategories } from "@/src/hooks/useStoreCategories";
import { useStoreDetail } from "@/src/hooks/useStoreDetail";
import { useStoreOffers } from "@/src/hooks/useStoreOffers";

export interface StorePageViewProps {
  slug: string;
}

// "Add to cart" is explicitly out of scope for this page (no cart logic,
// no real API) — every card's button is wired but intentionally inert.
function noop(): void {}

/** The one place that knows this page's data and section order — every section below it is a pure presentational component taking typed props. */
export function StorePageView({ slug }: StorePageViewProps) {
  const [now] = useState(() => new Date());

  const storeQuery = useStoreDetail(slug);
  const categoriesQuery = useStoreCategories(slug);
  const offersQuery = useStoreOffers(slug);
  const limitedStockQuery = useLimitedStock(slug);
  const bestSellersQuery = useBestSellers(slug);
  const sponsoredParcelQuery = useSponsoredParcel(slug);
  const promoBannerQuery = usePromoBanner(slug);
  const preordersQuery = usePreorderCampaigns();

  if (!storeQuery.store) {
    return null;
  }

  const store = storeQuery.store;

  return (
    <Container className="flex flex-col gap-12 py-6">
      <Breadcrumb
        items={[
          { label: "Accueil", href: routes.main.home },
          { label: "Épiceries", href: routes.main.epiceries },
          { label: store.name },
        ]}
      />

      <StoreHeaderCard store={store} now={now} />

      <CategoriesSection
        categories={categoriesQuery.categories}
        isLoading={categoriesQuery.isLoading}
        isError={categoriesQuery.isError}
        onRetry={categoriesQuery.refetch}
        viewAllHref={routes.main.epicerieRayons(slug)}
      />

      <OffersBanner
        offers={offersQuery.offers}
        totalCount={offersQuery.summary?.totalCount ?? 0}
        updatedAtIso={offersQuery.summary?.updatedAtIso ?? now.toISOString()}
        stockedStoreCount={offersQuery.summary?.stockedStoreCount ?? 0}
        now={now}
        isLoading={offersQuery.isLoading}
        isError={offersQuery.isError}
        onRetry={offersQuery.refetch}
        onAdd={noop}
      />

      {sponsoredParcelQuery.parcel && <SponsoredParcelBanner parcel={sponsoredParcelQuery.parcel} />}

      <LimitedStockSection
        items={limitedStockQuery.items}
        isLoading={limitedStockQuery.isLoading}
        isError={limitedStockQuery.isError}
        onRetry={limitedStockQuery.refetch}
        onAdd={noop}
      />

      <BestSellersSection
        bestSellers={bestSellersQuery.bestSellers}
        isLoading={bestSellersQuery.isLoading}
        isError={bestSellersQuery.isError}
        onRetry={bestSellersQuery.refetch}
        onAdd={noop}
      />

      {promoBannerQuery.banner && <PromoBanner banner={promoBannerQuery.banner} />}

      <PreordersSection campaigns={preordersQuery.campaigns} isLoading={preordersQuery.isLoading} />
    </Container>
  );
}

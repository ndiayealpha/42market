"use client";

import type { LoyaltyTier } from "@/src/domain/profile";
import { assembleDealsBlocks, filterDealsByMinDiscount, rankStoresByMaxDiscount } from "@/src/domain/store-deals";
import { useStoreDeals } from "@/src/hooks/useStoreDeals";
import { buildLoginUrl, routes } from "@/src/lib/routing/routes";

import { StoreDealsTemplate } from "./StoreDealsTemplate";

export interface StoreDealsViewProps {
  isAuthenticated: boolean;
  loyaltyTier: LoyaltyTier;
  /** From a promo banner's own `?remise=` link (0 = no filter) — see `parseMinDiscountPercent`. */
  minDiscountPercent?: number;
}

/** Thin container: wires the store-deals query, assembles the typed block list, and hands it to the pure `StoreDealsTemplate`. */
export function StoreDealsView({ isAuthenticated, loyaltyTier, minDiscountPercent = 0 }: StoreDealsViewProps) {
  const { stores, isLoading, isError, refetch } = useStoreDeals();

  const rankedStores = rankStoresByMaxDiscount(minDiscountPercent > 0 ? filterDealsByMinDiscount(stores, minDiscountPercent) : stores);
  const blocks = assembleDealsBlocks(rankedStores, loyaltyTier);
  const loyaltyCtaHref = isAuthenticated ? routes.main.profile : buildLoginUrl(routes.main.bonsPlans);

  return <StoreDealsTemplate blocks={blocks} loyaltyCtaHref={loyaltyCtaHref} isLoading={isLoading} isError={isError} onRetry={refetch} />;
}

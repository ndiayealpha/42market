"use client";

import type { LoyaltyTier } from "@/src/domain/profile";
import { assembleDealsBlocks, rankStoresByMaxDiscount } from "@/src/domain/store-deals";
import { useStoreDeals } from "@/src/hooks/useStoreDeals";
import { buildLoginUrl, routes } from "@/src/lib/routing/routes";

import { StoreDealsTemplate } from "./StoreDealsTemplate";

export interface StoreDealsViewProps {
  isAuthenticated: boolean;
  loyaltyTier: LoyaltyTier;
}

/** Thin container: wires the store-deals query, assembles the typed block list, and hands it to the pure `StoreDealsTemplate`. */
export function StoreDealsView({ isAuthenticated, loyaltyTier }: StoreDealsViewProps) {
  const { stores, isLoading, isError, refetch } = useStoreDeals();

  const blocks = assembleDealsBlocks(rankStoresByMaxDiscount(stores), loyaltyTier);
  const loyaltyCtaHref = isAuthenticated ? routes.main.profile : buildLoginUrl(routes.main.bonsPlans);

  return <StoreDealsTemplate blocks={blocks} loyaltyCtaHref={loyaltyCtaHref} isLoading={isLoading} isError={isError} onRetry={refetch} />;
}

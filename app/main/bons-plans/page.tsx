import type { Metadata } from "next";

import { parseMinDiscountPercent } from "@/src/domain/store-deals";
import { getCurrentUser } from "@/src/features/auth/server";
import { StoreDealsView } from "@/src/features/store-deals/StoreDealsView";
import { routes } from "@/src/lib/routing/routes";
import { mockProfileRepository } from "@/src/services/profile.repository";

export const metadata: Metadata = {
  title: "Bons plans par épiceries | 42 Markets",
  // Canonical without params: `?remise=` (from a promo banner's own link) is a view preference, not a distinct page — same rule the other listing pages follow.
  alternates: { canonical: routes.main.bonsPlans },
};

interface PageProps {
  searchParams: Promise<{ remise?: string }>;
}

/** Public (rule 7: "Bons plans par épiceries est publique") — unlike the per-store bons-plans page, no `verifySession` here; only the loyalty CTA and heart/"+" actions require auth, at the click. */
export default async function BonsPlansPage({ searchParams }: PageProps) {
  const { remise } = await searchParams;
  const user = await getCurrentUser();
  const profile = user ? await mockProfileRepository.getProfile(user.id) : null;

  return (
    <StoreDealsView
      isAuthenticated={Boolean(user)}
      loyaltyTier={profile?.loyaltyTier ?? "none"}
      minDiscountPercent={parseMinDiscountPercent(remise)}
    />
  );
}

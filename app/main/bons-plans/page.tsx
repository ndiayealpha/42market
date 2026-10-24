import type { Metadata } from "next";

import { getCurrentUser } from "@/src/features/auth/server";
import { StoreDealsView } from "@/src/features/store-deals/StoreDealsView";
import { routes } from "@/src/lib/routing/routes";
import { mockProfileRepository } from "@/src/services/profile.repository";

export const metadata: Metadata = {
  title: "Bons plans par épiceries | 42 Markets",
  // Indexable and canonical without params — this page carries no filter state (rule 7).
  alternates: { canonical: routes.main.bonsPlans },
};

/** Public (rule 7: "Bons plans par épiceries est publique") — unlike the per-store bons-plans page, no `verifySession` here; only the loyalty CTA and heart/"+" actions require auth, at the click. */
export default async function BonsPlansPage() {
  const user = await getCurrentUser();
  const profile = user ? await mockProfileRepository.getProfile(user.id) : null;

  return <StoreDealsView isAuthenticated={Boolean(user)} loyaltyTier={profile?.loyaltyTier ?? "none"} />;
}

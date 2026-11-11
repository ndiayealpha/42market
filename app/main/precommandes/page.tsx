import type { Metadata } from "next";

import { getStoreOptions, parseGroupPreorderCategory, parseGroupPreorderSort } from "@/src/domain/group-preorder";
import { verifySession } from "@/src/features/auth/server";
import { GroupPreordersView } from "@/src/features/group-preorders/GroupPreordersView";
import { routes } from "@/src/lib/routing/routes";
import { mockGroupPreordersRepository } from "@/src/services/group-preorders.repository";

export const metadata: Metadata = {
  title: "Précommandes groupées & gros volumes | 42 Markets",
  // Filters are a view preference, not a distinct page — same canonical-without-params rule as the other filtered listing pages.
  alternates: { canonical: routes.main.preorders },
};

interface PageProps {
  searchParams: Promise<{ categorie?: string; epicerie?: string; tri?: string }>;
}

export default async function GroupPreordersPage({ searchParams }: PageProps) {
  await verifySession(routes.main.preorders);

  const { categorie, epicerie, tri } = await searchParams;
  const [categories, campaigns] = await Promise.all([
    mockGroupPreordersRepository.getCategories(),
    mockGroupPreordersRepository.getCampaigns(),
  ]);
  const storeOptions = getStoreOptions(campaigns);
  const selectedStoreSlug = typeof epicerie === "string" && storeOptions.some((option) => option.slug === epicerie) ? epicerie : null;
  const now = new Date();

  return (
    <GroupPreordersView
      categories={categories}
      activeCategorySlug={parseGroupPreorderCategory(categorie, categories)}
      selectedStoreSlug={selectedStoreSlug}
      sort={parseGroupPreorderSort(tri)}
      now={now}
      refreshedAtIso={new Date(now.getTime() - 8 * 60_000).toISOString()}
    />
  );
}

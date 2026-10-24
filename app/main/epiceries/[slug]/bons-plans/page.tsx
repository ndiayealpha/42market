import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { parsePromoFilterType } from "@/src/domain/promotions";
import { StorePromosView } from "@/src/features/catalog/StorePromosView";
import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { mockPromotionsRepository } from "@/src/services/promotions.repository";
import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string; rayon?: string; epiceries?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = await mockStoreDetailRepository.getStore(slug);
  return {
    title: store ? `Bons plans de ${store.name} | 42 Markets` : "Bons plans | 42 Markets",
    // Filters are a view preference, not a distinct page — keep them out of the canonical URL.
    alternates: { canonical: routes.main.epicerieBonsPlans(slug) },
  };
}

export default async function StorePromosPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { type, rayon, epiceries } = await searchParams;
  await verifySession(routes.main.epicerieBonsPlans(slug));

  const store = await mockStoreDetailRepository.getStore(slug);
  if (!store) {
    notFound();
  }

  const scopeOptions = await mockPromotionsRepository.getScopeOptions();
  const requestedSlugs = epiceries?.split(",").filter(Boolean);
  const validSlugs = requestedSlugs?.filter((requestedSlug) => scopeOptions.some((option) => option.slug === requestedSlug));
  // Defaults to THIS store only, not every partner store — this page is
  // "Bons plans de {store.name}", not a cross-store comparison. Picking
  // other épiceries via the filter bar's multi-select remains possible
  // (an explicit, opt-in broadening), it just never happens silently.
  const selectedScopeSlugs = validSlugs && validSlugs.length > 0 ? validSlugs : [slug];

  return (
    <StorePromosView
      store={store}
      now={new Date()}
      activeType={parsePromoFilterType(type)}
      activeAisleId={rayon}
      selectedScopeSlugs={selectedScopeSlugs}
    />
  );
}

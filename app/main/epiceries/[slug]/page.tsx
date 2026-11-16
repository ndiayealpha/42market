import { notFound } from "next/navigation";

import { StorePageView } from "@/src/components/store-page/store-page-view";
import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

/**
 * PUBLIC and indexable, same treatment as `epicerieProduit` (no
 * `verifySession`) — a shopper should be able to browse a store's catalog
 * before creating an account, same reasoning as the fiche produit.
 */
export default async function StoreDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Only "loirivoire" has a detail fixture — see the repository's own
  // comment on this product decision (the other 8 catalog stores have
  // no maquette yet).
  const store = await mockStoreDetailRepository.getStore(slug);
  if (!store) {
    notFound();
  }

  return <StorePageView slug={slug} />;
}

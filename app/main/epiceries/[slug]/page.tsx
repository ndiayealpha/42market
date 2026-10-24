import { notFound } from "next/navigation";

import { StorePageView } from "@/src/components/store-page/store-page-view";
import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

export default async function StoreDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await verifySession(routes.main.epicerieDetail(slug));

  // Only "loirivoire" has a detail fixture — see the repository's own
  // comment on this product decision (the other 8 catalog stores have
  // no maquette yet).
  const store = await mockStoreDetailRepository.getStore(slug);
  if (!store) {
    notFound();
  }

  return <StorePageView slug={slug} />;
}

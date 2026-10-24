import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { parseCatalogSort } from "@/src/domain/catalog";
import { StoreCatalogView } from "@/src/features/catalog/StoreCatalogView";
import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = await mockStoreDetailRepository.getStore(slug);
  return {
    title: store ? `Tous les rayons — ${store.name} | 42 Markets` : "Tous les rayons | 42 Markets",
    // Sort is a display preference, not a distinct page — keep it out of the canonical URL.
    alternates: { canonical: routes.main.epicerieRayons(slug) },
  };
}

export default async function StoreCatalogPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;
  await verifySession(routes.main.epicerieRayons(slug));

  const store = await mockStoreDetailRepository.getStore(slug);
  if (!store) {
    notFound();
  }

  return <StoreCatalogView store={store} now={new Date()} scope={{ type: "all" }} initialSort={parseCatalogSort(sort)} />;
}

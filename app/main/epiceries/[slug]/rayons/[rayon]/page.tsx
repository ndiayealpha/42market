import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { parseCatalogSort } from "@/src/domain/catalog";
import { StoreCatalogView } from "@/src/features/catalog/StoreCatalogView";
import { verifySession } from "@/src/features/auth/server";
import { routes } from "@/src/lib/routing/routes";
import { mockStoreDetailRepository } from "@/src/services/store-detail.repository";

interface PageProps {
  params: Promise<{ slug: string; rayon: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, rayon } = await params;
  const store = await mockStoreDetailRepository.getStore(slug);
  const categories = await mockStoreDetailRepository.getCategories(slug);
  const aisle = categories.find((category) => category.id === rayon);
  return {
    title: store && aisle ? `${aisle.label} — ${store.name} | 42 Markets` : "Rayon | 42 Markets",
    alternates: { canonical: routes.main.epicerieRayon(slug, rayon) },
  };
}

export default async function StoreCatalogAislePage({ params, searchParams }: PageProps) {
  const { slug, rayon } = await params;
  const { sort } = await searchParams;
  await verifySession(routes.main.epicerieRayon(slug, rayon));

  const store = await mockStoreDetailRepository.getStore(slug);
  if (!store) {
    notFound();
  }

  const categories = await mockStoreDetailRepository.getCategories(slug);
  const isKnownAisle = categories.some((category) => category.id === rayon && category.variant !== "deals");
  if (!isKnownAisle) {
    notFound();
  }

  return <StoreCatalogView store={store} now={new Date()} scope={{ type: "rayon", slug: rayon }} initialSort={parseCatalogSort(sort)} />;
}

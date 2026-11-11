import type { Metadata } from "next";

import { parseNewArrivalCategory } from "@/src/domain/new-arrival";
import { verifySession } from "@/src/features/auth/server";
import { NewArrivalsView } from "@/src/features/new-arrivals/NewArrivalsView";
import { routes } from "@/src/lib/routing/routes";
import { mockNewArrivalsRepository } from "@/src/services/new-arrivals.repository";

export const metadata: Metadata = {
  title: "Nouveaux arrivages par épicerie | 42 Markets",
  // The category filter is a view preference, not a distinct page — same canonical-without-params rule as the other filtered listing pages.
  alternates: { canonical: routes.main.newArrivals },
};

interface PageProps {
  searchParams: Promise<{ categorie?: string }>;
}

export default async function NewArrivalsPage({ searchParams }: PageProps) {
  await verifySession(routes.main.newArrivals);

  const { categorie } = await searchParams;
  const categories = await mockNewArrivalsRepository.getCategories();

  return <NewArrivalsView categories={categories} activeCategorySlug={parseNewArrivalCategory(categorie, categories)} />;
}

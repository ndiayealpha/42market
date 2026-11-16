import type { Metadata } from "next";

import { parseRecipePage, parseRecipeRegionFilter, parseRecipeSort } from "@/src/domain/recipe";
import { TERROIR_REGION_CONFIG, type TerroirRegionSlug } from "@/src/domain/terroir";
import { RecipesListingView } from "@/src/features/recipes/RecipesListingView";
import { routes } from "@/src/lib/routing/routes";

export const metadata: Metadata = {
  title: "Toutes les recettes du terroir | 42 Markets",
  description: "Recettes traditionnelles transmises par nos familles et chefs partenaires, avec leur panier d'ingrédients Click & Collect prêt en un clic.",
  alternates: { canonical: routes.main.recipes },
};

interface PageProps {
  searchParams: Promise<{ region?: string; tri?: string; page?: string }>;
}

const REGIONS = Object.keys(TERROIR_REGION_CONFIG) as TerroirRegionSlug[];

/** Public, crawlable listing — same `PROTECTED_EXCEPTIONS` treatment as `bonsPlans`/`faq`. */
export default async function RecipesPage({ searchParams }: PageProps) {
  const { region, tri, page } = await searchParams;

  return (
    <RecipesListingView region={parseRecipeRegionFilter(region, REGIONS)} sort={parseRecipeSort(tri)} page={parseRecipePage(page)} />
  );
}

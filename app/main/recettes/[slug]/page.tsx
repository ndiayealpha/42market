import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildRecipeJsonLd } from "@/src/domain/recipe";
import { RecipeDetailView } from "@/src/features/recipes/RecipeDetailView";
import { routes } from "@/src/lib/routing/routes";
import { mockRecipesRepository } from "@/src/services/recipes.repository";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await mockRecipesRepository.getBySlug(slug);

  if (!recipe) {
    return { title: "Recette introuvable | 42 Markets" };
  }

  return {
    title: `${recipe.title} | 42 Markets`,
    description: recipe.description,
    alternates: { canonical: routes.main.recipeDetail(slug) },
  };
}

/** Public and indexable, same treatment as the fiche produit — mirrors `ProductDetailPage`'s shape exactly (server-side validation + notFound, then a client view that re-fetches for the query-cache-backed interactivity). */
export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await mockRecipesRepository.getBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const jsonLd = buildRecipeJsonLd({ recipe, canonicalUrl: routes.main.recipeDetail(slug) });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <RecipeDetailView slug={slug} now={new Date()} />
    </>
  );
}

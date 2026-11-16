"use client";

import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { Container } from "@/src/components/layout/Container/Container";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { useRecipe } from "@/src/hooks/useRecipe";
import { useRecipes } from "@/src/hooks/useRecipes";

import { RecipeDetailTemplate } from "./RecipeDetailTemplate";

export interface RecipeDetailViewProps {
  slug: string;
  now: Date;
}

function RecipeDetailSkeleton() {
  return (
    <Container className="flex flex-col gap-6 py-6">
      <Skeleton height={380} radius="2xl" />
      <Skeleton height={200} radius="2xl" />
    </Container>
  );
}

/** Mirrors `ProductDetailView`'s shape: the page.tsx already validated/404'd server-side for SEO — this re-fetches client-side for the query-cache-backed interactivity (favorites join, etc). */
export function RecipeDetailView({ slug, now }: RecipeDetailViewProps) {
  const { recipe, isLoading, isError, refetch } = useRecipe(slug);
  const { recipes: allRecipes } = useRecipes();

  return (
    <AsyncSection isLoading={isLoading} isError={isError} onRetry={refetch} skeleton={<RecipeDetailSkeleton />}>
      {recipe && <RecipeDetailTemplate recipe={recipe} allRecipes={allRecipes} now={now} />}
    </AsyncSection>
  );
}

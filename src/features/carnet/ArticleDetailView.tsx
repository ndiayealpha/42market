"use client";

import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { Container } from "@/src/components/layout/Container/Container";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { useArticle } from "@/src/hooks/useArticle";
import { useArticles } from "@/src/hooks/useArticles";
import { useRecipe } from "@/src/hooks/useRecipe";
import { useStorePromos } from "@/src/hooks/useStorePromos";

import { ArticleDetailTemplate } from "./ArticleDetailTemplate";

export interface ArticleDetailViewProps {
  slug: string;
  now: Date;
}

function ArticleDetailSkeleton() {
  return (
    <Container className="flex flex-col gap-6 py-6">
      <Skeleton height={60} radius="xl" />
      <Skeleton height={420} radius="2xl" />
    </Container>
  );
}

export function ArticleDetailView({ slug, now }: ArticleDetailViewProps) {
  const { article, isLoading, isError, refetch } = useArticle(slug);
  const { articles: allArticles } = useArticles();
  const { recipe: linkedRecipe } = useRecipe(article?.linkedRecipeSlug ?? "__none__");
  const { stores } = useStorePromos();

  const linkedProductStoreSlug = article?.linkedProducts?.[0]?.storeSlug;
  const linkedStore = linkedProductStoreSlug ? (stores.find((store) => store.slug === linkedProductStoreSlug) ?? null) : null;
  const guideStoreOptions = stores.map((store) => ({
    slug: store.slug,
    name: store.name,
    distanceMeters: store.distanceMeters,
    pickupMinutes: store.pickupMinutes,
  }));

  return (
    <AsyncSection isLoading={isLoading} isError={isError} onRetry={refetch} skeleton={<ArticleDetailSkeleton />}>
      {article && (
        <ArticleDetailTemplate
          article={article}
          allArticles={allArticles}
          linkedRecipe={linkedRecipe}
          linkedStore={linkedStore}
          guideStoreOptions={guideStoreOptions}
          now={now}
        />
      )}
    </AsyncSection>
  );
}

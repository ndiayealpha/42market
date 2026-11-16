"use client";

import { useRouter } from "next/navigation";

import { getArticleKindCounts, getArticlesByKind, searchArticles, type ArticleKind } from "@/src/domain/article";
import { useArticles } from "@/src/hooks/useArticles";
import { useRecipe } from "@/src/hooks/useRecipe";
import { routes } from "@/src/lib/routing/routes";

import { CarnetTemplate } from "./CarnetTemplate";

export interface CarnetViewProps {
  kind: ArticleKind | "all";
  query: string;
}

const FEATURED_ARTICLE_ID = "art-thieboudienne";
const FEATURED_RECIPE_SLUG = "thieboudienne-rouge-ceebu-jen";

export function CarnetView({ kind, query }: CarnetViewProps) {
  const router = useRouter();
  const { articles, isLoading, isError, refetch } = useArticles();
  const { recipe: linkedRecipe } = useRecipe(FEATURED_RECIPE_SLUG);

  const visible = searchArticles(getArticlesByKind(articles, kind), query);
  const featuredArticle = kind === "all" ? (visible.find((article) => article.id === FEATURED_ARTICLE_ID) ?? null) : null;
  const otherArticles = visible.filter((article) => article.id !== featuredArticle?.id);
  const kindCounts = getArticleKindCounts(articles);

  function buildHref(overrides: { kind?: ArticleKind | "all"; query?: string }): string {
    const nextKind = overrides.kind ?? kind;
    const nextQuery = overrides.query ?? query;
    const params = new URLSearchParams();
    if (nextKind !== "all") params.set("cat", nextKind);
    if (nextQuery) params.set("q", nextQuery);
    const search = params.toString();
    return search ? `${routes.main.carnet}?${search}` : routes.main.carnet;
  }

  return (
    <CarnetTemplate
      featuredArticle={featuredArticle}
      linkedRecipe={linkedRecipe}
      otherArticles={otherArticles}
      kindCounts={kindCounts}
      activeKind={kind}
      buildKindHref={(nextKind) => buildHref({ kind: nextKind })}
      query={query}
      onQueryChange={(nextQuery) => router.push(buildHref({ query: nextQuery }))}
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
    />
  );
}

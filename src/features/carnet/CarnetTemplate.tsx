import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { Container } from "@/src/components/layout/Container/Container";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import type { Article, ArticleKind, ArticleKindCount } from "@/src/domain/article";
import type { Recipe } from "@/src/domain/recipe";

import { ArticleHubCard } from "./ArticleHubCard";
import { ArticleKindFilters } from "./ArticleKindFilters";
import { CarnetHero } from "./CarnetHero";
import { FeaturedArticleCard } from "./FeaturedArticleCard";
import { IngredientAbecedaire } from "./IngredientAbecedaire";
import { NewsletterCta } from "./NewsletterCta";

export interface CarnetTemplateProps {
  featuredArticle: Article | null;
  linkedRecipe: Recipe | null;
  otherArticles: Article[];
  kindCounts: ArticleKindCount[];
  activeKind: ArticleKind | "all";
  buildKindHref: (kind: ArticleKind | "all") => string;
  query: string;
  onQueryChange: (query: string) => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

function HubSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton height={280} radius="2xl" />
      <CardGrid columns={3}>
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index}>
            <Skeleton height={300} radius="2xl" />
          </li>
        ))}
      </CardGrid>
    </div>
  );
}

export function CarnetTemplate({
  featuredArticle,
  linkedRecipe,
  otherArticles,
  kindCounts,
  activeKind,
  buildKindHref,
  query,
  onQueryChange,
  isLoading,
  isError,
  onRetry,
}: CarnetTemplateProps) {
  return (
    <Container className="flex flex-col gap-10 py-6">
      <CarnetHero query={query} onQueryChange={onQueryChange} />
      <ArticleKindFilters counts={kindCounts} activeKind={activeKind} buildHref={buildKindHref} />

      <AsyncSection isLoading={isLoading} isError={isError} onRetry={onRetry} skeleton={<HubSkeleton />}>
        {featuredArticle && (
          <div className="mb-8">
            <FeaturedArticleCard article={featuredArticle} linkedRecipe={linkedRecipe} />
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4">
          <h2 className="text-xl font-extrabold text-foreground-strong">Récits de cuisine &amp; portraits d&apos;artisans</h2>
          {otherArticles.length === 0 ? (
            <EmptyState icon="search" title="Aucun article ne correspond à cette recherche." />
          ) : (
            <CardGrid columns={3}>
              {otherArticles.map((article) => (
                <li key={article.id}>
                  <ArticleHubCard article={article} />
                </li>
              ))}
            </CardGrid>
          )}
        </div>
      </AsyncSection>

      <IngredientAbecedaire />
      <NewsletterCta />
    </Container>
  );
}

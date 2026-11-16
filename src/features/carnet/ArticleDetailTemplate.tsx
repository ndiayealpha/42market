import { Container } from "@/src/components/layout/Container/Container";
import { getRelatedArticles, type Article } from "@/src/domain/article";
import type { StorePromoSummary } from "@/src/domain/promotions";
import type { Recipe } from "@/src/domain/recipe";

import { AntiGaspiArticleBody } from "./AntiGaspiArticleBody";
import { ArticleDetailHeader } from "./ArticleDetailHeader";
import { ArticleRelatedSection } from "./ArticleRelatedSection";
import { GuideArticleBody } from "./GuideArticleBody";
import { PortraitArticleBody } from "./PortraitArticleBody";
import { RecetteArticleBody } from "./RecetteArticleBody";

export interface ArticleDetailTemplateProps {
  article: Article;
  allArticles: Article[];
  linkedRecipe: Recipe | null;
  linkedStore: StorePromoSummary | null;
  guideStoreOptions: { slug: string; name: string; distanceMeters: number; pickupMinutes: number }[];
  now: Date;
}

export function ArticleDetailTemplate({ article, allArticles, linkedRecipe, linkedStore, guideStoreOptions, now }: ArticleDetailTemplateProps) {
  return (
    <Container className="flex flex-col gap-8 py-6">
      <ArticleDetailHeader article={article} />

      {article.kind === "recette" && <RecetteArticleBody recipe={linkedRecipe} />}
      {article.kind === "guide" && <GuideArticleBody linkedProducts={article.linkedProducts ?? []} storeOptions={guideStoreOptions} />}
      {article.kind === "portrait" && <PortraitArticleBody store={linkedStore} linkedProducts={article.linkedProducts ?? []} now={now} />}
      {article.kind === "anti-gaspi" && <AntiGaspiArticleBody flashProducts={article.linkedProducts ?? []} />}

      <ArticleRelatedSection relatedArticles={getRelatedArticles(article, allArticles)} />
    </Container>
  );
}

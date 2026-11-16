import type { Media } from "@/src/domain/store-merchandising";
import { foldAccents } from "@/src/lib/text";

export type ArticleKind = "recette" | "guide" | "portrait" | "anti-gaspi";

export const ARTICLE_KIND_CONFIG: Record<ArticleKind, { label: string; badgeLabel: string }> = {
  recette: { label: "Secrets de Recettes", badgeLabel: "Secrets de Recettes" },
  guide: { label: "Guide des Épices", badgeLabel: "Guide des Épices" },
  portrait: { label: "Portraits d'Épiciers", badgeLabel: "Portraits d'Épiciers" },
  "anti-gaspi": { label: "Anti-Gaspi & Saison", badgeLabel: "Anti-Gaspi & Saison" },
};

export interface ArticleAuthor {
  name: string;
  role: string;
}

export interface ArticleLinkedProduct {
  id: string;
  name: string;
  price: number;
  packagingLabel: string;
  image: Media;
  storeSlug: string;
  storeName: string;
}

export interface Article {
  id: string;
  slug: string;
  kind: ArticleKind;
  title: string;
  excerpt: string;
  heroImage: Media;
  readingMinutes: number;
  publishedAtIso: string;
  author: ArticleAuthor;
  tags: string[];
  /** The recipe this article pre-fills a basket for, if any — a real `Recipe.slug`, never a fabricated link. */
  linkedRecipeSlug?: string;
  /** Other real `Article.slug`s — cross-links are always explicit, never derived by guessing at "similar" content. */
  relatedArticleSlugs: string[];
  linkedProducts?: ArticleLinkedProduct[];
}

export function getArticlesByKind(articles: Article[], kind: ArticleKind | "all"): Article[] {
  if (kind === "all") return articles;
  return articles.filter((article) => article.kind === kind);
}

export interface ArticleKindCount {
  kind: ArticleKind | "all";
  label: string;
  count: number;
}

export function getArticleKindCounts(articles: Article[]): ArticleKindCount[] {
  const kinds = (Object.keys(ARTICLE_KIND_CONFIG) as ArticleKind[])
    .map((kind) => ({ kind, label: ARTICLE_KIND_CONFIG[kind].label, count: getArticlesByKind(articles, kind).length }))
    .filter((entry) => entry.count > 0);
  return [{ kind: "all" as const, label: "Tous les articles", count: articles.length }, ...kinds];
}

export function parseArticleKindFilter(value: string | string[] | undefined): ArticleKind | "all" {
  const candidates: ArticleKind[] = ["recette", "guide", "portrait", "anti-gaspi"];
  return candidates.includes(value as ArticleKind) ? (value as ArticleKind) : "all";
}

/** Accent-folded both sides so "epices" matches "Épices" — a user typing without accents is the common case, not an edge case, for a French-language search. */
export function searchArticles(articles: Article[], query: string): Article[] {
  const normalized = foldAccents(query.trim());
  if (!normalized) return articles;
  return articles.filter(
    (article) => foldAccents(article.title).includes(normalized) || foldAccents(article.excerpt).includes(normalized)
  );
}

export function getArticleBySlug(articles: Article[], slug: string): Article | null {
  return articles.find((article) => article.slug === slug) ?? null;
}

export function getRelatedArticles(article: Article, allArticles: Article[]): Article[] {
  return article.relatedArticleSlugs.map((slug) => getArticleBySlug(allArticles, slug)).filter((candidate): candidate is Article => candidate !== null);
}

/** "5 min de lecture" / "1 min de lecture". */
export function formatReadingTime(minutes: number): string {
  return minutes === 1 ? "1 min de lecture" : `${minutes} min de lecture`;
}

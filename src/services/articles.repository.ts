import { ARTICLES } from "@/src/data/articles.mock";
import type { Article } from "@/src/domain/article";

export interface ArticlesRepository {
  list(): Promise<Article[]>;
  getBySlug(slug: string): Promise<Article | null>;
}

export const mockArticlesRepository: ArticlesRepository = {
  async list() {
    return ARTICLES;
  },
  async getBySlug(slug) {
    return ARTICLES.find((article) => article.slug === slug) ?? null;
  },
};

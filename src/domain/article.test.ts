import { describe, expect, it } from "vitest";

import {
  formatReadingTime,
  getArticleBySlug,
  getArticleKindCounts,
  getArticlesByKind,
  getRelatedArticles,
  parseArticleKindFilter,
  searchArticles,
  type Article,
} from "./article";

function makeArticle(overrides: Partial<Article> = {}): Article {
  return {
    id: "a1",
    slug: "a1",
    kind: "recette",
    title: "Article",
    excerpt: "Extrait.",
    heroImage: { src: "/x.jpg", alt: "x" },
    readingMinutes: 5,
    publishedAtIso: "2026-08-18T00:00:00Z",
    author: { name: "Auteur", role: "Rôle" },
    tags: [],
    relatedArticleSlugs: [],
    ...overrides,
  };
}

describe("getArticlesByKind", () => {
  it("returns everything for 'all'", () => {
    expect(getArticlesByKind([makeArticle()], "all")).toHaveLength(1);
  });

  it("filters to the matching kind", () => {
    const articles = [makeArticle({ id: "a", kind: "guide" }), makeArticle({ id: "b", kind: "portrait" })];
    expect(getArticlesByKind(articles, "guide").map((a) => a.id)).toEqual(["a"]);
  });
});

describe("getArticleKindCounts", () => {
  it("includes 'all' plus only kinds with at least one article", () => {
    const articles = [makeArticle({ kind: "recette" }), makeArticle({ id: "a2", kind: "recette" })];
    const counts = getArticleKindCounts(articles);
    expect(counts).toEqual([
      { kind: "all", label: "Tous les articles", count: 2 },
      { kind: "recette", label: "Secrets de Recettes", count: 2 },
    ]);
  });
});

describe("parseArticleKindFilter", () => {
  it("accepts known kinds, falls back to 'all'", () => {
    expect(parseArticleKindFilter("guide")).toBe("guide");
    expect(parseArticleKindFilter("bogus")).toBe("all");
    expect(parseArticleKindFilter(undefined)).toBe("all");
  });
});

describe("getArticleBySlug / getRelatedArticles", () => {
  const articles = [makeArticle({ id: "a", slug: "a" }), makeArticle({ id: "b", slug: "b" })];

  it("finds an article by slug", () => {
    expect(getArticleBySlug(articles, "b")?.id).toBe("b");
  });

  it("returns null for an unknown slug", () => {
    expect(getArticleBySlug(articles, "zzz")).toBeNull();
  });

  it("resolves related slugs to real articles, dropping any that don't exist", () => {
    const article = makeArticle({ relatedArticleSlugs: ["b", "zzz"] });
    expect(getRelatedArticles(article, articles).map((a) => a.slug)).toEqual(["b"]);
  });
});

describe("formatReadingTime", () => {
  it("handles singular and plural", () => {
    expect(formatReadingTime(1)).toBe("1 min de lecture");
    expect(formatReadingTime(5)).toBe("5 min de lecture");
  });
});

describe("searchArticles", () => {
  const articles = [makeArticle({ id: "a", title: "Le Thiéboudienne" }), makeArticle({ id: "b", title: "Le Couscous", excerpt: "semoule roulée" })];

  it("returns everything for an empty query", () => {
    expect(searchArticles(articles, "")).toHaveLength(2);
  });

  it("matches title or excerpt, case-insensitively", () => {
    expect(searchArticles(articles, "thiébou").map((a) => a.id)).toEqual(["a"]);
    expect(searchArticles(articles, "SEMOULE").map((a) => a.id)).toEqual(["b"]);
  });
});

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetailView } from "@/src/features/carnet/ArticleDetailView";
import { routes } from "@/src/lib/routing/routes";
import { mockArticlesRepository } from "@/src/services/articles.repository";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await mockArticlesRepository.getBySlug(slug);

  if (!article) {
    return { title: "Article introuvable | 42 Markets" };
  }

  return {
    title: `${article.title} | 42 Markets`,
    description: article.excerpt,
    alternates: { canonical: routes.main.carnetArticle(slug) },
  };
}

/** Public and indexable, same treatment as the fiche recette — one dynamic route for every article kind (see `routes.ts`), the body dispatches on `article.kind`. */
export default async function CarnetArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await mockArticlesRepository.getBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailView slug={slug} now={new Date()} />;
}

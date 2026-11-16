"use client";

import { useQuery } from "@tanstack/react-query";

import { mockArticlesRepository } from "@/src/services/articles.repository";

export function useArticle(slug: string) {
  const query = useQuery({ queryKey: ["articles", "detail", slug], queryFn: () => mockArticlesRepository.getBySlug(slug) });
  return { article: query.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

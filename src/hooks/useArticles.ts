"use client";

import { useQuery } from "@tanstack/react-query";

import { mockArticlesRepository } from "@/src/services/articles.repository";

export function useArticles() {
  const query = useQuery({ queryKey: ["articles", "list"], queryFn: () => mockArticlesRepository.list() });
  return { articles: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

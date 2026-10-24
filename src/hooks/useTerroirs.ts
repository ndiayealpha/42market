"use client";

import { useQuery } from "@tanstack/react-query";

import { mockProfileRepository } from "@/src/services/profile.repository";

export function useTerroirs(userId: string) {
  const query = useQuery({
    queryKey: ["profile", "terroirs", userId],
    queryFn: () => mockProfileRepository.getTerroirs(userId),
  });
  return {
    terroirs: query.data?.terroirs ?? [],
    suggestionLabel: query.data?.suggestionLabel ?? "",
    isLoading: query.isPending,
    isError: query.isError,
  };
}

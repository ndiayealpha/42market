"use client";

import { useQuery } from "@tanstack/react-query";

import { mockProfileRepository } from "@/src/services/profile.repository";

export function useProfileStats(userId: string) {
  const query = useQuery({
    queryKey: ["profile", "stats", userId],
    queryFn: () => mockProfileRepository.getStats(userId),
  });
  return { stats: query.data ?? null, isLoading: query.isPending, isError: query.isError };
}

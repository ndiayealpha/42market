"use client";

import { useQuery } from "@tanstack/react-query";

import { mockProfileRepository } from "@/src/services/profile.repository";

export function useProfile(userId: string) {
  const query = useQuery({
    queryKey: ["profile", "details", userId],
    queryFn: () => mockProfileRepository.getProfile(userId),
  });
  return { profile: query.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

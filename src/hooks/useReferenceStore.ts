"use client";

import { useQuery } from "@tanstack/react-query";

import { mockProfileRepository } from "@/src/services/profile.repository";

export function useReferenceStore(userId: string) {
  const query = useQuery({
    queryKey: ["profile", "reference-store", userId],
    queryFn: () => mockProfileRepository.getReferenceStore(userId),
  });
  return { store: query.data ?? null, isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

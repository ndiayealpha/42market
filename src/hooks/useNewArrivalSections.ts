"use client";

import { useQuery } from "@tanstack/react-query";

import { mockNewArrivalsRepository } from "@/src/services/new-arrivals.repository";

export function useNewArrivalSections() {
  const query = useQuery({
    queryKey: ["new-arrivals", "sections"],
    queryFn: () => mockNewArrivalsRepository.getSections(),
  });
  return { sections: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { mockOrdersRepository } from "@/src/services/orders.repository";

export function useActiveOrder(userId: string) {
  const query = useQuery({
    queryKey: ["orders", "active", userId],
    queryFn: () => mockOrdersRepository.getActiveOrder(userId),
  });
  return { order: query.data ?? null, isLoading: query.isPending, isError: query.isError };
}

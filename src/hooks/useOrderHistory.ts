"use client";

import { useQuery } from "@tanstack/react-query";

import { mockOrdersRepository } from "@/src/services/orders.repository";

export function useOrderHistory(userId: string) {
  const query = useQuery({
    queryKey: ["orders", "history", userId],
    queryFn: () => mockOrdersRepository.getOrderHistory(userId),
  });
  return {
    entries: query.data?.entries ?? [],
    totalCount: query.data?.totalCount ?? 0,
    isLoading: query.isPending,
    isError: query.isError,
  };
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { mockGroupPreordersRepository } from "@/src/services/group-preorders.repository";

export function useGroupPreorderCampaigns() {
  const query = useQuery({
    queryKey: ["group-preorders", "campaigns"],
    queryFn: () => mockGroupPreordersRepository.getCampaigns(),
  });
  return { campaigns: query.data ?? [], isLoading: query.isPending, isError: query.isError, refetch: query.refetch };
}

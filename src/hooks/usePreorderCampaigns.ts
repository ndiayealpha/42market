"use client";

import { useQuery } from "@tanstack/react-query";

import { mockCatalogRepository } from "@/src/services/catalog.repository";

export function usePreorderCampaigns() {
  const query = useQuery({
    queryKey: ["preorders", "campaigns"],
    queryFn: () => mockCatalogRepository.getPreorderCampaigns(),
  });
  return { campaigns: query.data ?? [], isLoading: query.isPending };
}

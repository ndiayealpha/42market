"use client";

import { useQuery } from "@tanstack/react-query";

import { mockAccountSettingsRepository } from "@/src/services/account-settings.repository";

export function useAccountSettings(userId: string) {
  const query = useQuery({
    queryKey: ["account-settings", "summary", userId],
    queryFn: () => mockAccountSettingsRepository.getSettings(userId),
  });
  return { settings: query.data ?? null, isLoading: query.isPending, isError: query.isError };
}

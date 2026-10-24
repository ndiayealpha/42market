"use client";

import { useMutation } from "@tanstack/react-query";

import { mockAccountSettingsRepository } from "@/src/services/account-settings.repository";

export function useDeleteAccount(userId: string) {
  return useMutation({
    mutationFn: () => mockAccountSettingsRepository.deleteAccount(userId),
  });
}

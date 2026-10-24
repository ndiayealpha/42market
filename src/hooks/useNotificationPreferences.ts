"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { NotificationPreferences } from "@/src/domain/account-settings";
import { mockAccountSettingsRepository } from "@/src/services/account-settings.repository";
import { useToast } from "@/src/providers/toast-provider";

function notificationPreferencesKey(userId: string) {
  return ["account-settings", "notification-preferences", userId] as const;
}

export function useNotificationPreferences(userId: string) {
  const query = useQuery({
    queryKey: notificationPreferencesKey(userId),
    queryFn: () => mockAccountSettingsRepository.getNotificationPreferences(userId),
  });
  return { preferences: query.data ?? null, isLoading: query.isPending, isError: query.isError };
}

/** Optimistic toggle with rollback on failure + toast feedback (rule 10). */
export function useToggleNotificationPreference(userId: string) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const key = notificationPreferencesKey(userId);

  return useMutation({
    mutationFn: (preferences: NotificationPreferences) =>
      mockAccountSettingsRepository.updateNotificationPreferences(userId, preferences),
    onMutate: async (preferences) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<NotificationPreferences>(key);
      queryClient.setQueryData(key, preferences);
      return { previous };
    },
    onError: (_error, _preferences, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
      toast.show("La mise à jour des notifications a échoué.", "error");
    },
    onSuccess: () => {
      toast.show("Préférences de notifications mises à jour.", "success");
    },
  });
}

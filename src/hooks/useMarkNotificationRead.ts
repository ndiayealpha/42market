"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mockNotificationsRepository } from "@/src/services/notifications.repository";

/** Optimistic: flips `isRead` across every cached feed page immediately, rolls back on failure. Invalidates counts so the Header badge, category chips and header pastille all follow. */
export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mockNotificationsRepository.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => mockNotificationsRepository.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

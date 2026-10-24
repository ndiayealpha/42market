"use client";

import { useQuery } from "@tanstack/react-query";

import type { NotificationStatusFilter } from "@/src/domain/notifications";
import { mockNotificationsRepository } from "@/src/services/notifications.repository";

export function useNotificationCounts(status: NotificationStatusFilter) {
  const query = useQuery({
    queryKey: ["notifications", "counts", status],
    queryFn: () => mockNotificationsRepository.getCounts(status),
  });
  return { counts: query.data ?? { total: 0, unread: 0, byCategory: [] }, isLoading: query.isPending, isError: query.isError };
}

/** The Header badge / page pastille only ever need the global unread count, independent of any active filter. */
export function useUnreadNotificationsCount() {
  const { counts } = useNotificationCounts("all");
  return counts.unread;
}

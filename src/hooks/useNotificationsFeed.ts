"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import type { NotificationCategory, NotificationStatusFilter } from "@/src/domain/notifications";
import { mockNotificationsRepository } from "@/src/services/notifications.repository";

export function useNotificationsFeed(status: NotificationStatusFilter, category: NotificationCategory | "all") {
  const query = useInfiniteQuery({
    queryKey: ["notifications", "feed", status, category],
    queryFn: ({ pageParam }) => mockNotificationsRepository.getNotifications({ status, category, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const notifications = query.data?.pages.flatMap((page) => page.notifications) ?? [];
  const totalCount = query.data?.pages[0]?.totalCount ?? 0;

  return {
    notifications,
    totalCount,
    isLoading: query.isPending,
    isError: query.isError,
    hasMore: Boolean(query.hasNextPage),
    isLoadingMore: query.isFetchingNextPage,
    loadMore: () => query.fetchNextPage(),
    refetch: query.refetch,
  };
}

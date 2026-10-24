"use client";

import type { NotificationCategory, NotificationStatusFilter } from "@/src/domain/notifications";
import { useAccountSettings } from "@/src/hooks/useAccountSettings";
import { useMarkAllNotificationsRead } from "@/src/hooks/useMarkNotificationRead";
import { useNotificationCounts } from "@/src/hooks/useNotificationCounts";
import { useNotificationsAverage } from "@/src/hooks/useNotificationsAverage";
import { useNotificationsFeed } from "@/src/hooks/useNotificationsFeed";
import { useReferenceStore } from "@/src/hooks/useReferenceStore";
import { routes } from "@/src/lib/routing/routes";

import { NotificationsTemplate } from "./NotificationsTemplate";

export interface NotificationsViewProps {
  userId: string;
  now: Date;
  statusFilter: NotificationStatusFilter;
  categoryFilter: NotificationCategory | "all";
}

/** Thin container: wires every hook (feed, counts, mark-read, reference store, account settings) and hands the resolved view model to the pure `NotificationsTemplate`. */
export function NotificationsView({ userId, now, statusFilter, categoryFilter }: NotificationsViewProps) {
  const feed = useNotificationsFeed(statusFilter, categoryFilter);
  const { counts: countsForFilter } = useNotificationCounts(statusFilter);
  const { counts: globalCounts } = useNotificationCounts("all");
  const markAllAsRead = useMarkAllNotificationsRead();
  const referenceStoreQuery = useReferenceStore(userId);
  const { settings } = useAccountSettings(userId);
  const averagePerDay = useNotificationsAverage();

  function buildHref(overrides: { status?: NotificationStatusFilter; category?: NotificationCategory | "all" }): string {
    const nextStatus = overrides.status ?? statusFilter;
    const nextCategory = overrides.category ?? categoryFilter;
    const params = new URLSearchParams();
    if (nextStatus !== "all") params.set("statut", nextStatus);
    if (nextCategory !== "all") params.set("categorie", nextCategory);
    const search = params.toString();
    return search ? `${routes.main.notifications}?${search}` : routes.main.notifications;
  }

  return (
    <NotificationsTemplate
      userId={userId}
      now={now}
      statusFilter={statusFilter}
      getStatusHref={(status) => buildHref({ status })}
      categoryFilter={categoryFilter}
      getCategoryHref={(category) => buildHref({ category })}
      unreadCount={globalCounts.unread}
      totalCountForFilter={countsForFilter.total}
      byCategory={countsForFilter.byCategory}
      onMarkAllAsRead={() => markAllAsRead.mutate()}
      isMarkingAllAsRead={markAllAsRead.isPending}
      notifications={feed.notifications}
      totalCount={feed.totalCount}
      isFeedLoading={feed.isLoading}
      isFeedError={feed.isError}
      onRetryFeed={feed.refetch}
      hasMore={feed.hasMore}
      isLoadingMore={feed.isLoadingMore}
      onLoadMore={feed.loadMore}
      referenceStore={referenceStoreQuery.store}
      isReferenceStoreLoading={referenceStoreQuery.isLoading}
      isPhoneVerified={settings?.isPhoneVerified ?? false}
      averageNotificationsPerDay={averagePerDay}
    />
  );
}

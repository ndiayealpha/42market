import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Container } from "@/src/components/layout/Container/Container";
import type { Notification, NotificationCategory, NotificationCategoryCount, NotificationStatusFilter } from "@/src/domain/notifications";
import type { ReferenceStore } from "@/src/domain/reference-store";
import { routes } from "@/src/lib/routing/routes";

import { AlertSettingsCard } from "./AlertSettingsCard";
import { NotificationCategoryChips } from "./NotificationCategoryChips";
import { NotificationFeed } from "./NotificationFeed";
import { NotificationsHeader } from "./NotificationsHeader";
import { ReferenceStoreCard } from "./ReferenceStoreCard";
import { ZeroSpamCard } from "./ZeroSpamCard";

export interface NotificationsTemplateProps {
  userId: string;
  now: Date;
  statusFilter: NotificationStatusFilter;
  getStatusHref: (status: NotificationStatusFilter) => string;
  categoryFilter: NotificationCategory | "all";
  getCategoryHref: (category: NotificationCategory | "all") => string;
  unreadCount: number;
  totalCountForFilter: number;
  byCategory: NotificationCategoryCount[];
  onMarkAllAsRead: () => void;
  isMarkingAllAsRead: boolean;

  notifications: Notification[];
  totalCount: number;
  isFeedLoading: boolean;
  isFeedError: boolean;
  onRetryFeed: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;

  referenceStore: ReferenceStore | null;
  isReferenceStoreLoading: boolean;

  isPhoneVerified: boolean;

  averageNotificationsPerDay: number;
}

/** Pure template — `NotificationsView` wires every hook. 2/3 feed + 1/3 sidebar from `lg`, stacked (feed first) below it. */
export function NotificationsTemplate({
  userId,
  now,
  statusFilter,
  getStatusHref,
  categoryFilter,
  getCategoryHref,
  unreadCount,
  totalCountForFilter,
  byCategory,
  onMarkAllAsRead,
  isMarkingAllAsRead,
  notifications,
  totalCount,
  isFeedLoading,
  isFeedError,
  onRetryFeed,
  hasMore,
  isLoadingMore,
  onLoadMore,
  referenceStore,
  isReferenceStoreLoading,
  isPhoneVerified,
  averageNotificationsPerDay,
}: NotificationsTemplateProps) {
  return (
    <Container className="flex flex-col gap-6 py-6">
      <Breadcrumb
        items={[
          { label: "Accueil", href: routes.main.home },
          { label: "Espace Client", href: routes.main.profile },
          { label: "Notifications" },
        ]}
      />

      <NotificationsHeader
        unreadCount={unreadCount}
        statusFilter={statusFilter}
        getStatusHref={getStatusHref}
        onMarkAllAsRead={onMarkAllAsRead}
        isMarkingAllAsRead={isMarkingAllAsRead}
      />

      <NotificationCategoryChips active={categoryFilter} totalCount={totalCountForFilter} byCategory={byCategory} getCategoryHref={getCategoryHref} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NotificationFeed
            notifications={notifications}
            totalCount={totalCount}
            statusFilter={statusFilter}
            now={now}
            isLoading={isFeedLoading}
            isError={isFeedError}
            onRetry={onRetryFeed}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={onLoadMore}
          />
        </div>

        <div className="flex flex-col gap-6">
          {!isReferenceStoreLoading && (
            <ReferenceStoreCard store={referenceStore} now={now} changeStoreHref={`${routes.main.favorites}?onglet=epiceries`} />
          )}
          <AlertSettingsCard userId={userId} isPhoneVerified={isPhoneVerified} />
          <ZeroSpamCard averagePerDay={averageNotificationsPerDay} />
        </div>
      </div>
    </Container>
  );
}

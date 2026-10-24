import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { groupNotificationsByDay, type Notification, type NotificationStatusFilter } from "@/src/domain/notifications";
import { LoadMore } from "@/src/features/catalog/LoadMore";
import { formatNumber } from "@/src/lib/format";

import { NotificationCard } from "./NotificationCard";

export interface NotificationFeedProps {
  notifications: Notification[];
  totalCount: number;
  statusFilter: NotificationStatusFilter;
  now: Date;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

function NotificationFeedSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton height={120} radius="2xl" />
      <Skeleton height={120} radius="2xl" />
      <Skeleton height={120} radius="2xl" />
    </div>
  );
}

/** N4 — groups ("Aujourd'hui" / "Hier & Plus tôt") computed purely from the loaded page, each rendered as an `<h2>` + `<ul>` of `NotificationCard`. */
export function NotificationFeed({
  notifications,
  totalCount,
  statusFilter,
  now,
  isLoading,
  isError,
  onRetry,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: NotificationFeedProps) {
  const groups = groupNotificationsByDay(notifications, now);

  return (
    <AsyncSection isLoading={isLoading} isError={isError} onRetry={onRetry} skeleton={<NotificationFeedSkeleton />}>
      {notifications.length === 0 ? (
        <EmptyState
          icon="bell"
          title={statusFilter === "unread" ? "Tout est lu !" : "Aucune notification pour le moment."}
          description={statusFilter === "unread" ? "Vous êtes à jour sur toutes vos notifications." : undefined}
        />
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <section key={group.key} aria-labelledby={`notif-group-${group.key}`}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 id={`notif-group-${group.key}`} className="flex items-center gap-2 text-sm font-semibold text-foreground-strong">
                  <span aria-hidden className={`h-2 w-2 rounded-full ${group.key === "today" ? "bg-foreground-strong" : "bg-border"}`} />
                  {group.label}
                </h2>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{group.countLabel}</span>
              </div>
              <ul role="list" className="flex flex-col gap-3">
                {group.notifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} now={now} />
                ))}
              </ul>
            </section>
          ))}

          <LoadMore
            displayedCount={notifications.length}
            totalCount={totalCount}
            hasMore={hasMore}
            isLoading={isLoadingMore}
            isError={false}
            onLoadMore={onLoadMore}
            summaryLabel={`Affichage de ${formatNumber(notifications.length)} sur ${formatNumber(totalCount)} notifications.`}
            loadMoreLabel="Voir les notifications plus anciennes"
          />
        </div>
      )}
    </AsyncSection>
  );
}

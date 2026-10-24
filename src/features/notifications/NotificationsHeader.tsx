import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Button } from "@/src/components/atoms/Button/Button";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { NotificationStatusFilter } from "@/src/domain/notifications";

export interface NotificationsHeaderProps {
  unreadCount: number;
  statusFilter: NotificationStatusFilter;
  getStatusHref: (status: NotificationStatusFilter) => string;
  onMarkAllAsRead: () => void;
  isMarkingAllAsRead: boolean;
}

const STATUS_OPTIONS: { value: NotificationStatusFilter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "unread", label: "Non lues" },
];

/** N2 — the unread pastille is hidden entirely at 0 (not shown as "0 non lues") and announced via `aria-live`. */
export function NotificationsHeader({ unreadCount, statusFilter, getStatusHref, onMarkAllAsRead, isMarkingAllAsRead }: NotificationsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-[28px] font-extrabold text-foreground-strong">Notifications</h1>
          <span aria-live="polite">
            {unreadCount > 0 && (
              <Badge variant="label" color="danger" uppercase={false}>
                {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
              </Badge>
            )}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Suivi direct des arrivages, réservations Click &amp; Collect et actualités de vos épiceries de quartier.
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <nav aria-label="Filtrer par statut">
          <SegmentedControlLinks statusFilter={statusFilter} getStatusHref={getStatusHref} />
        </nav>
        <Button variant="soft" icon={<Icon name="check-circle" size={16} decorative />} onClick={onMarkAllAsRead} disabled={unreadCount === 0 || isMarkingAllAsRead}>
          Tout marquer comme lu
        </Button>
      </div>
    </div>
  );
}

/** `SegmentedControl` filters content in place via `onChange`, but this control must be a real URL-driven link (rule 3) — same `role="radiogroup"` shape, built from `<Link>`s instead. */
function SegmentedControlLinks({
  statusFilter,
  getStatusHref,
}: {
  statusFilter: NotificationStatusFilter;
  getStatusHref: (status: NotificationStatusFilter) => string;
}) {
  return (
    <div role="radiogroup" aria-label="Statut des notifications" className="inline-flex rounded-full bg-catalog-chip p-1">
      {STATUS_OPTIONS.map((option) => {
        const isSelected = option.value === statusFilter;
        return (
          <a
            key={option.value}
            href={getStatusHref(option.value)}
            role="radio"
            aria-checked={isSelected}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              isSelected ? "bg-surface text-foreground-strong shadow-card" : "text-muted-foreground hover:text-foreground-strong"
            }`}
          >
            {option.label}
          </a>
        );
      })}
    </div>
  );
}

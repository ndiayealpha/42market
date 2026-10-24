import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProgressTimeline } from "@/src/components/molecules/ProgressTimeline/ProgressTimeline";
import { getTrackingSteps, type FullOrder } from "@/src/domain/orders";
import { formatRelativeTime } from "@/src/lib/format";

export interface OrderTrackingTimelineProps {
  order: FullOrder;
  now: Date;
}

/** S4 — live tracking. Wraps `ProgressTimeline` in `aria-live="polite"` so a status change on poll is announced. A cancelled order shows a notice instead of a 4-step progress that no longer makes sense. */
export function OrderTrackingTimeline({ order, now }: OrderTrackingTimelineProps) {
  if (order.status === "cancelled") {
    return (
      <Card variant="elevated">
        <p className="text-sm text-muted-foreground">Cette commande a été annulée, il n&apos;y a pas de suivi de préparation à afficher.</p>
      </Card>
    );
  }

  return (
    <Card variant="elevated">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-base font-bold text-foreground-strong">
          <Icon name="truck" size={18} decorative />
          Suivi de préparation en direct
        </h2>
        <span className="rounded-full bg-catalog-chip px-3 py-1 text-xs font-semibold text-muted-foreground">
          Mise à jour {formatRelativeTime(order.lastUpdatedIso, now).toLowerCase()}
        </span>
      </div>
      <div aria-live="polite">
        <ProgressTimeline steps={getTrackingSteps(order)} />
      </div>
    </Card>
  );
}

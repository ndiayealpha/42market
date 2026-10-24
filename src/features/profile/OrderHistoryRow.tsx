import { buttonVariants } from "@/src/components/atoms/Button/button.variants";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { OrderHistoryEntry } from "@/src/domain/orders";
import { getOrderStatusConfig } from "@/src/domain/orders";
import { formatLongDate, formatPrice } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

import { OrderStatusPill } from "./OrderStatusPill";

export interface OrderHistoryRowProps {
  entry: OrderHistoryEntry;
}

export function OrderHistoryRow({ entry }: OrderHistoryRowProps) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-catalog-line px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <OrderStatusPill status={entry.status} />
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground-strong">
            {entry.reference} <span className="font-normal text-muted-foreground">• {formatLongDate(entry.dateIso)}</span>
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {entry.storeName} • {entry.fulfillmentLabel} — {getOrderStatusConfig(entry.status).label}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-foreground-strong">{formatPrice(entry.amount)}</span>
        {/* Real file download (route handler sets Content-Disposition) — a plain anchor styled like `Button`, not the component itself, since this isn't a JS action. */}
        <a href={routes.api.orderReceipt(entry.id)} download className={buttonVariants("soft", true)}>
          Reçu fiscal (PDF)
          <Icon name="archive" size={14} className="ml-1" decorative />
        </a>
      </div>
    </li>
  );
}

import type { FullOrder } from "@/src/domain/orders";
import { routes } from "@/src/lib/routing/routes";

import { PrintReceiptButton } from "./PrintReceiptButton";

export interface OrderUtilityBarProps {
  order: FullOrder;
}

/** S0 — the beige utility bar: express pastille (left, omitted when `!isExpress`) + print/receipt actions (right). */
export function OrderUtilityBar({ order }: OrderUtilityBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-catalog-chip px-4 py-3 print:hidden">
      {order.isExpress ? (
        <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground-strong">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full bg-success" />
            Retrait express garanti
          </span>
          <span className="text-muted-foreground">{order.store.city.replace(/^\d+\s*/, "")} Centre • Traitement prioritaire</span>
        </p>
      ) : (
        <span />
      )}
      <div className="flex flex-wrap items-center gap-2">
        <PrintReceiptButton />
        {order.payment.isPaid ? (
          <a
            href={routes.api.orderReceipt(order.id)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-foreground-strong hover:bg-background"
          >
            Reçu fiscal (PDF)
          </a>
        ) : (
          <span
            title="Le reçu fiscal est disponible une fois la commande réglée."
            className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-muted-foreground opacity-60"
          >
            Reçu fiscal (PDF)
          </span>
        )}
      </div>
    </div>
  );
}

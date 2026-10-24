import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Card } from "@/src/components/atoms/Card/Card";
import { OrderLineItem } from "@/src/components/molecules/OrderLineItem/OrderLineItem";
import { OrderTotals } from "@/src/components/molecules/OrderTotals/OrderTotals";
import { buildOrderTotals } from "@/src/domain/cart";
import type { FullOrder } from "@/src/domain/orders";

import { GuaranteeNotice } from "./GuaranteeNotice";
import { PaymentSummaryRow } from "./PaymentSummaryRow";

export interface ReservedItemsCardProps {
  order: FullOrder;
}

/** S6 — line items, totals, payment summary and the freshness guarantee. Counts `lines.length` — the SAME single counting rule Page K uses for its own "article(s)" pastille (resolves the maquette's own "3 articles" vs "3 références" inconsistency with one rule everywhere, even though each screen's own label word differs). */
export function ReservedItemsCard({ order }: ReservedItemsCardProps) {
  const totals = buildOrderTotals(order.lines, { vatRatePercent: order.vatRatePercent, isPaid: order.payment.isPaid });

  return (
    <Card variant="elevated" className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-bold text-foreground-strong">Articles réservés</h2>
        <Badge color="info">
          {order.lines.length} référence{order.lines.length > 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="divide-y divide-border">
        {order.lines.map((line) => (
          <OrderLineItem key={line.id} line={line} className="py-3 first:pt-0 last:pb-0" />
        ))}
      </div>

      <OrderTotals lines={totals} />
      <PaymentSummaryRow payment={order.payment} />
      <GuaranteeNotice />
    </Card>
  );
}

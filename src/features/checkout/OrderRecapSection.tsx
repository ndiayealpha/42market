import type { ReactNode } from "react";

import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Section } from "@/src/components/layout/Section/Section";
import { OrderLineItem } from "@/src/components/molecules/OrderLineItem/OrderLineItem";
import { OrderTotals } from "@/src/components/molecules/OrderTotals/OrderTotals";
import { buildOrderTotals, type CartLine } from "@/src/domain/cart";
import { VAT_RATE_PERCENT } from "@/src/lib/constants";

export interface OrderRecapSectionProps {
  lines: CartLine[];
  /** `PaymentMethodSelector` + `ConfirmOrderButton` — K6 and K7/K8 share the same `id="validation"` section. */
  children: ReactNode;
}

/**
 * K6 (`id="validation"`, shared with payment/confirm). Counting rule: the
 * pastille always reads `lines.length` (distinct line items), never a sum
 * of quantities — this intentionally resolves the maquette's own "3
 * articles" vs "3 références" inconsistency by applying one rule
 * everywhere this page needs an article count.
 */
export function OrderRecapSection({ lines, children }: OrderRecapSectionProps) {
  const totals = buildOrderTotals(lines, { vatRatePercent: VAT_RATE_PERCENT, isPaid: false });
  const articleLabel = lines.length === 1 ? "1 article" : `${lines.length} articles`;

  return (
    <Section
      id="validation"
      headingTabIndex={-1}
      title="Récapitulatif & Paiement"
      action={
        <Chip tone="cream" size="sm">
          {articleLabel}
        </Chip>
      }
    >
      <div className="flex flex-col gap-3">
        {lines.map((line) => (
          <OrderLineItem key={line.id} line={line} />
        ))}
      </div>
      <OrderTotals lines={totals} className="mt-4" />
      <div className="mt-6 flex flex-col gap-6">{children}</div>
    </Section>
  );
}

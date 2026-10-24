import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { FullOrder } from "@/src/domain/orders";

export interface PaymentSummaryRowProps {
  payment: FullOrder["payment"];
}

/** The beige payment-method panel under S6's totals — "Carte Bancaire sécurisée" when paid online, "à régler au retrait" otherwise. */
export function PaymentSummaryRow({ payment }: PaymentSummaryRowProps) {
  const paidOnline = payment.method === "online" && payment.isPaid;

  return (
    <div className="flex items-center gap-3 rounded-xl bg-catalog-chip p-3">
      <Icon name="credit-card" size={20} className="shrink-0 text-foreground-strong" decorative />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground-strong">{paidOnline ? "Carte Bancaire sécurisée" : "Règlement sur place au retrait"}</p>
        <p className="text-xs text-muted-foreground">{paidOnline ? `Terminée par •••• ${payment.cardLast4}` : "Espèces ou CB"}</p>
      </div>
      <Badge color={paidOnline ? "success" : "info"}>{paidOnline ? "Réglé" : "À régler au retrait"}</Badge>
    </div>
  );
}

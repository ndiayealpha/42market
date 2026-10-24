import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { IconButton } from "@/src/components/atoms/IconButton/IconButton";
import { QuantityStepper } from "@/src/components/atoms/QuantityStepper/QuantityStepper";
import { EmptyState } from "@/src/components/molecules/EmptyState/EmptyState";
import { OrderLineItem } from "@/src/components/molecules/OrderLineItem/OrderLineItem";
import { OrderTotals } from "@/src/components/molecules/OrderTotals/OrderTotals";
import { buildOrderTotals, type CartLine } from "@/src/domain/cart";
import { VAT_RATE_PERCENT } from "@/src/lib/constants";
import { routes } from "@/src/lib/routing/routes";

/** No per-line stock ceiling exists on `CartLine` (Phase 0 audit) — a generic UI cap keeps the stepper usable without inventing fake stock data. */
const MAX_QUANTITY_PER_LINE = 20;

export interface CartTemplateProps {
  storeName: string | null;
  lines: CartLine[];
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemoveLine: (lineId: string) => void;
}

/**
 * Minimal real cart page (§4.6 of the brief — not maquetted, deliberately
 * simple: no promo codes, no multi-store, no saved-for-later). Pure
 * presentational template, driven entirely by props — see `cart-view.tsx`
 * for the container that reads the real cart store.
 */
export function CartTemplate({ storeName, lines, onUpdateQuantity, onRemoveLine }: CartTemplateProps) {
  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="sr-only">Mon cabas</h1>
        <EmptyState
          icon="basket"
          title="Votre cabas est vide"
          description="Parcourez les épiceries partenaires pour commencer vos courses en Click & Collect."
          action={
            <ButtonLink variant="primary-md" href={routes.main.epiceries}>
              Parcourir les épiceries
            </ButtonLink>
          }
        />
      </div>
    );
  }

  const totals = buildOrderTotals(lines, { vatRatePercent: VAT_RATE_PERCENT, isPaid: false });

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-extrabold text-foreground-strong">Mon cabas</h1>

      {storeName && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-catalog-chip px-4 py-3 text-sm font-semibold text-foreground-strong">
          <Icon name="store" size={16} decorative />
          {storeName}
        </div>
      )}

      <ul className="mt-4 flex flex-col gap-4">
        {lines.map((line) => (
          <li key={line.id} className="flex flex-col gap-3 border-b border-catalog-line pb-4 last:border-b-0">
            <OrderLineItem line={line} />
            <div className="flex items-center justify-between">
              <QuantityStepper
                value={line.quantity}
                max={MAX_QUANTITY_PER_LINE}
                onChange={(quantity) => onUpdateQuantity(line.id, quantity)}
              />
              <IconButton
                icon="trash"
                size="md"
                bg="var(--color-catalog-chip)"
                fg="var(--color-danger)"
                ariaLabel={`Retirer ${line.name} du cabas`}
                onClick={() => onRemoveLine(line.id)}
              />
            </div>
          </li>
        ))}
      </ul>

      <OrderTotals lines={totals} className="mt-4" />

      <ButtonLink variant="primary-lg" href={routes.main.checkout} className="mt-6">
        Finaliser Click & Collect
      </ButtonLink>
    </div>
  );
}

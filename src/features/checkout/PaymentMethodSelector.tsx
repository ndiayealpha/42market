import { Icon } from "@/src/components/atoms/Icon/Icon";
import { PAYMENT_METHOD_CONFIG, type PaymentMethodId } from "@/src/domain/checkout";

export interface PaymentMethodSelectorProps {
  storeName: string;
  value: PaymentMethodId;
  onChange: (value: PaymentMethodId) => void;
}

// "onsite" first, matching the maquette's default selection — no "last used
// payment method" persistence exists anywhere in this app (Phase 0 audit),
// so there's nothing to restore here.
const METHOD_ORDER: PaymentMethodId[] = ["onsite", "online"];

/** K7 — `<fieldset>` + 2 native radio cards, built from the finalized `PAYMENT_METHOD_CONFIG` table (never a switch). */
export function PaymentMethodSelector({ storeName, value, onChange }: PaymentMethodSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-bold text-foreground-strong">Mode de règlement :</legend>
      <div className="flex flex-col gap-3">
        {METHOD_ORDER.map((id) => {
          const config = PAYMENT_METHOD_CONFIG[id];
          const isSelected = value === id;
          return (
            <label
              key={id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                isSelected ? "border-foreground-strong bg-catalog-chip" : "border-catalog-line bg-surface"
              }`}
            >
              <input type="radio" name="payment-method" value={id} checked={isSelected} onChange={() => onChange(id)} className="mt-1" />
              <Icon name={config.icon} size={20} className="mt-0.5 shrink-0 text-foreground-strong" decorative />
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-foreground-strong">{config.label}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{config.mention}</span>
                </span>
                <span className="block text-xs text-muted-foreground">{config.description(storeName)}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

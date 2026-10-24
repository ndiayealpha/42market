import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface QuantityStepperProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

/** The "− n +" control behind every product purchase box — min is always 1, max is injected (stock capped by the per-order ceiling). Nothing like it existed before (Phase 0 audit). */
export function QuantityStepper({ value, max, onChange, disabled, className = "" }: QuantityStepperProps) {
  return (
    <div className={`inline-flex items-center gap-4 rounded-full border border-border px-3 py-2 ${className}`}>
      <button
        type="button"
        aria-label="Diminuer la quantité"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={disabled || value <= 1}
        className="flex h-5 w-5 items-center justify-center text-foreground-strong disabled:opacity-30"
      >
        <Icon name="minus" size={16} decorative />
      </button>
      <span aria-live="polite" className="min-w-[1.25rem] text-center text-base font-bold text-foreground-strong">
        {value}
      </span>
      <button
        type="button"
        aria-label="Augmenter la quantité"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        className="flex h-5 w-5 items-center justify-center text-foreground-strong disabled:opacity-30"
      >
        <Icon name="plus" size={16} decorative />
      </button>
    </div>
  );
}

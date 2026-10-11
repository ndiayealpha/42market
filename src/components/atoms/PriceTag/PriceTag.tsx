import { formatPrice } from "@/src/lib/format";

export interface PriceTagProps {
  amount: number;
  originalPrice?: number;
  className?: string;
}

/**
 * Current price + an optional struck former price. Distinct from the
 * existing `atoms/Price` (built for PromoCard's inline/stacked sticker
 * layouts with a `role="text"` aria-label): this one is this spec's own
 * fixed shape — a real `<del>` with a sr-only "Prix initial : " prefix.
 */
export function PriceTag({ amount, originalPrice, className = "" }: PriceTagProps) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span className="text-[17px] leading-[22px] font-bold tracking-[-0.01em] text-foreground-strong">{formatPrice(amount)}</span>
      {originalPrice != null && (
        <del className="text-xs font-normal text-catalog-faint">
          <span className="sr-only">Prix initial : </span>
          {formatPrice(originalPrice)}
        </del>
      )}
    </span>
  );
}

import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { FlashSale } from "@/src/domain/promotions";
import { formatFlashDeadline } from "@/src/domain/promotions";

export interface FlashSaleEyebrowProps {
  flashSale: FlashSale;
  /** Injected clock — this component never reads the current time itself. */
  now: Date;
}

export function FlashSaleEyebrow({ flashSale, now }: FlashSaleEyebrowProps) {
  return (
    <p className="inline-flex items-center gap-1.5 rounded-full bg-catalog-badge-pink/40 px-3 py-1 text-xs font-bold text-catalog-danger uppercase">
      <Icon name="timer" size={14} decorative />
      Ventes flash clôture {formatFlashDeadline(flashSale.endsAtIso, now)}
    </p>
  );
}

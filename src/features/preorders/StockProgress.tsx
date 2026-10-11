import { ProgressBar } from "@/src/components/atoms/ProgressBar/ProgressBar";
import { getStockLabel, getStockLevel } from "@/src/domain/preorder";
import type { PreorderCampaign } from "@/src/domain/preorder";

export interface StockProgressProps {
  reservedPercent: number;
  remaining: number;
  unit: PreorderCampaign["unit"];
  className?: string;
}

/**
 * The reserved-% / stock labels + the bar beneath them. The right label
 * tracks the bar's fill edge via the one inline style this spec allows:
 * a `flex justify-between` container whose own `width` is the fill %,
 * `min-w-max` keeping it from ever squeezing the two labels together.
 */
export function StockProgress({ reservedPercent, remaining, unit, className = "" }: StockProgressProps) {
  const level = getStockLevel(reservedPercent, remaining);
  const stockLabel = getStockLabel(level, remaining, unit);
  const isLowOrUrgent = level === "low" || level === "urgent";

  return (
    <div className={className}>
      <div className="flex min-w-max justify-between gap-3" style={{ width: `${reservedPercent}%` }}>
        <span className="text-[11px] leading-[14px] text-catalog-faint">{reservedPercent}% réservé</span>
        <span className={`text-[11px] leading-[14px] font-bold ${isLowOrUrgent ? "text-catalog-danger" : "text-foreground-strong"}`}>
          {stockLabel}
        </span>
      </div>
      <ProgressBar
        value={reservedPercent}
        tone={level === "urgent" ? "danger" : "success"}
        aria-valuetext={`${reservedPercent} % réservé, reste ${remaining}`}
        className="mt-1"
      />
    </div>
  );
}

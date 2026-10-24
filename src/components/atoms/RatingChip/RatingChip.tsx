import { Icon } from "@/src/components/atoms/Icon/Icon";
import { formatNumber } from "@/src/lib/format";

export interface RatingChipProps {
  average: number;
  reviewCount?: number;
  className?: string;
}

/** "★ 4,8 (124 avis)" / "★ 4,8" when the count is unknown — distinct from the store-page `RatingBadge` (no parenthesized count there). Nothing like it existed before (Phase 0 audit). */
export function RatingChip({ average, reviewCount, className = "" }: RatingChipProps) {
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-semibold text-foreground-strong ${className}`}>
      <Icon name="star" size={14} className="text-catalog-badge-gold" decorative />
      <span aria-label={`Note : ${formatNumber(average)} sur 5${reviewCount != null ? `, ${reviewCount} avis` : ""}`}>
        {formatNumber(average)}
        {reviewCount != null && <span className="font-normal text-muted-foreground"> ({reviewCount} avis)</span>}
      </span>
    </span>
  );
}

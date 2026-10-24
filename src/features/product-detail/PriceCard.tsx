import { Badge } from "@/src/components/atoms/Badge/Badge";
import { Card } from "@/src/components/atoms/Card/Card";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { formatCompareAtPrice } from "@/src/domain/product-detail";
import { computeUnitPricePerKg, formatPrice, formatUnitPrice, formatVatRate } from "@/src/lib/format";

export interface PriceCardProps {
  price: number;
  compareAtPrice?: number;
  /** Precomputed by the view model (`computeSavings`) — never recomputed here. */
  savings?: number;
  vatRatePercent: number;
  /** `formatUnitPrice` only has a per-kg wording; a `"ml"` basis has no matching formatter in `format.ts` yet, so the line is simply omitted rather than mislabeling a volume as a weight (see Page P compte-rendu). */
  unitBasis?: { quantity: number; unit: "g" | "ml" };
  packagingLabel: string;
}

/** P5 — price, struck-through compare-at, an "Économie" badge, unit price + VAT wording, packaging chip. */
export function PriceCard({ price, compareAtPrice, savings, vatRatePercent, unitBasis, packagingLabel }: PriceCardProps) {
  return (
    <Card variant="elevated" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-3xl font-extrabold text-foreground-strong">{formatPrice(price)}</span>
        {compareAtPrice != null && (
          <del className="text-sm text-catalog-faint">
            <span className="sr-only">Prix initial </span>
            {formatCompareAtPrice(compareAtPrice)}
          </del>
        )}
        {savings != null && (
          <Badge color="success" uppercase={false}>
            Économie : {formatPrice(savings)}
          </Badge>
        )}
      </div>

      {unitBasis?.unit === "g" && (
        <p className="text-xs text-muted-foreground">{formatUnitPrice(computeUnitPricePerKg(price, unitBasis.quantity))}</p>
      )}

      <p className="text-xs text-muted-foreground">{formatVatRate(vatRatePercent)}</p>

      <Chip tone="cream" size="sm" className="self-start">
        {packagingLabel}
      </Chip>
    </Card>
  );
}

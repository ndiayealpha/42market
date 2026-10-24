import { SegmentedControl } from "@/src/components/atoms/SegmentedControl/SegmentedControl";
import type { CatalogSortOption } from "@/src/domain/catalog";
import { getPickupAvailabilityLabel } from "@/src/domain/catalog";
import { formatNumber } from "@/src/lib/format";

export interface CatalogToolbarProps {
  displayedCount: number;
  totalCount: number;
  isOpen: boolean;
  pickupMinutes: number;
  sort: CatalogSortOption;
  onSortChange: (sort: CatalogSortOption) => void;
}

const SORT_OPTIONS = [
  { value: "populaires" as const, label: "Populaires" },
  { value: "nouveautes" as const, label: "Nouveautés" },
];

export function CatalogToolbar({ displayedCount, totalCount, isOpen, pickupMinutes, sort, onSortChange }: CatalogToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        {formatNumber(displayedCount)} produits affichés • {formatNumber(totalCount)} références disponibles en rayon •{" "}
        <span className="font-medium text-success">
          <span aria-hidden>●</span> {getPickupAvailabilityLabel(isOpen, pickupMinutes)}
        </span>
      </p>
      <SegmentedControl options={SORT_OPTIONS} value={sort} onChange={onSortChange} ariaLabel="Trier les produits" />
    </div>
  );
}

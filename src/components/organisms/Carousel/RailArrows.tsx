import { IconButton } from "@/src/components/atoms/IconButton/IconButton";

export interface RailArrowsProps {
  ariaLabel: string;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  className?: string;
}

/**
 * The prev/next pair shared by every `useCarousel`-driven rail — extracted
 * out of `ProductRail` (where it was previously inline) so a rail's header
 * (e.g. `StoreDealsNavigator`) can place the same arrows next to its title
 * instead of above the rail itself.
 */
export function RailArrows({ ariaLabel, onPrev, onNext, canPrev, canNext, className = "" }: RailArrowsProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <IconButton
        icon="chevron-left"
        size="md"
        bg="var(--color-catalog-chip)"
        fg="var(--color-foreground-strong)"
        ariaLabel={`${ariaLabel} : précédent`}
        onClick={onPrev}
        disabled={!canPrev}
      />
      <IconButton
        icon="chevron-right"
        size="md"
        bg="var(--color-catalog-chip)"
        fg="var(--color-foreground-strong)"
        ariaLabel={`${ariaLabel} : suivant`}
        onClick={onNext}
        disabled={!canNext}
      />
    </div>
  );
}

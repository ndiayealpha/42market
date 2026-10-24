import { Badge } from "@/src/components/atoms/Badge/Badge";

export interface StoreOpenBadgeProps {
  isOpen: boolean;
  label: string;
  className?: string;
}

/**
 * The dot + label pill for a store's open/closed state — same markup
 * wherever a store's live status is shown (`StoreHeaderCard`,
 * `TrackingStoreSection`), even though how `isOpen`/`label` get computed
 * differs by screen (`getOpeningStatus` live from a weekly schedule vs. a
 * precomputed fixture field): the two screens genuinely have different
 * data available, but the badge itself was two hand-copied renders of the
 * same shape before this extraction.
 */
export function StoreOpenBadge({ isOpen, label, className = "" }: StoreOpenBadgeProps) {
  return (
    <Badge variant="label" color={isOpen ? "success" : "danger"} className={className}>
      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </Badge>
  );
}

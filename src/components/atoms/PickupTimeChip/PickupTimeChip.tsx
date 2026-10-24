export type PickupTimeChipTone = "success" | "neutral";

const TONE_CLASSES: Record<PickupTimeChipTone, { pill: string; dot: string }> = {
  success: { pill: "bg-success-subtle text-success", dot: "bg-success" },
  neutral: { pill: "bg-catalog-chip text-foreground-strong", dot: "bg-muted-foreground" },
};

export interface PickupTimeChipProps {
  label: string;
  tone?: PickupTimeChipTone;
  className?: string;
}

/** A pale pill with a leading dot — "Retrait 15 min" / "Retrait en 2h". Distinct from `Chip` (solid fill, no dot) and `Badge` (closed color enum). Nothing like it existed before (Phase 0 audit). */
export function PickupTimeChip({ label, tone = "success", className = "" }: PickupTimeChipProps) {
  const classes = TONE_CLASSES[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${classes.pill} ${className}`}>
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${classes.dot}`} />
      {label}
    </span>
  );
}

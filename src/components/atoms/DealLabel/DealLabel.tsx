import type { DealLabelTone } from "@/src/domain/store-deals";

const TONE_CLASSES: Record<DealLabelTone, string> = {
  neutral: "text-muted-foreground",
  success: "text-catalog-success",
  warning: "text-warning",
  // Every `DealLabel` is on a deal/promo card by definition — the one true promo red (A2, 2026-11-17 UAT), not the generic status danger.
  danger: "text-promo-red",
};

export interface DealLabelProps {
  text: string;
  tone: DealLabelTone;
  className?: string;
}

/** A short colored text label in a deal card's footer (e.g. "Offre lot", "Anti-gaspi") — text only, no pill background, unlike `Chip`/`Badge`. Nothing like it existed before (Phase 0 audit). */
export function DealLabel({ text, tone, className = "" }: DealLabelProps) {
  return <span className={`truncate text-xs font-semibold ${TONE_CLASSES[tone]} ${className}`}>{text}</span>;
}

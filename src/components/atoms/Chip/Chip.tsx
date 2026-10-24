import type { ReactNode } from "react";

export type ChipTone = "pink" | "gold" | "cream" | "orange" | "wine" | "danger" | "success" | "dark";

const TONE_CLASSES: Record<ChipTone, string> = {
  pink: "bg-catalog-badge-pink text-foreground-strong",
  gold: "bg-catalog-badge-gold text-foreground-strong",
  cream: "bg-catalog-badge-cream text-foreground-strong",
  orange: "bg-catalog-badge-orange text-white",
  wine: "bg-catalog-badge-wine text-white",
  danger: "bg-catalog-danger text-white",
  success: "bg-catalog-success text-white",
  // "Click & Collect 42" / "Programme fidélité" solid dark pill — new tone, no existing one is a near-black fill.
  dark: "bg-foreground-strong text-white",
};

const SIZE_CLASSES: Record<"sm" | "xs", string> = {
  sm: "h-[21px] gap-1 px-2 text-[12px] leading-4 font-bold", // "badge" type token
  xs: "h-[13px] gap-1 px-1 text-[10px] leading-[13px] font-bold", // "micro" type token
};

const SHAPE_CLASSES: Record<"rounded" | "pill", string> = {
  rounded: "rounded", // radius-xs (4px)
  pill: "rounded-full",
};

export interface ChipProps {
  tone: ChipTone;
  size: "sm" | "xs";
  shape?: "rounded" | "pill";
  uppercase?: boolean;
  /** Emoji or icon node — always rendered `aria-hidden`, the text label carries the meaning. */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * The one small colored label behind every promo chip, vignette discount
 * badge and the "DIRECT PRODUCTEURS" overline — a `tone` is a line in
 * `TONE_CLASSES`, never a new component. Distinct from the existing
 * `src/components/atoms/Badge` (closed 5-color status enum, no icon/size
 * slot — doesn't cover this spec's 7 tones or vignette-overlay sizing).
 */
export function Chip({ tone, size, shape = "rounded", uppercase, icon, children, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-flex min-w-0 items-center whitespace-nowrap ${TONE_CLASSES[tone]} ${SIZE_CLASSES[size]} ${SHAPE_CLASSES[shape]} ${
        uppercase ? "uppercase" : ""
      } ${className}`}
    >
      {icon && <span aria-hidden className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </span>
  );
}

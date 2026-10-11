import { Icon } from "@/src/components/atoms/Icon/Icon";
import { formatRating } from "@/src/lib/format";

const SIZE_CLASSES: Record<"sm" | "md", { wrapper: string; icon: number }> = {
  // "md": the stores/preorders catalog's pill. "sm": the recipe card's smaller one.
  md: { wrapper: "h-6 gap-1 rounded-lg px-2 text-[14px] font-semibold", icon: 14 },
  sm: { wrapper: "h-5 gap-1 rounded-md px-2 text-[12px] font-bold", icon: 12 },
};

export interface RatingBadgeProps {
  value: number;
  size?: "sm" | "md";
  className?: string;
}

/** Star + rating, read by AT as a single "Note : X,X sur 5" (French-comma) — the visible dot-formatted digit is otherwise hidden from it. */
export function RatingBadge({ value, size = "md", className = "" }: RatingBadgeProps) {
  const formatted = formatRating(value);
  const { wrapper, icon } = SIZE_CLASSES[size];

  return (
    <span
      role="img"
      aria-label={`Note : ${formatted.replace(".", ",")} sur 5`}
      className={`inline-flex shrink-0 items-center bg-catalog-chip text-foreground-strong ${wrapper} ${className}`}
    >
      <Icon name="star" size={icon} className="text-warning" />
      {formatted}
    </span>
  );
}

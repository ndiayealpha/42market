import type { ReactNode } from "react";

export type BadgeVariant = "count" | "label";
export type BadgeColor = "danger" | "favorite" | "basket" | "info" | "success";

const COUNT_COLOR_CLASSES: Record<BadgeColor, string> = {
  danger: "bg-danger text-white",
  favorite: "bg-favorite text-white",
  basket: "bg-basket text-white",
  info: "bg-info text-white",
  success: "bg-success text-white",
};

const LABEL_COLOR_CLASSES: Record<BadgeColor, string> = {
  danger: "bg-danger/10 text-danger",
  favorite: "bg-favorite/10 text-favorite",
  basket: "bg-basket/10 text-basket",
  info: "bg-info/10 text-info",
  success: "bg-success-subtle text-success",
};

export interface BadgeProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  /** `label` only — defaults to `true` (existing "NEW"/"Frais"-style tags). Set `false` for sentence-case text (e.g. "En stock (4 restants)"). */
  uppercase?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Small colored indicator. `variant="count"` is a filled circle for
 * notification-style counters; `variant="label"` is a subtle pill for
 * tags like "NEW" or "Frais". Purely presentational — the count/text
 * always comes from props, never hardcoded here.
 */
export function Badge({ variant = "label", color = "info", uppercase = true, children, className = "" }: BadgeProps) {
  if (variant === "count") {
    return (
      <span
        className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-semibold leading-none ${COUNT_COLOR_CLASSES[color]} ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${uppercase ? "uppercase tracking-wide" : ""} ${LABEL_COLOR_CLASSES[color]} ${className}`}
    >
      {children}
    </span>
  );
}

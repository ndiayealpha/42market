import Link from "next/link";
import type { MouseEventHandler } from "react";

import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface IconButtonProps {
  icon: IconName;
  /** "lg": 44px, soft shadow — PromoCard's CTA. "md": 36px, no shadow — carousel arrows. */
  size: "md" | "lg";
  bg: string;
  fg: string;
  ariaLabel: string;
  href?: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  /** For toggle buttons (e.g. a favorite heart) — omitted entirely for non-toggle uses (CTAs, carousel arrows). */
  "aria-pressed"?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<IconButtonProps["size"], string> = {
  md: "h-9 w-9",
  lg: "h-11 w-11 shadow-[0_2px_6px_rgba(0,0,0,0.12)]",
};

/**
 * One round icon-only button. Used both as PromoCard's CTA (lg) and the
 * carousel's prev/next arrows (md) — same shape, same disabled
 * treatment, just a size and a color away from each other.
 */
export function IconButton({
  icon,
  size,
  bg,
  fg,
  ariaLabel,
  href,
  onClick,
  disabled,
  "aria-pressed": ariaPressed,
  className = "",
}: IconButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full transition-transform duration-200 ${SIZE_CLASSES[size]} ${
    disabled ? "pointer-events-none" : ""
  } ${className}`;
  const style = { backgroundColor: bg, color: fg, opacity: disabled ? 0.35 : 1 };
  const iconSize = size === "lg" ? 18 : 16;

  if (href && !disabled) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes} style={style}>
        <Icon name={icon} size={iconSize} decorative />
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={style}
    >
      <Icon name={icon} size={iconSize} decorative />
    </button>
  );
}

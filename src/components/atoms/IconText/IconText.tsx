import type { ReactNode } from "react";

import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export type IconTextTone = "ink" | "muted" | "success" | "danger";

const TONE_CLASSES: Record<IconTextTone, string> = {
  ink: "text-foreground-strong",
  muted: "text-ink-muted",
  success: "text-catalog-success",
  danger: "text-catalog-danger",
};

export interface IconTextProps {
  icon: IconName;
  iconSize?: number;
  tone?: IconTextTone;
  /** Tailwind spacing scale number (0.5 = 2px, 1 = 4px) — the only two gaps this spec uses. */
  gap?: 0.5 | 1;
  children: ReactNode;
  className?: string;
}

/** Icon + text, same color, both ends of the common "glyph + short label" pattern (distance, retrait, jalon rows). */
export function IconText({ icon, iconSize = 14, tone = "ink", gap = 1, children, className = "" }: IconTextProps) {
  return (
    <span className={`inline-flex items-center ${gap === 0.5 ? "gap-0.5" : "gap-1"} ${TONE_CLASSES[tone]} ${className}`}>
      <Icon name={icon} size={iconSize} decorative />
      {children}
    </span>
  );
}

import type { ReactNode } from "react";

export type FloatingBadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface FloatingBadgeProps {
  children: ReactNode;
  position?: FloatingBadgePosition;
  size?: number;
  visible?: boolean;
  className?: string;
}

// Inset from the corner (not translated past the edge), so the badge sits
// inside its parent instead of overflowing and getting clipped by an
// `overflow-hidden` ancestor.
const POSITION_CLASSES: Record<FloatingBadgePosition, string> = {
  "top-right": "top-3 right-3",
  "top-left": "top-3 left-3",
  "bottom-right": "bottom-3 right-3",
  "bottom-left": "bottom-3 left-3",
};

/**
 * Small decorative element that floats over a corner of its (relatively
 * positioned) parent. Generic on purpose: it only lays out `children`,
 * so the same component works for a leaf icon, a count, or anything else.
 */
export function FloatingBadge({ children, position = "top-right", size = 48, visible = true, className = "" }: FloatingBadgeProps) {
  if (!visible) return null;

  return (
    <span
      aria-hidden
      className={`absolute z-10 flex items-center justify-center rounded-full ${POSITION_CLASSES[position]} ${className}`}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  );
}

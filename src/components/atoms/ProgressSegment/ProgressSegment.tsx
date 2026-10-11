export interface ProgressSegmentProps {
  /** Whether this segment is filled (part of the achieved progress). */
  active: boolean;
  /** Classes applied only when `active` — the caller decides the color per state. */
  activeClassName?: string;
  className?: string;
}

/**
 * One 6px, fully-rounded bar in a segmented progress/strength gauge.
 * Knows nothing about what it's measuring — `PasswordStrengthMeter`
 * decides how many segments and which color for "active".
 */
export function ProgressSegment({ active, activeClassName = "bg-foreground", className = "" }: ProgressSegmentProps) {
  return (
    <span
      aria-hidden
      className={`h-[6px] min-w-0 flex-1 rounded-[3px] transition-colors ${active ? activeClassName : "bg-auth-tab-bg"} ${className}`}
    />
  );
}

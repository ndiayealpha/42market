export type SkeletonRadius = "md" | "lg" | "xl" | "2xl" | "full";

const RADIUS_CLASSES: Record<SkeletonRadius, string> = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

export interface SkeletonProps {
  /** Pixel or CSS width/height — set to the exact real content size to avoid CLS. Genuinely dynamic, hence inline style. */
  width?: number | string;
  height?: number | string;
  radius?: SkeletonRadius;
  className?: string;
}

/** The one loading placeholder shape — callers size it to match the real content exactly. */
export function Skeleton({ width, height, radius = "lg", className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={`animate-pulse bg-catalog-chip motion-reduce:animate-none ${RADIUS_CLASSES[radius]} ${className}`}
      style={{ width, height }}
    />
  );
}

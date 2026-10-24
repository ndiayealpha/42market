import type { ReactNode } from "react";

export interface LabeledDividerProps {
  children: ReactNode;
  className?: string;
}

/** A filet with a centered pill label (S3's "★ L'engagement Circuit Court 42000"). Nothing like it existed before (Phase 0 audit). */
export function LabeledDivider({ children, className = "" }: LabeledDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span aria-hidden className="h-px flex-1 bg-catalog-line" />
      <span className="shrink-0 rounded-full border border-catalog-line px-3 py-1 text-xs font-semibold text-muted-foreground">{children}</span>
      <span aria-hidden className="h-px flex-1 bg-catalog-line" />
    </div>
  );
}

import type { ReactNode } from "react";

export interface SectionHeaderProps {
  kicker: string;
  /** Shows a small live-status dot before `meta`. */
  live?: boolean;
  meta?: string;
  title: string;
  /** "Voir tout" link + carousel arrows, or anything else a section needs. */
  actions?: ReactNode;
  className?: string;
}

/**
 * Generic content-section header (kicker + title + trailing actions) —
 * reusable by any section on the page, not just the promo carousel.
 */
export function SectionHeader({ kicker, live, meta, title, actions, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-[0.06em] text-foreground-strong">
          {live && (
            <span className="flex items-center gap-1.5 normal-case">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />
            </span>
          )}
          <span>{kicker}</span>
          {meta && <span className="font-normal normal-case tracking-normal text-ink-muted">{meta}</span>}
        </div>
        <h2 className="mt-1 text-[28px] font-bold leading-tight tracking-[-0.02em] text-foreground-strong">{title}</h2>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3 pt-1">{actions}</div>}
    </div>
  );
}

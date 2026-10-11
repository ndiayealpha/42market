import type { ReactNode } from "react";

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: string;
  /** The section's own trailing control — a sort button, a "Voir tout" link, whatever it needs. */
  action?: ReactNode;
  /** Set by `Section` so its `<h2>` matches the section's `aria-labelledby`. Omit when used standalone. */
  headingId?: string;
  className?: string;
}

/**
 * Distinct from `src/components/molecules/SectionHeader` (the promo
 * carousel's kicker/live-dot/meta header) — that one's shape doesn't fit
 * this spec's eyebrow + 8px-offset title + flex-wrap-on-mobile layout,
 * and changing it would risk the already-shipped promo section's pixel
 * fidelity. Same idea, two call sites, kept separate.
 */
export function SectionHeader({ eyebrow, title, action, headingId, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-6 flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        {eyebrow}
        <h2
          id={headingId}
          className={`${eyebrow ? "mt-2" : ""} text-[26px] leading-[35px] font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]`}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

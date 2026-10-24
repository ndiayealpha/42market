import type { ReactNode } from "react";

export interface SectionHeaderProps {
  /** Rendered before the eyebrow/title block (e.g. a `StoreAvatar`) — absent by default, every existing usage is unaffected. */
  leading?: ReactNode;
  eyebrow?: ReactNode;
  /** A plain string in every current section; `ReactNode` so one section (limited stock) can inline a dot + badge with its title. */
  title: ReactNode;
  /** Short description under the title (e.g. "Catégories de rayons"'s subhead) — omit when a section doesn't need one. */
  subtitle?: string;
  /** The section's own trailing control — a sort button, a "Voir tout" link, whatever it needs. */
  action?: ReactNode;
  /** Set by `Section` so its `<h2>` matches the section's `aria-labelledby`. Omit when used standalone. */
  headingId?: string;
  /** "h1" for the one page-level header that IS the page's `<h1>` (e.g. `StoreDealsNavigator`) — same visual size either way (rule: "le H1 et les titres de boutique ont la même taille"). Defaults to "h2". */
  headingLevel?: "h1" | "h2";
  /** Page K's `CheckoutStepper` focuses a section's heading when its step card is clicked — the heading needs to be programmatically focusable (`tabIndex={-1}`) for that; every other caller omits this and is unaffected. */
  headingTabIndex?: number;
  className?: string;
}

/**
 * Distinct from `src/components/molecules/SectionHeader` (the promo
 * carousel's kicker/live-dot/meta header) — that one's shape doesn't fit
 * this spec's eyebrow + 8px-offset title + flex-wrap-on-mobile layout,
 * and changing it would risk the already-shipped promo section's pixel
 * fidelity. Same idea, two call sites, kept separate.
 */
export function SectionHeader({ leading, eyebrow, title, subtitle, action, headingId, headingLevel = "h2", headingTabIndex, className = "" }: SectionHeaderProps) {
  const headingClassName = `${eyebrow ? "mt-2" : ""} text-[26px] leading-[35px] font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px] focus:outline-none`;

  const titleBlock = (
    <div className="min-w-0">
      {eyebrow}
      {headingLevel === "h1" ? (
        <h1 id={headingId} tabIndex={headingTabIndex} className={headingClassName}>
          {title}
        </h1>
      ) : (
        <h2 id={headingId} tabIndex={headingTabIndex} className={headingClassName}>
          {title}
        </h2>
      )}
      {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
    </div>
  );

  return (
    <div className={`mb-6 flex flex-wrap items-end justify-between gap-4 ${className}`}>
      {leading ? (
        <div className="flex min-w-0 items-center gap-3">
          {leading}
          {titleBlock}
        </div>
      ) : (
        titleBlock
      )}
      {action}
    </div>
  );
}

import type { ReactNode } from "react";

import { SectionHeader } from "@/src/components/layout/SectionHeader/SectionHeader";

export interface SectionProps {
  /** Used to build the `<h2 id>` / `aria-labelledby` pair — must be unique on the page. */
  id: string;
  title: ReactNode;
  subtitle?: string;
  eyebrow?: ReactNode;
  /** Rendered before the eyebrow/title (e.g. a `StoreAvatar`) — absent by default. */
  leading?: ReactNode;
  action?: ReactNode;
  /** Forwarded to `SectionHeader` — see its own doc comment (Page K's `CheckoutStepper`). */
  headingTabIndex?: number;
  children: ReactNode;
  className?: string;
}

/**
 * `<section aria-labelledby>` + `<h2 id>`, wired together, plus the shared
 * header — every section on the page is one of these.
 *
 * `id` lands on the `<section>` itself, not just the derived `-heading`
 * suffix — every "jump to this section" anchor link in the app (e.g.
 * `FeaturedSelectionSection`'s "Voir toute la sélection", the global Bons
 * Plans page's store-tile rail) is built assuming `href="#{id}"` resolves
 * to this element; without it, the anchor matches nothing and the click
 * silently does nothing.
 */
export function Section({ id, title, subtitle, eyebrow, leading, action, headingTabIndex, children, className = "" }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={className}>
      <SectionHeader
        leading={leading}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        action={action}
        headingId={headingId}
        headingTabIndex={headingTabIndex}
      />
      {children}
    </section>
  );
}

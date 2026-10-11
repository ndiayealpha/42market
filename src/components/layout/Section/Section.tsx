import type { ReactNode } from "react";

import { SectionHeader } from "@/src/components/layout/SectionHeader/SectionHeader";

export interface SectionProps {
  /** Used to build the `<h2 id>` / `aria-labelledby` pair — must be unique on the page. */
  id: string;
  title: string;
  eyebrow?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** `<section aria-labelledby>` + `<h2 id>`, wired together, plus the shared header — every section on the page is one of these. */
export function Section({ id, title, eyebrow, action, children, className = "" }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section aria-labelledby={headingId} className={className}>
      <SectionHeader eyebrow={eyebrow} title={title} action={action} headingId={headingId} />
      {children}
    </section>
  );
}

"use client";

import { useId, useState, type ReactNode } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface FooterAccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * One collapsible footer section (mobile footer's "Découvrir" / "Aide &
 * Support" / "Commerçants" cards). Each instance owns its own open
 * state — several can be open at once, which is simpler than
 * coordinating a single-open group and the brief didn't require it.
 * The height transition is a pure-CSS grid-rows trick (no JS
 * measurement, no library).
 */
export function FooterAccordion({ title, children, defaultOpen = false }: FooterAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="rounded-2xl bg-surface shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-foreground-strong"
      >
        {title}
        <Icon
          name="chevron-down"
          size={18}
          className={`shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          decorative
        />
      </button>
      <div id={contentId} className="grid transition-[grid-template-rows] duration-200 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="px-4 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { FaqItem } from "@/src/domain/faq";

export interface FaqAccordionProps {
  items: FaqItem[];
}

/** Local to this page — no generic `Accordion` primitive exists (same precedent as `ProductInfoAccordions`), and the spec explicitly wants a button-based disclosure here (not native `<details>`) so each item can carry its own `id`/anchor. */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(items.length > 0 ? [items[0].id] : []));

  function toggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `faq-trigger-${item.slug}`;
        const panelId = `faq-panel-${item.slug}`;
        return (
          <div key={item.id} id={item.slug} className="scroll-mt-24 rounded-2xl bg-surface shadow-card">
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-foreground-strong sm:text-base"
              >
                {item.question}
                <Icon name="chevron-down" size={20} className={`shrink-0 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen} className="flex flex-col gap-3 px-5 pb-4 text-sm leading-relaxed text-ink-muted">
              <p>{item.answer}</p>
              {item.relatedLink && (
                <ButtonLink href={item.relatedLink.href} variant="soft" className="self-start">
                  {item.relatedLink.label} →
                </ButtonLink>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import { Checkbox } from "@/src/components/atoms/Checkbox/Checkbox";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import type { PromoScopeOption } from "@/src/domain/promotions";
import { formatScopeLabel } from "@/src/domain/promotions";

export interface StoreMultiSelectProps {
  options: PromoScopeOption[];
  selectedSlugs: string[];
  onChange: (slugs: string[]) => void;
  primaryStoreName: string;
}

/** Nothing like it existed before (Phase 0 audit) — new primitive, same open/outside-click pattern as `UserMenu`. */
export function StoreMultiSelect({ options, selectedSlugs, onChange, primaryStoreName }: StoreMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function toggleOption(slug: string) {
    const next = selectedSlugs.includes(slug) ? selectedSlugs.filter((value) => value !== slug) : [...selectedSlugs, slug];
    onChange(next);
  }

  const label = formatScopeLabel(primaryStoreName, selectedSlugs.length, options.length);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex h-9 items-center gap-2 rounded-full bg-surface px-4 text-sm font-semibold text-foreground-strong"
      >
        <Icon name="store" size={16} decorative />
        {label}
        <Icon name="chevron-down" size={14} className="text-muted-foreground" decorative />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-xl border border-border bg-surface p-2 shadow-lg">
          <ul role="list" className="flex flex-col">
            {options.map((option) => (
              <li key={option.slug}>
                <label className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground-strong hover:bg-background">
                  <Checkbox checked={selectedSlugs.includes(option.slug)} onChange={() => toggleOption(option.slug)} />
                  {option.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

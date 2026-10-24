"use client";

import { useRef } from "react";
import type { KeyboardEvent } from "react";

import type { PickupDay } from "@/src/domain/checkout";

export interface DayTabsProps {
  days: PickupDay[];
  selectedDateIso: string;
  onChange: (dateIso: string) => void;
}

/**
 * Distinct from `SegmentedControl` (which filters content in place): these
 * tabs switch which day's `SlotGrid` panel is shown below, so the correct
 * ARIA pattern is `tablist`/`tab` with roving tabindex + arrow-key
 * navigation (the WAI-ARIA Tabs pattern), not `radiogroup`. New primitive —
 * nothing in the app already implements keyboard-navigable tabs.
 */
export function DayTabs({ days, selectedDateIso, onChange }: DayTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + delta + days.length) % days.length;
    tabRefs.current[nextIndex]?.focus();
    onChange(days[nextIndex].dateIso);
  }

  return (
    <div role="tablist" aria-label="Jour de retrait" className="inline-flex rounded-full bg-catalog-chip p-1">
      {days.map((day, index) => {
        const isSelected = day.dateIso === selectedDateIso;
        return (
          <button
            key={day.dateIso}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`day-tab-${day.dateIso}`}
            aria-selected={isSelected}
            aria-controls={`day-panel-${day.dateIso}`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(day.dateIso)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              isSelected ? "bg-surface text-foreground-strong shadow-card" : "text-muted-foreground hover:text-foreground-strong"
            }`}
          >
            {day.label}
          </button>
        );
      })}
    </div>
  );
}

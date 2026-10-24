"use client";

import Link from "next/link";

import type { CheckoutStepId, CheckoutStepState } from "@/src/domain/checkout";

export interface CheckoutStepperProps {
  storeName: string;
  selectedSlotLabel?: string;
  stepStates: Record<CheckoutStepId, CheckoutStepState>;
}

const STEPS: { id: CheckoutStepId; number: number; title: string; anchor: string; headingId: string }[] = [
  { id: "store", number: 1, title: "Point de retrait", anchor: "point-de-retrait", headingId: "point-de-retrait-heading" },
  { id: "slot", number: 2, title: "Moment choisi", anchor: "moment-choisi", headingId: "moment-choisi-heading" },
  { id: "payment", number: 3, title: "Validation", anchor: "validation", headingId: "validation-heading" },
];

const CARD_CLASSES: Record<CheckoutStepState, string> = {
  done: "bg-surface border border-catalog-line text-foreground-strong",
  current: "bg-foreground-strong text-white",
  upcoming: "bg-surface border border-dashed border-catalog-line text-muted-foreground",
};

const CIRCLE_CLASSES: Record<CheckoutStepState, string> = {
  done: "bg-foreground-strong text-white",
  current: "bg-catalog-badge-cream text-foreground-strong",
  upcoming: "bg-catalog-chip text-muted-foreground",
};

function subLabel(step: CheckoutStepId, storeName: string, selectedSlotLabel?: string): string {
  switch (step) {
    case "store":
      return storeName;
    case "slot":
      return selectedSlotLabel ?? "—";
    case "payment":
      return "Paiement & notification";
    default: {
      const exhaustive: never = step;
      throw new Error(`Unhandled checkout step: ${JSON.stringify(exhaustive)}`);
    }
  }
}

/**
 * K2 — new primitive (Phase 0 audit): nothing like a 3-card progress
 * stepper existed. Each card both reflects `getCheckoutStepStates` and
 * acts as an in-page anchor that also moves focus to the target section's
 * heading on click, so keyboard/screen-reader users land somewhere
 * meaningful, not just a visual scroll.
 */
export function CheckoutStepper({ storeName, selectedSlotLabel, stepStates }: CheckoutStepperProps) {
  function focusSection(headingId: string) {
    requestAnimationFrame(() => {
      document.getElementById(headingId)?.focus();
    });
  }

  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {STEPS.map((step) => {
        const state = stepStates[step.id];
        return (
          <li key={step.id}>
            <Link
              href={`#${step.anchor}`}
              onClick={() => focusSection(step.headingId)}
              aria-current={state === "current" ? "step" : undefined}
              className={`flex items-center gap-3 rounded-2xl p-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-strong ${CARD_CLASSES[state]}`}
            >
              <span
                aria-hidden
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${CIRCLE_CLASSES[state]}`}
              >
                {step.number}
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wide opacity-80">{step.title}</span>
                <span className="block truncate text-sm font-bold">{subLabel(step.id, storeName, selectedSlotLabel)}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

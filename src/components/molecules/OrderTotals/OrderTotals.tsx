"use client";

import { useState } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { formatOrderTotalAmount, type OrderTotalLine } from "@/src/domain/cart";
import { formatVatBreakdown } from "@/src/lib/format";

export interface OrderTotalsProps {
  lines: OrderTotalLine[];
  className?: string;
}

/** Minimal accessible disclosure for the service line's "ⓘ" — no generic `Popover` primitive existed (Phase 0 audit); this one case doesn't justify building one. */
function ServiceInfoPopover({ infoText }: { infoText: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-expanded={open}
        aria-label="En savoir plus sur la préparation Click & Collect"
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
        className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground-strong"
      >
        <Icon name="help-circle" size={14} decorative />
      </button>
      {open && (
        <span role="tooltip" className="absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-foreground-strong p-2.5 text-left text-xs font-normal text-white shadow-card">
          {infoText}
        </span>
      )}
    </span>
  );
}

/**
 * The one totals panel shared by Page K ("Total à payer") and Page S
 * ("Total payé") — same `buildOrderTotals` output, same component, so the
 * two screens can never disagree on a figure again (incohérence #5).
 * Nothing like it existed before (Phase 0 audit).
 *
 * The "total" line gets its own `<dl>` rather than joining the others: a
 * `<dl>`'s direct children may only be `<dt>`/`<dd>` pairs (each
 * optionally wrapped in one `<div>`) — the VAT-breakdown caption under the
 * total is a `<p>`, which axe's `definition-list` rule correctly rejects
 * as a sibling inside the same list.
 */
export function OrderTotals({ lines, className = "" }: OrderTotalsProps) {
  const totalLine = lines.find((line) => line.kind === "total");
  const regularLines = lines.filter((line) => line.kind !== "total");

  return (
    <div className={`rounded-xl bg-catalog-chip p-4 ${className}`}>
      <dl className="flex flex-col gap-2 text-sm">
        {regularLines.map((line, index) => {
          switch (line.kind) {
            case "subtotal":
              return (
                <div key={index} className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Sous-total articles</dt>
                  <dd className="font-semibold text-foreground-strong">{formatOrderTotalAmount(line.amount)}</dd>
                </div>
              );
            case "discount":
              return (
                <div key={index} className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{line.label}</dt>
                  <dd className="font-semibold text-danger">-{formatOrderTotalAmount(line.amount)}</dd>
                </div>
              );
            case "service":
              return (
                <div key={index} className="flex items-center justify-between">
                  <dt className="flex items-center text-muted-foreground">
                    {line.label}
                    <ServiceInfoPopover infoText={line.infoText} />
                  </dt>
                  <dd className="text-xs font-bold uppercase tracking-wide text-success">Gratuit</dd>
                </div>
              );
            case "included":
              return (
                <div key={index} className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{line.label}</dt>
                  <dd className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Inclus</dd>
                </div>
              );
            default: {
              const exhaustive: never = line;
              throw new Error(`Unhandled order total line: ${JSON.stringify(exhaustive)}`);
            }
          }
        })}
      </dl>

      {totalLine && totalLine.kind === "total" && (
        <div className="mt-2 border-t border-catalog-line pt-3">
          <dl className="flex items-end justify-between gap-2">
            <dt className="text-sm font-bold text-foreground-strong">{totalLine.isPaid ? "Total payé" : "Total à payer"}</dt>
            <dd className="text-2xl font-extrabold text-foreground-strong">{formatOrderTotalAmount(totalLine.amount)}</dd>
          </dl>
          <p className="mt-1 text-xs text-muted-foreground">{formatVatBreakdown(totalLine.vatRatePercent, totalLine.vatAmount)}</p>
        </div>
      )}
    </div>
  );
}

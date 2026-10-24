"use client";

import { Icon } from "@/src/components/atoms/Icon/Icon";

/** The only interactive bit of S0 — everything else in `OrderUtilityBar` is a plain link. A scoped `@media print` rule (see `src/styles/globals.scss`) hides Header/Footer/buttons and keeps the QR+lines readable. */
export function PrintReceiptButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-foreground-strong hover:bg-background"
    >
      <Icon name="printer" size={16} decorative />
      Imprimer le reçu
    </button>
  );
}

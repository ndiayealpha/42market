import type { ReactNode } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { Dialog } from "@/src/components/molecules/Dialog/Dialog";

export interface StoreSwitchConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** The exact body copy — left to the caller since what's known at that point (the cart's current store name, the target store's name, or neither) genuinely differs by call site. */
  children: ReactNode;
  confirmLabel?: string;
}

/**
 * The one "switching stores empties your cabas" dialog, shared by
 * `StoreContextBar`, `ProductPurchaseBox` and `BulkAddBar` — previously 3
 * hand-copied dialogs with drifting titles/button labels ("Changer
 * d'épicerie ?" vs "Changer de boutique ?", "Vider le cabas et changer" vs
 * "Confirmer"). Extracted so the mono-store rule speaks with one voice
 * everywhere it's enforced.
 */
export function StoreSwitchConfirmDialog({ open, onClose, onConfirm, children, confirmLabel = "Vider le cabas et changer" }: StoreSwitchConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="Changer d'épicerie ?">
      <p className="text-sm text-muted-foreground">{children}</p>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="soft" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="primary-md" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}

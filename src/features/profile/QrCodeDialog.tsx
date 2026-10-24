import { Dialog } from "@/src/components/molecules/Dialog/Dialog";
import { PickupQrPanel } from "@/src/components/molecules/PickupQrPanel/PickupQrPanel";
import type { ActiveOrder } from "@/src/domain/orders";

export interface QrCodeDialogProps {
  order: ActiveOrder;
  open: boolean;
  onClose: () => void;
}

/** Thin wrapper around the shared `PickupQrPanel` (extracted here, now also used by Page S's `PickupPassCard` — Phase 0 audit rule: "une seule brique"). */
export function QrCodeDialog({ order, open, onClose }: QrCodeDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="Suivre votre commande">
      <div className="flex flex-col items-center gap-4">
        <PickupQrPanel orderReference={order.reference} pin={order.pin ?? "0000"} />
        <p className="text-center text-sm text-muted-foreground">
          Présentez ce code au comptoir de <strong className="text-foreground-strong">{order.store.name}</strong> pour retirer la
          commande <strong className="text-foreground-strong">{order.reference}</strong>.
        </p>
      </div>
    </Dialog>
  );
}

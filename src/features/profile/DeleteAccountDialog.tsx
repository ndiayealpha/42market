import { Button } from "@/src/components/atoms/Button/Button";
import { Dialog } from "@/src/components/molecules/Dialog/Dialog";

export interface DeleteAccountDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function DeleteAccountDialog({ open, onClose, onConfirm, isPending }: DeleteAccountDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="Supprimer définitivement mon compte ?">
      <p className="text-sm text-muted-foreground">
        Cette action est irréversible : vos commandes, favoris, points de fidélité et terroirs enregistrés seront définitivement
        supprimés.
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="soft" onClick={onClose} disabled={isPending}>
          Annuler
        </Button>
        <Button
          variant="primary-md"
          className="!bg-danger hover:!bg-danger/90"
          onClick={onConfirm}
          disabled={isPending}
        >
          {isPending ? "Suppression…" : "Supprimer définitivement"}
        </Button>
      </div>
    </Dialog>
  );
}

"use client";

import { useState } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { useSession } from "@/src/features/auth";
import { useDeleteAccount } from "@/src/hooks/useDeleteAccount";
import { useToast } from "@/src/providers/toast-provider";

import { DeleteAccountDialog } from "./DeleteAccountDialog";

export interface SignOutFooterProps {
  userId: string;
}

export function SignOutFooter({ userId }: SignOutFooterProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const session = useSession();
  const toast = useToast();
  const deleteAccount = useDeleteAccount(userId);

  function handleConfirmDelete() {
    deleteAccount.mutate(undefined, {
      onSuccess: () => {
        setConfirmOpen(false);
        toast.show("Votre compte a été supprimé.", "success");
        session.logout();
      },
      onError: () => {
        toast.show("La suppression du compte a échoué.", "error");
      },
    });
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="soft" className="w-full" icon={<Icon name="log-out" size={16} decorative />} onClick={() => session.logout()}>
        Déconnexion
      </Button>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="flex items-center gap-1.5 text-xs font-medium text-danger hover:underline"
      >
        <Icon name="trash" size={14} decorative />
        Supprimer définitivement mon compte et mes données
      </button>

      <DeleteAccountDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        isPending={deleteAccount.isPending}
      />
    </div>
  );
}

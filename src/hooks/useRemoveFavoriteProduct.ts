"use client";

import { useToggleFavorite } from "@/src/hooks/useToggleFavorite";
import { useToast } from "@/src/providers/toast-provider";

/**
 * Thin wrapper around `useToggleFavorite("product")` for the Favoris grid's
 * heart button: same optimistic update/rollback, plus the page-specific
 * toast copy. The maquette's "Annuler" inline action isn't implemented —
 * `Toast` has no actionable-button slot yet (see compte-rendu); re-hearting
 * the same card already undoes it.
 */
export function useRemoveFavoriteProduct() {
  const toggle = useToggleFavorite("product");
  const toast = useToast();

  function remove(productId: string) {
    toggle.mutate(
      { itemId: productId, isFavorite: false },
      { onSuccess: () => toast.show("Retiré des favoris.", "success") }
    );
  }

  return { remove, isPending: toggle.isPending };
}

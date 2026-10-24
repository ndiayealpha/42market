"use client";

import { useState, type ReactNode } from "react";

import { StoreSwitchConfirmDialog } from "@/src/components/molecules/StoreSwitchConfirmDialog/StoreSwitchConfirmDialog";
import type { Media } from "@/src/domain/store-merchandising";
import { useCartLinesActions, useCartLinesState } from "@/src/lib/cart/cart-lines.store";
import { useToast } from "@/src/providers/toast-provider";

export interface CartProductInput {
  id: string;
  name: string;
  packagingLabel: string;
  price: number;
  image: Media;
  storeSlug: string;
  storeName: string;
  quantity?: number;
}

/**
 * The hook every `ProductCard` "+" button uses to add a REAL line to the
 * cabas (`cart-lines.store.ts`), not just bump the shared counter.
 *
 * Before this, every catalog/promo/deal/favorite/related/search card's "+"
 * only called `useAddToCart`'s bare `increment()` (Phase 0 audit — "no
 * add-to-cart flow exists yet"): the Header badge went up, but the real
 * cart (`/main/panier`, Checkout) never actually received the product —
 * a user-visible bug (badge shows "2", cart page shows empty). `useAddToCart`
 * itself is kept as-is for the 2 call sites that only ever had an
 * aggregate label and no real product to attach (`RecipeKitCard`,
 * `NotificationCard`) — see their own code for that known, separate gap.
 *
 * Enforces the same mono-store rule as `ProductPurchaseBox`/`StoreContextBar`/
 * `BulkAddBar`, via the shared `StoreSwitchConfirmDialog`: adding from a
 * different store than the one already in the cabas asks for confirmation
 * before clearing it. Callers must render the returned `dialog` somewhere
 * in their tree (same pattern as any other co-located confirm dialog).
 */
export function useAddProductToCart(): { addToCart: (item: CartProductInput) => void; dialog: ReactNode } {
  const cart = useCartLinesState();
  const { addLine, clear } = useCartLinesActions();
  const toast = useToast();
  const [pendingItem, setPendingItem] = useState<CartProductInput | null>(null);

  function commitAdd(item: CartProductInput) {
    addLine(item.storeSlug, item.storeName, {
      id: item.id,
      productId: item.id,
      name: item.name,
      packagingLabel: item.packagingLabel,
      unitPrice: item.price,
      image: item.image,
      quantity: item.quantity,
    });
    toast.show(`${item.name} ajouté au cabas.`, "success");
  }

  function addToCart(item: CartProductInput) {
    if (cart.storeSlug && cart.storeSlug !== item.storeSlug) {
      setPendingItem(item);
      return;
    }
    commitAdd(item);
  }

  function handleConfirmSwitch() {
    if (!pendingItem) return;
    clear();
    commitAdd(pendingItem);
    setPendingItem(null);
  }

  const dialog = (
    <StoreSwitchConfirmDialog open={pendingItem != null} onClose={() => setPendingItem(null)} onConfirm={handleConfirmSwitch}>
      Votre cabas contient des articles de {cart.storeName}. Changer d&apos;épicerie videra votre cabas actuel.
    </StoreSwitchConfirmDialog>
  );

  return { addToCart, dialog };
}

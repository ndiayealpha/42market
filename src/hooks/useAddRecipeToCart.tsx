"use client";

import { useState } from "react";

import { StoreSwitchConfirmDialog } from "@/src/components/molecules/StoreSwitchConfirmDialog/StoreSwitchConfirmDialog";
import type { Media } from "@/src/domain/store-merchandising";
import { useCartLinesActions, useCartLinesState } from "@/src/lib/cart/cart-lines.store";
import { useToast } from "@/src/providers/toast-provider";

export interface RecipeCartItem {
  id: string;
  name: string;
  packagingLabel: string;
  price: number;
  image: Media;
}

export interface AddRecipeToCartInput {
  storeSlug: string;
  storeName: string;
  items: RecipeCartItem[];
}

/**
 * The recipe fiche's "Ajouter au panier" needs several lines added at once
 * — `useAddProductToCart` only takes one item per call, and checking its
 * (stale, per-render) `cart.storeSlug` snapshot inside a loop would only
 * ever catch a store conflict on the first item. This hook checks the
 * conflict ONCE for the whole batch, then commits every checked ingredient
 * as its own real cart line (never a single bundled line), same mono-store
 * rule and `StoreSwitchConfirmDialog` as every other add-to-cart flow.
 */
export function useAddRecipeToCart() {
  const cart = useCartLinesState();
  const { addLine, clear } = useCartLinesActions();
  const toast = useToast();
  const [pending, setPending] = useState<AddRecipeToCartInput | null>(null);

  function commit(input: AddRecipeToCartInput) {
    for (const item of input.items) {
      addLine(input.storeSlug, input.storeName, {
        id: item.id,
        productId: item.id,
        name: item.name,
        packagingLabel: item.packagingLabel,
        unitPrice: item.price,
        image: item.image,
      });
    }
    toast.show(`${input.items.length} ingrédients ajoutés au cabas.`, "success");
  }

  function addRecipeToCart(input: AddRecipeToCartInput) {
    if (input.items.length === 0) return;
    if (cart.storeSlug && cart.storeSlug !== input.storeSlug) {
      setPending(input);
      return;
    }
    commit(input);
  }

  function handleConfirmSwitch() {
    if (!pending) return;
    clear();
    commit(pending);
    setPending(null);
  }

  const dialog = (
    <StoreSwitchConfirmDialog open={pending != null} onClose={() => setPending(null)} onConfirm={handleConfirmSwitch}>
      Votre cabas contient des articles de {cart.storeName}. Changer d&apos;épicerie videra votre cabas actuel.
    </StoreSwitchConfirmDialog>
  );

  return { addRecipeToCart, dialog };
}

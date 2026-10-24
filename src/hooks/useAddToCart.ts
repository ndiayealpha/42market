"use client";

import { useCartActions } from "@/src/lib/cart/cart.store";
import { useToast } from "@/src/providers/toast-provider";

/**
 * Thin wrapper around the existing cart store's `increment` — there's no
 * line-item/product cart domain yet (Phase 0 audit), only a shared count.
 * This is the one place a product "+" or the recipe kit's CTA touches it,
 * so both get the same toast feedback for free.
 */
export function useAddToCart() {
  const { increment } = useCartActions();
  const toast = useToast();

  function addToCart(productName: string, quantity = 1) {
    increment(quantity);
    toast.show(`${productName} ajouté au cabas.`, "success");
  }

  return { addToCart };
}

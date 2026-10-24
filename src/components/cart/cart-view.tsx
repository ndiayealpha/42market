"use client";

import { useCartLinesActions, useCartLinesState } from "@/src/lib/cart/cart-lines.store";

import { CartTemplate } from "./CartTemplate";

/** Thin container: reads the real line-item cart store and hands it to the pure `CartTemplate` (same split as `ProfileView`/`ProfileTemplate`). */
export function CartView() {
  const { storeName, lines } = useCartLinesState();
  const { updateQuantity, removeLine } = useCartLinesActions();

  return <CartTemplate storeName={storeName} lines={lines} onUpdateQuantity={updateQuantity} onRemoveLine={removeLine} />;
}

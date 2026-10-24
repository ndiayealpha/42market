"use client";

import { useState } from "react";

import { AddToCartButton } from "@/src/components/atoms/AddToCartButton/AddToCartButton";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { QuantityStepper } from "@/src/components/atoms/QuantityStepper/QuantityStepper";
import { StoreSwitchConfirmDialog } from "@/src/components/molecules/StoreSwitchConfirmDialog/StoreSwitchConfirmDialog";
import type { Media } from "@/src/domain/store-merchandising";
import { clampQuantity } from "@/src/domain/product-detail";
import { useCartLinesActions, useCartLinesState } from "@/src/lib/cart/cart-lines.store";
import { formatPrice } from "@/src/lib/format";
import { useToast } from "@/src/providers/toast-provider";

export interface ProductPurchaseBoxProps {
  productId: string;
  productName: string;
  packagingLabel: string;
  price: number;
  image: Media;
  stockCount: number;
  stockCapPerOrder: number;
  storeSlug: string;
  storeName: string;
}

/**
 * P7 — quantity stepper + big CTA. `"use client"`: owns the quantity state
 * and triggers the shared `StoreSwitchConfirmDialog` (same component now
 * used by `StoreContextBar`/`BulkAddBar`) when adding from a different
 * store than the one already in the cabas, before `clear()` + `addLine`.
 */
export function ProductPurchaseBox({
  productId,
  productName,
  packagingLabel,
  price,
  image,
  stockCount,
  stockCapPerOrder,
  storeSlug,
  storeName,
}: ProductPurchaseBoxProps) {
  const isOutOfStock = stockCount <= 0;
  const maxQuantity = Math.max(1, Math.min(stockCount, stockCapPerOrder));
  const [quantity, setQuantity] = useState(() => clampQuantity(1, stockCount, stockCapPerOrder));
  const [confirmOpen, setConfirmOpen] = useState(false);

  const cart = useCartLinesState();
  const { addLine, clear } = useCartLinesActions();
  const toast = useToast();

  const total = price * quantity;

  function performAdd() {
    addLine(storeSlug, storeName, {
      id: productId,
      productId,
      name: productName,
      packagingLabel,
      quantity,
      unitPrice: price,
      image,
    });
    toast.show("Ajouté au cabas", "success");
  }

  function handleAdd() {
    if (isOutOfStock) return;
    if (cart.storeSlug && cart.storeSlug !== storeSlug) {
      setConfirmOpen(true);
      return;
    }
    performAdd();
  }

  function handleConfirmSwitch() {
    clear();
    performAdd();
    setConfirmOpen(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <QuantityStepper value={quantity} max={maxQuantity} onChange={setQuantity} disabled={isOutOfStock} />
        <AddToCartButton
          productName={productName}
          onAdd={handleAdd}
          unavailable={isOutOfStock}
          variant="cta"
          ctaLabel={formatPrice(total)}
          className="flex-1"
        />
      </div>

      <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Icon name="check-circle" size={14} className="text-success" decorative />
          Retrait en boutique sans frais sous 2h
        </li>
        <li className="flex items-center gap-1.5">
          <Icon name="shield" size={14} className="text-success" decorative />
          Paiement sécurisé en boutique, au retrait
        </li>
      </ul>

      <StoreSwitchConfirmDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleConfirmSwitch}>
        Votre cabas contient des articles de {cart.storeName}. Changer d&apos;épicerie videra votre cabas actuel.
      </StoreSwitchConfirmDialog>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";

import { StoreSwitchConfirmDialog } from "@/src/components/molecules/StoreSwitchConfirmDialog/StoreSwitchConfirmDialog";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { useCartActions, useCartItemCount } from "@/src/lib/cart/cart.store";
import { routes } from "@/src/lib/routing/routes";

export interface StoreContextBarProps {
  storeName: string;
}

/** Cabas is mono-boutique (rule: "Panier réservé à cette boutique") — switching stores with a non-empty cart needs confirmation before it empties. */
export function StoreContextBar({ storeName }: StoreContextBarProps) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cartCount = useCartItemCount();
  const { reset } = useCartActions();

  function handleChangeStoreClick(event: MouseEvent) {
    if (cartCount > 0) {
      event.preventDefault();
      setConfirmOpen(true);
    }
  }

  function handleConfirmChange() {
    reset();
    setConfirmOpen(false);
    router.push(routes.main.epiceries);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
      <p className="flex items-center gap-2">
        <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-success" />
        <span>
          Vous faites vos courses chez l&apos;épicerie <strong className="font-semibold">{storeName}</strong> •{" "}
          <Link href={routes.main.epiceries} onClick={handleChangeStoreClick} className="font-semibold underline underline-offset-2">
            Changer d&apos;épicerie ⇄
          </Link>
        </span>
      </p>
      <p className="flex items-center gap-1.5 font-medium text-success">
        <Icon name="basket" size={16} decorative />
        Panier réservé à cette boutique
      </p>

      <StoreSwitchConfirmDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleConfirmChange}>
        Votre cabas contient des articles de {storeName}. Changer d&apos;épicerie videra votre cabas actuel.
      </StoreSwitchConfirmDialog>
    </div>
  );
}

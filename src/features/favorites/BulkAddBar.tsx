"use client";

import { useState } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { Card } from "@/src/components/atoms/Card/Card";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Dialog } from "@/src/components/molecules/Dialog/Dialog";
import { StoreSwitchConfirmDialog } from "@/src/components/molecules/StoreSwitchConfirmDialog/StoreSwitchConfirmDialog";
import { IconTile } from "@/src/components/atoms/IconTile/IconTile";
import type { BulkSelectionStoreSummary } from "@/src/domain/favorites";
import { useCartActions, useCartItemCount } from "@/src/lib/cart/cart.store";
import { formatPrice } from "@/src/lib/format";
import { useToast } from "@/src/providers/toast-provider";

export interface BulkAddBarProps {
  count: number;
  totalPrice: number;
  byStore: BulkSelectionStoreSummary[];
  isSelectionMode: boolean;
  onToggleSelectionMode: () => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

/** "N produits sélectionnés" (fr-FR treats 0 as plural, same convention used across the app). */
function formatSelectedCountLabel(count: number): string {
  return count === 1 ? "1 produit sélectionné" : `${count} produits sélectionnés`;
}

/**
 * F4 — the cart has no real per-store awareness (just a shared item
 * count, see `cart.store.ts`), so "already has another épicerie's items"
 * is approximated the same way `StoreContextBar` does: any existing cart
 * count is treated as a prior store, confirmed via the shared
 * `StoreSwitchConfirmDialog` before resetting it.
 */
export function BulkAddBar({ count, totalPrice, byStore, isSelectionMode, onToggleSelectionMode, isLoading, isError, onRetry }: BulkAddBarProps) {
  const [storeChoiceOpen, setStoreChoiceOpen] = useState(false);
  const [confirmSwitchStore, setConfirmSwitchStore] = useState<BulkSelectionStoreSummary | null>(null);
  const cartCount = useCartItemCount();
  const { increment, reset } = useCartActions();
  const toast = useToast();

  function addStoreItems(store: BulkSelectionStoreSummary) {
    if (cartCount > 0) {
      setConfirmSwitchStore(store);
      return;
    }
    commitAdd(store);
  }

  function commitAdd(store: BulkSelectionStoreSummary) {
    reset();
    increment(store.count);
    const skipped = count - store.count;
    toast.show(
      skipped > 0
        ? `${store.count} articles ajoutés au panier (${store.storeName}), ${skipped} ignorés (autres boutiques).`
        : `${store.count} articles ajoutés au panier (${store.storeName}).`,
      "success"
    );
    setStoreChoiceOpen(false);
    setConfirmSwitchStore(null);
  }

  function handleAddAll() {
    if (byStore.length === 0) return;
    if (byStore.length > 1) {
      setStoreChoiceOpen(true);
      return;
    }
    addStoreItems(byStore[0]);
  }

  return (
    <Card variant="elevated" className="flex flex-col items-start gap-3 bg-catalog-chip shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <IconTile icon="basket" tone="cream" />
        <div>
          <p className="text-lg font-bold text-foreground-strong">{isLoading ? "Chargement…" : formatSelectedCountLabel(count)}</p>
          <p className="text-xs text-muted-foreground">Tous les produits en stock sélectionnés seront ajoutés à votre panier Click &amp; Collect (2h).</p>
          {isError && (
            <Button variant="soft" className="mt-2" onClick={onRetry}>
              Réessayer
            </Button>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button variant="primary-md" icon={<Icon name="basket" size={16} decorative />} onClick={handleAddAll} disabled={count === 0 || isLoading}>
          Ajouter tout au panier ({formatPrice(totalPrice)})
        </Button>
        <button
          type="button"
          aria-pressed={isSelectionMode}
          aria-label="Gérer la sélection"
          onClick={onToggleSelectionMode}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border border-border ${isSelectionMode ? "bg-foreground-strong text-white" : "bg-surface text-foreground-strong"}`}
        >
          <Icon name="sliders" size={16} decorative />
        </button>
      </div>

      <Dialog open={storeChoiceOpen} onClose={() => setStoreChoiceOpen(false)} title="Choisir la boutique à commander">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Votre sélection couvre plusieurs boutiques — le panier Click &amp; Collect est exclusif à une seule.</p>
          {byStore.map((store) => (
            <div key={store.storeSlug} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
              <div>
                <p className="text-sm font-bold text-foreground-strong">{store.storeName}</p>
                <p className="text-xs text-muted-foreground">
                  {store.count} article{store.count > 1 ? "s" : ""} · {formatPrice(store.totalPrice)}
                </p>
              </div>
              <Button variant="soft" onClick={() => addStoreItems(store)}>
                Ajouter
              </Button>
            </div>
          ))}
        </div>
      </Dialog>

      <StoreSwitchConfirmDialog
        open={confirmSwitchStore != null}
        onClose={() => setConfirmSwitchStore(null)}
        onConfirm={() => confirmSwitchStore && commitAdd(confirmSwitchStore)}
      >
        Votre cabas contient déjà des articles d&apos;une autre épicerie. Continuer videra ce cabas pour le remplacer par la sélection de{" "}
        {confirmSwitchStore?.storeName}.
      </StoreSwitchConfirmDialog>
    </Card>
  );
}

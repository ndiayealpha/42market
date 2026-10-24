import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartLine } from "@/src/domain/cart";
import { getCartActions } from "@/src/lib/cart/cart.store";

/**
 * The real line-item cart behind Pages P/K/S and the `/main/panier` page —
 * additive to `cart.store.ts`'s bare counter, not a replacement: every
 * pre-existing `ProductCard` "+" button (catalog/promo/deal/favorite
 * variants) and `BulkAddBar` only ever called `getCartActions().increment()`
 * with a product NAME, no id/price (Phase 0 audit — "no add-to-cart flow
 * exists yet"). Rewiring those call sites to real line items is out of this
 * page's scope (see compte-rendu); this store is the seam the new Product
 * Detail page plugs real lines into, while still bumping the same shared
 * counter so the Header badge stays correct everywhere.
 *
 * Persisted to `sessionStorage` — without this, the cart looked "broken"
 * on any refresh or typed-URL navigation to `/main/panier`: real, but a
 * pure in-memory zustand store has nothing to rehydrate from after a full
 * page reload. Tab-scoped rather than `localStorage` so a stale cart never
 * silently reappears in a different login session on the same browser.
 */
interface CartLinesState {
  storeSlug: string | null;
  storeName: string | null;
  lines: CartLine[];
}

interface CartLinesActions {
  /** Adding from a different store than the one already in the cart is a caller error — `StoreSwitchDialog`/`usePlaceOrder` must `clear()` first (mono-store rule, same as the pre-existing `StoreContextBar`/`BulkAddBar`). */
  addLine: (storeSlug: string, storeName: string, line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
}

const useCartLinesInternal = create<{ state: CartLinesState; actions: CartLinesActions }>()(
  persist(
    (set, get) => ({
      state: { storeSlug: null, storeName: null, lines: [] },
      actions: {
        addLine: (storeSlug, storeName, line) => {
          const quantity = line.quantity ?? 1;
          set((current) => {
            const existing = current.state.lines.find((l) => l.productId === line.productId);
            const lines = existing
              ? current.state.lines.map((l) => (l.productId === line.productId ? { ...l, quantity: l.quantity + quantity } : l))
              : [...current.state.lines, { ...line, quantity }];
            return { state: { storeSlug, storeName, lines } };
          });
          getCartActions().increment(quantity);
        },
        updateQuantity: (lineId, quantity) => {
          if (quantity <= 0) {
            get().actions.removeLine(lineId);
            return;
          }
          set((current) => {
            const line = current.state.lines.find((l) => l.id === lineId);
            if (!line) return current;
            getCartActions().increment(quantity - line.quantity);
            return { state: { ...current.state, lines: current.state.lines.map((l) => (l.id === lineId ? { ...l, quantity } : l)) } };
          });
        },
        removeLine: (lineId) => {
          set((current) => {
            const line = current.state.lines.find((l) => l.id === lineId);
            if (!line) return current;
            getCartActions().increment(-line.quantity);
            const lines = current.state.lines.filter((l) => l.id !== lineId);
            return { state: lines.length === 0 ? { storeSlug: null, storeName: null, lines: [] } : { ...current.state, lines } };
          });
        },
        clear: () => {
          getCartActions().reset();
          set({ state: { storeSlug: null, storeName: null, lines: [] } });
        },
      },
    }),
    {
      name: "42markets-cart-lines",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (store) => ({ state: store.state }),
    }
  )
);

export const useCartLinesState = (): CartLinesState => useCartLinesInternal((s) => s.state);
export const useCartLinesActions = (): CartLinesActions => useCartLinesInternal((s) => s.actions);

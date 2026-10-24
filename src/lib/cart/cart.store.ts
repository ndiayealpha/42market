import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Shared cart item count — the one thing the mobile header's basket icon
 * and the bottom nav's "Panier" tab must agree on.
 *
 * Lives in `src/lib`, not `src/features/cart`, because it is pure UI
 * state with no domain logic (no schema, no server call) — on par with
 * `routes.ts`, not with the auth feature.
 *
 * Persisted to `sessionStorage` (tab-scoped, cleared on tab close) so a
 * refresh doesn't silently empty the cabas — this plain counter and
 * `cart-lines.store.ts`'s real line items are persisted the same way, for
 * the same reason, and stay in sync on rehydration since they were kept
 * in sync before the page was closed.
 */
interface CartActions {
  setItemCount: (count: number) => void;
  increment: (by?: number) => void;
  reset: () => void;
}

const useCartStoreInternal = create<{ itemCount: number; actions: CartActions }>()(
  persist(
    (set) => ({
      itemCount: 0,
      actions: {
        setItemCount: (count) => set({ itemCount: Math.max(0, count) }),
        increment: (by = 1) => set((state) => ({ itemCount: Math.max(0, state.itemCount + by) })),
        reset: () => set({ itemCount: 0 }),
      },
    }),
    {
      name: "42markets-cart-count",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ itemCount: state.itemCount }),
    }
  )
);

export const useCartItemCount = (): number => useCartStoreInternal((state) => state.itemCount);
export const useCartActions = (): CartActions => useCartStoreInternal((state) => state.actions);

/** Non-hook accessor for code outside React's render (e.g. `cart-lines.store.ts`'s own action creators, which can't call a hook). */
export function getCartActions(): CartActions {
  return useCartStoreInternal.getState().actions;
}

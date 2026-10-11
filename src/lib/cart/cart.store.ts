import { create } from "zustand";

/**
 * Shared cart item count — the one thing the mobile header's basket icon
 * and the bottom nav's "Panier" tab must agree on. No add-to-cart flow
 * exists yet (no product pages wire into this), so it starts at 0; this
 * is the seam a real cart feature plugs into later.
 *
 * Lives in `src/lib`, not `src/features/cart`, because it is pure UI
 * state with no domain logic (no schema, no server call) — on par with
 * `routes.ts`, not with the auth feature.
 */
interface CartActions {
  setItemCount: (count: number) => void;
  increment: (by?: number) => void;
  reset: () => void;
}

const useCartStoreInternal = create<{ itemCount: number; actions: CartActions }>()((set) => ({
  itemCount: 0,
  actions: {
    setItemCount: (count) => set({ itemCount: Math.max(0, count) }),
    increment: (by = 1) => set((state) => ({ itemCount: Math.max(0, state.itemCount + by) })),
    reset: () => set({ itemCount: 0 }),
  },
}));

export const useCartItemCount = (): number => useCartStoreInternal((state) => state.itemCount);
export const useCartActions = (): CartActions => useCartStoreInternal((state) => state.actions);

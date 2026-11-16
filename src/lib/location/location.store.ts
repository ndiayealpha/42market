import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * The header's "42000, FR · Rayon 3 km" control, previously a static
 * label with a dead `onClick` (no page ever wired one) — this is the one
 * shared, persisted source of truth for it, read by the header everywhere
 * and by any page that wants to actually filter by distance (see
 * `filterStoresByRadius` in `store-listing.ts`, used by the épiceries
 * listing). Persisted to `sessionStorage`, same tab-scoped convention as
 * `cart-lines.store.ts`.
 */
export interface UserLocationState {
  postalCode: string;
  radiusKm: number;
}

interface UserLocationActions {
  setLocation: (postalCode: string, radiusKm: number) => void;
}

const DEFAULT_STATE: UserLocationState = { postalCode: "42000", radiusKm: 3 };

const useUserLocationInternal = create<{ state: UserLocationState; actions: UserLocationActions }>()(
  persist(
    (set) => ({
      state: DEFAULT_STATE,
      actions: {
        setLocation: (postalCode, radiusKm) => set({ state: { postalCode, radiusKm } }),
      },
    }),
    {
      name: "42markets-user-location",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (store) => ({ state: store.state }),
    }
  )
);

export const useUserLocationState = (): UserLocationState => useUserLocationInternal((s) => s.state);
export const useUserLocationActions = (): UserLocationActions => useUserLocationInternal((s) => s.actions);

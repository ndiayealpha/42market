import type { FullOrder } from "@/src/domain/orders";
import { FULL_ORDERS } from "@/src/data/full-order.mock";

/**
 * Page S's own repository — distinct from the pre-existing
 * `orders.repository.ts` (Profile's `ActiveOrder`/`OrderHistoryEntry`,
 * a different, lighter-weight shape for a different screen). Swapping
 * this mock for a real API later only touches this file.
 *
 * This mock's in-memory `orders` Map is module-level state, which only
 * behaves like a shared "database" within ONE module instance — confirmed
 * empirically, Next's dev bundler does not guarantee a Route Handler and a
 * Server Component share the same instance of this module. `claimOrder`
 * (called from `/api/checkout/claim-order`) is kept for whatever it's
 * worth when that boundary happens not to apply, but the actual source of
 * truth for "who owns the one claimable demo order" is the
 * `DEMO_ORDER_OWNER_COOKIE` that route also sets — see its own doc comment
 * and `app/main/commandes/[id]/page.tsx`'s ownership check.
 */
export interface OrderTrackingRepository {
  getOrderById(id: string): Promise<FullOrder | null>;
  setReminderEnabled(id: string, enabled: boolean): Promise<FullOrder>;
  claimOrder(id: string, userId: string): Promise<FullOrder>;
}

// In-memory copy so the reminder toggle persists across refetches within a
// session, without pretending this mock has real server-side state.
const orders = new Map<string, FullOrder>(Object.entries(FULL_ORDERS).map(([id, order]) => [id, { ...order }]));

function delay(ms = 150): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const mockOrderTrackingRepository: OrderTrackingRepository = {
  async getOrderById(id) {
    await delay();
    const existing = orders.get(id);
    if (!existing) return null;
    // Simulates a live backend heartbeat so "Mise à jour il y a N min" never goes stale during a demo session.
    const refreshed = { ...existing, lastUpdatedIso: new Date().toISOString() };
    orders.set(id, refreshed);
    return refreshed;
  },

  async setReminderEnabled(id, enabled) {
    await delay();
    const existing = orders.get(id);
    if (!existing) {
      throw new Error(`Unknown order: ${id}`);
    }
    const updated = { ...existing, reminderEnabled: enabled };
    orders.set(id, updated);
    return updated;
  },

  async claimOrder(id, userId) {
    await delay();
    const existing = orders.get(id);
    if (!existing) {
      throw new Error(`Unknown order: ${id}`);
    }
    const updated = { ...existing, ownerUserId: userId };
    orders.set(id, updated);
    return updated;
  },
};

import { computeLineTotal } from "@/src/domain/cart";
import type { ActiveOrder, FullOrder, OrderHistoryEntry } from "@/src/domain/orders";
import {
  ACTIVE_ORDER,
  ADMIN_ACTIVE_ORDER,
  ADMIN_ORDER_HISTORY,
  ADMIN_ORDERS_TOTAL_COUNT,
  ORDER_HISTORY,
  ORDERS_TOTAL_COUNT,
} from "@/src/data/orders.mock";
import { FULL_ORDERS } from "@/src/data/full-order.mock";
import { ADMIN_PROFILE_DETAILS, PROFILE_DETAILS } from "@/src/data/profile.mock";
import { formatTime } from "@/src/lib/format";

export interface OrderHistorySummary {
  entries: OrderHistoryEntry[];
  totalCount: number;
}

export interface OrdersRepository {
  getActiveOrder(userId: string): Promise<ActiveOrder | null>;
  getOrderHistory(userId: string): Promise<OrderHistorySummary>;
}

/** Keyed by `SessionUser.id` — the two demo accounts from `auth-provider.ts` ("1" Jane Doe, "2" Admin). */
const ACTIVE_ORDER_BY_USER_ID: Record<string, ActiveOrder> = {
  [PROFILE_DETAILS.id]: ACTIVE_ORDER,
  [ADMIN_PROFILE_DETAILS.id]: ADMIN_ACTIVE_ORDER,
};
const ORDER_HISTORY_BY_USER_ID: Record<string, OrderHistorySummary> = {
  [PROFILE_DETAILS.id]: { entries: ORDER_HISTORY, totalCount: ORDERS_TOTAL_COUNT },
  [ADMIN_PROFILE_DETAILS.id]: { entries: ADMIN_ORDER_HISTORY, totalCount: ADMIN_ORDERS_TOTAL_COUNT },
};

/**
 * `src/data/full-order.mock.ts` (Page S's richer dataset, e.g. the
 * checkout flow's `cmd-4289`) and this repository's own static
 * `ACTIVE_ORDER`/`ADMIN_ACTIVE_ORDER` are two separate in-memory
 * datasets for the same real-world concept — "the order a user is
 * currently waiting on" — because they were built in different sessions
 * for different screens. Without this bridge, placing an order via
 * checkout would never show up as Profile's "commande en cours", even
 * though it's the same user's most recent, still-pending order. This
 * adapter prefers a live `FullOrder` (if one exists and is still
 * pending) over the static fixture, so both screens agree.
 */
function toActiveOrder(order: FullOrder): ActiveOrder {
  const itemsSummary = `${order.lines.length} article${order.lines.length > 1 ? "s" : ""} (${order.lines.map((line) => line.name).join(", ")})`;
  const totalAmount = order.lines.reduce((sum, line) => sum + computeLineTotal(line), 0);
  return {
    id: order.id,
    reference: order.reference,
    status: order.status,
    pickupModeLabel: order.isExpress ? "Click & Collect Express" : "Click & Collect",
    etaLabel: `À ${formatTime(order.pickupWindow.startIso)}`,
    store: order.store,
    itemsSummary,
    totalAmount,
    pin: order.pin,
  };
}

function findLiveActiveOrder(userId: string): ActiveOrder | null {
  const pending = Object.values(FULL_ORDERS).find(
    (order) => order.ownerUserId === userId && (order.status === "preparing" || order.status === "ready")
  );
  return pending ? toActiveOrder(pending) : null;
}

export const mockOrdersRepository: OrdersRepository = {
  async getActiveOrder(userId) {
    return findLiveActiveOrder(userId) ?? ACTIVE_ORDER_BY_USER_ID[userId] ?? null;
  },
  async getOrderHistory(userId) {
    return ORDER_HISTORY_BY_USER_ID[userId] ?? { entries: [], totalCount: 0 };
  },
};

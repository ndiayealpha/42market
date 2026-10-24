"use client";

import { useQuery } from "@tanstack/react-query";

import { TRACKING_POLL_INTERVAL_MS, type FullOrder } from "@/src/domain/orders";
import { mockOrderTrackingRepository } from "@/src/services/order-tracking.repository";

export function orderQueryKey(orderId: string): readonly ["order-tracking", string] {
  return ["order-tracking", orderId] as const;
}

function isTerminal(status: FullOrder["status"] | undefined): boolean {
  return status === "completed" || status === "cancelled";
}

/**
 * Polls `order` every `TRACKING_POLL_INTERVAL_MS` while a pickup is still
 * pending. `refetchIntervalInBackground: false` already pauses polling
 * while the tab is hidden (TanStack Query's Page Visibility integration),
 * so no extra `visibilitychange` listener is needed. Polling stops
 * outright — `refetchInterval` returns `false` — once the order reaches a
 * terminal status.
 */
export function useOrderTracking(orderId: string, initialOrder: FullOrder) {
  const query = useQuery({
    queryKey: orderQueryKey(orderId),
    queryFn: () => mockOrderTrackingRepository.getOrderById(orderId),
    initialData: initialOrder,
    refetchIntervalInBackground: false,
    refetchInterval: (query) => (isTerminal(query.state.data?.status) ? false : TRACKING_POLL_INTERVAL_MS),
  });

  return { order: query.data ?? initialOrder, isFetching: query.isFetching };
}

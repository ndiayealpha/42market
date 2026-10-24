"use client";

import { useEffect, useState } from "react";

import type { FullOrder } from "@/src/domain/orders";

import { OrderTrackingTemplate } from "./OrderTrackingTemplate";
import { useOrderTracking } from "./useOrderTracking";

export interface OrderTrackingViewProps {
  initialOrder: FullOrder;
  phoneVerified: boolean;
}

/**
 * The one client boundary for Page S: polls `order` live and keeps the
 * "now" used for relative-time/pickup-window labels fresh. Seeded from
 * server-known data (not `new Date()`) so the first client render matches
 * SSR exactly — a 30s interval keeps it current afterwards.
 */
export function OrderTrackingView({ initialOrder, phoneVerified }: OrderTrackingViewProps) {
  const { order } = useOrderTracking(initialOrder.id, initialOrder);
  const [now, setNow] = useState(() => new Date(initialOrder.lastUpdatedIso));

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return <OrderTrackingTemplate order={order} phoneVerified={phoneVerified} now={now} />;
}

"use client";

import { useCallback, useState } from "react";

import { mockWebPushGateway } from "@/src/services/web-push.gateway";

/** Thin client wrapper around `WebPushGateway` — local permission state, no server call (there's no subscription to persist yet). */
export function useWebPushPermission() {
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(() => mockWebPushGateway.getPermission());

  const requestPermission = useCallback(async () => {
    const result = await mockWebPushGateway.requestPermission();
    setPermission(result);
    return result;
  }, []);

  return { permission, requestPermission };
}

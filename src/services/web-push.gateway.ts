/**
 * Port for browser push permission. The actual push SUBSCRIPTION (service
 * worker registration + endpoint storage) is out of scope here — flagged
 * in the compte-rendu — this only covers the permission prompt the
 * "Notifications Web" switch needs (rule N6).
 */
export interface WebPushGateway {
  getPermission(): NotificationPermission | "unsupported";
  requestPermission(): Promise<NotificationPermission>;
}

export const mockWebPushGateway: WebPushGateway = {
  getPermission() {
    if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
    return window.Notification.permission;
  },
  async requestPermission() {
    if (typeof window === "undefined" || !("Notification" in window)) return "denied";
    return window.Notification.requestPermission();
  },
};

import type { Notification, NotificationCategory, NotificationCounts, NotificationStatusFilter } from "@/src/domain/notifications";
import { NOTIFICATION_CATEGORY_CONFIG, NOTIFICATION_TYPE_CONFIG } from "@/src/domain/notifications";
import { NOTIFICATIONS, NOTIFICATIONS_AVERAGE_PER_DAY } from "@/src/data/notifications.mock";

/** First page = exactly the "Aujourd'hui" (4) + "Hier & Plus tôt" (4) items visible in the reference capture; `LoadMore` reveals the rest. */
const PAGE_SIZE = 8;

export interface NotificationsPage {
  notifications: Notification[];
  nextCursor: number | null;
  totalCount: number;
}

export interface GetNotificationsParams {
  status: NotificationStatusFilter;
  category: NotificationCategory | "all";
  cursor: number;
}

export interface NotificationsRepository {
  getNotifications(params: GetNotificationsParams): Promise<NotificationsPage>;
  getCounts(status: NotificationStatusFilter): Promise<NotificationCounts>;
  markAsRead(id: string): Promise<void>;
  markAllAsRead(): Promise<void>;
  getAverageNotificationsPerDay(): Promise<number>;
}

// Mutable, module-level — stands in for a real backend across calls within
// one session (same pattern as the profile page's mock preferences store).
const notificationsStore: Notification[] = NOTIFICATIONS.map((notification) => ({ ...notification }));

function byDateDescending(notifications: Notification[]): Notification[] {
  return [...notifications].sort((a, b) => b.createdAtIso.localeCompare(a.createdAtIso));
}

function matchesFilters(notification: Notification, status: NotificationStatusFilter, category: NotificationCategory | "all"): boolean {
  if (status === "unread" && notification.isRead) return false;
  if (category !== "all" && NOTIFICATION_TYPE_CONFIG[notification.type].category !== category) return false;
  return true;
}

export const mockNotificationsRepository: NotificationsRepository = {
  async getNotifications({ status, category, cursor }) {
    const filtered = byDateDescending(notificationsStore.filter((notification) => matchesFilters(notification, status, category)));
    const page = filtered.slice(cursor, cursor + PAGE_SIZE);
    const nextCursor = cursor + PAGE_SIZE < filtered.length ? cursor + PAGE_SIZE : null;
    return { notifications: page, nextCursor, totalCount: filtered.length };
  },

  async getCounts(status) {
    const base = status === "unread" ? notificationsStore.filter((n) => !n.isRead) : notificationsStore;
    const unread = notificationsStore.filter((n) => !n.isRead).length;
    const byCategory = (Object.keys(NOTIFICATION_CATEGORY_CONFIG) as NotificationCategory[]).map((category) => {
      const inCategory = base.filter((n) => NOTIFICATION_TYPE_CONFIG[n.type].category === category);
      return { category, total: inCategory.length, unread: inCategory.filter((n) => !n.isRead).length };
    });
    return { total: base.length, unread, byCategory };
  },

  async markAsRead(id) {
    const notification = notificationsStore.find((n) => n.id === id);
    if (notification) notification.isRead = true;
  },

  async markAllAsRead() {
    for (const notification of notificationsStore) notification.isRead = true;
  },

  async getAverageNotificationsPerDay() {
    return NOTIFICATIONS_AVERAGE_PER_DAY;
  },
};

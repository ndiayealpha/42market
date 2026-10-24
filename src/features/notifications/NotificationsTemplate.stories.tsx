import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { NOTIFICATIONS, NOTIFICATIONS_NOW } from "@/src/data/notifications.mock";
import { REFERENCE_STORE } from "@/src/data/profile.mock";

import { NotificationsTemplate } from "./NotificationsTemplate";

const BY_CATEGORY = [
  { category: "arrivages-stocks" as const, total: 4, unread: 2 },
  { category: "ventes-flash" as const, total: 2, unread: 1 },
  { category: "recettes" as const, total: 1, unread: 0 },
  { category: "avis-epiceries" as const, total: 5, unread: 0 },
];

const meta = {
  title: "Notifications/NotificationsTemplate",
  component: NotificationsTemplate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    userId: "1",
    now: NOTIFICATIONS_NOW,
    statusFilter: "all",
    getStatusHref: (status: string) => `/main/notifications?statut=${status}`,
    categoryFilter: "all",
    getCategoryHref: (category: string) => `/main/notifications?categorie=${category}`,
    unreadCount: 3,
    totalCountForFilter: 12,
    byCategory: BY_CATEGORY,
    onMarkAllAsRead: fn(),
    isMarkingAllAsRead: false,
    notifications: NOTIFICATIONS.slice(0, 8),
    totalCount: NOTIFICATIONS.length,
    isFeedLoading: false,
    isFeedError: false,
    onRetryFeed: fn(),
    hasMore: true,
    isLoadingMore: false,
    onLoadMore: fn(),
    referenceStore: REFERENCE_STORE,
    isReferenceStoreLoading: false,
    isPhoneVerified: true,
    averageNotificationsPerDay: 1,
  },
} satisfies Meta<typeof NotificationsTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SansNotification: Story = { args: { notifications: [], hasMore: false, unreadCount: 0, totalCountForFilter: 0, byCategory: [] } };
export const ToutLu: Story = { args: { unreadCount: 0, notifications: NOTIFICATIONS.slice(0, 8).map((n) => ({ ...n, isRead: true })) } };
export const FiltreNonLues: Story = {
  args: { statusFilter: "unread", notifications: NOTIFICATIONS.filter((n) => !n.isRead), hasMore: false, totalCountForFilter: 3 },
};
export const FiltreSansResultat: Story = {
  args: { statusFilter: "unread", categoryFilter: "recettes", notifications: [], hasMore: false, totalCountForFilter: 0 },
};
export const Loading: Story = { args: { isFeedLoading: true, isReferenceStoreLoading: true } };
export const ErreurParSection: Story = { args: { isFeedError: true, notifications: [] } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: "mobile1" } } };

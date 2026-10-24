import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { NOTIFICATIONS, NOTIFICATIONS_NOW } from "@/src/data/notifications.mock";

import { NotificationFeed } from "./NotificationFeed";

const meta = {
  title: "Notifications/NotificationFeed",
  component: NotificationFeed,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    notifications: NOTIFICATIONS.slice(0, 8),
    totalCount: NOTIFICATIONS.length,
    statusFilter: "all",
    now: NOTIFICATIONS_NOW,
    isLoading: false,
    isError: false,
    onRetry: fn(),
    hasMore: true,
    isLoadingMore: false,
    onLoadMore: fn(),
  },
} satisfies Meta<typeof NotificationFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllLoaded: Story = { args: { notifications: NOTIFICATIONS, hasMore: false } };
export const NoResults: Story = { args: { notifications: [], hasMore: false } };
export const AllReadFilter: Story = { args: { notifications: [], hasMore: false, statusFilter: "unread" } };
export const Loading: Story = { args: { isLoading: true } };
export const ErrorState: Story = { args: { isError: true, notifications: [] } };
export const LoadingMore: Story = { args: { isLoadingMore: true } };

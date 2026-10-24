import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { NotificationsHeader } from "./NotificationsHeader";

const meta = {
  title: "Notifications/NotificationsHeader",
  component: NotificationsHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    unreadCount: 3,
    statusFilter: "all",
    getStatusHref: (status: string) => `/main/notifications?statut=${status}`,
    onMarkAllAsRead: fn(),
    isMarkingAllAsRead: false,
  },
} satisfies Meta<typeof NotificationsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllRead: Story = { args: { unreadCount: 0 } };
export const UnreadFilterActive: Story = { args: { statusFilter: "unread" } };

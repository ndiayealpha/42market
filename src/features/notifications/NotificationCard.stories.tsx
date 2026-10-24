import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NOTIFICATIONS, NOTIFICATIONS_NOW } from "@/src/data/notifications.mock";
import type { Notification } from "@/src/domain/notifications";

import { NotificationCard } from "./NotificationCard";

function byType(type: Notification["type"]): Notification {
  return NOTIFICATIONS.find((n) => n.type === type)!;
}

const meta = {
  title: "Notifications/NotificationCard",
  component: NotificationCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <ul role="list" style={{ maxWidth: 700 }}><Story /></ul>],
  args: { notification: byType("new-arrival"), now: NOTIFICATIONS_NOW },
} satisfies Meta<typeof NotificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewArrivalUnread: Story = {};
export const FlashSaleUnread: Story = { args: { notification: byType("flash-sale") } };
export const BackInStockUnread: Story = { args: { notification: byType("back-in-stock") } };
export const RecipeInspirationRead: Story = { args: { notification: byType("recipe-inspiration") } };
export const OrderReadyRead: Story = { args: { notification: byType("order-ready") } };
export const LoyaltyVoucherRead: Story = { args: { notification: byType("loyalty-voucher") } };
export const StoreWelcomeRead: Story = { args: { notification: byType("store-welcome") } };
export const ReviewPublishedRead: Story = { args: { notification: byType("review-published") } };

export const LongTitle: Story = {
  args: {
    notification: {
      ...byType("new-arrival"),
      title: "Nouvel arrivage exceptionnel : Mangues Kent du Mali et Papayes Solo de Côte d'Ivoire tout juste réceptionnées",
    },
  },
};

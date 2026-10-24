import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CANCELLED_ORDER, READY_ORDER, REFERENCE_ORDER } from "@/src/data/full-order.mock";

import { OrderTrackingTimeline } from "./OrderTrackingTimeline";

const NOW = new Date();

const meta = {
  title: "OrderTracking/OrderTrackingTimeline",
  component: OrderTrackingTimeline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { order: REFERENCE_ORDER, now: NOW },
} satisfies Meta<typeof OrderTrackingTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preparing: Story = {};
export const Ready: Story = { args: { order: READY_ORDER } };
export const Cancelled: Story = { args: { order: CANCELLED_ORDER } };

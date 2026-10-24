import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CANCELLED_ORDER, COMPLETED_ORDER, READY_ORDER, REFERENCE_ORDER } from "@/src/data/full-order.mock";

import { OrderTrackingTemplate } from "./OrderTrackingTemplate";

const meta = {
  title: "Pages/OrderTracking",
  component: OrderTrackingTemplate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { order: REFERENCE_ORDER, phoneVerified: true, now: new Date() },
} satisfies Meta<typeof OrderTrackingTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preparing: Story = {};
export const Ready: Story = { args: { order: READY_ORDER } };
export const Completed: Story = { args: { order: COMPLETED_ORDER } };
export const Cancelled: Story = { args: { order: CANCELLED_ORDER } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: "mobile1" } } };

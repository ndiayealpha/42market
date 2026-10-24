import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CANCELLED_ORDER, COMPLETED_ORDER, READY_ORDER, REFERENCE_ORDER } from "@/src/data/full-order.mock";

import { OrderStatusHero } from "./OrderStatusHero";

const meta = {
  title: "OrderTracking/OrderStatusHero",
  component: OrderStatusHero,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { order: REFERENCE_ORDER, phoneVerified: true },
} satisfies Meta<typeof OrderStatusHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preparing: Story = {};
export const Ready: Story = { args: { order: READY_ORDER } };
export const Completed: Story = { args: { order: COMPLETED_ORDER } };
export const Cancelled: Story = { args: { order: CANCELLED_ORDER } };
export const PhoneNotVerified: Story = { args: { phoneVerified: false } };

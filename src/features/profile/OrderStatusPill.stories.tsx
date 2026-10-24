import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { OrderStatusPill } from "./OrderStatusPill";

const meta = {
  title: "Profile/OrderStatusPill",
  component: OrderStatusPill,
  tags: ["autodocs"],
  args: { status: "completed" },
} satisfies Meta<typeof OrderStatusPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Completed: Story = {};
export const Preparing: Story = { args: { status: "preparing" } };
export const Ready: Story = { args: { status: "ready" } };
export const Cancelled: Story = { args: { status: "cancelled" } };

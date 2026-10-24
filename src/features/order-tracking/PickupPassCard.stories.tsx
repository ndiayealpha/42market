import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { COMPLETED_ORDER, READY_ORDER, REFERENCE_ORDER } from "@/src/data/full-order.mock";

import { PickupPassCard } from "./PickupPassCard";

const NOW = new Date();

const meta = {
  title: "OrderTracking/PickupPassCard",
  component: PickupPassCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { order: REFERENCE_ORDER, now: NOW },
} satisfies Meta<typeof PickupPassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preparing: Story = {};
export const Ready: Story = { args: { order: READY_ORDER } };
export const Completed: Story = { args: { order: COMPLETED_ORDER } };

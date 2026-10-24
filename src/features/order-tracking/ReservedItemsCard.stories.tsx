import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { REFERENCE_ORDER, UNPAID_ONSITE_ORDER } from "@/src/data/full-order.mock";

import { ReservedItemsCard } from "./ReservedItemsCard";

const meta = {
  title: "OrderTracking/ReservedItemsCard",
  component: ReservedItemsCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { order: REFERENCE_ORDER },
} satisfies Meta<typeof ReservedItemsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaidOnline: Story = {};
export const ToPayOnsite: Story = { args: { order: UNPAID_ONSITE_ORDER } };

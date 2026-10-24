import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ORDER_HISTORY, ORDERS_TOTAL_COUNT } from "@/src/data/orders.mock";

import { OrderHistorySection } from "./OrderHistorySection";

const meta = {
  title: "Profile/OrderHistorySection",
  component: OrderHistorySection,
  tags: ["autodocs"],
  args: { entries: ORDER_HISTORY, totalCount: ORDERS_TOTAL_COUNT, isLoading: false, isError: false },
} satisfies Meta<typeof OrderHistorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { entries: [], totalCount: 0 } };
export const Loading: Story = { args: { isLoading: true } };
export const Error: Story = { args: { isError: true } };

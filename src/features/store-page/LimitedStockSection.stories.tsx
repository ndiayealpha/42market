import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { LIMITED_STOCK_ITEMS } from "@/src/data/store-detail.mock";

import { LimitedStockSection } from "./LimitedStockSection";

const meta = {
  title: "StorePage/LimitedStockSection",
  component: LimitedStockSection,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    items: LIMITED_STOCK_ITEMS,
    isLoading: false,
    isError: false,
    onRetry: fn(),
    onAdd: fn(),
  },
} satisfies Meta<typeof LimitedStockSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

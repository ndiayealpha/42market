import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { BEST_SELLERS } from "@/src/data/store-detail.mock";

import { BestSellersSection } from "./BestSellersSection";

const meta = {
  title: "StorePage/BestSellersSection",
  component: BestSellersSection,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    bestSellers: BEST_SELLERS,
    isLoading: false,
    isError: false,
    onRetry: fn(),
    onAdd: fn(),
  },
} satisfies Meta<typeof BestSellersSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

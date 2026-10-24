import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { BulkAddBar } from "./BulkAddBar";

const meta = {
  title: "Favorites/BulkAddBar",
  component: BulkAddBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    count: 12,
    totalPrice: 35.5,
    byStore: [{ storeSlug: "loirivoire", storeName: "LoirIvoire", count: 12, totalPrice: 35.5 }],
    isSelectionMode: false,
    onToggleSelectionMode: fn(),
    isLoading: false,
    isError: false,
    onRetry: fn(),
  },
} satisfies Meta<typeof BulkAddBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SelectionMode: Story = { args: { isSelectionMode: true, count: 5, totalPrice: 14.2 } };
export const MultiStore: Story = {
  args: {
    byStore: [
      { storeSlug: "loirivoire", storeName: "LoirIvoire", count: 7, totalPrice: 20.1 },
      { storeSlug: "nimba-market", storeName: "Nimba Market", count: 5, totalPrice: 15.4 },
    ],
  },
};
export const NothingToAdd: Story = { args: { count: 0, totalPrice: 0, byStore: [] } };
export const Loading: Story = { args: { isLoading: true } };
export const ErrorState: Story = { args: { isError: true } };

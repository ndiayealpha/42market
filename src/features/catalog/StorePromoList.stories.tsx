import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { STORE_PROMOS, STORES_OPEN_FOR_EXPRESS_PICKUP_COUNT } from "@/src/data/promotions.mock";

import { StorePromoList } from "./StorePromoList";

const meta = {
  title: "Catalog/StorePromoList",
  component: StorePromoList,
  tags: ["autodocs"],
  args: {
    stores: STORE_PROMOS,
    openForExpressPickupCount: STORES_OPEN_FOR_EXPRESS_PICKUP_COUNT,
    isLoading: false,
    isError: false,
    onRetry: fn(),
  },
} satisfies Meta<typeof StorePromoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OneStore: Story = { args: { stores: [STORE_PROMOS[0]] } };
export const Empty: Story = { args: { stores: [] } };
export const Loading: Story = { args: { isLoading: true } };
export const ErrorState: Story = { args: { isError: true } };

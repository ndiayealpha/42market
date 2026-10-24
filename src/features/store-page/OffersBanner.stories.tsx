import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { OFFERS, OFFERS_STOCKED_STORE_COUNT, OFFERS_TOTAL_COUNT, OFFERS_UPDATED_AT_ISO } from "@/src/data/store-detail.mock";

import { OffersBanner } from "./OffersBanner";

const meta = {
  title: "StorePage/OffersBanner",
  component: OffersBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    offers: OFFERS,
    totalCount: OFFERS_TOTAL_COUNT,
    updatedAtIso: OFFERS_UPDATED_AT_ISO,
    stockedStoreCount: OFFERS_STOCKED_STORE_COUNT,
    now: new Date("2026-08-12T08:30:00Z"),
    isLoading: false,
    isError: false,
    onRetry: fn(),
    onAdd: fn(),
  },
} satisfies Meta<typeof OffersBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

export const ErrorState: Story = {
  args: { isError: true },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { FEATURED_PROMO_PRODUCTS, FEATURED_PROMO_TOTAL_COUNT, FLASH_SALE } from "@/src/data/promotions.mock";

import { FeaturedSelectionSection } from "./FeaturedSelectionSection";

const meta = {
  title: "Catalog/FeaturedSelectionSection",
  component: FeaturedSelectionSection,
  tags: ["autodocs"],
  args: {
    flashSale: FLASH_SALE,
    now: new Date("2026-11-10T10:00:00Z"),
    products: FEATURED_PROMO_PRODUCTS,
    totalCount: FEATURED_PROMO_TOTAL_COUNT,
    isLoading: false,
    isError: false,
    onRetry: fn(),
  },
} satisfies Meta<typeof FeaturedSelectionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithFlashSale: Story = {};
export const WithoutFlashSale: Story = { args: { flashSale: null } };
export const Loading: Story = { args: { isLoading: true, products: [] } };
export const ErrorState: Story = { args: { isError: true } };

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FEATURED_PROMO_PRODUCTS, PROMO_CATEGORY_SECTIONS } from "@/src/data/promotions.mock";

import { ProductRail } from "./ProductRail";

const meta = {
  title: "Catalog/ProductRail",
  component: ProductRail,
  tags: ["autodocs"],
  args: { products: FEATURED_PROMO_PRODUCTS, ariaLabel: "Sélection en vedette" },
} satisfies Meta<typeof ProductRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArrows: Story = { args: { showArrows: true } };
export const WithoutArrows: Story = { args: { products: PROMO_CATEGORY_SECTIONS[0].products, showArrows: false } };
export const TwoItems: Story = { args: { products: FEATURED_PROMO_PRODUCTS.slice(0, 2), showArrows: true } };

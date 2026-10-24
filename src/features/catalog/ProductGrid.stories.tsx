import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PRODUCTS } from "@/src/data/catalog.mock";

import { ProductGrid } from "./ProductGrid";

const meta = {
  title: "Catalog/ProductGrid",
  component: ProductGrid,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwentyFour: Story = { args: { products: PRODUCTS } };
export const OneProduct: Story = { args: { products: [PRODUCTS[0]] } };
export const Empty: Story = { args: { products: [] } };

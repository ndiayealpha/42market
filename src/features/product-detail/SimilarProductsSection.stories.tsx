import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PRODUCT_DETAIL_FIXTURES } from "@/src/data/product-detail.mock";

import { SimilarProductsSection } from "./SimilarProductsSection";

const RIZ = PRODUCT_DETAIL_FIXTURES["loirivoire/riz-region-mediterraneenne"];

const meta = {
  title: "ProductDetail/SimilarProductsSection",
  component: SimilarProductsSection,
  tags: ["autodocs"],
  args: { products: RIZ.similar },
} satisfies Meta<typeof SimilarProductsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { products: [] },
};

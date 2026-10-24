import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PRODUCT_DETAIL_FIXTURES } from "@/src/data/product-detail.mock";

import { buildProductFacts } from "./productDetailViewModel";
import { ProductFactsStrip } from "./ProductFactsStrip";

const RIZ = PRODUCT_DETAIL_FIXTURES["loirivoire/riz-region-mediterraneenne"];

const meta = {
  title: "ProductDetail/ProductFactsStrip",
  component: ProductFactsStrip,
  tags: ["autodocs"],
  args: { facts: buildProductFacts(RIZ) },
} satisfies Meta<typeof ProductFactsStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OutOfStockFact: Story = {
  args: { facts: buildProductFacts({ ...RIZ, stockCount: 0 }) },
};

export const NoBioNoFreshnessFallsBackToPickup: Story = {
  args: { facts: buildProductFacts({ ...RIZ, isBioCertified: false, hasFreshnessGuarantee: false }) },
};

export const Empty: Story = {
  args: { facts: [] },
};

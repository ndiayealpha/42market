import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PRODUCT_DETAIL_FIXTURES } from "@/src/data/product-detail.mock";

import { ProductHeader } from "./ProductHeader";

const RIZ = PRODUCT_DETAIL_FIXTURES["loirivoire/riz-region-mediterraneenne"];

const meta = {
  title: "ProductDetail/ProductHeader",
  component: ProductHeader,
  tags: ["autodocs"],
  args: {
    eyebrow: RIZ.aisleLabelLong,
    name: RIZ.name,
    hasFreshnessGuarantee: RIZ.hasFreshnessGuarantee,
    rating: RIZ.rating,
  },
} satisfies Meta<typeof ProductHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoFreshnessBadge: Story = {
  args: { hasFreshnessGuarantee: false },
};

export const NoRatingLine: Story = {
  args: { rating: undefined },
};

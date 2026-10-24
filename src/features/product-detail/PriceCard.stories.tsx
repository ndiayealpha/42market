import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PRODUCT_DETAIL_FIXTURES } from "@/src/data/product-detail.mock";
import { computeSavings } from "@/src/domain/product-detail";

import { PriceCard } from "./PriceCard";

const RIZ = PRODUCT_DETAIL_FIXTURES["loirivoire/riz-region-mediterraneenne"];

const meta = {
  title: "ProductDetail/PriceCard",
  component: PriceCard,
  tags: ["autodocs"],
  args: {
    price: RIZ.price,
    compareAtPrice: RIZ.compareAtPrice,
    savings: computeSavings(RIZ.price, RIZ.compareAtPrice),
    vatRatePercent: RIZ.vatRatePercent,
    unitBasis: RIZ.unitBasis,
    packagingLabel: RIZ.packagingLabel,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PriceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoCompareAtPrice: Story = {
  args: { compareAtPrice: undefined, savings: undefined },
};

export const NoUnitBasis: Story = {
  args: { unitBasis: undefined },
};

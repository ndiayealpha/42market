import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PRODUCT_DETAIL_FIXTURES } from "@/src/data/product-detail.mock";
import { buildCharacteristicRows } from "@/src/domain/product-detail";

import { ProductInfoAccordions } from "./ProductInfoAccordions";

const RIZ = PRODUCT_DETAIL_FIXTURES["loirivoire/riz-region-mediterraneenne"];

const meta = {
  title: "ProductDetail/ProductInfoAccordions",
  component: ProductInfoAccordions,
  tags: ["autodocs"],
  args: {
    characteristicRows: buildCharacteristicRows(RIZ.characteristics),
    allergens: RIZ.allergens,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductInfoAccordions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoCharacteristics: Story = {
  args: { characteristicRows: [] },
};

export const NoAllergenData: Story = {
  args: { allergens: {} },
};

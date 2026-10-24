import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { STORE_PROMOS } from "@/src/data/promotions.mock";

import { StorePromoCard } from "./StorePromoCard";

const meta = {
  title: "Catalog/StorePromoCard",
  component: StorePromoCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: { store: STORE_PROMOS[0] },
} satisfies Meta<typeof StorePromoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PercentDiscount: Story = {};
export const FlashSaleBadge: Story = { args: { store: STORE_PROMOS[2] } };

export const OneLineAddress: Story = {
  args: { store: { ...STORE_PROMOS[0], address: "Rue Courte" } },
};

export const NoTags: Story = {
  args: { store: { ...STORE_PROMOS[0], productTags: [] } },
};

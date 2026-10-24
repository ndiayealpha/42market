import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PROMO_CATEGORY_SECTIONS } from "@/src/data/promotions.mock";

import { PromoCategorySection } from "./PromoCategorySection";

const meta = {
  title: "Catalog/PromoCategorySection",
  component: PromoCategorySection,
  tags: ["autodocs"],
  args: { storeSlug: "loirivoire", section: PROMO_CATEGORY_SECTIONS[0] },
} satisfies Meta<typeof PromoCategorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const EpicesSection: Story = { args: { section: PROMO_CATEGORY_SECTIONS[1] } };

export const EmptySectionRendersNothing: Story = {
  args: { section: { ...PROMO_CATEGORY_SECTIONS[0], products: [] } },
};

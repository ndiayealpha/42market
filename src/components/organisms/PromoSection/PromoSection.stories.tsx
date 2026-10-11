import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PromoSection } from "./PromoSection";
import { PROMO_ITEMS, PROMO_SECTION_CONTENT } from "./PromoSection.data";

const meta = {
  title: "Organisms/PromoSection",
  component: PromoSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    kicker: PROMO_SECTION_CONTENT.kicker,
    meta: `Mis à jour en direct · ${PROMO_SECTION_CONTENT.totalCount} offres actives à Saint-Étienne`,
    title: PROMO_SECTION_CONTENT.title,
    totalCount: PROMO_SECTION_CONTENT.totalCount,
    seeAll: PROMO_SECTION_CONTENT.seeAll,
    hint: PROMO_SECTION_CONTENT.hint,
    items: PROMO_ITEMS,
  },
} satisfies Meta<typeof PromoSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { loading: true },
};

export const Empty: Story = {
  args: { items: [] },
};

export const FewItemsNoOverflow: Story = {
  args: { items: PROMO_ITEMS.slice(0, 1) },
  parameters: {
    docs: { description: { story: "When everything fits without scrolling, the arrows and pagination dots hide themselves (`hasOverflow` from `useCarousel`)." } },
  },
};

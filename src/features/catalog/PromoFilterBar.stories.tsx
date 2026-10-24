import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { CATEGORIES } from "@/src/data/store-detail.mock";
import { PROMO_SCOPE_OPTIONS } from "@/src/data/promotions.mock";

import { PromoFilterBar } from "./PromoFilterBar";

const meta = {
  title: "Catalog/PromoFilterBar",
  component: PromoFilterBar,
  tags: ["autodocs"],
  args: {
    storeSlug: "loirivoire",
    activeType: "all",
    aisles: CATEGORIES,
    scopeOptions: PROMO_SCOPE_OPTIONS,
    selectedScopeSlugs: PROMO_SCOPE_OPTIONS.map((option) => option.slug),
    onScopeChange: fn(),
    primaryStoreName: "LoirIvoire",
  },
} satisfies Meta<typeof PromoFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FlashTypeActive: Story = { args: { activeType: "flash" } };
export const RayonActive: Story = { args: { activeAisleId: "fruits" } };

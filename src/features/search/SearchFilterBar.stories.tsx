import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { SearchFilterBar, type SearchFilterBarOverrides } from "./SearchFilterBar";

function buildHref(overrides: SearchFilterBarOverrides): string {
  const params = new URLSearchParams({ q: "Bananes Plantains" });
  if (overrides.pickupWithin2h) params.set("retrait", "2h");
  if (overrides.promoOnly) params.set("promo", "1");
  if (overrides.bulkOnly) params.set("gros", "1");
  if (overrides.storeSlug && overrides.storeSlug !== "all") params.set("epicerie", overrides.storeSlug);
  return `/main/recherche?${params.toString()}`;
}

const meta = {
  title: "Search/SearchFilterBar",
  component: SearchFilterBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    pickupWithin2h: false,
    promoOnly: false,
    bulkOnly: false,
    storeSlug: "all",
    sort: "distance",
    totalStoresCount: 3,
    pickupWithin2hCount: 2,
    buildHref,
    onSortChange: fn(),
  },
} satisfies Meta<typeof SearchFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PromoActive: Story = { args: { promoOnly: true } };

export const StoreScoped: Story = { args: { storeSlug: "nimba-market" } };

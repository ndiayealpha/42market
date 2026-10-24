import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FavoritesTabs } from "./FavoritesTabs";

const NOW = new Date("2026-11-10T12:15:00Z");

const meta = {
  title: "Favorites/FavoritesTabs",
  component: FavoritesTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    active: "produits",
    counts: { products: 12, stores: 3, recipes: 3 },
    getTabHref: (tab: string) => `/main/favoris?onglet=${tab}`,
    lastSyncedAtIso: "2026-11-10T12:07:00Z",
    now: NOW,
  },
} satisfies Meta<typeof FavoritesTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Produits: Story = {};
export const Epiceries: Story = { args: { active: "epiceries" } };
export const Recettes: Story = { args: { active: "recettes" } };
export const NoResults: Story = { args: { counts: { products: 0, stores: 0, recipes: 0 } } };

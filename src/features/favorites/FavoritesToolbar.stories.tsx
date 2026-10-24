import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { FavoritesToolbar } from "./FavoritesToolbar";

const meta = {
  title: "Favorites/FavoritesToolbar",
  component: FavoritesToolbar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    sort: "recent",
    onSortChange: fn(),
    terroirRegion: "all",
    getTerroirHref: (region: string) => `/main/favoris?terroir=${region}`,
    inStockOnly: false,
    onInStockOnlyChange: fn(),
    storeOptions: [
      { slug: "loirivoire", name: "LoirIvoire" },
      { slug: "nimba-market", name: "Nimba Market" },
      { slug: "saveurs-dafrique", name: "Saveurs d'Afrique" },
    ],
    selectedStoreSlugs: [],
    onStoreSlugsChange: fn(),
    query: "",
    onQueryChange: fn(),
    onResetFilters: fn(),
  },
} satisfies Meta<typeof FavoritesToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ActiveFilters: Story = { args: { inStockOnly: true, selectedStoreSlugs: ["loirivoire"], terroirRegion: "afrique-ouest" } };
export const WithSearchQuery: Story = { args: { query: "carottes" } };

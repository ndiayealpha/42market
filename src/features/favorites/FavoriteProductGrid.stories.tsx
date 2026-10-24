import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { FAVORITE_PRODUCTS } from "@/src/data/favorites.mock";
import { routes } from "@/src/lib/routing/routes";

import { FavoriteProductGrid } from "./FavoriteProductGrid";

const meta = {
  title: "Favorites/FavoriteProductGrid",
  component: FavoriteProductGrid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    products: FAVORITE_PRODUCTS,
    totalFavoritesCount: FAVORITE_PRODUCTS.length,
    isSelectionMode: false,
    selectedIds: new Set(),
    onToggleSelect: fn(),
    isLoading: false,
    isError: false,
    onRetry: fn(),
    resetFiltersHref: routes.main.favorites,
  },
} satisfies Meta<typeof FavoriteProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SelectionMode: Story = { args: { isSelectionMode: true, selectedIds: new Set([FAVORITE_PRODUCTS[1].id, FAVORITE_PRODUCTS[2].id]) } };
export const SingleResult: Story = { args: { products: [FAVORITE_PRODUCTS[0]] } };
export const NoFavoritesAtAll: Story = { args: { products: [], totalFavoritesCount: 0 } };
export const NoResultsForFilter: Story = { args: { products: [], totalFavoritesCount: 12 } };
export const Loading: Story = { args: { isLoading: true } };
export const ErrorState: Story = { args: { isError: true } };

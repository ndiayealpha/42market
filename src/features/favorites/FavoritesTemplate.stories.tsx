import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { FAVORITE_PRODUCTS } from "@/src/data/favorites.mock";
import type { FavoriteRecipe } from "@/src/domain/favorites";
import { STORE_PROMOS } from "@/src/data/promotions.mock";
import { routes } from "@/src/lib/routing/routes";

import { FavoritesTemplate } from "./FavoritesTemplate";

const NOW = new Date("2026-11-10T12:15:00Z");

const FAVORITE_RECIPES: FavoriteRecipe[] = [
  {
    id: "thieboudienne",
    name: "Thiéboudienne Rouge (Ceebu Jën)",
    servings: 4,
    totalPrice: 23,
    image: { src: "/login-visual.jpg", alt: "Thiéboudienne traditionnel" },
    href: "/main/recettes/thieboudienne-rouge-ceebu-jen",
    storeSlug: "loirivoire",
    storeName: "LoirIvoire",
    durationMinutes: 75,
    difficulty: "moyen",
    terroirRegion: "afrique-ouest",
  },
  {
    id: "mafe-boeuf",
    name: "Mafé Onctueux au Bœuf & Pâte d'Arachide",
    servings: 6,
    totalPrice: 15.75,
    image: { src: "/login-visual.jpg", alt: "Mafé au bœuf" },
    href: "/main/recettes/mafe-onctueux-boeuf-pate-arachide",
    storeSlug: "saveurs-dafrique",
    storeName: "Saveurs d'Afrique",
    durationMinutes: 50,
    difficulty: "facile",
    terroirRegion: "afrique-ouest",
  },
  {
    id: "attieke-grand-lahou",
    name: "Attiéké de Grand-Lahou",
    servings: 4,
    totalPrice: 10.1,
    image: { src: "/login-visual.jpg", alt: "Attiéké de Grand-Lahou" },
    href: "/main/recettes/attieke-grand-lahou-poisson-braise",
    storeSlug: "marche-gouro",
    storeName: "Marché Gouro",
    durationMinutes: 35,
    difficulty: "facile",
    terroirRegion: "afrique-ouest",
  },
];

const meta = {
  title: "Favorites/FavoritesTemplate",
  component: FavoritesTemplate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    cityName: "Saint-Étienne",
    activeTab: "produits",
    getTabHref: (tab: string) => `/main/favoris?onglet=${tab}`,
    counts: { products: 12, stores: 3, recipes: 3 },
    lastSyncedAtIso: "2026-11-10T12:07:00Z",
    now: NOW,
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
    onResetFilters: fn(),
    resetFiltersHref: routes.main.favorites,
    products: FAVORITE_PRODUCTS,
    isProductsLoading: false,
    isProductsError: false,
    onRetryProducts: fn(),
    isSelectionMode: false,
    onToggleSelectionMode: fn(),
    selectedIds: new Set(FAVORITE_PRODUCTS.filter((p) => p.stockStatus !== "out-of-stock").map((p) => p.id)),
    onToggleSelect: fn(),
    bulkSelection: {
      count: 12,
      totalPrice: FAVORITE_PRODUCTS.reduce((sum, p) => sum + p.price, 0),
      byStore: [
        { storeSlug: "loirivoire", storeName: "LoirIvoire", count: 4, totalPrice: 13.8 },
        { storeSlug: "nimba-market", storeName: "Nimba Market", count: 4, totalPrice: 11.4 },
        { storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", count: 4, totalPrice: 10.3 },
      ],
    },
    favoriteStores: STORE_PROMOS,
    isStoresLoading: false,
    isStoresError: false,
    onRetryStores: fn(),
    favoriteRecipes: FAVORITE_RECIPES,
    recipeCount: FAVORITE_RECIPES.length,
    isRecipesLoading: false,
    isRecipesError: false,
    onRetryRecipes: fn(),
    recipeTerroirRegion: "all",
    getRecipeTerroirHref: (region: string) => `/main/favoris?terroir=${region}`,
    recipePage: 1,
    onLoadMoreRecipes: fn(),
  },
} satisfies Meta<typeof FavoritesTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Epiceries: Story = { args: { activeTab: "epiceries" } };
export const Recettes: Story = { args: { activeTab: "recettes" } };
export const SansFavori: Story = {
  args: { products: [], counts: { products: 0, stores: 0, recipes: 0 }, bulkSelection: { count: 0, totalPrice: 0, byStore: [] } },
};
export const Loading: Story = { args: { isProductsLoading: true } };
export const Erreur: Story = { args: { isProductsError: true } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: "mobile1" } } };

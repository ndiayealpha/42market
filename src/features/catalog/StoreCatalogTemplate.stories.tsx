import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { CATEGORIES, STORE_DETAIL } from "@/src/data/store-detail.mock";
import { PRODUCTS, PRODUCTS_TOTAL_COUNT, RECIPE_KIT } from "@/src/data/catalog.mock";

import { StoreCatalogTemplate } from "./StoreCatalogTemplate";

const meta = {
  title: "Pages/StoreCatalogPage",
  component: StoreCatalogTemplate,
  tags: ["autodocs"],
  args: {
    store: STORE_DETAIL,
    now: new Date("2026-08-12T12:00:00Z"), // Wednesday, within opening hours
    scope: { type: "all" },
    aisles: CATEGORIES,
    isAislesLoading: false,
    isAislesError: false,
    onRetryAisles: fn(),
    products: PRODUCTS,
    totalCount: PRODUCTS_TOTAL_COUNT,
    isProductsLoading: false,
    isProductsError: false,
    onRetryProducts: fn(),
    hasMoreProducts: true,
    isLoadingMoreProducts: false,
    onLoadMoreProducts: fn(),
    sort: "populaires",
    onSortChange: fn(),
    recipeKit: RECIPE_KIT,
    isRecipeKitLoading: false,
  },
} satisfies Meta<typeof StoreCatalogTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RayonFiltre: Story = {
  name: "RayonFiltré",
  args: {
    scope: { type: "rayon", slug: "fruits" },
    products: PRODUCTS.filter((product) => product.aisleSlug === "fruits"),
    totalCount: PRODUCTS.filter((product) => product.aisleSlug === "fruits").length,
    hasMoreProducts: false,
  },
};

export const TriNouveautes: Story = {
  name: "TriNouveautés",
  args: { sort: "nouveautes" },
};

export const BoutiqueFermee: Story = {
  name: "BoutiqueFermée",
  args: { now: new Date("2026-08-12T22:00:00Z") },
};

export const SansProduit: Story = {
  args: { products: [], hasMoreProducts: false },
};

export const SansKitRecette: Story = {
  args: { recipeKit: null },
};

export const Loading: Story = {
  args: { isAislesLoading: true, aisles: [], isProductsLoading: true, products: [], isRecipeKitLoading: true, recipeKit: null },
};

export const Erreur: Story = {
  args: { isAislesError: true, isProductsError: true },
};

// No viewport addon is installed in this project, so the mobile state is
// demonstrated with a constrained container instead of a device frame.
export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
};

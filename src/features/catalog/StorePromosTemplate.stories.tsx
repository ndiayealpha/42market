import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { CATEGORIES, STORE_DETAIL } from "@/src/data/store-detail.mock";
import {
  FEATURED_PROMO_PRODUCTS,
  FEATURED_PROMO_TOTAL_COUNT,
  FLASH_SALE,
  PROMO_CATEGORY_SECTIONS,
  PROMO_SCOPE_OPTIONS,
  STORES_OPEN_FOR_EXPRESS_PICKUP_COUNT,
  STORE_PROMOS,
  CATALOG_REASSURANCE_CARDS,
} from "@/src/data/promotions.mock";

import { StorePromosTemplate } from "./StorePromosTemplate";

const meta = {
  title: "Pages/StorePromosPage",
  component: StorePromosTemplate,
  tags: ["autodocs"],
  args: {
    store: STORE_DETAIL,
    now: new Date("2026-11-10T10:00:00Z"),
    aisles: CATEGORIES,
    isAislesLoading: false,
    isAislesError: false,
    onRetryAisles: fn(),
    activeType: "all",
    scopeOptions: PROMO_SCOPE_OPTIONS,
    selectedScopeSlugs: PROMO_SCOPE_OPTIONS.map((option) => option.slug),
    onScopeChange: fn(),
    flashSale: FLASH_SALE,
    featuredProducts: FEATURED_PROMO_PRODUCTS,
    featuredTotalCount: FEATURED_PROMO_TOTAL_COUNT,
    isFeaturedLoading: false,
    isFeaturedError: false,
    onRetryFeatured: fn(),
    sections: PROMO_CATEGORY_SECTIONS,
    storePromos: STORE_PROMOS,
    openForExpressPickupCount: STORES_OPEN_FOR_EXPRESS_PICKUP_COUNT,
    isStorePromosLoading: false,
    isStorePromosError: false,
    onRetryStorePromos: fn(),
    reassuranceCards: CATALOG_REASSURANCE_CARDS,
  },
} satisfies Meta<typeof StorePromosTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FiltreVenteFlash: Story = {
  args: { activeType: "flash" },
};

export const SansVenteFlash: Story = {
  args: { flashSale: null },
};

export const SansPromo: Story = {
  args: { featuredProducts: [], sections: [] },
};

export const FiltreSansResultat: Story = {
  name: "FiltreSansRésultat",
  args: { activeType: "discovery", featuredProducts: [], sections: [] },
};

export const UneSeuleBoutique: Story = {
  args: { selectedScopeSlugs: ["loirivoire"] },
};

export const Loading: Story = {
  args: {
    isAislesLoading: true,
    aisles: [],
    isFeaturedLoading: true,
    featuredProducts: [],
    isStorePromosLoading: true,
    storePromos: [],
  },
};

export const ErreurParSection: Story = {
  args: { isFeaturedError: true, isStorePromosError: true },
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

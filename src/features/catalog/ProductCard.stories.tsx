import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PRODUCTS } from "@/src/data/catalog.mock";
import { FAVORITE_PRODUCT_OUT_OF_STOCK, FAVORITE_PRODUCTS } from "@/src/data/favorites.mock";
import { FEATURED_PROMO_PRODUCTS } from "@/src/data/promotions.mock";
import { STORE_DEALS } from "@/src/data/store-deals.mock";
import type { FavoriteProduct } from "@/src/domain/favorites";
import type { DealProduct } from "@/src/domain/store-deals";

import { ProductCard, type ProductCardProps } from "./ProductCard";

const BANANAS = PRODUCTS[0]; // "Bananes Plantain Vertes" — 2-line name
const AVOCADOS = PRODUCTS[2]; // has an editorial tag
const BISSAP = PRODUCTS[15]; // "Fleurs de Bissap d'Origine" — no image
const OUT_OF_STOCK = PRODUCTS.find((product) => product.isOutOfStock)!;
const DEAL_WITH_LABEL = STORE_DEALS[0].products[0];
const DEAL_NO_BADGE = STORE_DEALS[4].products[5]; // "Semoule Moyenne de Blé Dur" — no badge, falls back to a computed percent

// `satisfies Meta<...>` doesn't give object literals a contextual type, so a
// bare `{ variant: "catalog", ... }` below would widen to `variant: string`
// and fail the discriminated union — these helpers pin the literal type.
function catalogArgs(product: (typeof PRODUCTS)[number]): ProductCardProps {
  return { variant: "catalog", product };
}
function promoArgs(product: (typeof FEATURED_PROMO_PRODUCTS)[number], showStoreName?: boolean): ProductCardProps {
  return { variant: "promo", product, showStoreName };
}
function dealArgs(product: DealProduct): ProductCardProps {
  return { variant: "deal", product };
}
function favoriteArgs(product: FavoriteProduct, selectable?: boolean, isSelected?: boolean): ProductCardProps {
  return { variant: "favorite", product, selectable, isSelected };
}

const meta = {
  title: "Catalog/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: catalogArgs(BANANAS),
  decorators: [
    (Story) => (
      <div style={{ width: 220 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Catalog: Story = { args: catalogArgs(BANANAS) };
export const CatalogWithTag: Story = { args: catalogArgs(AVOCADOS) };
export const CatalogNoImage: Story = { args: catalogArgs(BISSAP) };
export const CatalogOutOfStock: Story = { args: catalogArgs(OUT_OF_STOCK) };

export const Promo: Story = { args: promoArgs(FEATURED_PROMO_PRODUCTS[0]) };
export const PromoMultibuyBadge: Story = { args: promoArgs(FEATURED_PROMO_PRODUCTS[2]) };
export const PromoSingleStoreScope: Story = { args: promoArgs(FEATURED_PROMO_PRODUCTS[0], false) };

export const Deal: Story = { args: dealArgs(DEAL_WITH_LABEL) };
export const DealNoBadgeFallsBackToPercent: Story = { args: dealArgs(DEAL_NO_BADGE) };

export const Favorite: Story = { args: favoriteArgs(FAVORITE_PRODUCTS[1]) };
export const FavoriteUnknownStock: Story = { args: favoriteArgs(FAVORITE_PRODUCTS[0]) };
export const FavoriteOutOfStock: Story = { args: favoriteArgs(FAVORITE_PRODUCT_OUT_OF_STOCK) };
export const FavoriteSelectable: Story = { args: favoriteArgs(FAVORITE_PRODUCTS[1], true, true) };
export const FavoriteNoUnitPrice: Story = { args: favoriteArgs(FAVORITE_PRODUCTS[0]) };

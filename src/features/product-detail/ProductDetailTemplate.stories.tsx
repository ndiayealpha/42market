import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PRODUCT_DETAIL_FIXTURES } from "@/src/data/product-detail.mock";
import { fromBaseProduct } from "@/src/domain/product-detail";

import { buildProductDetailViewModel } from "./productDetailViewModel";
import { ProductDetailTemplate } from "./ProductDetailTemplate";

const RIZ = PRODUCT_DETAIL_FIXTURES["loirivoire/riz-region-mediterraneenne"];

const meta = {
  title: "Pages/ProductDetailPage",
  component: ProductDetailTemplate,
  tags: ["autodocs"],
  args: { viewModel: buildProductDetailViewModel(RIZ) },
} satisfies Meta<typeof ProductDetailTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OutOfStock: Story = {
  args: { viewModel: buildProductDetailViewModel({ ...RIZ, stockCount: 0 }) },
};

export const NoSimilarProducts: Story = {
  args: { viewModel: buildProductDetailViewModel({ ...RIZ, similar: [] }) },
};

/** The minimal page a `fromBaseProduct`-synthesized fallback renders — no rating, no media variety, no characteristics/allergens, no similar rail (rule: "sections absentes plutôt que fabriquées"). */
export const FallbackFromCatalogProduct: Story = {
  args: {
    viewModel: buildProductDetailViewModel(
      fromBaseProduct({
        id: "bananes-plantain-vertes",
        slug: "bananes-plantain-vertes",
        name: "Bananes Plantain Vertes",
        packagingLabel: "le régime (approx. 1,2kg)",
        price: 2.5,
        image: { src: "/terroir-senegal-market.jpg", alt: "Bananes Plantain Vertes" },
        storeSlug: "loirivoire",
        storeName: "LoirIvoire",
        aisleSlug: "feculents",
        isOutOfStock: false,
      })
    ),
  },
};

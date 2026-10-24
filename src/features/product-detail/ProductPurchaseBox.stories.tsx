import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { PRODUCT_DETAIL_FIXTURES } from "@/src/data/product-detail.mock";

import { ProductPurchaseBox } from "./ProductPurchaseBox";

const RIZ = PRODUCT_DETAIL_FIXTURES["loirivoire/riz-region-mediterraneenne"];
const firstPhoto = RIZ.media.find((media) => media.kind === "photo");

const meta = {
  title: "ProductDetail/ProductPurchaseBox",
  component: ProductPurchaseBox,
  tags: ["autodocs"],
  args: {
    productId: RIZ.id,
    productName: RIZ.name,
    packagingLabel: RIZ.packagingLabel,
    price: RIZ.price,
    image: firstPhoto?.kind === "photo" ? { src: firstPhoto.src, alt: firstPhoto.alt } : { alt: RIZ.name },
    stockCount: RIZ.stockCount,
    stockCapPerOrder: RIZ.stockCapPerOrder,
    storeSlug: RIZ.storeSlug,
    storeName: RIZ.storeName,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductPurchaseBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OutOfStock: Story = {
  args: { stockCount: 0 },
};

export const QuantityCappedByPerOrderLimit: Story = {
  args: { stockCount: 50, stockCapPerOrder: 3 },
};

export const AddingShowsAToast: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Ajouter au cabas/ }));
    await expect(canvas.getByText("Ajouté au cabas")).toBeInTheDocument();
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { PRODUCT_DETAIL_FIXTURES } from "@/src/data/product-detail.mock";

import { ProductGallery } from "./ProductGallery";

const RIZ = PRODUCT_DETAIL_FIXTURES["loirivoire/riz-region-mediterraneenne"];

const meta = {
  title: "ProductDetail/ProductGallery",
  component: ProductGallery,
  tags: ["autodocs"],
  args: {
    productId: RIZ.id,
    productName: RIZ.name,
    media: RIZ.media,
    isBioCertified: RIZ.isBioCertified,
    bioCertificationCode: RIZ.bioCertificationCode,
    discountPercent: 20,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoDiscountNoBio: Story = {
  args: { isBioCertified: false, bioCertificationCode: undefined, discountPercent: undefined },
};

export const SinglePhotoNoThumbnails: Story = {
  args: { media: [RIZ.media[0]] },
};

export const ClickingDocumentThumbnailOpensDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Vue sac 4 kg" }));
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
    await expect(canvas.getByText(/à venir/)).toBeInTheDocument();
  },
};

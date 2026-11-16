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

export const ZeroImages: Story = {
  args: { media: [], discountPercent: undefined, isBioCertified: false, bioCertificationCode: undefined },
};

export const ThreeImages: Story = {
  args: {
    media: [
      { kind: "photo", src: "/offer-riz-royal-lion.jpg", alt: "Riz — vue 1" },
      { kind: "photo", src: "/terroir-senegal-market.jpg", alt: "Riz — étiquette" },
      { kind: "photo", src: "/terroir-mali-market.jpg", alt: "Riz — au rayon" },
    ],
  },
};

export const EightImagesCapToFiveThumbnailsPlusOverflow: Story = {
  args: {
    media: [
      { kind: "photo", src: "/offer-riz-royal-lion.jpg", alt: "Vue 1" },
      { kind: "photo", src: "/terroir-senegal-market.jpg", alt: "Vue 2" },
      { kind: "photo", src: "/terroir-mali-market.jpg", alt: "Vue 3" },
      { kind: "photo", src: "/promo-banner-market.jpg", alt: "Vue 4" },
      { kind: "photo", src: "/offer-attieke-frais.jpg", alt: "Vue 5" },
      { kind: "photo", src: "/souk-des-saveurs.jpg", alt: "Vue 6" },
      { kind: "photo", src: "/stock-carrots.jpg", alt: "Vue 7" },
      { kind: "photo", src: "/stock-strawberry-jam.jpg", alt: "Vue 8" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("+3")).toBeInTheDocument();
  },
};

export const WithVideoThumbnailAlwaysLast: Story = {
  args: {
    media: [
      // No real video asset exists in this repo (same situation as every other mock) — reusing a still image as both `src`/`poster` is enough to exercise the "video" kind's rendering/ordering.
      { kind: "video", src: "/stock-carrots.jpg", poster: "/stock-carrots.jpg", alt: "Vidéo de présentation" },
      { kind: "photo", src: "/offer-riz-royal-lion.jpg", alt: "Riz — vue 1" },
      { kind: "photo", src: "/terroir-senegal-market.jpg", alt: "Riz — étiquette" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const thumbnails = canvas.getAllByRole("button", { name: /Riz|Vidéo/ });
    await expect(thumbnails[thumbnails.length - 1]).toHaveAccessibleName("Vidéo de présentation");
  },
};

export const OutOfStock: Story = {
  args: { isOutOfStock: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Indisponible")).toBeInTheDocument();
  },
};

export const ArrowNavigationAdvancesSlideCounter: Story = {
  args: {
    media: [
      { kind: "photo", src: "/offer-riz-royal-lion.jpg", alt: "Vue 1" },
      { kind: "photo", src: "/terroir-senegal-market.jpg", alt: "Vue 2" },
      { kind: "photo", src: "/terroir-mali-market.jpg", alt: "Vue 3" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1/3")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Image suivante" }));
    await new Promise((resolve) => setTimeout(resolve, 150));
    await expect(canvas.getByText("2/3")).toBeInTheDocument();
  },
};

export const ZoomButtonOpensLightbox: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Agrandir l'image" }));
    const dialog = canvas.getByRole("dialog");
    await expect(dialog).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const ZeroImagesNoStuckSkeleton: Story = {
  args: { media: [] },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector(".animate-pulse")).toBeNull();
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SponsoredBanner } from "./SponsoredBanner";

const meta = {
  title: "Search/SponsoredBanner",
  component: SponsoredBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    campaign: {
      storeSlug: "loirivoire",
      storeName: "LoirIvoire Épicerie Fine",
      title: "Festival des Saveurs Tropicales",
      body: "Du 1er au 15 novembre, profitez de -20% sur votre panier sur toute commande livrée par notre circuit Fret Express Abidjan & Dakar.",
      highlightedPhrase: "-20% sur votre panier",
      code: "PLANTAIN20",
      ctaLabel: "En profiter →",
      ctaHref: "/main/epiceries/loirivoire/bons-plans",
    },
  },
} satisfies Meta<typeof SponsoredBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoCampaign: Story = { args: { campaign: undefined } };

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import type { CartLine } from "@/src/domain/cart";

import { CartTemplate } from "./CartTemplate";

const LINES: CartLine[] = [
  {
    id: "line-1",
    productId: "attieke-frais-abidjan",
    name: "Attiéké Frais d'Abidjan sous vide",
    packagingLabel: "500g",
    quantity: 2,
    unitPrice: 1.9,
    image: { src: "/offer-attieke-frais.jpg", alt: "Attiéké Frais d'Abidjan sous vide" },
    accrocheLabel: "Récolté sous 48h",
  },
  {
    id: "line-2",
    productId: "carottes-nouvelles",
    name: "Carottes Nouvelles Maraîchères",
    packagingLabel: "La botte 500g",
    quantity: 1,
    unitPrice: 2.5,
    image: { src: "/stock-carrots.jpg", alt: "Carottes Nouvelles Maraîchères" },
  },
  {
    id: "line-3",
    productId: "riz-royal-lion-5kg",
    name: "Riz Parfumé Brisé Tiep Royal Lion",
    packagingLabel: "Format Éco 5kg",
    quantity: 1,
    unitPrice: 8.9,
    image: { src: "/offer-riz-royal-lion.jpg", alt: "Riz Parfumé Brisé Tiep Royal Lion" },
  },
];

const meta = {
  title: "Cart/CartTemplate",
  component: CartTemplate,
  tags: ["autodocs"],
  args: {
    onUpdateQuantity: fn(),
    onRemoveLine: fn(),
  },
} satisfies Meta<typeof CartTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    storeName: "LoirIvoire",
    lines: LINES,
  },
};

export const Empty: Story = {
  args: {
    storeName: null,
    lines: [],
  },
};

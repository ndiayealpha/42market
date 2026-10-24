import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TRUST_ITEMS } from "@/src/components/organisms/Footer/Footer.constants";

import { ReassuranceBand } from "./ReassuranceBand";

const meta = {
  title: "Organisms/ReassuranceBand",
  component: ReassuranceBand,
  tags: ["autodocs"],
  args: { items: TRUST_ITEMS, variant: "inline" },
} satisfies Meta<typeof ReassuranceBand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {};

export const Cards: Story = {
  args: {
    variant: "cards",
    items: [
      { icon: "basket", title: "Garantie Prix Direct Marché", description: "Prix rigoureusement identiques ou inférieurs aux étals physiques des commerçants du 42. Aucune marge cachée appliquée aux promotions." },
      { icon: "zap", title: "Retrait Express 15 à 30 min", description: "Commandez votre panier remisé en ligne et récupérez-le au comptoir sans frais ni attente de préparation." },
      { icon: "leaf", title: "Démarche Anti-Gaspillage", description: "En profitant des dates courtes et surstocks, vous soutenez directement les trésoreries de vos épiceries de quartier indépendantes." },
    ],
  },
};

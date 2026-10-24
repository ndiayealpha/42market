import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MetaChip } from "@/src/components/atoms/MetaChip/MetaChip";

import { InfoBanner } from "./InfoBanner";

const meta = {
  title: "Organisms/InfoBanner",
  component: InfoBanner,
  tags: ["autodocs"],
  args: {
    icon: "store",
    title: "Commande exclusive par boutique",
    description: "Chaque panier est rattaché à une seule épicerie partenaire pour un retrait sans frais en 15 à 30 minutes, garanti frais et préparé avec soin.",
  },
} satisfies Meta<typeof InfoBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trailing: (
      <>
        <MetaChip icon="clock" label="15-30 min" />
        <MetaChip icon="check-circle" label="0 € de frais de retrait" />
      </>
    ),
  },
};

export const WithoutTrailing: Story = {};

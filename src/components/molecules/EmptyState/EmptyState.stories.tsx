import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";

import { EmptyState } from "./EmptyState";

const meta = {
  title: "Molecules/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: { title: "Aucun produit dans ce rayon pour le moment." },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    icon: "basket",
    description: "Revenez bientôt ou explorez les autres rayons de la boutique.",
    action: <ButtonLink href="#" variant="soft">Voir tous les rayons</ButtonLink>,
  },
};

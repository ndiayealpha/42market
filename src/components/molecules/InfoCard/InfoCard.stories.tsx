import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InfoCard } from "./InfoCard";

const meta = {
  title: "Molecules/InfoCard",
  component: InfoCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    imageSrc: "/login-info-thumbnail.jpg",
    title: "Plus de 1 200 épices & trésors locaux",
    description: "Retrait gratuit chez vos commerçants de quartier",
    trailingIcon: "store",
  },
};

export const WithIcon: Story = {
  args: {
    icon: "store",
    title: "Vous êtes une épicerie locale ?",
    description: "Ouvrez votre boutique en 3 clics et recevez vos commandes",
    trailingIcon: "chevron-right",
    tone: "accent",
    href: "/auth/create-account",
  },
};

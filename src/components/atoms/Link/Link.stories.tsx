import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TextLink } from "./Link";

const meta = {
  title: "Atoms/Link",
  component: TextLink,
  tags: ["autodocs"],
  args: { href: "#", children: "Mot de passe oublié ?" },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Muted: Story = {
  args: { variant: "muted", children: "Créer un compte" },
};

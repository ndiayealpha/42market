import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ButtonLink } from "./ButtonLink";

const meta = {
  title: "Atoms/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs"],
  args: { children: "Préférences rapides", variant: "soft", href: "#preferences-securite" },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Soft: Story = {};
export const Primary: Story = { args: { variant: "primary", children: "Découvrir" } };
export const PrimaryMedium: Story = { args: { variant: "primary-md", children: "Modifier mon profil" } };

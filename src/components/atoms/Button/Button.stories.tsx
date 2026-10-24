import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Réessayer", variant: "soft" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Soft: Story = {};
export const Primary: Story = { args: { variant: "primary", children: "Précommander" } };
export const PrimarySmall: Story = { args: { variant: "primary-sm", children: "Voir le panier" } };
export const PrimaryMedium: Story = { args: { variant: "primary-md", children: "Modifier mon profil" } };
export const Accent: Story = { args: { variant: "accent", children: "Réserver en Click & Collect" } };
export const Disabled: Story = { args: { disabled: true } };

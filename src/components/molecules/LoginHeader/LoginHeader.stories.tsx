import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LoginHeader } from "./LoginHeader";

const meta = {
  title: "Molecules/LoginHeader",
  component: LoginHeader,
  tags: ["autodocs"],
  args: {
    eyebrow: "Espace client & gourmand",
    title: "Bon retour parmi nous !",
    subtitle: "Saisissez vos identifiants pour retrouver vos épiceries favorites et paniers enregistrés.",
  },
} satisfies Meta<typeof LoginHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoEyebrow: Story = {
  args: { eyebrow: undefined },
};

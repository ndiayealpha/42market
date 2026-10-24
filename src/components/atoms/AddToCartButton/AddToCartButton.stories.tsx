import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { AddToCartButton } from "./AddToCartButton";

const meta = {
  title: "Atoms/AddToCartButton",
  component: AddToCartButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    productName: "Attiéké Frais d'Abidjan sous vide (500g)",
    onAdd: fn(),
  },
} satisfies Meta<typeof AddToCartButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unavailable: Story = {
  args: { unavailable: true },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { Select } from "./Select";

const meta = {
  title: "Atoms/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    icon: "sort",
    options: [
      { value: "recent", label: "Derniers ajouts" },
      { value: "price-asc", label: "Prix croissant" },
      { value: "price-desc", label: "Prix décroissant" },
      { value: "name-asc", label: "Nom A→Z" },
    ],
    value: "recent",
    onChange: fn(),
    "aria-label": "Trier les favoris",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoIcon: Story = { args: { icon: undefined } };

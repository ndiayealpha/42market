import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { LocationSelector } from "./LocationSelector";

const meta = {
  title: "Molecules/LocationSelector",
  component: LocationSelector,
  tags: ["autodocs"],
  args: {
    location: "42000, FR",
    radiusLabel: "Rayon 3 km",
    onClick: fn(),
  },
} satisfies Meta<typeof LocationSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DifferentLocation: Story = {
  args: { location: "75001, FR", radiusLabel: "Rayon 10 km" },
};

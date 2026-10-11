import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { HeaderSearch } from "./HeaderSearch";

const meta = {
  title: "Molecules/HeaderSearch",
  component: HeaderSearch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    location: "42000, FR",
    radiusLabel: "Rayon 3 km",
    onLocationClick: fn(),
    onSearch: fn(),
  },
} satisfies Meta<typeof HeaderSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

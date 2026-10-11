import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { HeaderMobile } from "./HeaderMobile";

const meta = {
  title: "Organisms/Header/HeaderMobile",
  component: HeaderMobile,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  render: (args) => (
    <div style={{ width: 390 }}>
      <HeaderMobile {...args} />
    </div>
  ),
  args: {
    location: { location: "42000, FR", radiusLabel: "Rayon 3 km" },
    onLocationClick: fn(),
  },
} satisfies Meta<typeof HeaderMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  args: { user: { name: "Jane Doe" } },
};

export const NarrowScreen: Story = {
  render: (args) => (
    <div style={{ width: 340 }}>
      <HeaderMobile {...args} />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { JoinNetworkBanner } from "./JoinNetworkBanner";

const meta = {
  title: "Profile/JoinNetworkBanner",
  component: JoinNetworkBanner,
  tags: ["autodocs"],
} satisfies Meta<typeof JoinNetworkBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

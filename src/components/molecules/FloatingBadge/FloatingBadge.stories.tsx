import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";

import { FloatingBadge } from "./FloatingBadge";

const meta = {
  title: "Molecules/FloatingBadge",
  component: FloatingBadge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: <Image src="/login-badge.svg" alt="" width={48} height={48} />,
  },
  decorators: [
    (Story) => (
      <div className="relative h-40 w-40 rounded-2xl bg-foreground">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FloatingBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopRight: Story = {};

export const BottomLeft: Story = {
  args: { position: "bottom-left" },
};

export const Hidden: Story = {
  args: { visible: false },
};

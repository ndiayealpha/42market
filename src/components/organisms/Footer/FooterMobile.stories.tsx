import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { FooterMobile } from "./FooterMobile";

const meta = {
  title: "Organisms/Footer/FooterMobile",
  component: FooterMobile,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { year: 2026, onSubscribe: fn() },
  render: (args) => (
    <div style={{ width: 390 }}>
      <FooterMobile {...args} />
    </div>
  ),
} satisfies Meta<typeof FooterMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

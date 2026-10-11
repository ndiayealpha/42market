import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProgressSegment } from "./ProgressSegment";

const meta = {
  title: "Atoms/ProgressSegment",
  component: ProgressSegment,
  tags: ["autodocs"],
  render: (args) => (
    <div style={{ display: "flex", gap: 4, width: 160 }}>
      <ProgressSegment {...args} />
      <ProgressSegment {...args} />
      <ProgressSegment {...args} />
    </div>
  ),
} satisfies Meta<typeof ProgressSegment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: { active: false },
};

export const Active: Story = {
  args: { active: true },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const meta = {
  title: "Molecules/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <PasswordStrengthMeter {...args} />
    </div>
  ),
} satisfies Meta<typeof PasswordStrengthMeter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { score: 0, label: null },
};

export const Weak: Story = {
  args: { score: 1, label: "Faible" },
};

export const Medium: Story = {
  args: { score: 2, label: "Moyen" },
};

export const Strong: Story = {
  args: { score: 3, label: "Fort" },
};

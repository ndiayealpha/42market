import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ZeroSpamCard } from "./ZeroSpamCard";

const meta = {
  title: "Notifications/ZeroSpamCard",
  component: ZeroSpamCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
  args: { averagePerDay: 1 },
} satisfies Meta<typeof ZeroSpamCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const MultiplePerDay: Story = { args: { averagePerDay: 2.4 } };

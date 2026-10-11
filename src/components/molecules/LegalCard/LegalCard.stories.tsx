import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LegalCard } from "./LegalCard";

const meta = {
  title: "Molecules/LegalCard",
  component: LegalCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ width: 358 }}>
      <LegalCard />
    </div>
  ),
} satisfies Meta<typeof LegalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

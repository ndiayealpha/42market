import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./Badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "4" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Counts: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="count" color="favorite">
        4
      </Badge>
      <Badge variant="count" color="danger">
        8
      </Badge>
      <Badge variant="count" color="basket">
        3
      </Badge>
      <Badge variant="count" color="danger">
        99+
      </Badge>
    </div>
  ),
};

export const Labels: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge color="info">New</Badge>
      <Badge color="success">Frais</Badge>
    </div>
  ),
};

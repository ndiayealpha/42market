import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoreTag } from "./StoreTag";

const meta = {
  title: "Atoms/StoreTag",
  component: StoreTag,
  tags: ["autodocs"],
  args: { name: "LoirIvoire" },
  decorators: [(Story) => <div className="bg-foreground p-4"><Story /></div>],
} satisfies Meta<typeof StoreTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

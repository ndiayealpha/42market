import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MultiStoreNotice } from "./MultiStoreNotice";

const meta = {
  title: "Search/MultiStoreNotice",
  component: MultiStoreNotice,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MultiStoreNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

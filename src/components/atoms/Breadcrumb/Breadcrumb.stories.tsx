import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Atoms/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    items: [
      { label: "Accueil", href: "/main/home" },
      { label: "Épiceries", href: "/main/epiceries" },
      { label: "Épicerie LoirIvoire" },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

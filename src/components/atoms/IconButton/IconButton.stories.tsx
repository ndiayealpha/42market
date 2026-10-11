import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IconButton } from "./IconButton";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    icon: "arrow-right",
    size: "lg",
    bg: "#0A2540",
    fg: "#FFFFFF",
    ariaLabel: "Voir l'offre",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {};

export const Medium: Story = {
  args: { size: "md", icon: "chevron-right", bg: "#FDF1EE", fg: "#210D0B", ariaLabel: "Offres suivantes" },
};

export const Disabled: Story = {
  args: { size: "md", icon: "chevron-left", bg: "#FDF1EE", fg: "#210D0B", ariaLabel: "Offres précédentes", disabled: true },
};

export const AsLink: Story = {
  args: { href: "/main/offres/reduction-50" },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { fn } from "storybook/test";

import { SegmentedControl } from "./SegmentedControl";

const meta = {
  title: "Atoms/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  args: {
    options: [
      { value: "populaires", label: "Populaires" },
      { value: "nouveautes", label: "Nouveautés" },
    ],
    value: "populaires",
    ariaLabel: "Trier les produits",
    onChange: fn(),
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populaires: Story = {};
export const Nouveautes: Story = { args: { value: "nouveautes" } };

export const Interactive: Story = {
  render: (args) => {
    function Demo() {
      const [value, setValue] = useState(args.value);
      return <SegmentedControl {...args} value={value} onChange={setValue} />;
    }
    return <Demo />;
  },
};

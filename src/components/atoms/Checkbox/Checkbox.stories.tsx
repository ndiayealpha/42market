import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  // Checkbox has no label of its own — pair it with one (see
  // RememberMe/ConsentCheckbox). The bare story below supplies an
  // aria-label purely so it has an accessible name in isolation.
  args: { onChange: fn(), "aria-label": "Option" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

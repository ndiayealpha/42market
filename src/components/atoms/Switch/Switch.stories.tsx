import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { fn, userEvent, within } from "storybook/test";

import { Switch } from "./Switch";

const meta = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { checked: false, onChange: fn(), "aria-label": "Notifications SMS" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};

export const On: Story = { args: { checked: true } };

export const Disabled: Story = { args: { checked: true, disabled: true } };

export const Interactive: Story = {
  render: (args) => {
    function Controlled() {
      const [checked, setChecked] = useState(args.checked);
      return <Switch {...args} checked={checked} onChange={setChecked} />;
    }
    return <Controlled />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("switch"));
  },
};

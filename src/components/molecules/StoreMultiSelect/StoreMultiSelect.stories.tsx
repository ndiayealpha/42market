import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { PROMO_SCOPE_OPTIONS } from "@/src/data/promotions.mock";

import { StoreMultiSelect } from "./StoreMultiSelect";

const meta = {
  title: "Molecules/StoreMultiSelect",
  component: StoreMultiSelect,
  tags: ["autodocs"],
  args: {
    options: PROMO_SCOPE_OPTIONS,
    selectedSlugs: PROMO_SCOPE_OPTIONS.map((option) => option.slug),
    primaryStoreName: "LoirIvoire",
    onChange: fn(),
  },
} satisfies Meta<typeof StoreMultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const PartialSelection: Story = {
  args: { selectedSlugs: ["loirivoire"] },
};

export const OpensOnClick: Story = {
  render: (args) => {
    function Demo() {
      const [selected, setSelected] = useState(args.selectedSlugs);
      return <StoreMultiSelect {...args} selectedSlugs={selected} onChange={setSelected} />;
    }
    return <Demo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(canvas.getByRole("list")).toBeInTheDocument();
  },
};

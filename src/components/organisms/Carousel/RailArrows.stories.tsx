import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { RailArrows } from "./RailArrows";

const meta = {
  title: "Organisms/Carousel/RailArrows",
  component: RailArrows,
  tags: ["autodocs"],
  args: { ariaLabel: "Boutiques", onPrev: fn(), onNext: fn(), canPrev: true, canNext: true },
} satisfies Meta<typeof RailArrows>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AtStart: Story = { args: { canPrev: false } };
export const AtEnd: Story = { args: { canNext: false } };

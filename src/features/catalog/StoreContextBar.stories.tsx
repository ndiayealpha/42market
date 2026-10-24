import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect } from "react";
import { expect, userEvent, within } from "storybook/test";

import { useCartActions } from "@/src/lib/cart/cart.store";

import { StoreContextBar } from "./StoreContextBar";

const meta = {
  title: "Catalog/StoreContextBar",
  component: StoreContextBar,
  tags: ["autodocs"],
  args: { storeName: "LoirIvoire" },
} satisfies Meta<typeof StoreContextBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CartNotEmpty: Story = {
  render: (args) => {
    function Demo() {
      const { increment } = useCartActions();
      useEffect(() => {
        increment(1);
      }, [increment]);
      return <StoreContextBar {...args} />;
    }
    return <Demo />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("link", { name: /Changer d'épicerie/i }));
    await expect(canvas.getByRole("dialog")).toBeInTheDocument();
  },
};

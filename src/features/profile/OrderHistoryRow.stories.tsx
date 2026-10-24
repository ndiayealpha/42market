import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ORDER_HISTORY } from "@/src/data/orders.mock";

import { OrderHistoryRow } from "./OrderHistoryRow";

const meta = {
  title: "Profile/OrderHistoryRow",
  component: OrderHistoryRow,
  tags: ["autodocs"],
  args: { entry: ORDER_HISTORY[0] },
  decorators: [(Story) => <ul className="max-w-xl"><Story /></ul>],
} satisfies Meta<typeof OrderHistoryRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongStoreName: Story = {
  args: {
    entry: { ...ORDER_HISTORY[0], storeName: "Comptoir des Saveurs Authentiques d'Afrique de l'Ouest et du Sahel" },
  },
};

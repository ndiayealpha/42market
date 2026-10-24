import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import type { PaymentMethodId } from "@/src/domain/checkout";

import { PaymentMethodSelector, type PaymentMethodSelectorProps } from "./PaymentMethodSelector";

function Controlled(props: PaymentMethodSelectorProps) {
  const [value, setValue] = useState(props.value);
  return <PaymentMethodSelector {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: "Checkout/PaymentMethodSelector",
  component: PaymentMethodSelector,
  tags: ["autodocs"],
  args: { storeName: "LoirIvoire" },
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof PaymentMethodSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnsiteSelected: Story = {
  args: { value: "onsite" as PaymentMethodId, onChange: () => {} },
};

export const OnlineSelected: Story = {
  args: { value: "online" as PaymentMethodId, onChange: () => {} },
};

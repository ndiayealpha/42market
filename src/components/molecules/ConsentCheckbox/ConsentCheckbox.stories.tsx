import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { TextLink } from "@/src/components/atoms/Link/Link";
import { ConsentCheckbox } from "./ConsentCheckbox";

const meta = {
  title: "Molecules/ConsentCheckbox",
  component: ConsentCheckbox,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    onChange: fn(),
    label: (
      <>
        J&apos;accepte les <TextLink href="#">conditions générales</TextLink> de 42 Markets
      </>
    ),
  },
} satisfies Meta<typeof ConsentCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Error: Story = {
  args: { error: "Vous devez accepter les conditions générales pour continuer." },
};

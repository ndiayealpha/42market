import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Rechercher ..." },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bordered: Story = {};

export const WithIcon: Story = {
  args: { icon: <Icon name="mail" decorative /> , placeholder: "Votre adresse email..." },
};

export const Plain: Story = {
  args: { variant: "plain" },
  render: (args) => (
    <div className="rounded-full border border-border bg-surface px-3 py-2">
      <Input {...args} />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { FormField } from "./FormField";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Adresse e-mail",
    type: "email",
    placeholder: "exemple@domaine.fr",
    icon: <Icon name="mail" decorative />,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "jane@example.com" },
};

export const Invalid: Story = {
  args: { defaultValue: "not-an-email", error: "Adresse e-mail invalide." },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Focus: Story = {
  play: async ({ canvasElement }) => {
    canvasElement.querySelector("input")?.focus();
  },
};

export const WithLeftAddon: Story = {
  args: {
    label: "Téléphone",
    type: "tel",
    icon: undefined,
    placeholder: "6 12 34 56 78",
    leftAddon: <span className="px-1 text-sm text-foreground">🇫🇷 +33</span>,
  },
};

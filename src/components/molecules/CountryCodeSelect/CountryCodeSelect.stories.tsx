import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { fn, userEvent, within } from "storybook/test";

import { CountryCodeSelect } from "./CountryCodeSelect";

const OPTIONS = [
  { code: "FR", dialCode: "33", flag: "🇫🇷", name: "France" },
  { code: "BE", dialCode: "32", flag: "🇧🇪", name: "Belgique" },
  { code: "CA", dialCode: "1", flag: "🇨🇦", name: "Canada" },
  { code: "SN", dialCode: "221", flag: "🇸🇳", name: "Sénégal" },
];

const meta = {
  title: "Molecules/CountryCodeSelect",
  component: CountryCodeSelect,
  tags: ["autodocs"],
  // In real usage (PhoneField) this always ships an aria-label — supplied
  // here too so the standalone story has an accessible name.
  args: { options: OPTIONS, onChange: fn(), "aria-label": "Indicatif téléphonique" },
  render: (args) => {
    function Controlled() {
      const [value, setValue] = useState(args.value);
      return <CountryCodeSelect {...args} value={value} onChange={setValue} />;
    }
    return <Controlled />;
  },
} satisfies Meta<typeof CountryCodeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const France: Story = {
  args: { value: "FR" },
};

export const Opened: Story = {
  args: { value: "FR" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox"));
  },
};

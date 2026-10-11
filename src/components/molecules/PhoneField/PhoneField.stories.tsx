import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { fn } from "storybook/test";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { PhoneField } from "./PhoneField";

const OPTIONS = [
  { code: "FR", dialCode: "33", flag: "🇫🇷", name: "France" },
  { code: "BE", dialCode: "32", flag: "🇧🇪", name: "Belgique" },
  { code: "CA", dialCode: "1", flag: "🇨🇦", name: "Canada" },
  { code: "SN", dialCode: "221", flag: "🇸🇳", name: "Sénégal" },
];

const meta = {
  title: "Molecules/PhoneField",
  component: PhoneField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Téléphone",
    countryOptions: OPTIONS,
    icon: <Icon name="shield" decorative />,
    onChange: fn(),
    onCountryCodeChange: fn(),
  },
  render: (args) => {
    function Controlled() {
      const [countryCode, setCountryCode] = useState(args.countryCode);
      const [value, setValue] = useState((args.value as string) ?? "");
      return (
        <PhoneField
          {...args}
          countryCode={countryCode}
          onCountryCodeChange={setCountryCode}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }
    return <Controlled />;
  },
} satisfies Meta<typeof PhoneField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { countryCode: "FR", value: "" },
};

export const Filled: Story = {
  args: { countryCode: "FR", value: "612345678" },
};

export const InvalidFormat: Story = {
  args: { countryCode: "FR", value: "12", error: "Numéro invalide pour France (9 chiffres attendus)." },
};

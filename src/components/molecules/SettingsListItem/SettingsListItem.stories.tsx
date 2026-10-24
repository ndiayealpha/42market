import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Switch } from "@/src/components/atoms/Switch/Switch";

import { SettingsListItem } from "./SettingsListItem";

const meta = {
  title: "Molecules/SettingsListItem",
  component: SettingsListItem,
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chevron: Story = {
  args: {
    icon: "user",
    title: "Informations personnelles",
    description: "aissatou@example.com • +33 6 42 ** ** 18",
    trailing: "chevron",
    href: "/main/profile/modifier",
  },
};

export const Action: Story = {
  args: {
    icon: "shield",
    title: "Sécurité du compte",
    description: "Mot de passe à jour • Double authentification désactivée",
    trailing: "action",
    actionLabel: "Gérer",
    href: "/main/securite",
  },
};

export const WithSwitch: Story = {
  args: { icon: "bell", title: "Notifications", description: "SMS dès que la commande est prête", trailing: "switch", children: null },
  render: () => {
    function Demo() {
      const [checked, setChecked] = useState(true);
      return (
        <SettingsListItem icon="bell" title="Notifications" description="SMS dès que la commande est prête" trailing="switch">
          <Switch checked={checked} onChange={setChecked} aria-label="Notifications SMS" />
        </SettingsListItem>
      );
    }
    return <Demo />;
  },
};

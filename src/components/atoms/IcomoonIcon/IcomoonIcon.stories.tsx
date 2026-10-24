import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ICOMOON_ICON_NAMES } from "./icomoon-icon-names.generated";
import { IcomoonIcon } from "./IcomoonIcon";

const meta = {
  title: "Atoms/IcomoonIcon",
  component: IcomoonIcon,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { name: "demo-plus", size: 24 },
} satisfies Meta<typeof IcomoonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "demo-plus" is a placeholder proving the icomoon.io → sprite → component pipeline end to end — swap it out once real icons are exported (see icomoon/README.md). */
export const Default: Story = {};

export const Large: Story = { args: { size: 48 } };

/** Recolors via CSS `color`, same convention as the existing `Icon` atom. */
export const CustomColor: Story = {
  args: { size: 48, className: "text-danger" },
};

/** When the icon is the only content of a control, it must NOT be decorative, and needs its own label. */
export const Labelled: Story = {
  args: { decorative: false, "aria-label": "Icône de démonstration" },
};

/** Every icon currently in the generated set — grows automatically as icomoon/selection.json grows. */
export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {ICOMOON_ICON_NAMES.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontSize: 12 }}>
          <IcomoonIcon name={name} size={28} />
          {name}
        </div>
      ))}
    </div>
  ),
};

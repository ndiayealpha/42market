import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon, type IconName } from "./Icon";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { name: "search", size: 24 },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const ALL_NAMES: IconName[] = [
  "search",
  "location",
  "chevron-down",
  "chevron-right",
  "heart",
  "bell",
  "basket",
  "store",
  "clock",
  "shield",
  "mail",
  "lock",
  "eye",
  "eye-off",
  "instagram",
  "facebook",
  "tiktok",
  "linkedin",
  "google",
  "apple",
];

export const AllGlyphs: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-6 text-foreground">
      {ALL_NAMES.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2 text-xs">
          <Icon name={name} size={28} />
          {name}
        </div>
      ))}
    </div>
  ),
};

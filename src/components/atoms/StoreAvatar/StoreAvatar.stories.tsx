import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoreAvatar } from "./StoreAvatar";

const meta = {
  title: "Atoms/StoreAvatar",
  component: StoreAvatar,
  tags: ["autodocs"],
  args: { name: "LoirIvoire", slug: "loirivoire" },
} satisfies Meta<typeof StoreAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SingleWordName: Story = { args: { name: "LoirIvoire", slug: "loirivoire" } };
export const StopwordName: Story = { args: { name: "Épicerie du Monde", slug: "epicerie-du-monde" } };
export const ApostropheName: Story = { args: { name: "Saveurs d'Afrique", slug: "saveurs-dafrique" } };
export const AllTones: Story = {
  render: () => (
    <div className="flex gap-2">
      {["loirivoire", "nimba-market", "saveurs-dafrique", "salam-market", "epicerie-du-monde", "le-comptoir-tropical"].map((slug) => (
        <StoreAvatar key={slug} name={slug} slug={slug} />
      ))}
    </div>
  ),
};

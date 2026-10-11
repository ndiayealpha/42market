import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { routes } from "@/src/lib/routing/routes";
import { BottomNav } from "./BottomNav";

const meta = {
  title: "Organisms/BottomNav",
  component: BottomNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: { navigation: { pathname: routes.main.home } },
  },
  render: () => (
    <div style={{ width: 390, height: 160, position: "relative", background: "var(--color-background)" }}>
      <BottomNav />
    </div>
  ),
} satisfies Meta<typeof BottomNav>;

export default meta;
type Story = StoryObj<typeof meta>;

// Runs inside the shared "Session" toolbar decorator from
// .storybook/preview.tsx — Home is active via the `nextjs.navigation`
// parameter above (Unauthenticated by default; switch the toolbar to
// see the "Profil" tab target change).
export const Home: Story = {};

export const CartTabActive: Story = {
  parameters: { nextjs: { navigation: { pathname: routes.main.cart } } },
};

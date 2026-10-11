import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AuthLayout } from "./AuthLayout";

const Hero = ({ label }: { label: string }) => (
  <div className="flex h-full items-center justify-center rounded-[48px] bg-foreground text-white">{label}</div>
);

const Form = () => (
  <div className="flex flex-col gap-4">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="h-12 rounded-[10px] bg-auth-tab-bg" />
    ))}
  </div>
);

const meta = {
  title: "Templates/AuthLayout",
  component: AuthLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Clamp: Story = {
  args: {
    scrollBehavior: "clamp",
    hero: <Hero label="Hero (login) — pinned to viewport height" />,
    children: <Form />,
  },
};

export const Sticky: Story = {
  args: {
    scrollBehavior: "sticky",
    hero: <Hero label="Hero (signup) — sticky while the form scrolls" />,
    children: (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="h-12 rounded-[10px] bg-auth-tab-bg" />
        ))}
      </div>
    ),
  },
};

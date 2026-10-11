import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AuthHeroPanel } from "./AuthHeroPanel";

const meta = {
  title: "Features/Auth/AuthHeroPanel",
  component: AuthHeroPanel,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthHeroPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  render: (args) => (
    <div style={{ height: 800, width: 466 }}>
      <AuthHeroPanel {...args} />
    </div>
  ),
  args: {
    variant: "login",
    title: (
      <>
        <span className="block text-white">Les choses</span>
        <span className="block text-auth-accent">de chez moi.</span>
      </>
    ),
    tagline: "Explorez une sélection rigoureuse de produits frais, rares et locaux. L'authenticité du marché, réinventée.",
    imageSrc: "/login-visual.png",
    imageAlt: "Un commerçant partenaire dans son épicerie",
  },
};

export const Signup: Story = {
  render: (args) => (
    <div style={{ height: 900, width: 466 }}>
      <AuthHeroPanel {...args} />
    </div>
  ),
  args: {
    variant: "signup",
    title: "Rejoignez le marché des terroirs authentiques.",
    tagline: "Explorez une sélection rigoureuse de produits frais, rares et locaux. L'authenticité du marché, réinventée.",
    imageSrc: "/signup-visual.png",
    imageAlt: "Mariam, commerçante partenaire, choisissant des mangues fraîches dans son épicerie",
    testimonial: {
      quote:
        "Grâce à 42 Markets je retrouve enfin les produits de mon enfance, livrés par de vrais commerçants du quartier.",
      author: "Aïssatou D., Lyon",
    },
  },
};

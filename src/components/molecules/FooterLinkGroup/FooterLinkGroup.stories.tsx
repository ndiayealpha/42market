import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FooterLinkGroup } from "./FooterLinkGroup";

const meta = {
  title: "Molecules/FooterLinkGroup",
  component: FooterLinkGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof FooterLinkGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Discover: Story = {
  args: {
    title: "Découvrir",
    links: [
      { label: "À propos de 42 markets", href: "/about" },
      { label: "Comment ça marche", href: "/how-it-works" },
      { label: "Nouveautés", href: "/new", tag: "Frais" },
      { label: "Promotions", href: "/promotions" },
    ],
  },
};

export const Support: Story = {
  args: {
    title: "Aide & Support",
    links: [
      { label: "FAQ clients", href: "/faq" },
      { label: "Click collect", href: "/click-collect" },
      { label: "Contactez-nous", href: "/contact" },
      { label: "Signaler un problème", href: "/report" },
    ],
  },
};

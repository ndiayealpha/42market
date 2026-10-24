import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PROFILE_DETAILS, PROFILE_STATS } from "@/src/data/profile.mock";

import { ProfileHeroCard } from "./ProfileHeroCard";

const meta = {
  title: "Profile/ProfileHeroCard",
  component: ProfileHeroCard,
  tags: ["autodocs"],
  args: { name: "Komi Agoua", profile: PROFILE_DETAILS, stats: PROFILE_STATS },
} satisfies Meta<typeof ProfileHeroCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vip: Story = {};

export const NewMemberNonVip: Story = {
  args: {
    profile: { ...PROFILE_DETAILS, loyaltyTier: "none", bio: "Nouveau membre — bio à compléter." },
    stats: { ordersCount: 0, favoritesCount: 0, loyaltyPoints: 0 },
  },
};

export const LongBio: Story = {
  args: {
    profile: {
      ...PROFILE_DETAILS,
      bio: "Une très longue biographie qui devrait être tronquée après deux lignes afin de ne jamais casser la mise en page de la carte, peu importe la longueur du texte saisi par le membre lors de la création de son profil personnel.",
    },
  },
};

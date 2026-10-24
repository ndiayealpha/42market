import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HighlightedText } from "./HighlightedText";

const meta = {
  title: "Atoms/HighlightedText",
  component: HighlightedText,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof HighlightedText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PromoBannerTitle: Story = {
  args: {
    segments: [
      { text: "LoirIvoire propose des " },
      { text: "produits frais", emphasis: "highlight" },
      { text: " chaque jour pour tous" },
    ],
  },
  render: (args) => (
    <div style={{ background: "#1C331E", padding: 24, borderRadius: 16 }}>
      <h2 className="text-2xl font-extrabold" style={{ color: "#fff" }}>
        <HighlightedText {...args} />
      </h2>
    </div>
  ),
};

export const ParcelBannerDate: Story = {
  args: {
    segments: [
      { text: "Départ Saint-Étienne vers le Sénégal prévu le " },
      { text: "12 Août 2026", emphasis: "strong" },
      { text: ". Fin de ramassage le 11 directement au comptoir de l'épicerie." },
    ],
  },
};

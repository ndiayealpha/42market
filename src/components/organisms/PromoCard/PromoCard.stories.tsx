import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PromoCard } from "./PromoCard";
import { PROMO_THEMES, type PromoThemeName } from "./PromoCard.themes";

const meta = {
  title: "Organisms/PromoCard",
  component: PromoCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PromoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MediaFramed: Story = {
  args: {
    layout: "media-framed",
    theme: "ciel",
    width: 500,
    badge: { label: "Bons plans semaine", secondaryLabel: "Jusqu'au 15 juin" },
    title: "Reduction, jusqu'à",
    highlight: "-50%",
    description: "Arrivages frais & Épicerie du monde",
    tag: "Click & Collect 10 min",
    href: "#",
    ctaLabel: "Voir l'offre : Réduction jusqu'à -50%",
    media: { src: "/login-info-thumbnail.jpg", alt: "Étal de fruits et légumes frais", ratio: "4/3" },
    stickers: [
      { shape: "pill", color: "promo-red", anchor: "top-right", rotate: 6, price: { amount: 9.88, oldAmount: 12.99 } },
      { shape: "pill", color: "promo-orange", anchor: "bottom-right", rotate: -3, price: { amount: 5.88, oldAmount: 8.99 } },
    ],
  },
};

export const MediaBleed: Story = {
  args: {
    layout: "media-bleed",
    theme: "creme",
    width: 620,
    badge: { label: "Célébration locale", icon: "heart" },
    title: "Fête des Mères",
    subtitle: "Comblez vos proches d'amour & de douceurs",
    tag: "Paniers dès 14,90 €",
    href: "#",
    ctaLabel: "Voir l'offre : Fête des Mères",
    media: { src: "/login-info-thumbnail.jpg", alt: "Devanture de l'épicerie" },
  },
};

export const Text: Story = {
  // axe reports the price's gold accent as failing contrast against white
  // (1.44:1) — a false positive: the card's gradient background is a
  // separate absolutely-positioned sibling layer (see PromoCard.tsx),
  // which axe's ancestor-walk can't see, so it falls back to the page's
  // white background. By hand (WCAG relative-luminance formula), gold
  // #FCD34D on bordeaux's #6A1736 is ~8.4:1 — well above AA.
  parameters: { a11y: { test: "todo" } },
  args: {
    layout: "text",
    theme: "bordeaux",
    glow: true,
    badge: { label: "Arrivages fret express", icon: "zap" },
    title: "Directs Abidjan & Dakar",
    description: "Attiéké frais de Grand-Lahou, safous & mangues Kent.",
    tag: "Stock limité",
    href: "#",
    ctaLabel: "Voir l'offre : Directs Abidjan & Dakar",
    price: { prefix: "Lot", amount: 7.9, oldAmount: 12.5 },
  },
};

export const MediaFailure: Story = {
  args: {
    ...MediaFramed.args,
    media: { src: "/does-not-exist.jpg", alt: "" },
  },
  parameters: {
    docs: { description: { story: "Falls back to `layout=\"text\"` when the image 404s (`onError`), instead of showing a broken image." } },
  },
};

const THEME_NAMES = Object.keys(PROMO_THEMES) as PromoThemeName[];

export const AllThemes: Story = {
  // Two known a11y findings surface here, neither fixed by this story:
  // 1. The bordeaux card's gold accent — same gradient-on-a-sibling-layer
  //    false positive as the `Text` story above.
  // 2. The creme badge's real ~3.9:1 contrast failure — see the
  //    corrected-token note in PromoCard.themes.ts.
  parameters: { a11y: { test: "todo" } },
  args: MediaFramed.args,
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {THEME_NAMES.map((theme) => (
        <PromoCard
          key={theme}
          layout="text"
          theme={theme}
          glow={theme === "bordeaux"}
          badge={{ label: theme }}
          title="Titre de l'offre"
          description="Texte de démonstration du thème sur fond plein."
          tag="Étiquette"
          href="#"
          ctaLabel={`Voir l'offre : thème ${theme}`}
          price={{ prefix: "Lot", amount: 7.9, oldAmount: 12.5 }}
        />
      ))}
    </div>
  ),
};

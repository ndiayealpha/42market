import type { PromoCardProps } from "@/src/components/organisms/PromoCard/PromoCard";

export interface PromoItem extends PromoCardProps {
  id: string;
}

/**
 * The 6 mockup banners. Adding a 7th is adding an entry here — nothing
 * in PromoCard/PromoSection changes.
 *
 * `href` used to point at `/main/offres/<slug>`, a route that never
 * existed (every card was a dead link). Each now lands on a real page of
 * real matching products: `/main/bons-plans?remise=N` filters the global
 * promos page to products at least N% off (`filterDealsByMinDiscount`,
 * computed from real price/compareAtPrice — never fabricated), N being
 * roughly half the banner's own headline discount, since "jusqu'à X%" is
 * a ceiling, not every product's exact cut. "directs-abidjan-dakar" goes
 * to `/main/nouveaux-arrivages` instead — "arrivages fret express" maps
 * onto that real page more directly than a discount filter would. The 2
 * cards with no discount figure of their own ("fete-des-meres",
 * "pause-fraiche-sirops") link to the plain, unfiltered bons-plans page —
 * still real products with real promos, just not narrowed further.
 *
 * Placeholder notes (no sourced photos for these — see delivery notes):
 * - items 1 and 3 reuse the existing app photo (login-info-thumbnail.jpg)
 *   as a stand-in, not real mockup photography. login-visual.png /
 *   signup-visual.png were tried first but dropped: Next's image
 *   optimizer hangs converting them to WebP (reported separately — not
 *   a PromoCard/PromoSection bug).
 * - item 2's media (souk-des-saveurs.jpg) is the real sourced photo,
 *   supplied as a PNG and converted to JPEG on the way in — same WebP
 *   hang risk as above, since it's also an RGBA PNG.
 * - item 5's media and item 6's description were incomplete in the
 *   mockup itself ("visuel à fournir" / "… (à compléter)") — filled in
 *   reasonably here, flagged for review.
 */
export const PROMO_ITEMS: PromoItem[] = [
  {
    id: "reduction-50",
    layout: "media-framed",
    theme: "ciel",
    width: 600,
    badge: { label: "Bons plans semaine", secondaryLabel: "Jusqu'au 15 juin" },
    title: "Reduction, jusqu'à",
    highlight: "-50%",
    description: "Arrivages frais & Épicerie du monde",
    tag: "Click & Collect 10 min",
    href: "/main/bons-plans?remise=25",
    ctaLabel: "Voir l'offre : Réduction jusqu'à -50%",
    media: { src: "/login-info-thumbnail.jpg", alt: "Étal de fruits et légumes frais", ratio: "4/3" },
    stickers: [
      { shape: "pill", color: "promo-red", anchor: "top-right", rotate: 6, price: { amount: 9.88, oldAmount: 12.99 } },
      { shape: "pill", color: "promo-orange", anchor: "bottom-right", rotate: -3, price: { amount: 5.88, oldAmount: 8.99 } },
    ],
  },
  {
    id: "fete-des-meres",
    layout: "media-bleed",
    theme: "creme",
    width: 760,
    badge: { label: "Célébration locale", icon: "heart" },
    title: "Fête des Mères",
    subtitle: "Comblez vos proches d'amour & de douceurs",
    tag: "Paniers dès 14,90 €",
    href: "/main/bons-plans",
    ctaLabel: "Voir l'offre : Fête des Mères",
    media: { src: "/souk-des-saveurs.jpg", alt: "Devanture de l'épicerie Le Souk des Saveurs" },
  },
  {
    id: "fete-des-saveurs",
    layout: "media-framed",
    theme: "rose",
    width: 640,
    badge: { label: "Festival culinaire 42" },
    title: "Grande Fête des Saveurs",
    subtitle: "Semoules, riz parfumés & sauces",
    tag: "Dès 2 paniers achetés",
    href: "/main/bons-plans?remise=20",
    ctaLabel: "Voir l'offre : Grande Fête des Saveurs",
    media: { src: "/login-info-thumbnail.jpg", alt: "Devanture de l'épicerie Saveurs d'Afrique", ratio: "1/1" },
    stickers: [
      { shape: "circle", color: "promo-red", anchor: "top-left", rotate: -8, value: "-30%", caption: "Remise" },
      { shape: "circle", color: "promo-red", anchor: "top-right", rotate: 8, value: "-40%", caption: "Remise" },
    ],
  },
  {
    id: "directs-abidjan-dakar",
    layout: "text",
    theme: "bordeaux",
    width: 560,
    glow: true,
    badge: { label: "Arrivages fret express", icon: "zap" },
    title: "Directs Abidjan & Dakar",
    description: "Attiéké frais de Grand-Lahou, safous & mangues Kent.",
    tag: "Stock limité",
    href: "/main/nouveaux-arrivages",
    ctaLabel: "Voir l'offre : Directs Abidjan & Dakar",
    price: { prefix: "Lot", amount: 7.9, oldAmount: 12.5 },
  },
  {
    id: "pause-fraiche-sirops",
    layout: "media-framed",
    theme: "pistache",
    badge: { label: "Spécial été 2026", icon: "glass" },
    title: "Pause Fraîche & Sirops",
    subtitle: "Jus de Bissap exotiques",
    tag: "100% Artisanal",
    href: "/main/bons-plans",
    ctaLabel: "Voir l'offre : Pause Fraîche & Sirops",
    media: { src: "/login-info-thumbnail.jpg", alt: "Boissons fraîches et sirops artisanaux", ratio: "4/3" },
  },
  {
    id: "ventes-flash",
    layout: "text",
    theme: "pierre",
    badge: { label: "Anti-gaspi 42", icon: "leaf" },
    title: "Ventes Flash Courtes",
    description: "Sauvez de savoureux invendus avant la fermeture de vos commerçants.",
    tag: "-60% MAX",
    href: "/main/bons-plans?remise=30",
    ctaLabel: "Voir l'offre : Ventes Flash Courtes",
  },
];

export const PROMO_SECTION_CONTENT = {
  kicker: "Bons plans du quartier & Arrivages",
  title: "Offres en cours & Arrivages",
  seeAll: { label: "Voir tout", href: "/main/bons-plans" },
  hint: "Glissez horizontalement pour parcourir les bannières promotionnelles",
  totalCount: 20,
};

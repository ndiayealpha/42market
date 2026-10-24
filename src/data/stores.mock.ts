import type { Store } from "@/src/domain/store";
import { routes } from "@/src/lib/routing/routes";

/**
 * No sourced photos exist for these fictional stores, so thumbnails reuse
 * existing app assets as stand-ins (same approach as PromoSection.data.ts)
 * — `souk-des-saveurs.jpg` is the one genuinely-matching photo (same name
 * as the real épicerie used elsewhere); everything else is a placeholder.
 */

/** Section 1 — "Épiceries près de vous". Order matters: not pre-sorted, sorting is the repository's job. */
export const NEARBY_STORES: Store[] = [
  {
    id: "loirivoire",
    href: routes.main.epicerieDetail("loirivoire"),
    name: "LoirIvoire",
    image: { src: "/login-info-thumbnail.jpg", alt: "LoirIvoire", fit: "cover" },
    rating: 4.9,
    distanceMeters: 600,
    status: { kind: "open" },
    description: "Spécialités Côte d'Ivoire & Afrique de l'Ouest",
    pickupMinutes: 10,
    promo: { label: "-10% sur les en-cas", icon: "🎫", tone: "pink" },
  },
  {
    id: "nimba-market",
    href: routes.main.epicerieDetail("nimba-market"),
    name: "Nimba Market",
    image: { src: "/logo-mark.svg", alt: "Nimba Market", fit: "contain" },
    rating: 4.8,
    distanceMeters: 450,
    status: { kind: "closed", opensAt: "14h" },
    description: "Épicerie guinéenne, farines, poissons séchés",
    pickupMinutes: 10,
    promo: { label: "-20% surgelés", icon: "🎫", tone: "gold" },
  },
  {
    id: "abidjan-market",
    href: routes.main.epicerieDetail("abidjan-market"),
    name: "Abidjan market",
    image: { src: "/login-visual.jpg", alt: "Abidjan market", fit: "cover" },
    rating: 4.6,
    distanceMeters: 1000,
    status: { kind: "open" },
    description: "Étal de fruits exotiques et tubercules frais",
    pickupMinutes: 15,
    promo: { label: "-50% les feuilles fraiches", icon: "🎫", tone: "danger" },
  },
];

/** Section 2 — "Épiceries de la ville". */
export const CITY_STORES: Store[] = [
  {
    id: "souk-des-saveurs",
    href: routes.main.epicerieDetail("souk-des-saveurs"),
    name: "Souk des saveurs",
    image: { src: "/souk-des-saveurs.jpg", alt: "Souk des saveurs", fit: "cover" },
    rating: 4.9,
    distanceMeters: 2100,
    status: { kind: "open" },
    description: "Épices en vrac, olives & fruits confits",
    pickupMinutes: 20,
    promo: { label: "50 Articles en promo -20%", icon: "🔥", tone: "danger" },
  },
  {
    id: "saveurs-dafrique",
    href: routes.main.epicerieDetail("saveurs-dafrique"),
    name: "Saveurs d'Afrique",
    image: { src: "/login-visual.jpg", alt: "Saveurs d'Afrique", fit: "cover" },
    rating: 4.8,
    distanceMeters: 1200,
    status: { kind: "open" },
    description: "Poissons fumés, saka-saka & riz jasmin",
    pickupMinutes: 10,
    promo: { label: "Offre du jour", icon: "✨", tone: "cream" },
  },
  {
    id: "elikya-market",
    href: routes.main.epicerieDetail("elikya-market"),
    name: "Elikya Market",
    image: { src: "/login-info-thumbnail.jpg", alt: "Elikya Market", fit: "cover" },
    rating: 4.7,
    distanceMeters: 3400,
    status: { kind: "open" },
    description: "Kwanga authentique, pondu frais & manioc",
    pickupMinutes: 15,
    promo: { label: "Livraison offerte", icon: "🚚", tone: "success" },
  },
  {
    id: "naija-markets",
    href: routes.main.epicerieDetail("naija-markets"),
    name: "Naija Markets",
    image: { src: "/login-info-thumbnail.jpg", alt: "Naija Markets", fit: "cover" },
    rating: 4.9,
    distanceMeters: 850,
    status: { kind: "open" },
    description: "Huile rouge, gari blanc, épices suya & yam",
    pickupMinutes: 10,
    promo: { label: "Dernières heures", icon: "✨", tone: "orange" },
  },
  {
    id: "marche-gouro",
    href: routes.main.epicerieDetail("marche-gouro"),
    name: "Marché Gouro",
    image: { src: "/login-info-thumbnail.jpg", alt: "Marché Gouro", fit: "cover" },
    rating: 4.8,
    distanceMeters: 1500,
    status: { kind: "open" },
    description: "Attiéké traditionnel, piments frais & gombos",
    pickupMinutes: 15,
    promo: { label: "40 articles en promo", icon: "🎫", tone: "wine" },
  },
  {
    id: "epicerie-du-monde",
    href: routes.main.epicerieDetail("epicerie-du-monde"),
    name: "Épicerie du Monde",
    image: { src: "/login-info-thumbnail.jpg", alt: "Épicerie du Monde", fit: "cover" },
    rating: 4.9,
    distanceMeters: 2700,
    status: { kind: "open" },
    description: "Produits d'Asie, Caraïbes & Amérique Latine",
    pickupMinutes: 20,
    promo: { label: "-20%", icon: "🔥", tone: "danger" },
  },
];

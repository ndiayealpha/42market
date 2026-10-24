import type { SearchCampaign, SearchStoreGroup } from "@/src/domain/search";
import type { SearchResultProduct } from "@/src/domain/product-cards";
import { PRODUCTS_TOTAL_COUNT } from "@/src/data/catalog.mock";
import { STORE_DETAIL } from "@/src/data/store-detail.mock";
import { routes } from "@/src/lib/routing/routes";
import { formatDistance } from "@/src/lib/format";

/**
 * Reference fixture for Page R — the query "Bananes Plantains" in
 * Saint-Étienne. Terms a free-text query must contain (normalized,
 * lower-cased) to match this fixture; anything else drives the empty
 * state (see `search.repository.ts`).
 */
export const SEARCH_MATCHABLE_TERMS = ["banane", "plantain"];

export const SEARCH_QUERY = "Bananes Plantains";
export const SEARCH_CITY_LABEL = "Saint-Étienne";

/**
 * 38 results city-wide, but only 3 of this city's 4 active partner stores
 * actually matched a product (the 4th matched 0 — per `search.ts`'s own
 * doc comment, "a group with no product is omitted"). `totalStoresWithResults`
 * is read here as the city-wide active-partner-store count the header copy
 * wants ("4 épiceries partenaires actives à Saint-Étienne"), not literally
 * `groups.length` (3) — see the compte-rendu for why this isn't forced into
 * a false equality.
 */
export const SEARCH_TOTAL_RESULTS = 38;
export const SEARCH_TOTAL_STORES_WITH_RESULTS = 4;

const LOIRIVOIRE_SLUG = "loirivoire";
const NIMBA_SLUG = "nimba-market";
const ABIDJAN_SLUG = "abidjan-market";

const LOIRIVOIRE_PRODUCTS: SearchResultProduct[] = [
  {
    id: "search-bananes-plantain-vertes",
    slug: "bananes-plantain-vertes",
    name: "Bananes Plantain Vertes",
    packagingLabel: "le régime (approx. 1,2kg)",
    price: 2.5,
    image: { src: "/login-info-thumbnail.jpg", alt: "Bananes Plantain Vertes" },
    storeSlug: LOIRIVOIRE_SLUG,
    storeName: "LoirIvoire Épicerie Fine",
    isOutOfStock: false,
    badge: { kind: "discount", percent: 15 },
    annotation: { kind: "compareAt", amount: 2.95 },
  },
  {
    id: "search-bananes-plantain-mures",
    slug: "bananes-plantain-mures",
    name: "Bananes Plantain Mûres",
    packagingLabel: "la botte de 4 pièces",
    price: 2.2,
    image: { src: "/terroir-senegal-market.jpg", alt: "Bananes Plantain Mûres" },
    storeSlug: LOIRIVOIRE_SLUG,
    storeName: "LoirIvoire Épicerie Fine",
    isOutOfStock: false,
    badge: { kind: "bio" },
    annotation: { kind: "inStock" },
  },
  {
    id: "search-chips-plantain-artisanales",
    slug: "chips-plantain-artisanales",
    name: "Chips de Plantain Artisanales",
    packagingLabel: "sachet 150g",
    price: 3.4,
    image: { src: "/souk-des-saveurs.jpg", alt: "Chips de Plantain Artisanales" },
    storeSlug: LOIRIVOIRE_SLUG,
    storeName: "LoirIvoire Épicerie Fine",
    isOutOfStock: false,
    badge: { kind: "label", text: "Nouveau" },
    annotation: { kind: "unitPrice", label: "22,70 €/kg" },
    editorialTag: "Fait maison",
  },
  {
    id: "search-farine-plantain-bio",
    slug: "farine-plantain-bio",
    name: "Farine de Plantain Bio",
    packagingLabel: "sachet 500g",
    price: 4.6,
    image: { src: "/terroir-mali-market.jpg", alt: "Farine de Plantain Bio" },
    storeSlug: LOIRIVOIRE_SLUG,
    storeName: "LoirIvoire Épicerie Fine",
    isOutOfStock: false,
    annotation: { kind: "compareAt", amount: 5.2 },
    editorialTag: "Sans gluten",
  },
  {
    id: "search-plantain-mur-a-frire",
    slug: "plantain-mur-a-frire",
    name: "Plantain Mûr à Frire",
    packagingLabel: "la pièce",
    price: 0.95,
    image: { src: "/offer-attieke-frais.jpg", alt: "Plantain Mûr à Frire" },
    storeSlug: LOIRIVOIRE_SLUG,
    storeName: "LoirIvoire Épicerie Fine",
    isOutOfStock: true,
    badge: { kind: "discount", percent: 10 },
  },
  {
    id: "search-alloco-surgele",
    slug: "alloco-surgele",
    name: "Alloco Surgelé (Plantain Frit)",
    packagingLabel: "sachet 400g",
    price: 3.9,
    image: { src: "/offer-riz-royal-lion.jpg", alt: "Alloco Surgelé (Plantain Frit)" },
    storeSlug: LOIRIVOIRE_SLUG,
    storeName: "LoirIvoire Épicerie Fine",
    isOutOfStock: false,
    badge: { kind: "label", text: "Prêt à cuire" },
    annotation: { kind: "inStock" },
    editorialTag: "Coup de cœur",
  },
];

const NIMBA_PRODUCTS: SearchResultProduct[] = [
  {
    id: "search-plantains-verts-vrac",
    slug: "plantains-verts-vrac",
    name: "Bananes Plantains Vertes en Vrac",
    packagingLabel: "au kilo",
    price: 2.1,
    image: { src: "/login-info-thumbnail.jpg", alt: "Bananes Plantains Vertes en Vrac" },
    storeSlug: NIMBA_SLUG,
    storeName: "Nimba Market & Services",
    isOutOfStock: false,
    annotation: { kind: "unitPrice", label: "2,10 €/kg" },
  },
  {
    id: "search-plantains-jaunes",
    slug: "plantains-jaunes",
    name: "Bananes Plantains Jaunes",
    packagingLabel: "le lot de 3",
    price: 1.8,
    image: { src: "/terroir-senegal-market.jpg", alt: "Bananes Plantains Jaunes" },
    storeSlug: NIMBA_SLUG,
    storeName: "Nimba Market & Services",
    isOutOfStock: false,
    badge: { kind: "discount", percent: 5 },
  },
  {
    id: "search-plantains-calibre-xl",
    slug: "plantains-calibre-xl",
    name: "Gros Plantains Calibre XL",
    packagingLabel: "la pièce",
    price: 1.2,
    image: { src: "/souk-des-saveurs.jpg", alt: "Gros Plantains Calibre XL" },
    storeSlug: NIMBA_SLUG,
    storeName: "Nimba Market & Services",
    isOutOfStock: false,
  },
  {
    id: "search-plantain-bio-direct",
    slug: "plantain-bio-direct-producteur",
    name: "Plantain Vert Bio Direct Producteur",
    packagingLabel: "le régime",
    price: 2.9,
    image: { src: "/terroir-mali-market.jpg", alt: "Plantain Vert Bio Direct Producteur" },
    storeSlug: NIMBA_SLUG,
    storeName: "Nimba Market & Services",
    isOutOfStock: false,
    badge: { kind: "bio" },
  },
  {
    id: "search-lot-6-plantains",
    slug: "lot-6-plantains",
    name: "Lot de 6 Plantains",
    packagingLabel: "le lot",
    price: 3.3,
    image: { src: "/offer-attieke-frais.jpg", alt: "Lot de 6 Plantains" },
    storeSlug: NIMBA_SLUG,
    storeName: "Nimba Market & Services",
    isOutOfStock: false,
    annotation: { kind: "compareAt", amount: 3.9 },
  },
  {
    id: "search-plantains-a-cuire",
    slug: "plantains-a-cuire",
    name: "Plantains à Cuire",
    packagingLabel: "le régime",
    price: 2.4,
    image: { src: "/offer-riz-royal-lion.jpg", alt: "Plantains à Cuire" },
    storeSlug: NIMBA_SLUG,
    storeName: "Nimba Market & Services",
    isOutOfStock: false,
    badge: { kind: "label", text: "Arrivage" },
  },
];

const ABIDJAN_PRODUCTS: SearchResultProduct[] = [
  {
    id: "search-plantains-verts-marche",
    slug: "plantains-verts-marche",
    name: "Plantains Verts du Marché",
    packagingLabel: "le régime",
    price: 2.0,
    image: { src: "/login-info-thumbnail.jpg", alt: "Plantains Verts du Marché" },
    storeSlug: ABIDJAN_SLUG,
    storeName: "Abidjan Market",
    isOutOfStock: false,
    badge: { kind: "discount", percent: 20 },
  },
  {
    id: "search-plantains-murs-prets",
    slug: "plantains-murs-prets-a-cuisiner",
    name: "Plantains Mûrs Prêts à Cuisiner",
    packagingLabel: "le lot de 4",
    price: 2.6,
    image: { src: "/terroir-senegal-market.jpg", alt: "Plantains Mûrs Prêts à Cuisiner" },
    storeSlug: ABIDJAN_SLUG,
    storeName: "Abidjan Market",
    isOutOfStock: false,
  },
  {
    id: "search-farine-plantain-traditionnelle",
    slug: "farine-plantain-traditionnelle",
    name: "Farine de Plantain Traditionnelle",
    packagingLabel: "sac 1kg",
    price: 5.9,
    image: { src: "/terroir-mali-market.jpg", alt: "Farine de Plantain Traditionnelle" },
    storeSlug: ABIDJAN_SLUG,
    storeName: "Abidjan Market",
    isOutOfStock: false,
    badge: { kind: "label", text: "Spécialité" },
  },
  {
    id: "search-plantains-geants-import",
    slug: "plantains-geants-import",
    name: "Plantains Géants Import Côte d'Ivoire",
    packagingLabel: "la pièce",
    price: 1.5,
    image: { src: "/souk-des-saveurs.jpg", alt: "Plantains Géants Import Côte d'Ivoire" },
    storeSlug: ABIDJAN_SLUG,
    storeName: "Abidjan Market",
    isOutOfStock: false,
    annotation: { kind: "inStock" },
  },
];

/**
 * Sorted ascending by distance (Nimba < LoirIvoire < Abidjan) so the
 * "distance" sort option — a no-op pass-through in `sortSearchGroups` —
 * already returns a coherent order, instead of reproducing the maquette's
 * own "0,6 km before 0,45 km" inconsistency. LoirIvoire reuses the one
 * canonical distance already established for it elsewhere in the app
 * (`STORE_DETAIL.distanceKm`, 1.2 km) rather than inventing a new figure.
 */
export const SEARCH_GROUPS: SearchStoreGroup[] = [
  {
    slug: NIMBA_SLUG,
    name: "Nimba Market & Services",
    rating: { average: 4.8 },
    pickupLabel: "Retrait garanti sous 30 min • Ouvert jusqu'à 20h00",
    distanceLabel: formatDistance(900),
    highlight: { kind: "neutral", text: "Pas de majoration de prix • Prix direct étal" },
    resultsLink: {
      kind: "search",
      foundCount: 8,
      href: `${routes.main.search}?q=${encodeURIComponent(SEARCH_QUERY)}&epicerie=${NIMBA_SLUG}`,
    },
    products: NIMBA_PRODUCTS,
  },
  {
    slug: LOIRIVOIRE_SLUG,
    name: "LoirIvoire Épicerie Fine",
    rating: { average: STORE_DETAIL.rating.average, reviewCount: STORE_DETAIL.rating.reviewCount },
    pickupLabel: "Click & Collect prêt en 15 min",
    distanceLabel: formatDistance(STORE_DETAIL.distanceKm * 1000),
    highlight: { kind: "promo", text: "-10 € dès 45 € d'achat" },
    resultsLink: {
      kind: "catalog",
      totalCount: PRODUCTS_TOTAL_COUNT,
      href: routes.main.epicerieRayons(LOIRIVOIRE_SLUG),
    },
    products: LOIRIVOIRE_PRODUCTS,
  },
  {
    slug: ABIDJAN_SLUG,
    name: "Abidjan Market",
    rating: { average: 4.6 },
    pickupLabel: "Retrait dès 16h30 aujourd'hui",
    distanceLabel: formatDistance(1600),
    highlight: { kind: "tagline", text: "Spécialiste féculents, ignames & plantains en vrac" },
    resultsLink: {
      kind: "aisle",
      aisleLabel: "Voir le rayon Féculents",
      href: routes.main.epicerieRayon(ABIDJAN_SLUG, "feculents"),
    },
    products: ABIDJAN_PRODUCTS,
  },
];

/**
 * LoirIvoire's sponsored campaign. `ctaHref` points at the store's own
 * bons-plans page (not its generic detail page) — a cart-ready "-20%"
 * offer reads more naturally landing on the deals list than the overview.
 */
export const SEARCH_CAMPAIGN: SearchCampaign = {
  storeSlug: LOIRIVOIRE_SLUG,
  storeName: "LoirIvoire Épicerie Fine",
  title: "Festival des Saveurs Tropicales",
  body: "Du 1er au 15 novembre, profitez de -20% sur votre panier sur toute commande livrée par notre circuit Fret Express Abidjan & Dakar.",
  highlightedPhrase: "-20% sur votre panier",
  code: "PLANTAIN20",
  ctaLabel: "En profiter →",
  ctaHref: routes.main.epicerieBonsPlans(LOIRIVOIRE_SLUG),
};

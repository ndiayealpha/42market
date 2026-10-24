import type { StoreDetailWithContact } from "@/src/domain/store-detail";
import type {
  BestSeller,
  Category,
  LimitedStockItem,
  Offer,
  PromoBannerContent,
  SponsoredParcel,
} from "@/src/domain/store-merchandising";
import { routes } from "@/src/lib/routing/routes";

const STORE_SLUG = "loirivoire";

/**
 * LoirIvoire only — this is the one store Main.png actually details. Per
 * product decision, the other 8 catalog stores are not wired to this
 * page yet (no maquette for them).
 *
 * Known discrepancies with the lightweight catalog fixture
 * (`stores.mock.ts`), both left as-is (Main.png is the source of truth
 * *for this page*; the catalog card is a separate, pre-existing fixture
 * — rule 1, don't touch it): rating 4.8/124 avis here vs 4.9 there;
 * distance 1,2 km here vs 600 m there.
 *
 * No photos exist for any of these products — every image reuses
 * existing app assets as placeholders (see individual comments).
 * Opening hours and phone number aren't shown in the maquette beyond
 * "Ferme à 19h30" — the rest of the week is a plausible invention,
 * flagged here rather than silently presented as real data.
 */
export const STORE_DETAIL: StoreDetailWithContact = {
  id: "loirivoire",
  name: "LoirIvoire",
  isIndependent: true,
  rating: { average: 4.8, reviewCount: 124 },
  distanceKm: 1.2,
  phone: "04 77 32 18 40", // not shown in the maquette — plausible placeholder
  address: { street: "32 rue des docteurs Charcot", city: "Saint-Étienne" },
  // Only Monday→Saturday, 08:00–19:30 is confirmed by the maquette ("Ferme à 19h30");
  // Sunday-closed is a plausible invention, not shown.
  openingHours: {
    mon: { open: "08:00", close: "19:30" },
    tue: { open: "08:00", close: "19:30" },
    wed: { open: "08:00", close: "19:30" },
    thu: { open: "08:00", close: "19:30" },
    fri: { open: "08:00", close: "19:30" },
    sat: { open: "08:00", close: "19:30" },
  },
  // Baked-in "15 min" badge (Background_Border.png) — not masked, the
  // real badge is rendered in HTML on top; see "assets à remplacer".
  image: { src: "/store-header-tomatoes.jpg", alt: "LoirIvoire" },
};

/**
 * Shared by the rail (C2), the promo filter bar's rayon chips and the
 * promo section titles (`promoSectionTitle`) — one source, not three
 * near-duplicate strings (rule 12 #4). Hrefs now resolve to the real
 * "tous les rayons" / "bons plans" routes instead of "#".
 */
export const CATEGORIES: Category[] = [
  {
    id: "bons-plans",
    label: "Bons plans",
    hint: "Deals de l'épicerie",
    variant: "deals",
    href: routes.main.epicerieBonsPlans(STORE_SLUG),
    image: { alt: "Bons plans" },
  },
  {
    id: "fruits",
    label: "Fruits",
    hint: "Mangues, pêches...",
    promoSectionTitle: "Fruits & tubercules",
    variant: "default",
    href: routes.main.epicerieRayon(STORE_SLUG, "fruits"),
    image: { alt: "Fruits" },
  },
  {
    id: "epices",
    label: "Épices",
    hint: "Mélanges & Poivres",
    promoSectionTitle: "Épices & condiments",
    variant: "default",
    href: routes.main.epicerieRayon(STORE_SLUG, "epices"),
    image: { alt: "Épices" },
  },
  {
    id: "feculents",
    label: "Féculents",
    hint: "Plantains, ignames...",
    promoSectionTitle: "Féculents & Céréales",
    variant: "default",
    href: routes.main.epicerieRayon(STORE_SLUG, "feculents"),
    image: { alt: "Féculents" },
  },
  {
    id: "viandes",
    label: "Viandes",
    hint: "Bœuf, volaille halal",
    variant: "default",
    href: routes.main.epicerieRayon(STORE_SLUG, "viandes"),
    image: { alt: "Viandes" },
  },
  {
    id: "epicerie-fine",
    label: "Épicerie fine",
    hint: "Miels & Sauces",
    variant: "default",
    href: routes.main.epicerieRayon(STORE_SLUG, "epicerie-fine"),
    image: { alt: "Épicerie fine" },
  },
  {
    id: "boissons",
    label: "Boissons",
    hint: "Bissap, gingembre",
    promoSectionTitle: "Boissons et jus",
    variant: "default",
    href: routes.main.epicerieRayon(STORE_SLUG, "boissons"),
    image: { alt: "Boissons" },
  },
  {
    id: "legumes",
    label: "Légumes",
    hint: "Gombos, carottes",
    variant: "default",
    href: routes.main.epicerieRayon(STORE_SLUG, "legumes"),
    image: { alt: "Légumes" },
  },
];

export const OFFERS: Offer[] = [
  {
    id: "panier-solidaire",
    kind: "basket",
    title: "Panier Solidaire",
    badge: "-37% Solidaire",
    price: { amount: 20.0, compareAt: 32.0 },
    approxWeightKg: 6,
    sellerName: "LoirIvoire",
    allBasketsHref: "#", // TODO: no "all baskets" route exists yet
    image: { src: "/login-info-thumbnail.jpg", alt: "Panier Solidaire, -6 kg LoirIvoire" },
  },
  {
    id: "attieke-frais-abidjan",
    kind: "product",
    title: "Attiéké Frais d'Abidjan sous vide (500g)",
    badge: "3 pour 5,00 €",
    price: { amount: 1.9, weightGrams: 500 },
    image: { src: "/offer-attieke-frais.jpg", alt: "Attiéké Frais d'Abidjan sous vide (500g)" },
  },
  {
    id: "gombo-frais",
    kind: "product",
    title: "Gombo Frais Extra Tendre (400g)",
    badge: "2 pour 3,20 €",
    price: { amount: 1.85, weightGrams: 400 },
    image: { src: "/login-info-thumbnail.jpg", alt: "Gombo Frais Extra Tendre (400g)" },
  },
  {
    id: "igname-pona",
    kind: "product",
    title: "Igname Pona Blanche Fraîche Ghana (1 kg)",
    badge: "-25% Flash",
    price: { amount: 3.2, compareAt: 4.25 },
    image: { src: "/login-info-thumbnail.jpg", alt: "Igname Pona Blanche Fraîche Ghana (1 kg)" },
  },
  {
    id: "riz-royal-lion-5kg",
    kind: "product",
    title: "Riz Parfumé Brisé Tiep Royal Lion (Format Éco 5 kg)",
    badge: "Format Éco 5kg",
    price: { amount: 8.9, weightGrams: 5000 },
    image: { src: "/offer-riz-royal-lion.jpg", alt: "Riz Parfumé Brisé Tiep Royal Lion, format éco 5 kg" },
  },
  {
    id: "piments-habanero",
    kind: "product",
    title: "Piments Habanero Frais 'Bec d'Oiseau' (150g)",
    badge: "3 pour 2,70 €",
    price: { amount: 1.1, weightGrams: 150 },
    image: { src: "/login-info-thumbnail.jpg", alt: "Piments Habanero Frais 'Bec d'Oiseau' (150g)" },
  },
];

export const OFFERS_TOTAL_COUNT = 25;
export const OFFERS_UPDATED_AT_ISO = "2026-08-12T08:30:00Z";
export const OFFERS_STOCKED_STORE_COUNT = 4;

export const LIMITED_STOCK_ITEMS: LimitedStockItem[] = [
  {
    id: "carottes-nouvelles",
    name: "Carottes Nouvelles Maraîchères",
    subtitle: "La botte croquante 500g",
    price: 2.5,
    status: "in-stock",
    remaining: 4,
    // Baked-in "En stock (4 restants)" badge (Margin.png) — not masked, see "assets à remplacer".
    image: { src: "/stock-carrots.jpg", alt: "Carottes Nouvelles Maraîchères" },
  },
  {
    id: "fraises-chaudron",
    name: "Fraises au chaudron",
    subtitle: "Pot d'exception 250g",
    price: 4.8,
    status: "in-stock",
    remaining: 2,
    // Baked-in "En stock (2 restants)" badge (Margin__1_.png) — not masked, see "assets à remplacer".
    image: { src: "/stock-strawberry-jam.jpg", alt: "Fraises au chaudron" },
  },
  {
    id: "avocat-hass-bio",
    name: "Avocat Hass Bio Calibre 12",
    subtitle: "La pièce • Réapprovisionnement mardi",
    price: 1.9,
    status: "out-of-stock",
    // Main.png shows an unrelated desk photo here — a maquette error, use the neutral placeholder instead.
    image: { alt: "Avocat Hass Bio Calibre 12" },
  },
  {
    id: "attieke-frais-dernier-lot",
    name: "Attiéké Frais d'Abidjan",
    subtitle: "Semoule de manioc cuite 1kg",
    price: 3.2,
    status: "arrived-today",
    image: { src: "/offer-attieke-frais.jpg", alt: "Attiéké Frais d'Abidjan, semoule de manioc cuite" },
  },
];

export const BEST_SELLERS: BestSeller[] = [
  { id: "piment-scotch-bonnet", rank: 1, name: "Piment Scotch Bonnet", price: 1.5, unitLabel: "100g", image: { src: "/login-info-thumbnail.jpg", alt: "Piment Scotch Bonnet" } },
  { id: "grenailles-loire", rank: 2, name: "Grenailles de la Loire", price: 2.2, unitLabel: "le filet", image: { src: "/login-info-thumbnail.jpg", alt: "Grenailles de la Loire" } },
  { id: "bissap-maison-menthe", rank: 3, name: "Bissap Maison Menthe", price: 3.5, unitLabel: "1L", image: { src: "/login-info-thumbnail.jpg", alt: "Bissap Maison Menthe" } },
  { id: "huile-palme-pure", rank: 4, name: "Huile de Palme Pure", price: 4.2, unitLabel: "500ml", image: { src: "/login-info-thumbnail.jpg", alt: "Huile de Palme Pure" } },
];

export const SPONSORED_PARCEL: SponsoredParcel = {
  origin: "Saint-Étienne",
  destination: "Sénégal",
  departureDate: "2026-08-12",
  pickupDeadline: "2026-08-11",
  href: "#", // TODO: no "parcel departures" route exists yet
};

export const PROMO_BANNER: PromoBannerContent = {
  badge: "BIO | -15% de réduction",
  title: [
    { text: "LoirIvoire propose des " },
    { text: "produits frais", emphasis: "highlight" },
    { text: " chaque jour pour tous" },
  ],
  body: "Soutenez l'économie de proximité en commandant les paniers mixtes de votre épicier de quartier. Légumes cueillis à maturité, produits tropicaux certifiés et sélection responsable.",
  ctaLabel: "Découvrir le rayon maraîcher",
  ctaHref: "#", // TODO: no "rayon maraîcher" route exists yet
  image: { src: "/promo-banner-market.jpg", alt: "Étal de fruits et légumes variés" },
};

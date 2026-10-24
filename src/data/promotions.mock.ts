import type { FlashSale, PromoCategorySectionData, PromoProduct, PromoScopeOption, StorePromoSummary } from "@/src/domain/promotions";
import type { TrustItemConfig } from "@/src/components/organisms/Footer/Footer.types";

export const FLASH_SALE: FlashSale = { endsAtIso: "2026-11-10T20:00:00+01:00" };

export const PROMO_SCOPE_OPTIONS: PromoScopeOption[] = [
  { slug: "loirivoire", name: "LoirIvoire" },
  { slug: "nimba-market", name: "Nimba Market" },
  { slug: "abidjan-market", name: "Abidjan market" },
  { slug: "souk-des-saveurs", name: "Souk des saveurs" },
  { slug: "saveurs-dafrique", name: "Saveurs d'Afrique" },
];

const FEATURED_PROMO_PRODUCTS_BASE: PromoProduct[] = [
  { id: "promo-bananes-plantain-aloco", slug: "bananes-plantain-aloco", name: "Bananes Plantain Mûres d'Aloco", packagingLabel: "1kg", price: 1.8, compareAtPrice: 2.5, badge: { kind: "percent", percent: 28 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Bananes Plantain Mûres d'Aloco" } },
  { id: "promo-sac-riz-parfume-5kg", slug: "sac-riz-parfume-5kg", name: "Sac de Riz Parfumé Brisé 5kg", packagingLabel: "5 kg", price: 7.9, compareAtPrice: 10.5, badge: { kind: "percent", percent: 25 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "nimba-market", storeName: "Nimba Market", image: { src: "/offer-riz-royal-lion.jpg", alt: "Sac de Riz Parfumé Brisé 5kg" } },
  { id: "promo-huile-palme-rouge-1l", slug: "huile-palme-rouge-1l", name: "Huile de Palme Rouge Pure 1L", packagingLabel: "1 Litre", price: 3.2, compareAtPrice: 4.5, badge: { kind: "multibuy", quantity: 2, price: 6 }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/login-info-thumbnail.jpg", alt: "Huile de Palme Rouge Pure 1L" } },
  { id: "promo-gombos-selection-extra", slug: "gombos-selection-extra", name: "Gombos Frais Sélection Extra", packagingLabel: "500g", price: 3.4, compareAtPrice: 4.8, badge: { kind: "percent", percent: 29 }, aisleSlug: "legumes", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-visual.jpg", alt: "Gombos Frais Sélection Extra" } },
  { id: "promo-piment-habanero-antilles", slug: "piment-habanero-antilles", name: "Piment Habanero Rouge des Antilles", packagingLabel: "Barquette 150g", price: 1.5, compareAtPrice: 2.2, badge: { kind: "percent", percent: 32 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "abidjan-market", storeName: "Abidjan market", image: { src: "/offer-attieke-frais.jpg", alt: "Piment Habanero Rouge des Antilles" } },
  { id: "promo-manioc-frais-cameroun", slug: "manioc-frais-cameroun", name: "Manioc Frais du Cameroun", packagingLabel: "1kg", price: 2.1, compareAtPrice: 3.0, badge: { kind: "percent", percent: 30 }, aisleSlug: "legumes", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/login-visual.jpg", alt: "Manioc Frais du Cameroun" } },
  // The 4 above mix 4 different stores (by design, for the home page's cross-store carousel). These 4 are LoirIvoire-only, so this same
  // array still fills a full 6-up row on LoirIvoire's own "Sélection en vedette" (now correctly scoped to one store, see compte-rendu).
  { id: "promo-riz-parfume-jasmin-2kg", slug: "riz-parfume-jasmin-2kg", name: "Riz Parfumé Jasmin 2kg", packagingLabel: "2 kg", price: 3.5, compareAtPrice: 4.8, badge: { kind: "percent", percent: 27 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-riz-royal-lion.jpg", alt: "Riz Parfumé Jasmin 2kg" } },
  { id: "promo-piment-vert-antillais", slug: "piment-vert-antillais", name: "Piment Vert Antillais", packagingLabel: "Barquette 150g", price: 1.6, compareAtPrice: 2.2, badge: { kind: "percent", percent: 27 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/souk-des-saveurs.jpg", alt: "Piment Vert Antillais" } },
  { id: "promo-jus-gingembre-frais-1l", slug: "jus-gingembre-frais-1l", name: "Jus de Gingembre Frais 1L", packagingLabel: "1 Litre", price: 2.4, compareAtPrice: 3.2, badge: { kind: "percent", percent: 25 }, aisleSlug: "boissons", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Jus de Gingembre Frais 1L" } },
  { id: "promo-tomates-fraiches-marche", slug: "tomates-fraiches-marche", name: "Tomates Fraîches du Marché", packagingLabel: "1kg", price: 1.9, compareAtPrice: 2.6, badge: { kind: "percent", percent: 27 }, aisleSlug: "legumes", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/promo-banner-market.jpg", alt: "Tomates Fraîches du Marché" } },
];

/** All 6 are flash-sale items — this is the rail the countdown eyebrow (`FlashSale`) sits above (powers the "Ventes Flash" filter chip). */
export const FEATURED_PROMO_PRODUCTS: PromoProduct[] = FEATURED_PROMO_PRODUCTS_BASE.map((product) => ({
  ...product,
  isFlashSale: true,
}));

export const FEATURED_PROMO_TOTAL_COUNT = 48;

export const PROMO_CATEGORY_SECTIONS: PromoCategorySectionData[] = [
  {
    aisleSlug: "fruits",
    title: "Fruits & tubercules",
    chipLabel: "Arrivage ce jeudi",
    subtitle: "Épicerie Loirivoire",
    totalCount: 19,
    products: [
      { id: "promo-igname-blanc-pona", slug: "igname-blanc-pona", name: "Igname Blanc Pona", packagingLabel: "1kg", price: 2.8, compareAtPrice: 3.6, badge: { kind: "multibuy", quantity: 2, price: 5 }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-riz-royal-lion.jpg", alt: "Igname Blanc Pona" } },
      { id: "promo-patates-douces-rouges", slug: "patates-douces-rouges", name: "Patates Douces Rouges", packagingLabel: "1kg", price: 1.95, compareAtPrice: 2.45, badge: { kind: "percent", percent: 20 }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "nimba-market", storeName: "Nimba Market", image: { src: "/offer-attieke-frais.jpg", alt: "Patates Douces Rouges" } },
      { id: "promo-taro-madere-frais", slug: "taro-madere-frais", name: "Taro / Madère Frais", packagingLabel: "1kg", price: 3.1, compareAtPrice: 3.7, badge: { kind: "percent", percent: 15 }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Taro / Madère Frais" } },
      { id: "promo-feuilles-manioc-botte", slug: "feuilles-manioc-botte", name: "Feuilles de Manioc", packagingLabel: "Botte 300g", price: 0.9, compareAtPrice: 1.4, badge: { kind: "multibuy", quantity: 3, price: 2 }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-attieke-frais.jpg", alt: "Feuilles de Manioc" } },
      { id: "promo-papaye-solo-cote-divoire", slug: "papaye-solo-cote-divoire", name: "Papaye Solo de Côte d'Ivoire", packagingLabel: "Pièce (~600g)", price: 2.6, compareAtPrice: 3.6, badge: { kind: "percent", percent: 25 }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "nimba-market", storeName: "Nimba Market", image: { src: "/login-visual.jpg", alt: "Papaye Solo de Côte d'Ivoire" } },
      { id: "promo-gingembre-frais-deterre", slug: "gingembre-frais-deterre", name: "Gingembre Frais Déterré", packagingLabel: "500g", price: 1.6, compareAtPrice: 2.3, badge: { kind: "percent", percent: 30 }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-attieke-frais.jpg", alt: "Gingembre Frais Déterré" } },
      { id: "promo-mangue-kent-mure", slug: "mangue-kent-mure", name: "Mangue Kent Mûre à Point", packagingLabel: "Pièce (~400g)", price: 2.2, compareAtPrice: 2.9, badge: { kind: "percent", percent: 24 }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-visual.jpg", alt: "Mangue Kent Mûre à Point" } },
      { id: "promo-noix-coco-fraiche", slug: "noix-coco-fraiche", name: "Noix de Coco Fraîche", packagingLabel: "Pièce", price: 1.7, compareAtPrice: 2.3, badge: { kind: "percent", percent: 26 }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/souk-des-saveurs.jpg", alt: "Noix de Coco Fraîche" } },
    ],
  },
  {
    aisleSlug: "epices",
    title: "Épices & condiments",
    chipLabel: "Indispensables terroir",
    subtitle: "Épicerie Loirivoire",
    totalCount: 24,
    products: [
      { id: "promo-maniguette-graines", slug: "maniguette-graines", name: "Maniguette (Graines du Paradis)", packagingLabel: "Sachet 100g", price: 3.15, compareAtPrice: 3.85, badge: { kind: "percent", percent: 18 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/offer-attieke-frais.jpg", alt: "Maniguette (Graines du Paradis)" } },
      { id: "promo-poivre-blanc-penja", slug: "poivre-blanc-penja", name: "Poivre Blanc de Penja IGP", packagingLabel: "Pot 80g", price: 5.4, compareAtPrice: 6.9, badge: { kind: "label", text: "Offre IGP" }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/souk-des-saveurs.jpg", alt: "Poivre Blanc de Penja IGP" } },
      { id: "promo-poudre-baobab-bio", slug: "poudre-baobab-bio", name: "Poudre de Baobab Pure Bio", packagingLabel: "200g", price: 4.2, compareAtPrice: 5.4, badge: { kind: "percent", percent: 22 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/offer-riz-royal-lion.jpg", alt: "Poudre de Baobab Pure Bio" } },
      { id: "promo-pate-piment-shito", slug: "pate-piment-shito", name: "Pâte de Piment Shito", packagingLabel: "Bocal 180g", price: 2.3, compareAtPrice: 2.95, badge: { kind: "multibuy", quantity: 2, price: 4 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "abidjan-market", storeName: "Abidjan market", image: { src: "/offer-riz-royal-lion.jpg", alt: "Pâte de Piment Shito" } },
      { id: "promo-soumbala-netetou", slug: "soumbala-netetou", name: "Soumbala / Nététou Naturel", packagingLabel: "150g", price: 1.9, compareAtPrice: 2.25, badge: { kind: "percent", percent: 15 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-visual.jpg", alt: "Soumbala / Nététou Naturel" } },
      { id: "promo-karite-brut-alimentaire", slug: "karite-brut-alimentaire", name: "Karité Brut Alimentaire", packagingLabel: "250g", price: 3.8, compareAtPrice: 5.1, badge: { kind: "percent", percent: 25 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/souk-des-saveurs.jpg", alt: "Karité Brut Alimentaire" } },
      { id: "promo-piment-sec-moulu-fort", slug: "piment-sec-moulu-fort", name: "Piment Sec Moulu Fort", packagingLabel: "Sachet 100g", price: 2.6, compareAtPrice: 3.4, badge: { kind: "percent", percent: 24 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-attieke-frais.jpg", alt: "Piment Sec Moulu Fort" } },
      { id: "promo-gingembre-moulu-pur", slug: "gingembre-moulu-pur", name: "Gingembre Moulu Pur", packagingLabel: "Pot 90g", price: 3.1, compareAtPrice: 3.9, badge: { kind: "percent", percent: 21 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Gingembre Moulu Pur" } },
      { id: "promo-curcuma-frais-rape", slug: "curcuma-frais-rape", name: "Curcuma Frais Râpé", packagingLabel: "200g", price: 2.9, compareAtPrice: 3.7, badge: { kind: "percent", percent: 22 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-visual.jpg", alt: "Curcuma Frais Râpé" } },
    ],
  },
  {
    aisleSlug: "boissons",
    title: "Boissons et jus",
    chipLabel: "100% Artisanal Loire",
    subtitle: "Épicerie Loirivoire",
    totalCount: 16,
    products: [
      { id: "promo-bissap-maison-hibiscus", slug: "bissap-maison-hibiscus", name: "Bissap Maison Hibiscus", packagingLabel: "Bouteille 1L", price: 2.6, compareAtPrice: 3.2, badge: { kind: "multibuy", quantity: 2, price: 5 }, aisleSlug: "boissons", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Bissap Maison Hibiscus" } },
      { id: "promo-gnamakoudji-gingembre", slug: "gnamakoudji-gingembre", name: "Gnamakoudji (Gingembre)", packagingLabel: "1 Litre", price: 2.8, compareAtPrice: 3.6, badge: { kind: "percent", percent: 15 }, aisleSlug: "boissons", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-attieke-frais.jpg", alt: "Gnamakoudji (Gingembre)" } },
      { id: "promo-jus-bouye-pain-singe", slug: "jus-bouye-pain-singe", name: "Jus de Bouye (Pain de Singe)", packagingLabel: "1 Litre", price: 3.2, compareAtPrice: 3.8, badge: { kind: "percent", percent: 20 }, aisleSlug: "boissons", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Jus de Bouye (Pain de Singe)" } },
      { id: "promo-malta-guinness-pack6", slug: "malta-guinness-pack6", name: "Malta Guinness (Pack x6)", packagingLabel: "6 x 33cl", price: 5.5, compareAtPrice: 6.9, badge: { kind: "pack", size: 6 }, aisleSlug: "boissons", isOutOfStock: false, storeSlug: "abidjan-market", storeName: "Abidjan market", image: { src: "/offer-riz-royal-lion.jpg", alt: "Malta Guinness (Pack x6)" } },
      { id: "promo-fleurs-hibiscus-sechees", slug: "fleurs-hibiscus-sechees", name: "Fleurs d'Hibiscus Séchées", packagingLabel: "250g", price: 2.1, compareAtPrice: 2.8, badge: { kind: "percent", percent: 25 }, aisleSlug: "boissons", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/promo-banner-market.jpg", alt: "Fleurs d'Hibiscus Séchées" } },
      { id: "promo-eau-coco-jeune-pure", slug: "eau-coco-jeune-pure", name: "Eau de Coco Jeune Pure", packagingLabel: "500ml", price: 2.2, compareAtPrice: 4.4, badge: { kind: "bogo" }, aisleSlug: "boissons", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/souk-des-saveurs.jpg", alt: "Eau de Coco Jeune Pure" } },
      { id: "promo-jus-tamarin-maison", slug: "jus-tamarin-maison", name: "Jus de Tamarin Maison", packagingLabel: "Bouteille 1L", price: 2.5, compareAtPrice: 3.3, badge: { kind: "percent", percent: 24 }, aisleSlug: "boissons", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/promo-banner-market.jpg", alt: "Jus de Tamarin Maison" } },
    ],
  },
  {
    aisleSlug: "feculents",
    title: "Féculents & Céréales",
    chipLabel: "Gros volumes",
    subtitle: "Épicerie Loirivoire",
    totalCount: 28,
    products: [
      { id: "promo-attieke-frais-abidjan", slug: "attieke-frais-abidjan", name: "Attiéké Frais d'Abidjan", packagingLabel: "350g", price: 1.45, compareAtPrice: 1.9, badge: { kind: "multibuy", quantity: 3, price: 4 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-attieke-frais.jpg", alt: "Attiéké Frais d'Abidjan" } },
      { id: "promo-gari-jaune-superieur", slug: "gari-jaune-superieur", name: "Gari Jaune Supérieur", packagingLabel: "1kg", price: 2.2, compareAtPrice: 2.75, badge: { kind: "percent", percent: 20 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "nimba-market", storeName: "Nimba Market", image: { src: "/promo-banner-market.jpg", alt: "Gari Jaune Supérieur" } },
      { id: "promo-foutou-banane-mix", slug: "foutou-banane-mix", name: "Foutou Banane Mix Farine", packagingLabel: "680g", price: 2.9, compareAtPrice: 3.4, badge: { kind: "percent", percent: 15 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/promo-banner-market.jpg", alt: "Foutou Banane Mix Farine" } },
      { id: "promo-farine-manioc-extra-fine", slug: "farine-manioc-extra-fine", name: "Farine de Manioc Extra Fine", packagingLabel: "500g", price: 1.7, compareAtPrice: 2.4, badge: { kind: "label", text: "Anti-gaspi" }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/login-visual.jpg", alt: "Farine de Manioc Extra Fine" } },
      { id: "promo-chips-plantain-salees", slug: "chips-plantain-salees", name: "Chips de Plantain Salées", packagingLabel: "Lot 3x85g", price: 2.5, compareAtPrice: 3.4, badge: { kind: "lot", size: 3 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-riz-royal-lion.jpg", alt: "Chips de Plantain Salées" } },
      { id: "promo-couscous-mil-traditionnel", slug: "couscous-mil-traditionnel", name: "Couscous de Mil Traditionnel", packagingLabel: "1kg", price: 2.4, compareAtPrice: 3.0, badge: { kind: "percent", percent: 20 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/souk-des-saveurs.jpg", alt: "Couscous de Mil Traditionnel" } },
      { id: "promo-semoule-mais-fine", slug: "semoule-mais-fine", name: "Semoule de Maïs Fine", packagingLabel: "1kg", price: 1.8, compareAtPrice: 2.3, badge: { kind: "percent", percent: 22 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-attieke-frais.jpg", alt: "Semoule de Maïs Fine" } },
      { id: "promo-haricots-rouges-secs", slug: "haricots-rouges-secs", name: "Haricots Rouges Secs", packagingLabel: "1kg", price: 2.0, compareAtPrice: 2.6, badge: { kind: "percent", percent: 23 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Haricots Rouges Secs" } },
      { id: "promo-fonio-precuit-bio", slug: "fonio-precuit-bio", name: "Fonio Précuit Bio", packagingLabel: "500g", price: 3.3, compareAtPrice: 4.1, badge: { kind: "label", text: "Bio" }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-visual.jpg", alt: "Fonio Précuit Bio" } },
    ],
  },
];

/** Rating/address/phone here are the SAME LoirIvoire fixture as the fiche boutique page (`STORE_DETAIL`), not the separate "4,9 (142) / 12 Rue Gambetta" seen on the catalog card — rule 12 incoherence #1: one fixture wins. */
export const STORE_PROMOS: StorePromoSummary[] = [
  {
    slug: "loirivoire",
    name: "LoirIvoire",
    address: "32 rue des docteurs Charcot, 42000 Saint-Étienne",
    storeKindLabel: "Épicerie & Primeur exotique",
    rating: { average: 4.8, reviewCount: 124 },
    pickupMinutes: 15,
    discountLabel: "Jusqu'à -40%",
    itemsOnPromoCount: 45,
    productTags: ["Bananes Plantain", "Tubercules", "Bissap"],
    image: { src: "/store-header-tomatoes.jpg", alt: "LoirIvoire" },
  },
  {
    slug: "abidjan-market",
    name: "Abidjan Market",
    address: "45 Rue de la République, Bellevue",
    storeKindLabel: "Épicerie fine & Condiments",
    rating: { average: 4.8, reviewCount: 98 },
    pickupMinutes: 20,
    discountLabel: "Jusqu'à -35%",
    itemsOnPromoCount: 38,
    productTags: ["Poivre Penja", "Baobab", "Attiéké"],
    image: { src: "/login-visual.jpg", alt: "Abidjan Market" },
  },
  {
    slug: "nimba-market",
    name: "Nimba Market",
    address: "18 Place Carnot, 42000 Saint-Étienne",
    storeKindLabel: "Épicerie Céréales & Féculents",
    rating: { average: 4.7, reviewCount: 112 },
    pickupMinutes: 10,
    discountLabel: "Vente Flash Spéciale",
    itemsOnPromoCount: 29,
    productTags: ["Riz Parfumé", "Fonio", "Farine Manioc"],
    image: { src: "/promo-banner-market.jpg", alt: "Nimba Market" },
  },
];

export const STORES_OPEN_FOR_EXPRESS_PICKUP_COUNT = 5;

/** Page B's cards-variant reassurance band — different copy from the footer's `TRUST_ITEMS` (not a duplicate: these are catalog-specific, the footer's are global). */
export const CATALOG_REASSURANCE_CARDS: TrustItemConfig[] = [
  {
    icon: "basket",
    title: "Garantie Prix Direct Marché",
    description:
      "Prix rigoureusement identiques ou inférieurs aux étals physiques des commerçants du 42. Aucune marge cachée appliquée aux promotions.",
  },
  {
    icon: "zap",
    title: "Retrait Express 15 à 30 min",
    description: "Commandez votre panier remisé en ligne et récupérez-le au comptoir sans frais ni attente de préparation.",
  },
  {
    icon: "leaf",
    title: "Démarche Anti-Gaspillage",
    description:
      "En profitant des dates courtes et surstocks, vous soutenez directement les trésoreries de vos épiceries de quartier indépendantes.",
  },
];

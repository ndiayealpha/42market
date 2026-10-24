import type { Product } from "@/src/domain/catalog";
import type { RecipeKit } from "@/src/domain/recipe-kit";

/**
 * 24 products for "LoirIvoire" — no sourced photos exist for any of
 * these (same situation as `store-detail.mock.ts`), so most reuse
 * existing app assets as stand-ins; "Fleurs de Bissap d'Origine" is
 * deliberately left without an image, exactly as the maquette shows it,
 * to exercise the missing-image placeholder path.
 */
export const PRODUCTS: Product[] = [
  { id: "bananes-plantain-vertes", slug: "bananes-plantain-vertes", name: "Bananes Plantain Vertes", packagingLabel: "le régime (approx. 1,2kg)", price: 2.5, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Bananes Plantain Vertes" } },
  { id: "bananes-douces-mures", slug: "bananes-douces-mures", name: "Bananes Douces Mûres", packagingLabel: "la botte de 5 pièces", price: 2.5, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/terroir-senegal-market.jpg", alt: "Bananes Douces Mûres" } },
  { id: "avocats-hass-selection", slug: "avocats-hass-selection", name: "Avocats Hass Sélection", packagingLabel: "le lot de 2 pièces", price: 2.5, tag: "mur-a-point", aisleSlug: "fruits", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/terroir-mali-market.jpg", alt: "Avocats Hass Sélection" } },
  { id: "piments-antillais-habanero", slug: "piments-antillais-habanero", name: "Piments Antillais Habanero", packagingLabel: "barquette 150g", price: 2.5, tag: "fort", aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-attieke-frais.jpg", alt: "Piments Antillais Habanero" } },
  { id: "riz-parfume-1x-brise", slug: "riz-parfume-1x-brise", name: "Riz Parfumé 1x Brisé", packagingLabel: "sachet de 1kg", price: 2.5, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-riz-royal-lion.jpg", alt: "Riz Parfumé 1x Brisé" } },
  { id: "chinchard-tilapia-frais", slug: "chinchard-tilapia-frais", name: "Chinchard & Tilapia Frais", packagingLabel: "la pièce nettoyée", price: 3.5, tag: "arrivage", aisleSlug: "viandes", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/souk-des-saveurs.jpg", alt: "Chinchard & Tilapia Frais" } },
  { id: "haricots-prepares-trofai", slug: "haricots-prepares-trofai", name: "Haricots Préparés Trofai", packagingLabel: "boite 400g", price: 2.5, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/promo-banner-market.jpg", alt: "Haricots Préparés Trofai" } },
  { id: "farine-infantile-cerelac", slug: "farine-infantile-cerelac", name: "Farine Infantile Cérélac", packagingLabel: "boite métal 400g", price: 4.1, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-visual.jpg", alt: "Farine Infantile Cérélac" } },
  { id: "pate-piments-piles", slug: "pate-piments-piles", name: "Pâte de Piments Pilés", packagingLabel: "bocal verre 200g", price: 2.5, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/souk-des-saveurs.jpg", alt: "Pâte de Piments Pilés" } },
  { id: "pois-dangole-secs", slug: "pois-dangole-secs", name: "Pois d'Angole Secs", packagingLabel: "sachet 1kg", price: 2.5, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-visual.jpg", alt: "Pois d'Angole Secs" } },
  { id: "petits-colas-garcinia", slug: "petits-colas-garcinia", name: "Petits Colas (Garcinia)", packagingLabel: "sachet 500g", price: 4.8, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Petits Colas (Garcinia)" } },
  { id: "chin-chin-traditionnel", slug: "chin-chin-traditionnel", name: "Chin Chin Traditionnel", packagingLabel: "sachet 250g", price: 2.5, tag: "en-cas", aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/terroir-senegal-market.jpg", alt: "Chin Chin Traditionnel" } },
  { id: "huile-palme-rouge-pure", slug: "huile-palme-rouge-pure", name: "Huile de Palme Rouge Pure", packagingLabel: "bouteille 1L", price: 3.9, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/terroir-mali-market.jpg", alt: "Huile de Palme Rouge Pure" } },
  { id: "feuilles-manioc-pilees", slug: "feuilles-manioc-pilees", name: "Feuilles de Manioc Pilées", packagingLabel: "sachet 500g surgelé", price: 2.5, aisleSlug: "legumes", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-attieke-frais.jpg", alt: "Feuilles de Manioc Pilées" } },
  { id: "farine-foufou-pure", slug: "farine-foufou-pure", name: "Farine de Foufou Pure", packagingLabel: "le sac de 1kg", price: 2.5, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-riz-royal-lion.jpg", alt: "Farine de Foufou Pure" } },
  { id: "fleurs-bissap-dorigine", slug: "fleurs-bissap-dorigine", name: "Fleurs de Bissap d'Origine", packagingLabel: "sachet 250g séché", price: 2.5, aisleSlug: "boissons", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { alt: "Fleurs de Bissap d'Origine" } },
  { id: "attieke-frais-deshydrate", slug: "attieke-frais-deshydrate", name: "Attiéké Frais Déshydraté", packagingLabel: "paquet 500g", price: 2.5, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/souk-des-saveurs.jpg", alt: "Attiéké Frais Déshydraté" } },
  { id: "gari-blanc-extra-fin", slug: "gari-blanc-extra-fin", name: "Gari Blanc Extra Fin", packagingLabel: "sac de 1kg", price: 2.5, aisleSlug: "feculents", isOutOfStock: true, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/promo-banner-market.jpg", alt: "Gari Blanc Extra Fin" } },
  { id: "piments-vegetariens-doux", slug: "piments-vegetariens-doux", name: "Piments Végétariens Doux", packagingLabel: "barquette 150g", price: 2.8, tag: "parfume-doux", aisleSlug: "legumes", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-riz-royal-lion.jpg", alt: "Piments Végétariens Doux" } },
  { id: "sauce-creole-pimentee", slug: "sauce-creole-pimentee", name: "Sauce Créole Pimentée", packagingLabel: "flacon 150ml", price: 2.5, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Sauce Créole Pimentée" } },
  { id: "poudre-masale-creole", slug: "poudre-masale-creole", name: "Poudre Masalé Créole", packagingLabel: "pot verre 120g", price: 2.5, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-visual.jpg", alt: "Poudre Masalé Créole" } },
  { id: "gombos-frais-de-saison", slug: "gombos-frais-de-saison", name: "Gombos Frais de Saison", packagingLabel: "barquette 300g", price: 2.6, tag: "frais", aisleSlug: "legumes", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Gombos Frais de Saison" } },
  { id: "manioc-frais-du-pays", slug: "manioc-frais-du-pays", name: "Manioc Frais du Pays", packagingLabel: "le kilo brut", price: 2.9, tag: "artisanal", aisleSlug: "legumes", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/terroir-senegal-market.jpg", alt: "Manioc Frais du Pays" } },
  { id: "confiture-goyave-pays", slug: "confiture-goyave-pays", name: "Confiture Goyave Pays", packagingLabel: "pot verre 325g", price: 3.8, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/terroir-mali-market.jpg", alt: "Confiture Goyave Pays" } },
];

export const PRODUCTS_TOTAL_COUNT = 240;
export const PRODUCTS_PAGE_SIZE = 24;

export const RECIPE_KIT: RecipeKit = {
  id: "tiep-bou-dienn-traditionnel",
  title: "Tiep Bou Dienn Traditionnel",
  description: "Tous les ingrédients frais et authentiques réunis en 1 clic, dosés avec soin et prêts à emporter chez votre épicier de quartier.",
  prepMinutes: 45,
  servings: 4,
  image: { src: "/souk-des-saveurs.jpg", alt: "Tiep Bou Dienn Traditionnel" },
  // Priced so all 5 checked sum to exactly 14,80 € — the "Prix panier" shown in the maquette.
  ingredients: [
    { id: "riz-parfume-1x-brise-kit", label: "Riz parfumé 1x brisé (1kg)", price: 4.9, isAvailable: true },
    { id: "chinchard-frais-nettoye", label: "Chinchard frais nettoyé (2 pcs)", price: 3.5, isAvailable: true },
    { id: "gombos-frais-de-saison-kit", label: "Gombos frais de saison (300g)", price: 2.4, isAvailable: true },
    { id: "piment-habanero-frais", label: "Piment Habanero frais (3 pcs)", price: 1.9, isAvailable: true },
    { id: "concentre-tomate-soumbala", label: "Concentré de tomate pur & soumbala traditionnel", price: 2.1, isAvailable: true },
  ],
};

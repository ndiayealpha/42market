import type { FavoriteProduct, FavoriteRecipe } from "@/src/domain/favorites";
import { routes } from "@/src/lib/routing/routes";

/**
 * The 12 UNIQUE favorited products (exact names/prices/packaging from the
 * reference capture) — the capture itself shows 15 cards with 3 products
 * duplicated; per the spec's own corrected hypothesis (§12, incohérence 5)
 * this fixture has each product once, not duplicated.
 */
export const FAVORITE_PRODUCTS: FavoriteProduct[] = [
  { id: "fav-carottes-fanes", slug: "carottes-fanes", name: "Carottes Fanes", packagingLabel: "la botte • Terroir Maraîcher", price: 2.5, storeSlug: "loirivoire", storeName: "LoirIvoire", stockStatus: "unknown", terroirRegion: "afrique-ouest", image: { src: "/login-visual.jpg", alt: "Carottes Fanes" } },
  { id: "fav-cereales-cerelac", slug: "cereales-cerelac", name: "Céréales Cérélac", packagingLabel: "Boîte 400g • Farine lactée", price: 4.1, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "/offer-riz-royal-lion.jpg", alt: "Céréales Cérélac" }, unitBasis: { quantity: 400, unit: "g" } },
  { id: "fav-pate-arachide-bonmafe", slug: "pate-arachide-bonmafe", name: "Pâte d'Arachide Bonmafé", packagingLabel: "Pot 500g • Pour sauces et mafé", price: 3.5, storeSlug: "nimba-market", storeName: "Nimba Market", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "/offer-attieke-frais.jpg", alt: "Pâte d'Arachide Bonmafé" }, unitBasis: { quantity: 500, unit: "g" } },
  { id: "fav-pois-dangole-1", slug: "pois-dangole", name: "Pois d'angolé", packagingLabel: "Sachet 1kg • Caraïbes / Réunion", price: 2.5, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", stockStatus: "in-stock", terroirRegion: "caraibes-ocean-indien", image: { src: "/login-info-thumbnail.jpg", alt: "Pois d'angolé" }, unitBasis: { quantity: 1000, unit: "g" } },
  { id: "fav-petit-colas-sauvage", slug: "petit-colas-sauvage", name: "Petit Colas Sauvage", packagingLabel: "250g • Garcinia Kola frais", price: 3.8, storeSlug: "nimba-market", storeName: "Nimba Market", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "/login-visual.jpg", alt: "Petit Colas Sauvage" }, unitBasis: { quantity: 250, unit: "g" } },
  { id: "fav-chips-plantain-salees", slug: "chips-plantain-salees", name: "Chips de Plantain Salées", packagingLabel: "Paquet 150g • Goûter artisanal", price: 1.9, storeSlug: "nimba-market", storeName: "Nimba Market", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "/offer-riz-royal-lion.jpg", alt: "Chips de Plantain Salées" }, unitBasis: { quantity: 150, unit: "g" } },
  { id: "fav-attieke-garba", slug: "attieke-garba", name: "Attiéké Frais Garba", packagingLabel: "Boule 500g • Manioc fermenté", price: 2.2, storeSlug: "loirivoire", storeName: "LoirIvoire", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "/offer-attieke-frais.jpg", alt: "Attiéké Frais Garba" }, unitBasis: { quantity: 500, unit: "g" } },
  { id: "fav-piment-habanero-rouge", slug: "piment-habanero-rouge", name: "Piment Habanero Rouge", packagingLabel: "Barquette 100g • Arôme intense", price: 1.8, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "/login-info-thumbnail.jpg", alt: "Piment Habanero Rouge" }, unitBasis: { quantity: 100, unit: "g" } },
  { id: "fav-gombo-frais-extra", slug: "gombo-frais-extra", name: "Gombo Frais Extra", packagingLabel: "500g • Cueillette de saison", price: 2.9, storeSlug: "nimba-market", storeName: "Nimba Market", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "/login-visual.jpg", alt: "Gombo Frais Extra" }, unitBasis: { quantity: 500, unit: "g" } },
  { id: "fav-huile-rouge-carotene", slug: "huile-rouge-carotene", name: "Huile Rouge Carotène", packagingLabel: "Bouteille 1L • Non raffinée", price: 4.5, storeSlug: "loirivoire", storeName: "LoirIvoire", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "/offer-riz-royal-lion.jpg", alt: "Huile Rouge Carotène" }, unitBasis: { quantity: 1000, unit: "ml" } },
  { id: "fav-gari-blanc-fin", slug: "gari-blanc-fin", name: "Gari Blanc Fin", packagingLabel: "Sachet 1kg • Farine de manioc", price: 2.6, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "/offer-attieke-frais.jpg", alt: "Gari Blanc Fin" }, unitBasis: { quantity: 1000, unit: "g" } },
  { id: "fav-soumbala-authentique", slug: "soumbala-authentique", name: "Soumbala Authentique", packagingLabel: "Boîte 200g • Graines de néré", price: 3.2, storeSlug: "nimba-market", storeName: "Nimba Market", stockStatus: "in-stock", terroirRegion: "afrique-ouest", image: { src: "/login-info-thumbnail.jpg", alt: "Soumbala Authentique" }, unitBasis: { quantity: 200, unit: "g" } },
];

/** Extra fixtures for story/test states only (stock variants) — not part of the default 12. */
export const FAVORITE_PRODUCT_LOW_STOCK: FavoriteProduct = { ...FAVORITE_PRODUCTS[1], id: "fav-story-low-stock", stockStatus: "low-stock" };
export const FAVORITE_PRODUCT_OUT_OF_STOCK: FavoriteProduct = { ...FAVORITE_PRODUCTS[2], id: "fav-story-out-of-stock", stockStatus: "out-of-stock" };

/** Most-recently-added first — drives the "Derniers ajouts" sort (can't be derived from the products themselves). */
export const FAVORITE_PRODUCTS_RECENT_ORDER: string[] = [...FAVORITE_PRODUCTS].reverse().map((product) => product.id);

export const FAVORITE_RECIPES: FavoriteRecipe[] = [
  { id: "recette-thieboudienne", name: "Thiéboudienne traditionnel", servings: 6, totalPrice: 24.9, image: { src: "/login-visual.jpg", alt: "Thiéboudienne traditionnel" }, href: routes.main.recipes },
  { id: "recette-mafe-poulet", name: "Mafé au poulet fermier", servings: 4, totalPrice: 18.4, image: { src: "/offer-riz-royal-lion.jpg", alt: "Mafé au poulet fermier" }, href: routes.main.recipes },
  { id: "recette-alloco-poisson", name: "Alloco & poisson braisé", servings: 2, totalPrice: 12.8, image: { src: "/offer-attieke-frais.jpg", alt: "Alloco & poisson braisé" }, href: routes.main.recipes },
];

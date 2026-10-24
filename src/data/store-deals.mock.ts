import type { StoreDealsSummary } from "@/src/domain/store-deals";

/**
 * The 6 stores for the global "Bons plans par épiceries" page, in the
 * maquette's own order (re-sorted at render time by `rankStoresByMaxDiscount`
 * — this literal order is just how the fixture happens to be authored).
 * "Salam Market" and "Le Comptoir Tropical" are new slugs — neither has a
 * full catalog/fiche-boutique wired yet (same pre-existing boundary as the
 * other catalog stores, see compte-rendu): their own "Voir tout" link still
 * points at `epicerieBonsPlans`, it just isn't a populated page yet.
 */
export const STORE_DEALS: StoreDealsSummary[] = [
  {
    slug: "loirivoire",
    name: "LoirIvoire",
    address: "12 Rue de la République, Saint-Étienne",
    pickupMinutes: 15,
    tagline: "Promotions groupées et bons plans exclusifs de l'enseigne",
    promoCount: 42,
    maxDiscountPercent: 30,
    products: [
      { id: "deal-bananes-plantain", slug: "bananes-plantain", name: "Bananes Plantain Mûres", packagingLabel: "1kg", price: 2.39, compareAtPrice: 2.99, badge: { kind: "multibuy", quantity: 2, price: 4.5 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-riz-royal-lion.jpg", alt: "Bananes Plantain Mûres" }, dealLabel: { text: "Offre lot", tone: "neutral" } },
      { id: "deal-piment-habanero-frais", slug: "piment-habanero-frais", name: "Piment Habanero Frais", packagingLabel: "150g", price: 1.4, compareAtPrice: 1.65, badge: { kind: "percent", percent: 15 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-attieke-frais.jpg", alt: "Piment Habanero Frais" }, dealLabel: { text: "Prix dégressif", tone: "warning" } },
      { id: "deal-gombos-frais-extra", slug: "gombos-frais-extra", name: "Gombos Frais Extra", packagingLabel: "500g", price: 1.95, compareAtPrice: 2.6, badge: { kind: "label", text: "Vente flash" }, aisleSlug: "legumes", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-visual.jpg", alt: "Gombos Frais Extra" }, dealLabel: { text: "Vente flash", tone: "danger" } },
      { id: "deal-manioc-blanc-frais", slug: "manioc-blanc-frais", name: "Manioc Blanc Frais", packagingLabel: "1kg", price: 2.1, compareAtPrice: 4.2, badge: { kind: "bogo" }, aisleSlug: "legumes", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/login-info-thumbnail.jpg", alt: "Manioc Blanc Frais" }, dealLabel: { text: "1 offert", tone: "success" } },
      { id: "deal-riz-parfume-brise-1x", slug: "riz-parfume-brise-1x", name: "Riz Parfumé Brisé 1x", packagingLabel: "5 kg", price: 5.9, compareAtPrice: 6.8, badge: { kind: "label", text: "Lot éco" }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-riz-royal-lion.jpg", alt: "Riz Parfumé Brisé 1x" }, dealLabel: { text: "Format familial", tone: "neutral" } },
      { id: "deal-fleurs-hibiscus-bissap", slug: "fleurs-hibiscus-bissap", name: "Fleurs d'Hibiscus (Bissap)", packagingLabel: "250g", price: 2.2, compareAtPrice: 3.15, badge: { kind: "percent", percent: 30 }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "loirivoire", storeName: "LoirIvoire", image: { src: "/offer-attieke-frais.jpg", alt: "Fleurs d'Hibiscus (Bissap)" }, dealLabel: { text: "Anti-gaspi", tone: "success" } },
    ],
  },
  {
    slug: "saveurs-dafrique",
    name: "Saveurs d'Afrique",
    address: "8 Avenue de la Libération, Saint-Étienne",
    pickupMinutes: 10,
    tagline: "Arrivage direct de Rungis & producteurs partenaires",
    promoCount: 38,
    maxDiscountPercent: 40,
    products: [
      { id: "deal-igname-blanche-poyo", slug: "igname-blanche-poyo", name: "Igname Blanche Poyo", packagingLabel: "1kg", price: 2.8, compareAtPrice: 5, badge: { kind: "bogo" }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/login-visual.jpg", alt: "Igname Blanche Poyo" }, dealLabel: { text: "Offre duo", tone: "neutral" } },
      { id: "deal-feuilles-patate-douce", slug: "feuilles-patate-douce", name: "Feuilles de Patate Douce", packagingLabel: "Botte 400g", price: 1.6, compareAtPrice: 1.9, badge: { kind: "percent", percent: 15 }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/offer-attieke-frais.jpg", alt: "Feuilles de Patate Douce" }, dealLabel: { text: "Arrivage frais", tone: "success" } },
      { id: "deal-mangue-kent-avion", slug: "mangue-kent-avion", name: "Mangue Kent par Avion", packagingLabel: "Pièce", price: 1.5, compareAtPrice: 2.1, badge: { kind: "percent", percent: 20 }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/login-info-thumbnail.jpg", alt: "Mangue Kent par Avion" }, dealLabel: { text: "Offre trio", tone: "neutral" } },
      { id: "deal-christophines-vertes", slug: "christophines-vertes", name: "Christophines Vertes (Chayote)", packagingLabel: "Pièce", price: 1.2, compareAtPrice: 1.6, badge: { kind: "label", text: "Flash 24h" }, aisleSlug: "fruits", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/offer-riz-royal-lion.jpg", alt: "Christophines Vertes (Chayote)" }, dealLabel: { text: "Flash 24h", tone: "danger" } },
      { id: "deal-bananes-plantain-vertes", slug: "bananes-plantain-vertes", name: "Bananes Plantain Vertes", packagingLabel: "1kg", price: 2.25, compareAtPrice: 2.8, badge: { kind: "multibuy", quantity: 2, price: 4.2 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/login-visual.jpg", alt: "Bananes Plantain Vertes" }, dealLabel: { text: "Offre lot", tone: "neutral" } },
      { id: "deal-gingembre-frais-decoupe", slug: "gingembre-frais-decoupe", name: "Gingembre Frais Découpé", packagingLabel: "300g", price: 1.75, compareAtPrice: 2.2, badge: { kind: "percent", percent: 40 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", image: { src: "/offer-attieke-frais.jpg", alt: "Gingembre Frais Découpé" }, dealLabel: { text: "Anti-gaspi", tone: "success" } },
    ],
  },
  {
    slug: "nimba-market",
    name: "Nimba Market",
    address: "21 Rue Gambetta, Saint-Étienne",
    pickupMinutes: 20,
    tagline: "Mélanges traditionnels, soumbala, piments écrasés et huiles pures",
    promoCount: 29,
    maxDiscountPercent: 30,
    products: [
      { id: "deal-huile-rouge-zomi", slug: "huile-rouge-zomi", name: "Huile Rouge Zomi Pure", packagingLabel: "1 Litre", price: 3.8, compareAtPrice: 4.5, badge: { kind: "label", text: "Offre duo" }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "nimba-market", storeName: "Nimba Market", image: { src: "/login-visual.jpg", alt: "Huile Rouge Zomi Pure" }, dealLabel: { text: "Offre duo", tone: "neutral" } },
      { id: "deal-melange-epices-suya", slug: "melange-epices-suya", name: "Mélange Épices Suya (Kankan)", packagingLabel: "100g", price: 0.99, compareAtPrice: 1.35, badge: { kind: "percent", percent: 27 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "nimba-market", storeName: "Nimba Market", image: { src: "/offer-attieke-frais.jpg", alt: "Mélange Épices Suya (Kankan)" }, dealLabel: { text: "Prix dégressif", tone: "warning" } },
      { id: "deal-pate-piment-maison", slug: "pate-piment-maison", name: "Pâte de Piment Maison Nim", packagingLabel: "200g", price: 2.5, compareAtPrice: 3.15, badge: { kind: "label", text: "Flash" }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "nimba-market", storeName: "Nimba Market", image: { src: "/offer-riz-royal-lion.jpg", alt: "Pâte de Piment Maison Nim" }, dealLabel: { text: "Vente flash", tone: "danger" } },
      { id: "deal-soumbala-pur-guinee", slug: "soumbala-pur-guinee", name: "Soumbala Pur de Guinée", packagingLabel: "150g", price: 1.9, compareAtPrice: 2.3, badge: { kind: "percent", percent: 17 }, aisleSlug: "epices", isOutOfStock: false, storeSlug: "nimba-market", storeName: "Nimba Market", image: { src: "/login-info-thumbnail.jpg", alt: "Soumbala Pur de Guinée" }, dealLabel: { text: "Pur artisanal", tone: "neutral" } },
      { id: "deal-pate-arachide-authentique", slug: "pate-arachide-authentique", name: "Pâte d'Arachide Authentique", packagingLabel: "500g", price: 3.1, compareAtPrice: 3.65, badge: { kind: "percent", percent: 15 }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "nimba-market", storeName: "Nimba Market", image: { src: "/login-visual.jpg", alt: "Pâte d'Arachide Authentique" }, dealLabel: { text: "Pur artisanal", tone: "neutral" } },
      { id: "deal-crevettes-sechees-moulues", slug: "crevettes-sechees-moulues", name: "Crevettes Séchées Moulues", packagingLabel: "120g", price: 2.6, compareAtPrice: 5.2, badge: { kind: "label", text: "2ème à -50%" }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "nimba-market", storeName: "Nimba Market", image: { src: "/offer-attieke-frais.jpg", alt: "Crevettes Séchées Moulues" }, dealLabel: { text: "2ème à -50%", tone: "warning" } },
    ],
  },
  {
    slug: "salam-market",
    name: "Salam Market",
    address: "5 Place Jean Jaurès, Saint-Étienne",
    pickupMinutes: 15,
    tagline: "Jus pur gingembre, bissap artisanal, nectars mangue et sodas du monde",
    promoCount: 52,
    maxDiscountPercent: 30,
    products: [
      { id: "deal-bissap-menthe-vanille", slug: "bissap-menthe-vanille", name: "Bissap Frais Menthe & Vanille", packagingLabel: "1 Litre", price: 2.2, compareAtPrice: 2.8, badge: { kind: "label", text: "Offre trio" }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "salam-market", storeName: "Salam Market", image: { src: "/login-info-thumbnail.jpg", alt: "Bissap Frais Menthe & Vanille" }, dealLabel: { text: "Offre trio", tone: "neutral" } },
      { id: "deal-jus-gingembre-fort", slug: "jus-gingembre-fort", name: "Jus Pur Gingembre Fort", packagingLabel: "75cl", price: 2.6, compareAtPrice: 3.25, badge: { kind: "percent", percent: 20 }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "salam-market", storeName: "Salam Market", image: { src: "/offer-riz-royal-lion.jpg", alt: "Jus Pur Gingembre Fort" }, dealLabel: { text: "Flash", tone: "danger" } },
      { id: "deal-boisson-maltee-supermalt", slug: "boisson-maltee-supermalt", name: "Boisson Maltée Supermalt", packagingLabel: "Pack x6", price: 0.95, compareAtPrice: 5, badge: { kind: "pack", size: 6 }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "salam-market", storeName: "Salam Market", image: { src: "/login-visual.jpg", alt: "Boisson Maltée Supermalt" }, dealLabel: { text: "Pack x6", tone: "neutral" } },
      { id: "deal-nectar-goyave-rose", slug: "nectar-goyave-rose", name: "Nectar Pur Goyave Rose", packagingLabel: "1 Litre", price: 1.75, compareAtPrice: 2.1, badge: { kind: "label", text: "Offre lot" }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "salam-market", storeName: "Salam Market", image: { src: "/offer-attieke-frais.jpg", alt: "Nectar Pur Goyave Rose" }, dealLabel: { text: "Offre lot", tone: "neutral" } },
      { id: "deal-jus-pain-singe-bouye", slug: "jus-pain-singe-bouye", name: "Jus de Pain de Singe (Bouye)", packagingLabel: "50cl", price: 2.75, compareAtPrice: 3.65, badge: { kind: "percent", percent: 25 }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "salam-market", storeName: "Salam Market", image: { src: "/login-info-thumbnail.jpg", alt: "Jus de Pain de Singe (Bouye)" }, dealLabel: { text: "Pur fruit", tone: "success" } },
      { id: "deal-nectar-corossol-sauvage", slug: "nectar-corossol-sauvage", name: "Nectar de Corossol Sauvage", packagingLabel: "1 Litre", price: 2.4, compareAtPrice: 4.8, badge: { kind: "label", text: "2ème à -50%" }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "salam-market", storeName: "Salam Market", image: { src: "/login-visual.jpg", alt: "Nectar de Corossol Sauvage" }, dealLabel: { text: "2ème à -50%", tone: "warning" } },
    ],
  },
  {
    slug: "epicerie-du-monde",
    name: "Épicerie du Monde",
    address: "3 Rue de la Paix, Saint-Étienne",
    pickupMinutes: 25,
    tagline: "Gari, attiéké, semoules, farines et riz en format économique",
    promoCount: 31,
    maxDiscountPercent: 25,
    products: [
      { id: "deal-attieke-cote-divoire", slug: "attieke-cote-divoire", name: "Attiéké Frais de Côte d'Ivoire", packagingLabel: "500g", price: 1.7, compareAtPrice: 2.1, badge: { kind: "label", text: "Offre trio" }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "epicerie-du-monde", storeName: "Épicerie du Monde", image: { src: "/offer-attieke-frais.jpg", alt: "Attiéké Frais de Côte d'Ivoire" }, dealLabel: { text: "Offre trio", tone: "neutral" } },
      { id: "deal-farine-fufu-plantain", slug: "farine-fufu-plantain", name: "Farine de Fufu Plantain", packagingLabel: "1kg", price: 2.9, compareAtPrice: 3.4, badge: { kind: "label", text: "Flash" }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "epicerie-du-monde", storeName: "Épicerie du Monde", image: { src: "/offer-riz-royal-lion.jpg", alt: "Farine de Fufu Plantain" }, dealLabel: { text: "Vente flash", tone: "danger" } },
      { id: "deal-gari-jaune-manioc", slug: "gari-jaune-manioc", name: "Gari Jaune Pur Manioc", packagingLabel: "5 kg", price: 7.9, compareAtPrice: 9.5, badge: { kind: "label", text: "Lot éco" }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "epicerie-du-monde", storeName: "Épicerie du Monde", image: { src: "/login-visual.jpg", alt: "Gari Jaune Pur Manioc" }, dealLabel: { text: "Format éco", tone: "neutral" } },
      { id: "deal-haricots-blancs-niebe", slug: "haricots-blancs-niebe", name: "Haricots Blancs Niébé", packagingLabel: "1kg", price: 2.6, compareAtPrice: 3.25, badge: { kind: "multibuy", quantity: 2, price: 4.8 }, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "epicerie-du-monde", storeName: "Épicerie du Monde", image: { src: "/login-info-thumbnail.jpg", alt: "Haricots Blancs Niébé" }, dealLabel: { text: "Offre lot", tone: "neutral" } },
      { id: "deal-fonio-precuit-naturel", slug: "fonio-precuit-naturel", name: "Fonio Précuit Naturel", packagingLabel: "500g", price: 3.4, compareAtPrice: 4.25, badge: { kind: "percent", percent: 20 }, aisleSlug: "epicerie-fine", isOutOfStock: false, storeSlug: "epicerie-du-monde", storeName: "Épicerie du Monde", image: { src: "/offer-attieke-frais.jpg", alt: "Fonio Précuit Naturel" }, dealLabel: { text: "Céréale bio", tone: "success" } },
      { id: "deal-semoule-ble-dur", slug: "semoule-ble-dur", name: "Semoule Moyenne de Blé Dur", packagingLabel: "1kg", price: 1.65, compareAtPrice: 1.95, aisleSlug: "feculents", isOutOfStock: false, storeSlug: "epicerie-du-monde", storeName: "Épicerie du Monde", image: { src: "/login-visual.jpg", alt: "Semoule Moyenne de Blé Dur" }, dealLabel: { text: "Offre duo", tone: "neutral" } },
    ],
  },
  {
    slug: "le-comptoir-tropical",
    name: "Le Comptoir Tropical",
    address: "17 Cours Victor Hugo, Saint-Étienne",
    pickupMinutes: 20,
    tagline: "Fruits exotiques, racines et produits tropicaux de saison",
    promoCount: 22,
    maxDiscountPercent: 20,
    products: [],
  },
];

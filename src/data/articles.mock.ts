import type { Article } from "@/src/domain/article";

/**
 * No editorial photography exists for the Carnet du Terroir yet — every
 * entry reuses existing app assets as stand-ins, same approach as every
 * other mock in this project. Linked products/recipes always reference
 * real catalog/recipe fixtures, never an invented id.
 */
export const ARTICLES: Article[] = [
  {
    id: "art-thieboudienne",
    slug: "art-du-thieboudienne",
    kind: "recette",
    title: "L'art du Thiéboudienne : anatomie du trésor national sénégalais et ses secrets de marmite",
    excerpt:
      "Pourquoi le choix du riz brisé deux fois et la qualité du concentré changent tout. Rencontre avec des cuisinières de Saint-Étienne et Dakar qui nous livrent les gestes transmis de génération en génération.",
    heroImage: { src: "/login-visual.jpg", alt: "Le festin communautaire de Saint-Louis" },
    readingMinutes: 6,
    publishedAtIso: "2026-08-18T00:00:00Z",
    author: { name: "Mamadou Konaté", role: "Épicier sélectionneur & cuisinier passionné · Saint-Étienne" },
    tags: ["À la une", "Dossier terroir", "Recette pas à pas", "Sénégal & Diaspora"],
    linkedRecipeSlug: "thieboudienne-rouge-ceebu-jen",
    relatedArticleSlugs: ["condiments-sacres-afrique-ouest", "fatou-ibrahim-carnot", "sauver-plantains-mangues"],
  },
  {
    id: "art-guide-epices",
    slug: "condiments-sacres-afrique-ouest",
    kind: "guide",
    title: "Poivre de Penja, Maniguette & Soumbala : le guide ultime des condiments sacrés d'Afrique de l'Ouest",
    excerpt:
      "Comment doser et torréfier ces trésors méconnus pour sublimer vos sauces quotidiennes sans masquer leur délicatesse. Traversée sensorielle au cœur des sols volcaniques du Littoral camerounais.",
    heroImage: { src: "/souk-des-saveurs.jpg", alt: "Mortier rituel en basalte taillé" },
    readingMinutes: 7,
    publishedAtIso: "2026-08-12T00:00:00Z",
    author: { name: "Aminata S.", role: "Cheffe & Sommelière d'épices des terroirs subsahariens" },
    tags: ["Guide pédagogique", "Botanique & Épices"],
    relatedArticleSlugs: ["art-du-thieboudienne", "fatou-ibrahim-carnot"],
    linkedProducts: [
      {
        id: "coffret-3-epices",
        name: "Coffret Découverte « 3 Épices Pures »",
        packagingLabel: "Penja Blanc IGP 40g + Maniguette 40g + Soumbala 50g",
        price: 14.5,
        image: { src: "/souk-des-saveurs.jpg", alt: "Coffret Découverte 3 Épices Pures" },
        storeSlug: "souk-des-saveurs",
        storeName: "Souk des saveurs",
      },
    ],
  },
  {
    id: "art-portrait-carnot",
    slug: "fatou-ibrahim-carnot",
    kind: "portrait",
    title: "Fatou & Ibrahim : 25 ans d'étals et de convivialité au cœur du quartier Carnot",
    excerpt:
      "De l'étal ambulant de 1999 au Click & Collect 42 Markets, plongée intime dans l'un des bastions culinaires les plus vibrants de Saint-Étienne, où chaque graine et tubercule raconte un bout d'exil et d'hospitalité.",
    heroImage: { src: "/offer-attieke-frais.jpg", alt: "Au comptoir de l'épicerie" },
    readingMinutes: 6,
    publishedAtIso: "2026-08-16T00:00:00Z",
    author: { name: "Julien D.", role: "Photographe & reporter de quartier · Saint-Étienne" },
    tags: ["Portraits d'Épiciers", "Coulisses & Terroir"],
    relatedArticleSlugs: ["art-du-thieboudienne", "condiments-sacres-afrique-ouest"],
    linkedProducts: [
      {
        id: "saveurs-huile-palme",
        name: "Huile de Palme Rouge Pure 1L",
        packagingLabel: "Pressée à froid selon la tradition",
        price: 3.2,
        image: { src: "/login-info-thumbnail.jpg", alt: "Huile de Palme Rouge Pure" },
        storeSlug: "saveurs-dafrique",
        storeName: "Saveurs d'Afrique",
      },
      {
        id: "saveurs-gombo-frais",
        name: "Gombo Frais Sélection Extra",
        packagingLabel: "Barquette 400g",
        price: 3.4,
        image: { src: "/stock-carrots.jpg", alt: "Gombo Frais Sélection Extra" },
        storeSlug: "saveurs-dafrique",
        storeName: "Saveurs d'Afrique",
      },
      {
        id: "saveurs-fonio",
        name: "Fonio Précuit Bio",
        packagingLabel: "Sachet kraft 500g",
        price: 4.5,
        image: { src: "/login-visual.jpg", alt: "Fonio Précuit Bio" },
        storeSlug: "saveurs-dafrique",
        storeName: "Saveurs d'Afrique",
      },
    ],
  },
  {
    id: "art-anti-gaspi-plantains",
    slug: "sauver-plantains-mangues",
    kind: "anti-gaspi",
    title: "Bananes Plantains Noires & Mangues Trop Mûres : 5 recettes dorées pour zéro gaspillage",
    excerpt:
      "Une peau tigrée ou noircie n'est pas le signal de la poubelle : c'est l'indice suprême de la friandise. Pour les cuisiniers du golfe de Guinée, de la vallée du Bani ou des Antilles, c'est le commencement de la saveur.",
    heroImage: { src: "/promo-banner-market.jpg", alt: "Atelier Terroir anti-gaspi" },
    readingMinutes: 5,
    publishedAtIso: "2026-08-10T00:00:00Z",
    author: { name: "Collectif Épiciers Solidaires 42", role: "En réseau avec les épiceries partenaires de Saint-Étienne" },
    tags: ["Engagements RSE", "Anti-Gaspi & Ventes Flash"],
    relatedArticleSlugs: ["art-du-thieboudienne", "fatou-ibrahim-carnot"],
    linkedProducts: [
      {
        id: "antigaspi-plantains-tres-murs",
        name: "Lot 4 Plantains très mûrs",
        packagingLabel: "Fin de vente, lots restants",
        price: 1.2,
        image: { src: "/promo-banner-market.jpg", alt: "Lot de plantains très mûrs" },
        storeSlug: "saveurs-dafrique",
        storeName: "Saveurs d'Afrique",
      },
      {
        id: "antigaspi-mangues-kent-mali",
        name: "Cagette 2 Mangues Kent Mali",
        packagingLabel: "Pic de sucre",
        price: 2.7,
        image: { src: "/terroir-mali-market.jpg", alt: "Cagette de mangues Kent du Mali" },
        storeSlug: "loirivoire",
        storeName: "LoirIvoire",
      },
      {
        id: "antigaspi-lait-coco",
        name: "Lait de coco pressé bio",
        packagingLabel: "400ml",
        price: 1.6,
        image: { src: "/login-info-thumbnail.jpg", alt: "Lait de coco pressé bio" },
        storeSlug: "loirivoire",
        storeName: "LoirIvoire",
      },
    ],
  },
];

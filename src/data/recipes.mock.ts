import type { Recipe } from "@/src/domain/recipe";

/**
 * No dish photos exist in the project yet — every entry reuses the same
 * existing food-adjacent photo (login-visual.jpg) as a stand-in, same
 * approach as stores.mock.ts/preorders.mock.ts. Deliberately not
 * login-info-thumbnail.jpg: that file is only 172×96 natively, well
 * below this card's ~275×176 display size, and renders visibly blurry
 * once upscaled. login-visual.jpg (316×401) still isn't large enough
 * for a crisp render on 2x/retina screens, but is far closer. Replace
 * with real photography per recipe when available.
 */
export const RECIPES: Recipe[] = [
  {
    id: "thieboudienne",
    title: "Thiéboudienne",
    countries: ["Sénégal"],
    flag: "sn",
    durationMinutes: 75,
    difficulty: "Moyen",
    rating: 5.0,
    description: "Riz brisé rouge, daurade royale, manioc, carottes, chou & tamarin.",
    priceFrom: 22.4,
    image: { src: "/login-visual.jpg", alt: "Thiéboudienne, riz au poisson sénégalais" },
  },
  {
    id: "poulet-yassa",
    title: "Poulet Yassa",
    countries: ["Sénégal"],
    flag: "sn",
    durationMinutes: 45,
    difficulty: "Facile",
    rating: 4.9,
    description: "Citrons verts, moutarde, oignons caramélisés & poulet fermier mijoté.",
    priceFrom: 17.6,
    image: { src: "/login-visual.jpg", alt: "Poulet Yassa aux oignons caramélisés" },
  },
  {
    id: "mafe-boeuf",
    title: "Mafé au bœuf",
    countries: ["Mali", "Sénégal"],
    flag: "ml",
    durationMinutes: 60,
    difficulty: "Facile",
    rating: 4.9,
    description: "Pâte d'arachide Dakatine, morceaux de bœuf fondant, patates douces & gombos.",
    priceFrom: 18.9,
    image: { src: "/login-visual.jpg", alt: "Mafé au bœuf à la pâte d'arachide" },
  },
  {
    id: "jollof-rice-party",
    title: "Jollof Rice Party",
    countries: ["Nigéria", "Ghana"],
    flag: "ng",
    durationMinutes: 50,
    difficulty: "Facile",
    rating: 4.9,
    description: "Riz long parfumé, purée de tomate cuite, scotch bonnet & épices suya fumées.",
    priceFrom: 14.2,
    image: { src: "/login-visual.jpg", alt: "Jollof Rice au poulet grillé" },
  },
  {
    id: "attieke-poisson-braise",
    title: "Attiéké & poisson braisé",
    countries: ["Côte d'Ivoire"],
    flag: "ci",
    // Cut off in the mockup — duration/difficulty/rating are plausible
    // placeholders (grilled-fish-and-attiéké dishes run quick/easy), to
    // confirm against the real maquette once available.
    durationMinutes: 35,
    difficulty: "Facile",
    rating: 4.9,
    description: "Semoule de manioc de Grand-Lahou, tilapia grillé, piment & oignons.",
    priceFrom: 16.8,
    image: { src: "/login-visual.jpg", alt: "Attiéké et poisson braisé ivoirien" },
  },
];

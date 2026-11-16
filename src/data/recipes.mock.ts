import type { Recipe } from "@/src/domain/recipe";

/** Most-recently-published first — drives the "Plus récentes" sort (can't be derived from `Recipe` fields alone, same convention as `FAVORITE_PRODUCTS_RECENT_ORDER`). */
export const RECIPES_RECENT_ORDER: string[] = [
  "rougail-saucisses",
  "colombo-cabri",
  "couscous-berbere",
  "attieke-grand-lahou",
  "jollof-rice",
  "mafe-boeuf",
  "poulet-yassa",
  "thieboudienne",
];

/**
 * No dish photos exist in the project yet — every entry reuses existing
 * app assets as stand-ins (same approach as stores.mock.ts/preorders.mock.ts).
 * Store distances/pickup times are copied from `stores.mock.ts` (single
 * source for that data), not re-invented here.
 */
export const RECIPES: Recipe[] = [
  {
    id: "thieboudienne",
    slug: "thieboudienne-rouge-ceebu-jen",
    title: "Thiéboudienne Rouge (Ceebu Jën)",
    subtitle: "Thiéboudienne Traditionnelle au Poisson",
    countries: ["Sénégal"],
    flag: "sn",
    region: "afrique-ouest",
    durationMinutes: 75,
    servings: 4,
    difficulty: "moyen",
    description:
      "Chef-d'œuvre de la gastronomie sénégalaise, ce plat légendaire combine la chair délicate de la daurade royale farcie au roff (herbes pilonnées), un riz brisé imprégné d'un bouillon de tomates intenses et le parfum envoûtant de guedj et yet marins.",
    image: { src: "/login-visual.jpg", alt: "Thiéboudienne, riz au poisson sénégalais" },
    originTag: "Origine Authentique",
    originBadge: "Patrimoine culturel · Inscrit à l'UNESCO (2021)",
    detail: {
      chefTipAuthor: "Chef Fodé (Saint-Étienne)",
      chefTip: "Faites cuire le riz deux fois : une première fois à la vapeur au-dessus de la cocotte, puis plongez-le dans le bouillon réduit pour qu'il s'imbibe sans jamais coller.",
      pairingTip: "Jus de Bissap rouge glacé à la menthe",
      equipmentTip: "Grande marmite en fonte ou couscoussier",
      substitutionTip:
        "Pas de Yet sous la main ? Ne renoncez pas au plat ! Remplacez-le par 2 filets d'anchois à l'huile écrasés ou une cuillère de pâte de miso brun dans la sauce tomate : vous obtiendrez cette rondeur marine et fermentée sans dénaturer la tradition.",
      storeOptions: [
        { storeSlug: "loirivoire", storeName: "LoirIvoire", distanceMeters: 600, pickupMinutes: 10 },
        { storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", distanceMeters: 1200, pickupMinutes: 10 },
      ],
      steps: [
        { order: 1, title: "La Farce Aromatique & Piquage (Le Roff)", durationLabel: "15 min", description: "Dans un mortier, pilez généreusement le persil frais lavé, 4 gousses d'ail violet, la moitié d'un piment habanero épépiné, du sel marin et du poivre noir concassé. Incisez profondément les darnes de daurade et insérez cette pâte verte parfumée au cœur de la chair." },
        { order: 2, title: "Saisie des Poissons & Base Tomatée Rouge", durationLabel: "15 min", description: "Faites chauffer une généreuse quantité d'huile dans votre marmite en fonte. Faites dorer les morceaux de poisson farcis pendant 4 à 5 minutes par face, puis réservez-les. Dans la même huile parfumée, faites revenir les oignons hachés, délayez le concentré de tomate pur." },
        { order: 3, title: "Mijotage Noble des Légumes Racines & Bouillon", durationLabel: "25 min", description: "Mouillez avec 1,5 litre d'eau chaude. Incorporez le morceau de poisson séché (guedj) et le yet préalablement rincé. Ajoutez les tronçons de manioc, carottes, quartiers de chou blanc et la pâte de tamarin délayée." },
        { order: 4, title: "Cuisson & Absorption du Riz Brisé Parfumé", durationLabel: "20 min", description: "Retirez les légumes cuits et le poisson du bouillon. Versez le riz brisé lavé plusieurs fois. Le bouillon doit recouvrir le riz d'environ 1,5 cm. Couvrez hermétiquement et baissez le feu au minimum pour une cuisson à l'étouffée par absorption totale." },
        { order: 5, title: "Le Dressage & La Croûte Dorée Magique (Le Xoox)", durationLabel: "5 min", description: "Dressez le riz rouge aéré au centre d'un grand plat commun. Disposez harmonieusement les darnes de poisson doré entourées de manioc fondant, carottes et quartier de chou. Raclez le fond de la cocotte pour recueillir le « Xoox », la croûte croustillante et caramélisée tant convoitée." },
      ],
      ingredients: [
        { id: "thieb-daurade", label: "Daurade Royale fraîche vidée", quantityLabel: "Criée sélectionnée · 2 x 400g", prices: [{ storeSlug: "loirivoire", price: 9.2, isAvailable: true }, { storeSlug: "saveurs-dafrique", price: 9.6, isAvailable: true }] },
        { id: "thieb-riz", label: "Riz Parfumé Brisé 1 fois pur", quantityLabel: "Vallée du Fleuve Sénégal · Sac 1kg", prices: [{ storeSlug: "loirivoire", price: 2.4, isAvailable: true }, { storeSlug: "saveurs-dafrique", price: 2.5, isAvailable: true }] },
        { id: "thieb-concentre", label: "Concentré de Tomate Intense pur", quantityLabel: "Double concentré · Boîte 140g", prices: [{ storeSlug: "loirivoire", price: 1.1, isAvailable: true }, { storeSlug: "saveurs-dafrique", price: 1.15, isAvailable: true }] },
        { id: "thieb-manioc", label: "Racine de Manioc Doux sélectionné", quantityLabel: "Tubercule frais · 500g", prices: [{ storeSlug: "loirivoire", price: 1.8, isAvailable: true }, { storeSlug: "saveurs-dafrique", price: 1.7, isAvailable: true }] },
        { id: "thieb-legumes", label: "Carottes Maraîchères & Chou Blanc", quantityLabel: "Terroir Loire · Lot garni 600g", prices: [{ storeSlug: "loirivoire", price: 1.6, isAvailable: true }, { storeSlug: "saveurs-dafrique", price: 1.6, isAvailable: true }] },
        { id: "thieb-piment-gombo", label: "Piment Habanero frais & Gombos verts", quantityLabel: "Saveur intense · Barquette 150g", prices: [{ storeSlug: "loirivoire", price: 1.3, isAvailable: true }, { storeSlug: "saveurs-dafrique", price: 1.4, isAvailable: true }] },
        { id: "thieb-tamarin", label: "Pâte de Tamarin acidulée pure", quantityLabel: "Gousse · 50g", prices: [{ storeSlug: "loirivoire", price: 1.2, isAvailable: true }, { storeSlug: "saveurs-dafrique", price: 1.25, isAvailable: true }] },
        { id: "thieb-guedj", label: "Guedj (poisson séché)", quantityLabel: "Morceau · 100g", prices: [{ storeSlug: "loirivoire", price: 2.4, isAvailable: true }, { storeSlug: "saveurs-dafrique", price: 2.3, isAvailable: true }] },
        { id: "thieb-yet", label: "Yet artisanal (mollusque fermenté)", quantityLabel: "Sachet · 50g", prices: [{ storeSlug: "loirivoire", price: 2.0, isAvailable: true }, { storeSlug: "saveurs-dafrique", price: 0, isAvailable: false }] },
      ],
      reviews: [
        { id: "thieb-review-1", authorName: "Mamadou K.", authorLocation: "Quartier Carnot", rating: 5, comment: "Cuisiné hier avec les ingrédients récupérés chez LoirIvoire en 15 minutes. Le riz brisé est impeccable, la daurade très fraîche. Le guide de dosage pour le concentré de tomate m'a évité l'amertume habituelle. Top !", createdAtIso: "2026-11-09T18:00:00Z" },
        { id: "thieb-review-2", authorName: "Chloé L.", authorLocation: "Saint-Étienne Centre", rating: 5, comment: "Première fois que je tentais un Thiéboudienne. La farce persillée Roff change tout, mes invités ont adoré le riz bien parfumé. Le panier 1-clic fait gagner un temps fou.", createdAtIso: "2026-11-05T12:00:00Z" },
      ],
    },
  },
  {
    id: "poulet-yassa",
    slug: "poulet-yassa-oignons-caramelises",
    title: "Poulet Yassa aux Oignons Caramélisés",
    countries: ["Sénégal"],
    flag: "sn",
    region: "afrique-ouest",
    durationMinutes: 45,
    servings: 4,
    difficulty: "facile",
    description: "Poulet mariné au jus de citron vert et à la moutarde forte de Dijon, braisé puis mijoté sur un lit d'oignons fondus.",
    image: { src: "/login-visual.jpg", alt: "Poulet Yassa aux oignons caramélisés" },
    originTag: "Classique Revisité",
    detail: {
      chefTipAuthor: "Fatou, épicerie LoirIvoire",
      chefTip: "L'acidité combinée de 4 citrons verts frais et d'une cuillère généreuse de moutarde de Dijon attendrit les fibres du poulet avant de le dorer à feu vif.",
      pairingTip: "Riz blanc parfumé ou attiéké",
      storeOptions: [
        { storeSlug: "loirivoire", storeName: "LoirIvoire", distanceMeters: 600, pickupMinutes: 10 },
        { storeSlug: "nimba-market", storeName: "Nimba Market", distanceMeters: 450, pickupMinutes: 10 },
      ],
      steps: [
        { order: 1, title: "La Marinade aux Citrons Verts", durationLabel: "20 min (repos)", description: "Mélangez le jus de 4 citrons verts, la moutarde forte, les oignons émincés et le poivre. Laissez mariner les morceaux de poulet au moins 20 minutes, idéalement 2h au frais." },
        { order: 2, title: "Le Dorage & la Caramélisation des Oignons", durationLabel: "15 min", description: "Égouttez le poulet (gardez la marinade), faites-le dorer à l'huile. Réservez, puis faites fondre longuement les oignons de la marinade jusqu'à caramélisation dorée." },
        { order: 3, title: "Le Mijotage Final", durationLabel: "10 min", description: "Remettez le poulet dans les oignons, ajoutez un fond de bouillon et laissez mijoter à couvert jusqu'à ce que la sauce soit onctueuse." },
      ],
      ingredients: [
        { id: "yassa-poulet", label: "Cuisses de Poulet Fermier", quantityLabel: "1,2kg", prices: [{ storeSlug: "loirivoire", price: 6.9, isAvailable: true }, { storeSlug: "nimba-market", price: 6.5, isAvailable: true }] },
        { id: "yassa-citron", label: "Citrons Verts Frais", quantityLabel: "Filet de 6", prices: [{ storeSlug: "loirivoire", price: 2.2, isAvailable: true }, { storeSlug: "nimba-market", price: 2.1, isAvailable: true }] },
        { id: "yassa-oignons", label: "Oignons Jaunes", quantityLabel: "1kg", prices: [{ storeSlug: "loirivoire", price: 1.5, isAvailable: true }, { storeSlug: "nimba-market", price: 1.4, isAvailable: true }] },
        { id: "yassa-moutarde", label: "Moutarde Forte de Dijon", quantityLabel: "Pot 200g", prices: [{ storeSlug: "loirivoire", price: 2.6, isAvailable: true }, { storeSlug: "nimba-market", price: 2.6, isAvailable: true }] },
        { id: "yassa-huile", label: "Huile Végétale", quantityLabel: "1L", prices: [{ storeSlug: "loirivoire", price: 2.4, isAvailable: true }, { storeSlug: "nimba-market", price: 2.4, isAvailable: true }] },
      ],
      reviews: [
        { id: "yassa-review-1", authorName: "Awa T.", authorLocation: "Bruxelles", rating: 5, comment: "La marinade fait toute la différence, j'avais jamais réussi un Yassa aussi fondant.", createdAtIso: "2026-11-01T10:00:00Z" },
      ],
    },
  },
  {
    id: "mafe-boeuf",
    slug: "mafe-onctueux-boeuf-pate-arachide",
    title: "Mafé Onctueux au Bœuf & Pâte d'Arachide",
    countries: ["Mali", "Sénégal"],
    flag: "ml",
    region: "afrique-ouest",
    durationMinutes: 50,
    servings: 6,
    difficulty: "facile",
    description: "Mijoté réconfortant à la sauce arachide dorée, patates douces fondantes et morceaux de bœuf marinés aux épices du Sahel.",
    image: { src: "/login-visual.jpg", alt: "Mafé onctueux au bœuf" },
    detail: {
      chefTipAuthor: "Idrissa, Saveurs d'Afrique",
      chefTip: "Une noix de tamarin diluée dans un peu d'eau tiède équilibre le gras de la pâte d'arachide. Un demi-morceau de guedj apporte l'umami authentique et indomptable.",
      storeOptions: [
        { storeSlug: "saveurs-dafrique", storeName: "Saveurs d'Afrique", distanceMeters: 1200, pickupMinutes: 10 },
        { storeSlug: "loirivoire", storeName: "LoirIvoire", distanceMeters: 600, pickupMinutes: 10 },
      ],
      steps: [
        { order: 1, title: "La Saisie du Bœuf", durationLabel: "10 min", description: "Faites dorer les morceaux de bœuf à l'huile chaude dans une cocotte, sur toutes les faces." },
        { order: 2, title: "La Sauce Arachide", durationLabel: "25 min", description: "Délayez la pâte d'arachide dans un peu de bouillon chaud, ajoutez au bœuf avec le concentré de tomate et laissez mijoter à couvert." },
        { order: 3, title: "Les Légumes & la Finition", durationLabel: "15 min", description: "Ajoutez patates douces et gombos en fin de cuisson pour qu'ils restent fermes. Rectifiez l'assaisonnement avant de servir sur riz blanc." },
      ],
      ingredients: [
        { id: "mafe-boeuf", label: "Bœuf à mijoter", quantityLabel: "800g", prices: [{ storeSlug: "saveurs-dafrique", price: 8.9, isAvailable: true }, { storeSlug: "loirivoire", price: 9.2, isAvailable: true }] },
        { id: "mafe-arachide", label: "Pâte d'Arachide Bonmafé", quantityLabel: "Pot 500g", prices: [{ storeSlug: "saveurs-dafrique", price: 3.5, isAvailable: true }, { storeSlug: "loirivoire", price: 3.6, isAvailable: true }] },
        { id: "mafe-patate", label: "Patates Douces", quantityLabel: "1kg", prices: [{ storeSlug: "saveurs-dafrique", price: 2.0, isAvailable: true }, { storeSlug: "loirivoire", price: 1.95, isAvailable: true }] },
        { id: "mafe-gombo", label: "Gombos Frais", quantityLabel: "400g", prices: [{ storeSlug: "saveurs-dafrique", price: 2.1, isAvailable: true }, { storeSlug: "loirivoire", price: 2.2, isAvailable: true }] },
        { id: "mafe-tomate", label: "Concentré de Tomate", quantityLabel: "Boîte 140g", prices: [{ storeSlug: "saveurs-dafrique", price: 1.15, isAvailable: true }, { storeSlug: "loirivoire", price: 1.1, isAvailable: true }] },
      ],
      reviews: [
        { id: "mafe-review-1", authorName: "Guillaume V.", authorLocation: "Nantes", rating: 5, comment: "Le coulis de mangue sur une viande de chèvre grillée nous avait déjà bluffés, le Mafé confirme : leurs recettes sont fiables.", createdAtIso: "2026-10-28T09:00:00Z" },
      ],
    },
  },
  {
    id: "jollof-rice",
    slug: "jollof-rice-poulet-party",
    title: "Jollof Rice & Poulet",
    countries: ["Nigéria"],
    flag: "ng",
    region: "afrique-ouest",
    durationMinutes: 50,
    servings: 6,
    difficulty: "facile",
    description: "Riz party au coulis de poivrons rouges fumés, tomates fraîches, épices secrètes et bananes pesées.",
    image: { src: "/login-visual.jpg", alt: "Jollof Rice au poulet" },
    detail: {
      chefTipAuthor: "la communauté du Carnet",
      chefTip: "Faites revenir le riz une minute dans l'huile parfumée avant d'ajouter le bouillon : chaque grain reste détaché, jamais collant.",
      storeOptions: [
        { storeSlug: "naija-markets", storeName: "Naija Markets", distanceMeters: 850, pickupMinutes: 10 },
        { storeSlug: "loirivoire", storeName: "LoirIvoire", distanceMeters: 600, pickupMinutes: 10 },
      ],
      steps: [
        { order: 1, title: "Le Coulis de Poivrons Fumés", durationLabel: "15 min", description: "Mixez poivrons rouges, tomates et piment scotch bonnet, puis faites réduire à feu moyen." },
        { order: 2, title: "Le Riz au Bouillon Parfumé", durationLabel: "25 min", description: "Faites revenir le riz, versez le coulis réduit et le bouillon, couvrez et laissez cuire à l'étouffée." },
        { order: 3, title: "Le Poulet Grillé & le Dressage", durationLabel: "10 min", description: "Servez le riz avec le poulet grillé et des bananes pesées dorées à la poêle." },
      ],
      ingredients: [
        { id: "jollof-riz", label: "Riz Long Parfumé", quantityLabel: "1kg", prices: [{ storeSlug: "naija-markets", price: 2.3, isAvailable: true }, { storeSlug: "loirivoire", price: 2.4, isAvailable: true }] },
        { id: "jollof-poivrons", label: "Poivrons Rouges & Tomates", quantityLabel: "1kg", prices: [{ storeSlug: "naija-markets", price: 2.6, isAvailable: true }, { storeSlug: "loirivoire", price: 2.7, isAvailable: true }] },
        { id: "jollof-poulet", label: "Poulet Grillé (cuisses)", quantityLabel: "800g", prices: [{ storeSlug: "naija-markets", price: 5.4, isAvailable: true }, { storeSlug: "loirivoire", price: 5.6, isAvailable: true }] },
        { id: "jollof-banane", label: "Bananes Plantains", quantityLabel: "1kg", prices: [{ storeSlug: "naija-markets", price: 2.0, isAvailable: true }, { storeSlug: "loirivoire", price: 1.9, isAvailable: true }] },
      ],
      reviews: [
        { id: "jollof-review-1", authorName: "Fatou D.", authorLocation: "Montreuil", rating: 5, comment: "Le coulis de poivrons fumés donne une profondeur incroyable, toute la famille a redemandé.", createdAtIso: "2026-10-30T16:00:00Z" },
      ],
    },
  },
  {
    id: "attieke-grand-lahou",
    slug: "attieke-grand-lahou-poisson-braise",
    title: "Attiéké de Grand-Lahou",
    countries: ["Côte d'Ivoire"],
    flag: "ci",
    region: "afrique-ouest",
    durationMinutes: 35,
    servings: 4,
    difficulty: "facile",
    description: "Semoule de manioc fermentée ultra légère servie avec tilapia entier braisé aux épices douces et oignons.",
    image: { src: "/login-visual.jpg", alt: "Attiéké de Grand-Lahou et poisson braisé" },
    detail: {
      chefTipAuthor: "l'épicerie Marché Gouro",
      chefTip: "Humidifiez légèrement l'attiéké à la vapeur avant de le servir : il retrouve tout son moelleux sans devenir pâteux.",
      storeOptions: [
        { storeSlug: "marche-gouro", storeName: "Marché Gouro", distanceMeters: 1500, pickupMinutes: 15 },
        { storeSlug: "loirivoire", storeName: "LoirIvoire", distanceMeters: 600, pickupMinutes: 10 },
      ],
      steps: [
        { order: 1, title: "Le Braisage du Poisson", durationLabel: "20 min", description: "Assaisonnez le tilapia entier d'épices douces et d'oignons émincés, puis braisez-le au four ou au grill jusqu'à ce que la peau soit dorée." },
        { order: 2, title: "La Vapeur de l'Attiéké", durationLabel: "10 min", description: "Réchauffez l'attiéké à la vapeur quelques minutes pour qu'il retrouve son moelleux." },
        { order: 3, title: "Le Dressage", durationLabel: "5 min", description: "Servez le poisson sur l'attiéké avec piment et oignons crus en accompagnement." },
      ],
      ingredients: [
        { id: "attieke-semoule", label: "Attiéké Frais d'Abidjan", quantityLabel: "Boule 500g", prices: [{ storeSlug: "marche-gouro", price: 2.2, isAvailable: true }, { storeSlug: "loirivoire", price: 2.3, isAvailable: true }] },
        { id: "attieke-tilapia", label: "Tilapia Entier", quantityLabel: "Pièce ~600g", prices: [{ storeSlug: "marche-gouro", price: 6.5, isAvailable: true }, { storeSlug: "loirivoire", price: 6.8, isAvailable: true }] },
        { id: "attieke-oignons", label: "Oignons & Piment", quantityLabel: "Lot 300g", prices: [{ storeSlug: "marche-gouro", price: 1.4, isAvailable: true }, { storeSlug: "loirivoire", price: 1.4, isAvailable: true }] },
      ],
      reviews: [
        { id: "attieke-review-1", authorName: "Kadiatou S.", authorLocation: "Saint-Étienne", rating: 5, comment: "L'attiéké était d'une fraîcheur parfaite, exactement comme chez ma grand-mère à Grand-Lahou.", createdAtIso: "2026-10-20T11:00:00Z" },
      ],
    },
  },
  {
    id: "couscous-berbere",
    slug: "couscous-berbere-7-legumes",
    title: "Couscous Berbère aux 7 Légumes",
    countries: ["Maroc"],
    flag: "ma",
    region: "maghreb",
    durationMinutes: 90,
    servings: 6,
    difficulty: "moyen",
    description: "Semoule roulée main, agneau fermier du Forez, pois chiches de plaine et bouillon safrané aux 7 légumes.",
    image: { src: "/login-visual.jpg", alt: "Couscous berbère aux 7 légumes" },
    detail: {
      chefTipAuthor: "l'épicerie Souk des Saveurs",
      chefTip: "Arrosez la semoule d'un filet d'huile d'olive et travaillez-la à la main entre chaque vapeur : elle reste aérée, jamais compacte.",
      pairingTip: "Thé à la menthe fraîche",
      storeOptions: [
        { storeSlug: "souk-des-saveurs", storeName: "Souk des saveurs", distanceMeters: 2100, pickupMinutes: 20 },
        { storeSlug: "loirivoire", storeName: "LoirIvoire", distanceMeters: 600, pickupMinutes: 10 },
      ],
      steps: [
        { order: 1, title: "Le Mijotage de l'Agneau", durationLabel: "45 min", description: "Faites dorer l'agneau avec oignons et épices (safran, gingembre, cannelle), puis mouillez et laissez mijoter." },
        { order: 2, title: "Les 7 Légumes", durationLabel: "25 min", description: "Ajoutez carottes, navets, courgettes, pois chiches et potiron dans le bouillon safrané en fin de cuisson." },
        { order: 3, title: "La Semoule à la Vapeur", durationLabel: "20 min", description: "Roulez la semoule à l'huile d'olive et passez-la 3 fois à la vapeur du couscoussier pour une texture aérée." },
      ],
      ingredients: [
        { id: "couscous-agneau", label: "Agneau Fermier du Forez", quantityLabel: "1kg", prices: [{ storeSlug: "souk-des-saveurs", price: 11.5, isAvailable: true }, { storeSlug: "loirivoire", price: 12.0, isAvailable: true }] },
        { id: "couscous-semoule", label: "Semoule Moyenne Roulée Main", quantityLabel: "1kg", prices: [{ storeSlug: "souk-des-saveurs", price: 3.2, isAvailable: true }, { storeSlug: "loirivoire", price: 3.3, isAvailable: true }] },
        { id: "couscous-pois-chiches", label: "Pois Chiches Secs", quantityLabel: "500g", prices: [{ storeSlug: "souk-des-saveurs", price: 1.8, isAvailable: true }, { storeSlug: "loirivoire", price: 1.9, isAvailable: true }] },
        { id: "couscous-legumes", label: "Légumes du Couscous (7 variétés)", quantityLabel: "Panier 1,5kg", prices: [{ storeSlug: "souk-des-saveurs", price: 4.5, isAvailable: true }, { storeSlug: "loirivoire", price: 4.7, isAvailable: true }] },
        { id: "couscous-epices", label: "Épices à Couscous (safran, ras-el-hanout)", quantityLabel: "Lot de pots", prices: [{ storeSlug: "souk-des-saveurs", price: 3.9, isAvailable: true }, { storeSlug: "loirivoire", price: 0, isAvailable: false }] },
      ],
      reviews: [
        { id: "couscous-review-1", authorName: "Amara B.", authorLocation: "Lyon", rating: 5, comment: "Les épices du Souk des Saveurs n'ont rien à voir avec les sachets industriels, le bouillon est d'une richesse incroyable.", createdAtIso: "2026-10-22T14:00:00Z" },
      ],
    },
  },
  {
    id: "colombo-cabri",
    slug: "colombo-cabri-christophines",
    title: "Colombo de Cabri",
    countries: ["Guadeloupe", "Martinique"],
    flag: "fr",
    region: "caraibes-ocean-indien",
    durationMinutes: 75,
    servings: 6,
    difficulty: "moyen",
    description: "Morceaux tendres de cabri marinés au bois d'Inde, poudre de colombo torréfiée et christophines du jardin.",
    image: { src: "/login-visual.jpg", alt: "Colombo de cabri antillais" },
    detail: {
      chefTipAuthor: "l'Épicerie du Monde",
      chefTip: "Torréfiez la poudre de colombo à sec 1 minute avant de l'incorporer : ses arômes se réveillent instantanément.",
      storeOptions: [
        { storeSlug: "epicerie-du-monde", storeName: "Épicerie du Monde", distanceMeters: 2700, pickupMinutes: 20 },
        { storeSlug: "loirivoire", storeName: "LoirIvoire", distanceMeters: 600, pickupMinutes: 10 },
      ],
      steps: [
        { order: 1, title: "La Marinade au Bois d'Inde", durationLabel: "30 min (repos)", description: "Marinez le cabri avec citron vert, ail, bois d'Inde et poudre de colombo." },
        { order: 2, title: "Le Mijotage", durationLabel: "35 min", description: "Faites revenir la viande, mouillez à hauteur et laissez mijoter à couvert jusqu'à tendreté." },
        { order: 3, title: "Les Christophines", durationLabel: "10 min", description: "Ajoutez les christophines coupées en dés en fin de cuisson pour qu'elles restent fondantes sans se défaire." },
      ],
      ingredients: [
        { id: "colombo-cabri", label: "Cabri à mijoter", quantityLabel: "1kg", prices: [{ storeSlug: "epicerie-du-monde", price: 12.5, isAvailable: true }, { storeSlug: "loirivoire", price: 13.2, isAvailable: true }] },
        { id: "colombo-poudre", label: "Poudre de Colombo", quantityLabel: "Pot 100g", prices: [{ storeSlug: "epicerie-du-monde", price: 3.4, isAvailable: true }, { storeSlug: "loirivoire", price: 3.6, isAvailable: true }] },
        { id: "colombo-christophine", label: "Christophines Fraîches", quantityLabel: "1kg", prices: [{ storeSlug: "epicerie-du-monde", price: 2.8, isAvailable: true }, { storeSlug: "loirivoire", price: 2.9, isAvailable: true }] },
        { id: "colombo-boisdinde", label: "Bois d'Inde & Ail", quantityLabel: "Lot aromates", prices: [{ storeSlug: "epicerie-du-monde", price: 2.1, isAvailable: true }, { storeSlug: "loirivoire", price: 0, isAvailable: false }] },
      ],
      reviews: [
        { id: "colombo-review-1", authorName: "Mireille P.", authorLocation: "Saint-Étienne", rating: 5, comment: "Le goût du bois d'Inde m'a ramenée direct en Guadeloupe. Introuvable ailleurs dans la région.", createdAtIso: "2026-10-15T19:00:00Z" },
      ],
    },
  },
  {
    id: "rougail-saucisses",
    slug: "rougail-saucisses-fume",
    title: "Rougail Saucisses Fumé",
    countries: ["La Réunion"],
    flag: "fr",
    region: "caraibes-ocean-indien",
    durationMinutes: 45,
    servings: 4,
    difficulty: "facile",
    description: "Saucisses artisanales fumées au bois de hêtre, concassé de tomates de pays, combava et piment.",
    image: { src: "/login-visual.jpg", alt: "Rougail saucisses fumé réunionnais" },
    detail: {
      chefTipAuthor: "l'Épicerie du Monde",
      chefTip: "Piquez légèrement les saucisses avant de les saisir : elles rendront leur gras fumé directement dans le rougail.",
      storeOptions: [{ storeSlug: "epicerie-du-monde", storeName: "Épicerie du Monde", distanceMeters: 2700, pickupMinutes: 20 }],
      steps: [
        { order: 1, title: "La Saisie des Saucisses", durationLabel: "10 min", description: "Faites dorer les saucisses fumées entières dans un peu d'huile, puis réservez." },
        { order: 2, title: "Le Rougail de Tomates", durationLabel: "25 min", description: "Faites revenir oignons et ail, ajoutez tomates concassées, combava et piment, laissez compoter." },
        { order: 3, title: "La Finition", durationLabel: "10 min", description: "Remettez les saucisses tranchées dans le rougail et laissez mijoter à couvert jusqu'à ce que la sauce épaississe." },
      ],
      ingredients: [
        { id: "rougail-saucisses", label: "Saucisses Fumées Artisanales", quantityLabel: "600g", prices: [{ storeSlug: "epicerie-du-monde", price: 6.8, isAvailable: true }] },
        { id: "rougail-tomates", label: "Tomates de Pays Concassées", quantityLabel: "1kg", prices: [{ storeSlug: "epicerie-du-monde", price: 2.6, isAvailable: true }] },
        { id: "rougail-combava", label: "Combava Frais", quantityLabel: "Lot de 3", prices: [{ storeSlug: "epicerie-du-monde", price: 2.3, isAvailable: true }] },
      ],
      reviews: [
        { id: "rougail-review-1", authorName: "Karim N.", authorLocation: "Saint-Étienne", rating: 5, comment: "Le fumé des saucisses change tout, enfin un vrai goût péi loin de chez moi.", createdAtIso: "2026-10-10T20:00:00Z" },
      ],
    },
  },
];

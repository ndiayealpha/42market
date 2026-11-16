import type { FaqItem } from "@/src/domain/faq";

export interface MerchantStep {
  number: string;
  icon: "archive" | "store" | "basket";
  title: string;
  description: string;
  bullet: string;
}

export const MERCHANT_STEPS: MerchantStep[] = [
  {
    number: "01",
    icon: "archive",
    title: "Inscription & KBIS express",
    description: "Remplissez le formulaire en 2 minutes. Notre équipe vérifie vos pièces justificatives sous 24h et active votre accès marchand.",
    bullet: "Accompagnement téléphonique dédié dès J1",
  },
  {
    number: "02",
    icon: "store",
    title: "Rayon digital 800+ références",
    description: "Activez en quelques clics les vivres exotiques et spécialités de terroir (igname, plantain, attiéké, gombo, arachides) déjà prêts.",
    bullet: "Photos HD et descriptions libres de droits",
  },
  {
    number: "03",
    icon: "basket",
    title: "Commandes Click & Collect",
    description: "Recevez les alertes instantanées. Les clients payent en ligne de façon sécurisée et viennent retirer leur sac au comptoir avec le sourire.",
    bullet: "Paiement garanti au passage en épicerie",
  },
];

export interface MerchantDemoFeature {
  icon: "sliders" | "zap" | "tag" | "credit-card";
  title: string;
  description: string;
  tag: string;
}

export const MERCHANT_DEMO_FEATURES: MerchantDemoFeature[] = [
  { icon: "sliders", title: "Stock en 1 Clic", description: "Ajustez les quantités ou marquez « Rupture » d'une simple pression de carton de bananes plantain par exemple.", tag: "Temps 1,2 sec" },
  { icon: "zap", title: "Ventes Flash & Fraîcheur", description: "Proposez les mangues mûres à prix cassé pour un tarif préférentiel et zéro perte en fin de semaine.", tag: "-30% aujourd'hui" },
  { icon: "tag", title: "Promotions & Dates Courtes", description: "Organisez vos ventes rapidement, valorisez vos dates courtes et écoutez vos données pour un étal zéro gaspillage.", tag: "Anti-gaspillage" },
  { icon: "credit-card", title: "Caisse & Trésorerie", description: "Visualisez le total encaissé en direct, l'historique des retraits et le montant viré automatiquement le mardi matin.", tag: "Virement J+7" },
];

export interface MerchantTrustItem {
  icon: "shield" | "lock" | "credit-card" | "store";
  title: string;
  description: string;
  footnote: string;
}

export const MERCHANT_TRUST_ITEMS: MerchantTrustItem[] = [
  {
    icon: "shield",
    title: "Fraîcheur & sélection à la source",
    description: "Contrôle rigoureux de chaque arrivage : feuilles fermes fraîches, régimes de bananes plantain calibrés et herbes aromatiques (ndolé, feuilles de manioc) conservées selon les normes produits.",
    footnote: "Tri qualitatif et mise à l'écart des articles dépréciés",
  },
  {
    icon: "lock",
    title: "Traçabilité DGCCRF & Allergènes",
    description: "Tous les produits importés disposent d'un étiquetage en français mentionnant la date limite optimale (DLUO), l'origine géographique certifiée et les allergènes éventuels (arachide, sésame, poisson).",
    footnote: "Fiches sanitaires contrôlées conjointement",
  },
  {
    icon: "credit-card",
    title: "Pesée loyale & Prix transparents",
    description: "Pour les produits vendus au poids (viandes boucanées, poissons séchés ou racines), balance homologuée et ajustement au centime près si le poids préparé diffère du poids commandé en ligne.",
    footnote: "Remboursement immédiat de la différence de poids",
  },
  {
    icon: "store",
    title: "Accueil fraternel au comptoir",
    description: "Le retrait de la commande n'est pas un acte anonyme : sac kraft soigné, salutation bienveillante et petit mot d'échange qui fait la noblesse des épiceries de quartier.",
    footnote: "Fidélisation durable des familles locales",
  },
];

export interface MerchantTestimonial {
  quote: string;
  name: string;
  role: string;
}

/** No real épicier reviews exist for this mock app — initials-only `Avatar` (no fabricated photo), names/roles kept generic rather than invented specifics beyond what the maquette itself shows. */
export const MERCHANT_TESTIMONIALS: MerchantTestimonial[] = [
  { quote: "J'ai trouvé mon étal affiché en 2 minutes sans traverser toute l'agglomération lyonnaise. Je réserve en Click & Collect, et mon sac est sorti du frigo quand j'arrive au travail !", name: "Alassane M.", role: "Épicier - Lyon" },
  { quote: "J'ai comparé 3 magasins avant de me déplacer pour acheter du riz jasmin en 20kg. J'ai économisé 7 euros et je suis parti avec une question au vendeur par chat avant de partir.", name: "Kévin L.", role: "Client particulier - Rennes" },
  { quote: "En tant qu'épicier, 42 Markets nous apporte une clientèle jeune qui ne rentrait pas forcément dans notre boutique. Les réservations Click & Collect sont faciles à gérer au comptoir.", name: "Mamadou B.", role: "Gérant de l'Épicerie Marché-Terroir" },
];

export const MERCHANT_FAQ_ITEMS: FaqItem[] = [
  {
    id: "merchant-faq-1",
    slug: "ordinateur-requis",
    category: "merchant",
    order: 1,
    question: "Ai-je besoin d'un ordinateur pour traiter mes commandes ?",
    answer: "Non, absolument pas ! Votre smartphone habituel (Android ou iPhone) suffit largement. Vous recevez une alerte WhatsApp dès qu'un panier a été validé et le ticket client reste consultable depuis votre écran, directement en boutique.",
  },
  {
    id: "merchant-faq-2",
    slug: "calcul-commissions",
    category: "merchant",
    order: 2,
    question: "Comment sont calculées les commissions ?",
    answer: "Le service 42 Markets prélève un pourcentage fixe uniquement sur les ventes complétées. Pas de panier ? 0€ à payer. Nous couvrons l'intégralité des frais bancaires Stripe/CB, l'hébergement et l'assistance technique.",
  },
  {
    id: "merchant-faq-3",
    slug: "produit-vendu-au-magasin",
    category: "merchant",
    order: 3,
    question: "Que faire si un produit commandé vient d'être vendu au magasin ?",
    answer: "Notre fiche de gestion dynamique vous permet de proposer immédiatement un article de substitution équivalent ou de retirer l'article de la commande d'un simple clic. Le montant final est recalculé sans aucune démarche administrative contraignante.",
  },
  {
    id: "merchant-faq-4",
    slug: "clients-habituels-comptoir",
    category: "merchant",
    order: 4,
    question: "Puis-je continuer à servir mes clients habituels au comptoir en toute indépendance ?",
    answer: "Bien entendu ! 42 Markets est un canal complémentaire de chiffre d'affaires. Vous gardez la totale maîtrise de vos prix de vente, de vos horaires d'ouverture et de votre gestion quotidienne.",
  },
];

import type { IconName } from "@/src/components/atoms/Icon/Icon";

export interface HowItWorksStep {
  number: string;
  icon: IconName;
  title: string;
  description: string;
  confirmationLabel: string;
}

/** The 4-step journey — static marketing copy, no business logic, so a typed config rather than a domain/repository round-trip. */
export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    icon: "location",
    title: "Localisez votre quartier",
    description: "Entrez votre ville ou code postal pour découvrir les épiceries exotiques indépendantes et authentiques autour de vous.",
    confirmationLabel: "Rayon de proximité personnalisé",
  },
  {
    number: "02",
    icon: "store",
    title: "Parcourez les vrais étals",
    description: "Explorez les arrivages frais du jour, les épices rares, tubercules et produits secs aux prix réels du magasin.",
    confirmationLabel: "Stocks synchronisés en direct",
  },
  {
    number: "03",
    icon: "swipe",
    title: "Réservez en Click & Collect",
    description: "Votre commerçant prépare votre commande avec soin en 15 à 30 minutes. Zéro frais de livraison, zéro intermédiaire inutile.",
    confirmationLabel: "Préparation soignée & rapide",
  },
  {
    number: "04",
    icon: "cooking",
    title: "Retirez et cuisinez vos souvenirs",
    description: "Passez en boutique, échangez un sourire chaleureux avec votre épicier et retrouvez sans attendre le goût authentique de chez vous.",
    confirmationLabel: "Retrait sans file d'attente",
  },
];

export interface HowItWorksValue {
  icon: IconName;
  eyebrowLabel: string;
  title: string;
  description: string;
}

export const HOW_IT_WORKS_VALUES: HowItWorksValue[] = [
  {
    icon: "tag",
    eyebrowLabel: "Engagement 01",
    title: "Prix justes & transparence totale",
    description:
      "Pas de surcoût artificiel appliqué sur les produits. Vous réservez au tarif exact affiché en boutique, garantissant le respect de votre pouvoir d'achat.",
  },
  {
    icon: "store",
    eyebrowLabel: "Engagement 02",
    title: "Soutien direct aux indépendants",
    description:
      "100% de la valeur de vos achats va directement à l'artisan épicier de votre quartier. Nous digitalisons leurs stocks sans prélever de marges destructrices.",
  },
  {
    icon: "shield",
    eyebrowLabel: "Engagement 03",
    title: "Authenticité & traçabilité",
    description: "Des produits récoltés et préparés selon les méthodes traditionnelles, préservant la fraîcheur, les arômes d'origine et la richesse nutritive.",
  },
];

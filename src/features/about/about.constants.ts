export interface CountryChip {
  emoji: string;
  label: string;
}

/** Decorative brand content (the diaspora this marketplace serves), not a filterable facet — no store in this app carries an "origin country" field, so these chips link generically to the épiceries listing rather than claiming a per-country filter that doesn't exist. */
export const FEATURED_COUNTRIES: CountryChip[] = [
  { emoji: "🇸🇳", label: "Sénégal" },
  { emoji: "🇨🇮", label: "Côte d'Ivoire" },
  { emoji: "🇲🇱", label: "Mali" },
  { emoji: "🇨🇲", label: "Cameroun" },
  { emoji: "🇬🇳", label: "Guinée" },
  { emoji: "🇧🇯", label: "Bénin" },
  { emoji: "🇹🇬", label: "Togo" },
  { emoji: "🇳🇬", label: "Nigéria" },
  { emoji: "🇬🇭", label: "Ghana" },
  { emoji: "🇨🇩", label: "RDC" },
  { emoji: "🇨🇬", label: "Congo" },
  { emoji: "🇬🇦", label: "Gabon" },
  { emoji: "🇰🇪", label: "Kenya" },
  { emoji: "🇪🇹", label: "Éthiopie" },
  { emoji: "🇪🇬", label: "Égypte" },
];

/** Shown only after "Voir plus". */
export const MORE_COUNTRIES: CountryChip[] = [
  { emoji: "🇿🇦", label: "Afrique du Sud" },
  { emoji: "🇷🇼", label: "Rwanda" },
  { emoji: "🇭🇹", label: "Haïti" },
  { emoji: "🇲🇶", label: "Martinique" },
  { emoji: "🇬🇵", label: "Guadeloupe" },
  { emoji: "🇲🇦", label: "Maroc" },
  { emoji: "🇩🇿", label: "Algérie" },
  { emoji: "🇹🇳", label: "Tunisie" },
  { emoji: "🇲🇬", label: "Madagascar" },
  { emoji: "🇲🇺", label: "Maurice" },
  { emoji: "🇱🇧", label: "Liban" },
  { emoji: "🇸🇾", label: "Syrie" },
  { emoji: "🇹🇭", label: "Thaïlande" },
  { emoji: "🇰🇭", label: "Cambodge" },
  { emoji: "🇱🇦", label: "Laos" },
  { emoji: "🇵🇭", label: "Philippines" },
  { emoji: "🇮🇳", label: "Inde" },
  { emoji: "🇵🇰", label: "Pakistan" },
  { emoji: "🇧🇩", label: "Bangladesh" },
  { emoji: "🇯🇵", label: "Japon" },
  { emoji: "🇨🇳", label: "Chine" },
  { emoji: "🇲🇾", label: "Malaisie" },
  { emoji: "🇮🇩", label: "Indonésie" },
  { emoji: "🇱🇰", label: "Sri Lanka" },
];

export interface AboutStat {
  value: string;
  label: string;
  description: string;
}

export const ABOUT_STATS: AboutStat[] = [
  { value: "500+", label: "Épiceries partenaires", description: "Commerces indépendants référencés et vérifiés par l'équipe." },
  { value: "10 000+", label: "Produits authentiques", description: "Légumes frais, féculents, épices pures, condiments et poissons fumés." },
  { value: "100%", label: "Click & Collect gratuit", description: "Aucun frais caché ni commission abusive sur votre panier." },
  { value: "0 km", label: "De frustration", description: "Stock vérifié en temps réel avant même de vous déplacer." },
];

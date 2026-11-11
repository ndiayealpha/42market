import type { FaqItem } from "@/src/domain/faq";

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    slug: "arrivages-fraicheur",
    category: "produits",
    order: 1,
    question: "D'où proviennent les produits frais et à quel rythme arrivent-ils ?",
    answer:
      "Chaque épicier indépendant partenaire de 42 Markets réceptionne deux à trois arrivages directs par semaine depuis Rungis et des coopératives certifiées d'Afrique de l'Ouest, d'Afrique Centrale et des Caraïbes. Les dates de nouvel arrivage (igname blanc Pona, plantain, feuilles de patate douce) sont indiquées directement sur la fiche de l'épicerie pour vous garantir une fraîcheur absolue.",
  },
  {
    id: "faq-2",
    slug: "substitution-intelligente",
    category: "recettes",
    order: 2,
    question: "Comment fonctionne la « Substitution Intelligente » pour mes recettes (Mafé, Ndolé, Thiéboudienne) ?",
    // TODO contenu à valider — réponse plausible, aucune source maquette.
    answer:
      "Quand un ingrédient d'une recette (pâte d'arachide, feuilles de ndolé, poisson fumé...) est en rupture chez votre épicerie la plus proche, 42 Markets vous propose automatiquement l'équivalent le plus proche disponible chez le même commerçant — même variété ou variété voisine, au même rayon — avant de valider votre panier recette.",
  },
  {
    id: "faq-3",
    slug: "paiement-especes",
    category: "paiement",
    order: 3,
    question: "Puis-je payer en espèces directement au magasin lors du Click & Collect ?",
    // TODO contenu à valider — réponse plausible, aucune source maquette.
    answer:
      "Oui. Le paiement en ligne au moment de la réservation sécurise votre créneau de retrait, mais chaque épicerie partenaire accepte aussi le règlement en espèces ou en carte directement au comptoir si vous préférez finaliser sur place.",
  },
  {
    id: "faq-4",
    slug: "transferts-argent-colis-pays",
    category: "services",
    order: 4,
    question: "Mon épicerie propose-t-elle les transferts d'argent (Ria, Western Union) ou les colis pays ?",
    // TODO contenu à valider — réponse plausible, aucune source maquette.
    answer:
      "Cela dépend de chaque épicerie : plusieurs de nos commerçants partenaires proposent déjà les transferts d'argent et l'envoi de colis pays en plus de leur rayon épicerie. Le service, quand il existe, est indiqué sur la fiche de l'épicerie — sinon, votre épicier saura vous orienter vers le point relais le plus proche.",
  },
  {
    id: "faq-5",
    slug: "bananes-plantains-mures",
    category: "produits",
    order: 5,
    question: "Que faire si les bananes plantains sont trop mûres ou ne correspondent pas à mon plat ?",
    // TODO contenu à valider — réponse plausible, aucune source maquette.
    answer:
      "Signalez-le à l'épicier au moment du retrait : il ajuste votre sac séance tenante avec un autre calibre de maturité (vert pour l'alloco, bien mûr pour le sucré) sans frais supplémentaire. C'est tout l'intérêt de retirer en boutique plutôt qu'en livraison à l'aveugle.",
  },
];

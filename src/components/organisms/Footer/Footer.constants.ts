import { routes } from "@/src/lib/routing/routes";

import type { FooterBrandConfig, FooterLinkGroupConfig, LegalLink, TrustItemConfig } from "./Footer.types";

/** Config-driven footer content — every link below resolves to a real route or anchor, no placeholders. */
export const TRUST_ITEMS: TrustItemConfig[] = [
  { icon: "clock", title: "Click & Collect Garanti 2h", description: "Préparé avec soin par votre commerçant" },
  { icon: "shield", title: "Conforme DGCCRF & Traçabilité", description: "Réglementation sanitaire & origine certifiée" },
  { icon: "store", title: "Soutien au commerce local", description: "Circuit court et épiceries indépendantes" },
];

export const FOOTER_BRAND: FooterBrandConfig = {
  description:
    "Marketplace dédiée aux épiceries exotiques indépendantes et produits du monde. Connectez vos envies culinaires au savoir-faire de nos commerçants.",
  address: "42 Cours Fauriel, 42100 Saint-Étienne",
};

export const DISCOVER_LINKS: FooterLinkGroupConfig = {
  title: "Découvrir",
  links: [
    { label: "À propos de 42 markets", href: routes.main.about },
    { label: "Comment ça marche", href: routes.main.howItWorks },
    { label: "Nouveautés", href: routes.main.newArrivals, tag: "Frais" },
    { label: "Promotions", href: routes.main.bonsPlans },
  ],
};

export const SUPPORT_LINKS: FooterLinkGroupConfig = {
  title: "Aide & Support",
  links: [
    { label: "FAQ clients", href: routes.main.faq },
    { label: "Contactez-nous", href: routes.main.contact },
    { label: "Signaler un problème", href: `${routes.main.contact}?motif=probleme` },
  ],
};

export const MERCHANT_LINKS: FooterLinkGroupConfig = {
  title: "Commerçants",
  links: [
    { label: "Ouvrir une boutique", href: routes.main.merchantOnboarding },
    { label: "Charte qualité", href: `${routes.main.merchantOnboarding}#charte-qualite` },
    { label: "Conditions vendeurs", href: `${routes.main.merchantOnboarding}#conditions-vendeurs` },
    { label: "FAQ épiciers exotiques", href: `${routes.main.merchantOnboarding}#faq` },
  ],
};

export const LEGAL_LINKS: LegalLink[] = [
  { label: "Mentions Légales", href: routes.main.legalNotice },
  { label: "Politique de Confidentialité", href: routes.main.privacyPolicy },
  { label: "CGV & Rétractation", href: routes.main.termsOfSale },
  { label: "Gestion des Cookies", href: routes.main.cookiePolicy },
];

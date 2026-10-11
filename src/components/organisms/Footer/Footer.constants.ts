import { routes } from "@/src/lib/routing/routes";

import type { FooterBrandConfig, FooterLinkGroupConfig, LegalLink, TrustItemConfig } from "./Footer.types";

/**
 * Config-driven footer content. Several targets below (charte-qualite,
 * conditions-vendeurs, ...) don't have a real page yet — this is where
 * that page's route goes once it exists, not a claim it already does.
 */
export const TRUST_ITEMS: TrustItemConfig[] = [
  { icon: "clock", title: "Click & Collect Garanti 2h", description: "Préparé avec soin par votre commerçant" },
  { icon: "shield", title: "Conforme DGCCRF & Traçabilité", description: "Réglementation sanitaire & origine certifiée" },
  { icon: "store", title: "Soutien au commerce local", description: "Circuit court et épiceries indépendantes" },
];

export const FOOTER_BRAND: FooterBrandConfig = {
  description:
    "Marketplace dédiée aux épiceries exotiques indépendantes et produits du monde. Connectez vos envies culinaires au savoir-faire de nos commerçants.",
  address: "42 Rue Charles de Gaulle, 42100 Saint-Étienne",
};

export const DISCOVER_LINKS: FooterLinkGroupConfig = {
  title: "Découvrir",
  links: [
    { label: "À propos de 42 markets", href: "/main/about" },
    { label: "Comment ça marche", href: "/main/how-it-works" },
    { label: "Nouveautés", href: "/main/nouvel-arrivage", tag: "Frais" },
    { label: "Promotions", href: "/main/bonnes-affaires" },
  ],
};

export const SUPPORT_LINKS: FooterLinkGroupConfig = {
  title: "Aide & Support",
  links: [
    { label: "FAQ clients", href: "/main/faq" },
    { label: "Click collect", href: "/main/click-collect" },
    { label: "Contactez-nous", href: "/main/aide-et-contacts" },
    { label: "Signaler un problème", href: "/main/report" },
  ],
};

export const MERCHANT_LINKS: FooterLinkGroupConfig = {
  title: "Commerçants",
  links: [
    { label: "Ouvrir une boutique", href: routes.auth.createAccount },
    { label: "Charte qualité", href: "/main/charte-qualite" },
    { label: "Conditions vendeurs", href: "/main/conditions-vendeurs" },
    { label: "FAQ épiciers exotiques", href: "/main/faq-epiciers" },
  ],
};

export const LEGAL_LINKS: LegalLink[] = [
  { label: "Mentions Légales", href: "/main/mentions-legales" },
  { label: "Politique de Confidentialité", href: "/main/confidentialite" },
  { label: "CGV & Rétractation", href: "/main/cgv" },
  { label: "Gestion des Cookies", href: "/main/cookies" },
];

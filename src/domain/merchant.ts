import { isValidEmail, isValidFrenchPhone } from "@/src/lib/validators";

export type MerchantSpecialty = "afrique-ouest" | "afrique-centrale" | "maghreb-epices" | "antilles-caraibes" | "ocean-indien" | "asie-exotique";

export const MERCHANT_SPECIALTY_LABELS: Record<MerchantSpecialty, string> = {
  "afrique-ouest": "Afrique de l'Ouest",
  "afrique-centrale": "Afrique Centrale",
  "maghreb-epices": "Maghreb & Épices",
  "antilles-caraibes": "Antilles & Caraïbes",
  "ocean-indien": "Océan Indien",
  "asie-exotique": "Asie & Exotique",
};

export type MerchantService = "transfert-argent" | "point-relais-colis" | "boucherie-halal" | "cosmetiques";

export const MERCHANT_SERVICE_LABELS: Record<MerchantService, string> = {
  "transfert-argent": "Transfert d'argent (Ria / Western Union)",
  "point-relais-colis": "Point Relais Colis (Mondial Relay / DPD)",
  "boucherie-halal": "Boucherie Halal / Découpe",
  cosmetiques: "Cosmétiques / Mèches & Soins",
};

export type MerchantPlan = "decouverte" | "pro" | "business";
export type MerchantBillingPeriod = "monthly" | "annual";

export interface MerchantPlanOption {
  id: MerchantPlan;
  name: string;
  tagline?: string;
  monthlyPrice: number;
  features: string[];
}

/** Annual billing is "2 mois offerts" — 10 months' worth billed over 12, not a separate fixture. */
export const MERCHANT_PLANS: MerchantPlanOption[] = [
  {
    id: "decouverte",
    name: "Découverte",
    tagline: "Pour démarrer et tester sa visibilité digitale",
    monthlyPrice: 0,
    features: ["Fiche magasin vérifiée & la carte", "Catalogue jusqu'à 50 produits", "Horaires et services commerçants", "Réservations Click & Collect"],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Pour les grandes surfaces exotiques et commerces multi-rayons",
    monthlyPrice: 29,
    features: [
      "Produits & condiments illimités",
      "Mise en avant locale du quartier",
      "Publication des alertes arrivages frais",
      "Statistiques de consultations produits",
      "Support prioritaire par WhatsApp",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Pour les grandes surfaces exotiques et commerces multi-rayons",
    monthlyPrice: 79,
    features: [
      "Priorité #1 dans les résultats de recherche",
      "Mise en avant régionale & newsletter",
      "Badge officiel « Partenaire Recommandé »",
      "Accompagnement catalogue sur-mesure",
    ],
  },
];

export function getMerchantPlan(id: MerchantPlan): MerchantPlanOption {
  const plan = MERCHANT_PLANS.find((candidate) => candidate.id === id);
  if (!plan) throw new Error(`Unknown merchant plan: ${id}`);
  return plan;
}

/** Annual price for the whole year, "2 mois offerts" (10 months billed) — 0 stays 0 for the free plan. */
export function getMerchantAnnualPrice(plan: MerchantPlanOption): number {
  return plan.monthlyPrice * 10;
}

export function formatMerchantPlanPrice(plan: MerchantPlanOption, period: MerchantBillingPeriod): string {
  if (plan.monthlyPrice === 0) return "Gratuit";
  return period === "monthly" ? `${plan.monthlyPrice} €` : `${Math.round(getMerchantAnnualPrice(plan) / 12)} €`;
}

export interface MerchantApplicationInput {
  managerName: string;
  storeName: string;
  siret: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  specialties: MerchantSpecialty[];
  services: MerchantService[];
  estimatedReferenceCount: number;
  plan: MerchantPlan;
  /** File metadata only — no upload endpoint exists in this mock app, same scope as every other mock mutation. */
  kbisFileName: string;
}

export interface MerchantApplication extends MerchantApplicationInput {
  id: string;
  createdAtIso: string;
}

export interface MerchantApplicationErrors {
  managerName?: string;
  storeName?: string;
  siret?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  kbisFileName?: string;
}

const SIRET_PATTERN = /^\d{14}$/;
const POSTAL_CODE_PATTERN = /^\d{5}$/;

export function validateMerchantApplication(input: MerchantApplicationInput): MerchantApplicationErrors {
  const errors: MerchantApplicationErrors = {};

  if (input.managerName.trim().length < 2) errors.managerName = "Indiquez le nom du gérant.";
  if (input.storeName.trim().length < 2) errors.storeName = "Indiquez le nom de l'épicerie.";
  if (!SIRET_PATTERN.test(input.siret.trim())) errors.siret = "Le SIRET doit comporter exactement 14 chiffres.";
  if (input.address.trim().length < 5) errors.address = "Indiquez l'adresse complète du magasin.";
  if (input.city.trim().length < 2) errors.city = "Indiquez la ville.";
  if (!POSTAL_CODE_PATTERN.test(input.postalCode.trim())) errors.postalCode = "Le code postal doit comporter 5 chiffres.";
  if (!isValidFrenchPhone(input.phone)) errors.phone = "Numéro de téléphone invalide.";
  if (!isValidEmail(input.email)) errors.email = "Adresse email professionnelle invalide.";
  if (!input.kbisFileName) errors.kbisFileName = "L'extrait Kbis (ou attestation INSEE) est requis.";

  return errors;
}

export function hasMerchantApplicationErrors(errors: MerchantApplicationErrors): boolean {
  return Object.values(errors).some((value) => value !== undefined);
}

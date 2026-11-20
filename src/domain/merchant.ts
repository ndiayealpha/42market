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

/** F7 (2026-11-17 UAT): the pricing section (plan picker, tiers, billing toggle) is gone — every application submits this one remaining plan. */
export type MerchantPlan = "decouverte" | "pro" | "business";

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

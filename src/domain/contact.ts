import { isValidFrenchPhone } from "@/src/lib/validators";

export type ContactMotif = "panier" | "produit-introuvable" | "commande" | "probleme" | "partenariat" | "autre";

export const CONTACT_MOTIF_LABELS: Record<ContactMotif, string> = {
  panier: "Question sur un panier Click & Collect",
  "produit-introuvable": "Produit introuvable",
  commande: "Suivi de commande",
  probleme: "Signaler un problème",
  partenariat: "Devenir partenaire",
  autre: "Autre demande",
};

export function isContactMotif(value: string): value is ContactMotif {
  return value in CONTACT_MOTIF_LABELS;
}

export interface ContactRequestInput {
  fullName: string;
  phone: string;
  motif: ContactMotif;
  storeSlug?: string;
  message: string;
}

export interface ContactRequest extends ContactRequestInput {
  id: string;
  createdAtIso: string;
}

export interface ContactFormErrors {
  fullName?: string;
  phone?: string;
  motif?: string;
  message?: string;
}

/** Pure client+server-shared validation — same field set either side, no network call. */
export function validateContactRequest(input: ContactRequestInput): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (input.fullName.trim().length < 2) {
    errors.fullName = "Indiquez votre nom complet.";
  }
  if (!isValidFrenchPhone(input.phone)) {
    errors.phone = "Numéro de téléphone invalide.";
  }
  if (!isContactMotif(input.motif)) {
    errors.motif = "Choisissez un motif.";
  }
  if (input.message.trim().length < 10) {
    errors.message = "Votre message doit faire au moins 10 caractères.";
  }

  return errors;
}

export function hasContactFormErrors(errors: ContactFormErrors): boolean {
  return Object.values(errors).some((value) => value !== undefined);
}

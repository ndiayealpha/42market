import type { IconName } from "@/src/components/atoms/Icon/Icon";

export interface PaymentMethodSummary {
  brand: string;
  last4: string;
  isVerified: boolean;
  verifiedWith?: string;
}

export interface AddressesSummary {
  homeCity: string;
  favoritePickupCount: number;
}

export interface SecuritySummary {
  isPasswordUpToDate: boolean;
  isTwoFactorEnabled: boolean;
}

export interface NotificationPreferences {
  smsOnOrderReady: boolean;
  /** Browser push permission mirror — the actual subscription (service worker) is out of scope, see `WebPushGateway`. */
  webPushEnabled: boolean;
  terroirNewsletter: boolean;
}

export interface AccountSettingsSummary {
  email: string;
  /** Raw, unmasked — masking happens in the repository (the data-layer boundary), never in a component. */
  phone: string;
  /** SMS notifications require a verified number — the Notifications page's "Alertes SMS Retrait" switch disables itself when this is `false`. */
  isPhoneVerified: boolean;
  payment: PaymentMethodSummary;
  addresses: AddressesSummary;
  security: SecuritySummary;
}

/** "+33 6 42 ** ** 18" — keeps the first 3 groups and the last group, masks everything between. */
export function maskPhone(phone: string): string {
  const groups = phone.trim().split(/\s+/);
  if (groups.length <= 4) return phone;
  return groups.map((group, index) => (index < 3 || index === groups.length - 1 ? group : "**")).join(" ");
}

/** "Visa •••• 4210 • Apple Pay vérifié" / "Visa •••• 4210" when nothing verifies it. */
export function formatPaymentMethodLabel(payment: PaymentMethodSummary): string {
  const base = `${payment.brand} •••• ${payment.last4}`;
  return payment.isVerified && payment.verifiedWith ? `${base} • ${payment.verifiedWith} vérifié` : base;
}

/** "Domicile Saint-Étienne • 2 points relais favoris" / "... • 1 point relais favori" (singular only for exactly 1 — fr-FR treats 0 as plural). */
export function formatAddressesLabel(addresses: AddressesSummary): string {
  const noun = addresses.favoritePickupCount === 1 ? "point relais favori" : "points relais favoris";
  return `Domicile ${addresses.homeCity} • ${addresses.favoritePickupCount} ${noun}`;
}

/** "Mot de passe à jour • Double authentification désactivée" — replaces the maquette's unrelated subtitle (écart signalé). */
export function formatSecurityLabel(security: SecuritySummary): string {
  const passwordPart = security.isPasswordUpToDate ? "Mot de passe à jour" : "Mot de passe à renouveler";
  const twoFactorPart = security.isTwoFactorEnabled
    ? "Double authentification activée"
    : "Double authentification désactivée";
  return `${passwordPart} • ${twoFactorPart}`;
}

export type SettingsRow =
  | { id: string; icon: IconName; title: string; description: string; trailing: "chevron"; href: string }
  | { id: string; icon: IconName; title: string; description: string; trailing: "action"; actionLabel: string; href: string };

import type { AccountSettingsSummary, NotificationPreferences } from "@/src/domain/account-settings";

export const ACCOUNT_SETTINGS: AccountSettingsSummary = {
  email: "aissatou@example.com",
  phone: "+33 6 42 18 90 18", // not in the maquette (shown pre-masked there) — plausible placeholder, flagged
  isPhoneVerified: true,
  payment: { brand: "Visa", last4: "4210", isVerified: true, verifiedWith: "Apple Pay" },
  addresses: { homeCity: "Saint-Étienne", favoritePickupCount: 2 },
  // The maquette's "Produits rares du Sénégal & Mali" subtitle under "Sécurité du compte" is
  // unrelated to security — hypothesis #5: replaced with a real security summary from data.
  security: { isPasswordUpToDate: true, isTwoFactorEnabled: false },
};

export const NOTIFICATION_PREFERENCES: NotificationPreferences = {
  smsOnOrderReady: true,
  webPushEnabled: true,
  terroirNewsletter: false,
};

/** Fixture for user id "2" ("Admin" test login) — a coherent email this time, and a different combination (unverified payment, 2FA on, notifications off) to also cover those branches live. */
export const ADMIN_ACCOUNT_SETTINGS: AccountSettingsSummary = {
  email: "admin@example.com",
  phone: "+33 6 00 11 22 33",
  isPhoneVerified: false,
  payment: { brand: "Mastercard", last4: "7788", isVerified: false },
  addresses: { homeCity: "Saint-Étienne", favoritePickupCount: 0 },
  security: { isPasswordUpToDate: false, isTwoFactorEnabled: true },
};

export const ADMIN_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  smsOnOrderReady: false,
  webPushEnabled: false,
  terroirNewsletter: true,
};

import type { FullOrder } from "@/src/domain/orders";

/**
 * Dates are computed relative to the real clock at module load, not
 * hardcoded to a fixed calendar date — unlike the Notifications feature's
 * deliberately frozen `NOTIFICATIONS_NOW`, Page S is a live, polling page
 * (`useOrderTracking`/`useOrderReminder`), so "Aujourd'hui"/"il y a N min"
 * must stay true regardless of when the demo is actually run. The mock
 * repository also refreshes `lastUpdatedIso` to "now" on every read,
 * simulating a live backend heartbeat.
 */
const now = new Date();
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 3_600_000).toISOString();
const minutesFromNow = (minutes: number) => new Date(now.getTime() + minutes * 60_000).toISOString();
const minutesAgo = (minutes: number) => new Date(now.getTime() - minutes * 60_000).toISOString();

const REFERENCE_STORE: FullOrder["store"] = {
  slug: "loirivoire",
  name: "LoirIvoire",
  street: "32 rue des docteurs Charcot",
  city: "42000 Saint-Étienne",
  counterInfo: "Comptoir retrait prioritaire",
  phone: "04 77 32 19 80",
  distanceMeters: 1200,
  openUntilLabel: "Ouvert aujourd'hui jusqu'à 19h30",
  isOpenNow: true,
  consigneNote: "Consigne réfrigérée active",
  mapCaption: "Places dépose-minute devant la boutique",
};

const REFERENCE_LINES: FullOrder["lines"] = [
  {
    id: "line-panier-saison",
    name: "Panier de Saison Maraîcher",
    packagingLabel: "Origine Loire 42 • 1 unité",
    quantity: 1,
    unitPrice: 12.5,
    image: { src: "/offer-attieke-frais.jpg", alt: "Panier de Saison Maraîcher" },
    accrocheLabel: "Récolté sous 48h",
  },
  {
    id: "line-fraises-gariguette",
    name: "Fraises Gariguette Bio",
    packagingLabel: "Barquette 250g",
    quantity: 1,
    unitPrice: 3.4,
    image: { src: "/stock-strawberry-jam.jpg", alt: "Fraises Gariguette Bio" },
    accrocheLabel: "Cueillette d'hier",
  },
  {
    id: "line-attieke-frais",
    name: "Attiéké Frais d'Abidjan",
    packagingLabel: "Sachet sous vide 500g",
    quantity: 1,
    unitPrice: 3.9,
    image: { src: "/offer-attieke-frais.jpg", alt: "Attiéké Frais d'Abidjan" },
    accrocheLabel: "Import direct coopérative",
  },
];

/** The reference order — id fixed to `"cmd-4289"` by cross-team contract: Page K's `placeOrder` always redirects here on success. */
export const REFERENCE_ORDER: FullOrder = {
  id: "cmd-4289",
  ownerUserId: "1",
  reference: "#CMD-4289",
  status: "preparing",
  createdAtIso: hoursAgo(2),
  lastUpdatedIso: minutesAgo(2),
  isExpress: true,
  reminderEnabled: true,
  store: REFERENCE_STORE,
  pickupWindow: { startIso: minutesFromNow(30), endIso: minutesFromNow(90) },
  lines: REFERENCE_LINES,
  vatRatePercent: 5.5,
  payment: { method: "online", cardLast4: "4242", isPaid: true },
  qrToken: "demo-qr-token-cmd-4289",
  pin: "8492",
  preparerFirstName: "Mamadou",
};

export const READY_ORDER: FullOrder = {
  ...REFERENCE_ORDER,
  id: "cmd-3104",
  reference: "#CMD-3104",
  status: "ready",
  pickupWindow: { startIso: minutesAgo(5), endIso: minutesFromNow(25) },
};

export const COMPLETED_ORDER: FullOrder = {
  ...REFERENCE_ORDER,
  id: "cmd-2890",
  reference: "#CMD-2890",
  status: "completed",
  isExpress: false,
  reminderEnabled: false,
  pickupWindow: { startIso: hoursAgo(1), endIso: minutesAgo(30) },
};

export const CANCELLED_ORDER: FullOrder = {
  ...REFERENCE_ORDER,
  id: "cmd-2771",
  reference: "#CMD-2771",
  status: "cancelled",
  isExpress: false,
  reminderEnabled: false,
  payment: { method: "online", cardLast4: "4242", isPaid: false },
};

export const UNPAID_ONSITE_ORDER: FullOrder = {
  ...REFERENCE_ORDER,
  id: "cmd-1120",
  reference: "#CMD-1120",
  payment: { method: "onsite", isPaid: false },
};

/** Owned by the "Admin" demo user (id "2") — exercises Page S's ownership check (another user's order id must 404, not leak data). */
export const ADMIN_ORDER: FullOrder = {
  ...REFERENCE_ORDER,
  id: "cmd-9001",
  ownerUserId: "2",
  reference: "#CMD-9001",
};

export const FULL_ORDERS: Record<string, FullOrder> = Object.fromEntries(
  [REFERENCE_ORDER, READY_ORDER, COMPLETED_ORDER, CANCELLED_ORDER, UNPAID_ONSITE_ORDER, ADMIN_ORDER].map((order) => [order.id, order])
);

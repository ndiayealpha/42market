import type { ActiveOrder, OrderHistoryEntry } from "@/src/domain/orders";

export const ACTIVE_ORDER: ActiveOrder = {
  id: "cmd-9021",
  reference: "#CMD-9021",
  status: "preparing",
  pickupModeLabel: "Click & Collect 2h",
  etaLabel: "À 16h30",
  store: {
    slug: "loirivoire",
    name: "Épicerie Partenaire LoirIvoire",
    street: "32 rue des docteurs Charcot",
    city: "42000 Saint-Étienne",
    counterInfo: "Comptoir retrait prioritaire",
    phone: "04 77 32 19 80",
    distanceMeters: 650,
  },
  itemsSummary: "3 articles (Fonio précuit 500g, Feuilles d'oseille fraîche, Bissap rouge 1L)",
  totalAmount: 24.5,
  pin: "7035",
};

export const ORDER_HISTORY: OrderHistoryEntry[] = [
  {
    id: "cmd-8842",
    reference: "#CMD-8842",
    dateIso: "2025-02-14",
    storeName: "Épicerie LoirIvoire",
    fulfillmentLabel: "Retiré avec succès",
    amount: 48.9,
    status: "completed",
  },
  {
    id: "cmd-8610",
    reference: "#CMD-8610",
    dateIso: "2025-01-28",
    storeName: "Comptoir Saveurs du Sahel",
    fulfillmentLabel: "Livré en consigne",
    amount: 31.2,
    status: "completed",
  },
];

export const ORDERS_TOTAL_COUNT = 12;

/** Fixture for user id "2" ("Admin" test login) — a different active order (status "ready", to also cover that tone) and a shorter history. */
export const ADMIN_ACTIVE_ORDER: ActiveOrder = {
  id: "cmd-1042",
  reference: "#CMD-1042",
  status: "ready",
  pickupModeLabel: "Click & Collect 1h",
  etaLabel: "À 11h00",
  store: {
    slug: "saveurs-du-sahel",
    name: "Comptoir Saveurs du Sahel",
    street: "14 avenue de la République",
    city: "42000 Saint-Étienne",
    counterInfo: "Retrait au comptoir",
    phone: "04 77 00 00 00",
    distanceMeters: 1200,
  },
  itemsSummary: "2 articles (Café Robusta 250g, Attiéké frais 500g)",
  totalAmount: 12.8,
  pin: "4821",
};

export const ADMIN_ORDER_HISTORY: OrderHistoryEntry[] = [
  {
    id: "cmd-1001",
    reference: "#CMD-1001",
    dateIso: "2025-03-01",
    storeName: "Comptoir Saveurs du Sahel",
    fulfillmentLabel: "Retiré avec succès",
    amount: 9.9,
    status: "completed",
  },
];

export const ADMIN_ORDERS_TOTAL_COUNT = 3;

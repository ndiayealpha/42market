import type { IconName } from "@/src/components/atoms/Icon/Icon";
import type { Media } from "@/src/domain/store-merchandising";
import { formatTime } from "@/src/lib/format";

export type OrderStatus = "preparing" | "ready" | "completed" | "cancelled";

export interface OrderStatusConfig {
  label: string;
  tone: "success" | "info" | "warning" | "danger";
}

/** Table, not a switch — adding a status means adding one line here (rule O). */
export const ORDER_STATUS_CONFIG: Record<OrderStatus, OrderStatusConfig> = {
  preparing: { label: "En préparation chez l'artisan", tone: "warning" },
  ready: { label: "Prêt à retirer", tone: "info" },
  completed: { label: "Retiré avec succès", tone: "success" },
  cancelled: { label: "Annulée", tone: "danger" },
};

export function getOrderStatusConfig(status: OrderStatus): OrderStatusConfig {
  return ORDER_STATUS_CONFIG[status];
}

export interface PickupStore {
  /** Feeds `StoreAvatar`'s deterministic tone/initials — the same store must get the same tile color everywhere it's shown. */
  slug: string;
  name: string;
  street: string;
  city: string;
  counterInfo: string;
  phone: string;
  distanceMeters: number;
}

export interface ActiveOrder {
  id: string;
  reference: string;
  status: OrderStatus;
  pickupModeLabel: string;
  etaLabel: string;
  store: PickupStore;
  itemsSummary: string;
  totalAmount: number;
  /** Optional: older/synthetic active orders may not carry one yet — `QrCodeDialog` falls back to a placeholder PIN rather than crashing. */
  pin?: string;
}

export interface OrderHistoryEntry {
  id: string;
  reference: string;
  dateIso: string;
  storeName: string;
  fulfillmentLabel: string;
  amount: number;
  status: OrderStatus;
}

/**
 * The richer record behind Page S (confirmation + live tracking) — additive
 * to `ActiveOrder` (Profile's own summary card), not a replacement: the two
 * views need different shapes (a one-line summary vs. full line items,
 * payment, QR token, PIN), and nothing here changes `ActiveOrder`'s
 * existing consumers.
 */
export interface FullOrderLine {
  id: string;
  name: string;
  packagingLabel: string;
  quantity: number;
  unitPrice: number;
  image: Media;
  accrocheLabel?: string;
}

export interface FullOrderStore extends PickupStore {
  openUntilLabel: string;
  /** Precomputed rather than derived from raw opening hours (this store record doesn't carry them) — the fixture author decides, same spirit as `openUntilLabel`. */
  isOpenNow: boolean;
  consigneNote: string;
  mapCaption?: string;
}

export interface FullOrder {
  id: string;
  /** Owning demo user id ("1" | "2") — Page S treats a mismatch as `notFound()`, same spirit as every other per-user fixture in this app (`ACTIVE_ORDER`/`ADMIN_ACTIVE_ORDER`, `FAVORITE_PRODUCTS`, ...). */
  ownerUserId: string;
  reference: string;
  status: OrderStatus;
  createdAtIso: string;
  lastUpdatedIso: string;
  isExpress: boolean;
  reminderEnabled: boolean;
  store: FullOrderStore;
  pickupWindow: { startIso: string; endIso: string };
  lines: FullOrderLine[];
  vatRatePercent: number;
  payment: { method: "online" | "onsite"; cardLast4?: string; isPaid: boolean };
  qrToken: string;
  pin: string;
  preparerFirstName?: string;
}

export interface OrderStatusHeroConfig {
  icon: IconName;
  tone: OrderStatusConfig["tone"];
  title: string;
  description: (storeName: string) => string;
}

/** Only "preparing" is maquetted (S1) — the other 3 derive from this same table/vocabulary rather than being invented ad hoc (flagged in the compte-rendu). */
export const ORDER_STATUS_HERO_CONFIG: Record<OrderStatus, OrderStatusHeroConfig> = {
  preparing: {
    icon: "check-circle",
    tone: "warning",
    title: "Commande validée ! Votre panier est en cours de préparation",
    description: (storeName) =>
      `Merci pour votre commande chez ${storeName}. Vous recevrez une notification SMS dès que votre sac sera scellé au comptoir.`,
  },
  ready: {
    icon: "bell",
    tone: "info",
    title: "Votre commande est prête à être retirée !",
    description: (storeName) => `Votre panier vous attend au comptoir de ${storeName}. Présentez votre QR code pour le récupérer.`,
  },
  completed: {
    icon: "check-circle",
    tone: "success",
    title: "Commande retirée, merci !",
    description: (storeName) => `Votre commande a bien été retirée chez ${storeName}. À très bientôt !`,
  },
  cancelled: {
    icon: "close",
    tone: "danger",
    title: "Commande annulée",
    description: (storeName) => `Cette commande chez ${storeName} a été annulée.`,
  },
};

export type TrackingStepStatus = "done" | "current" | "upcoming";

export interface TrackingStep {
  id: string;
  title: string;
  description: string;
  timeLabel?: string;
  status: TrackingStepStatus;
}

const TRACKING_STAGE_INDEX: Record<Exclude<OrderStatus, "cancelled">, number> = { preparing: 1, ready: 2, completed: 3 };

/** Pure, tested — the 4 steps and their statuses derive entirely from `order.status`/`order.preparerFirstName`, never from component state. */
export function getTrackingSteps(order: FullOrder): TrackingStep[] {
  const current = order.status === "cancelled" ? 0 : TRACKING_STAGE_INDEX[order.status];
  const preparerLabel = order.preparerFirstName ? `${order.preparerFirstName} de l'épicerie` : "l'épicier";

  const statusFor = (stepIndex: number): TrackingStepStatus => {
    if (stepIndex < current) return "done";
    if (stepIndex === current) return "current";
    return "upcoming";
  };

  return [
    {
      id: "transmitted",
      title: "Commande transmise & validée",
      description: "Règlement enregistré avec succès. Le bon de préparation a été imprimé en boutique.",
      timeLabel: formatTime(order.createdAtIso),
      status: statusFor(0),
    },
    {
      id: "preparing",
      title: `En cours de préparation par ${preparerLabel}`,
      description: "Votre commande est assemblée avec soin, rayon par rayon.",
      status: statusFor(1),
    },
    {
      id: "ready",
      title: "Prêt pour retrait au comptoir",
      description: "Panier scellé et placé en chambre froide avec votre étiquette nominative.",
      timeLabel: `Attendu ${formatTime(order.pickupWindow.startIso)}`,
      status: statusFor(2),
    },
    {
      id: "handed-over",
      title: "Remis en main propre",
      description: "Validation finale par scan ou code PIN au comptoir.",
      status: statusFor(3),
    },
  ];
}

export const TRACKING_POLL_INTERVAL_MS = 20_000;

import type { IconName } from "@/src/components/atoms/Icon/Icon";
import type { ActiveOrder } from "@/src/domain/orders";
import { formatFlashDeadline } from "@/src/domain/promotions";

export type NotificationCategory = "arrivages-stocks" | "ventes-flash" | "recettes" | "avis-epiceries";

export const NOTIFICATION_CATEGORY_CONFIG: Record<NotificationCategory, { label: string; icon: IconName }> = {
  "arrivages-stocks": { label: "Arrivages & Stocks", icon: "archive" },
  "ventes-flash": { label: "Ventes flash", icon: "zap" },
  recettes: { label: "Recettes", icon: "cooking" },
  // Commande prête et bon d'achat n'ont pas de chip dédiée dans la maquette — rattachées ici (hypothèse §12, 1 ligne à changer si besoin).
  "avis-epiceries": { label: "Avis & Épiceries", icon: "star" },
};

export type NotificationStatusFilter = "all" | "unread";

export function parseNotificationStatusFilter(value: string | undefined): NotificationStatusFilter {
  return value === "unread" ? "unread" : "all";
}

export function parseNotificationCategoryFilter(value: string | undefined): NotificationCategory | "all" {
  if (value === "arrivages-stocks" || value === "ventes-flash" || value === "recettes" || value === "avis-epiceries") return value;
  return "all";
}

export type NotificationAction =
  | { kind: "link"; href: string; label: string }
  | { kind: "add-to-cart"; label: string; productName: string; productId: string }
  | { kind: "open-qr"; label: string; order: ActiveOrder }
  | { kind: "apply-voucher"; label: string; code: string };

export type Notification =
  | {
      id: string;
      type: "new-arrival";
      isRead: boolean;
      createdAtIso: string;
      title: string;
      description: string;
      storeName: string;
      cityLabel: string;
      href: string;
    }
  | {
      id: string;
      type: "flash-sale";
      isRead: boolean;
      createdAtIso: string;
      title: string;
      description: string;
      storeName: string;
      endsAtIso: string;
      href: string;
    }
  | {
      id: string;
      type: "back-in-stock";
      isRead: boolean;
      createdAtIso: string;
      title: string;
      description: string;
      storeName: string;
      cityLabel: string;
      productId: string;
      productName: string;
    }
  | {
      id: string;
      type: "recipe-inspiration";
      isRead: boolean;
      createdAtIso: string;
      title: string;
      description: string;
      authorName: string;
      servings: number;
      href: string;
    }
  | {
      id: string;
      type: "order-ready";
      isRead: boolean;
      createdAtIso: string;
      title: string;
      description: string;
      order: ActiveOrder;
    }
  | {
      id: string;
      type: "loyalty-voucher";
      isRead: boolean;
      createdAtIso: string;
      title: string;
      description: string;
      code: string;
      amountLabel: string;
    }
  | {
      id: string;
      type: "store-welcome";
      isRead: boolean;
      createdAtIso: string;
      title: string;
      description: string;
      storeName: string;
      distanceMeters: number;
      href: string;
    }
  | {
      id: string;
      type: "review-published";
      isRead: boolean;
      createdAtIso: string;
      title: string;
      description: string;
      storeName: string;
      href: string;
    };

export type NotificationType = Notification["type"];

export interface NotificationTypeConfig {
  category: NotificationCategory;
  icon: IconName;
  /** Tone of the leading `IconTile`. */
  iconTone: "neutral" | "cream" | "success";
  /** Left accent rail color when unread — only "danger" (urgent, e.g. flash sale) departs from the dark default. */
  accentTone: "default" | "danger";
  /** `Button` variant used for the primary action while unread. */
  unreadButtonVariant: "primary-md" | "accent";
}

/** One table, no per-type `if`/`switch` elsewhere (rule O). Adding a 9th type means adding one line here. */
export const NOTIFICATION_TYPE_CONFIG: Record<NotificationType, NotificationTypeConfig> = {
  "new-arrival": { category: "arrivages-stocks", icon: "archive", iconTone: "neutral", accentTone: "default", unreadButtonVariant: "primary-md" },
  "flash-sale": { category: "ventes-flash", icon: "zap", iconTone: "cream", accentTone: "danger", unreadButtonVariant: "accent" },
  "back-in-stock": { category: "arrivages-stocks", icon: "check-circle", iconTone: "success", accentTone: "default", unreadButtonVariant: "primary-md" },
  "recipe-inspiration": { category: "recettes", icon: "cooking", iconTone: "neutral", accentTone: "default", unreadButtonVariant: "primary-md" },
  "order-ready": { category: "avis-epiceries", icon: "basket", iconTone: "success", accentTone: "default", unreadButtonVariant: "primary-md" },
  "loyalty-voucher": { category: "avis-epiceries", icon: "tag", iconTone: "cream", accentTone: "default", unreadButtonVariant: "primary-md" },
  "store-welcome": { category: "avis-epiceries", icon: "store", iconTone: "neutral", accentTone: "default", unreadButtonVariant: "primary-md" },
  "review-published": { category: "avis-epiceries", icon: "star", iconTone: "success", accentTone: "default", unreadButtonVariant: "primary-md" },
};

/** Exhaustive over `NotificationType` (never-check) — builds the action + primary-button label for a notification's card. */
export function getNotificationAction(notification: Notification): NotificationAction {
  switch (notification.type) {
    case "new-arrival":
      return { kind: "link", href: notification.href, label: "Voir le produit" };
    case "flash-sale":
      return { kind: "link", href: notification.href, label: "Réserver en Click & Collect" };
    case "back-in-stock":
      return { kind: "add-to-cart", label: "Ajouter au panier", productName: notification.productName, productId: notification.productId };
    case "recipe-inspiration":
      return { kind: "link", href: notification.href, label: "Voir la recette" };
    case "order-ready":
      return { kind: "open-qr", label: "Afficher le QR code", order: notification.order };
    case "loyalty-voucher":
      return { kind: "apply-voucher", label: "Utiliser le bon", code: notification.code };
    case "store-welcome":
      return { kind: "link", href: notification.href, label: "Visiter l'étal" };
    case "review-published":
      return { kind: "link", href: notification.href, label: "Consulter" };
    default: {
      const exhaustive: never = notification;
      throw new Error(`Unhandled notification type: ${JSON.stringify(exhaustive)}`);
    }
  }
}

/** The meta line's contextual element (left of "• <temps relatif>") — exhaustive over `NotificationType`. */
export function getNotificationContextLabel(notification: Notification): string {
  switch (notification.type) {
    case "new-arrival":
      return `${notification.storeName} • ${notification.cityLabel}`;
    case "flash-sale":
      return notification.storeName;
    case "back-in-stock":
      return `${notification.storeName} • ${notification.cityLabel}`;
    case "recipe-inspiration":
      return `Recette de ${notification.authorName} • ${notification.servings} pers.`;
    case "order-ready":
      return notification.order.store.name;
    case "loyalty-voucher":
      return `Code : ${notification.code}`;
    case "store-welcome":
      return `À ${(notification.distanceMeters / 1000).toFixed(1).replace(".", ",")} km de chez vous`;
    case "review-published":
      return "Avis vérifié DGCCRF";
    default: {
      const exhaustive: never = notification;
      throw new Error(`Unhandled notification type: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export interface NotificationGroup {
  key: "today" | "earlier";
  label: string;
  countLabel: string;
  notifications: Notification[];
}

function utcMidnight(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/** "N mises à jour" / "1 mise à jour" — fr-FR treats 0 as plural (same convention as `formatAddressesLabel`). */
function formatUpdatesCount(count: number): string {
  return count === 1 ? "1 mise à jour" : `${count} mises à jour`;
}

/**
 * Groups by calendar day (Europe/Paris, via an injected `now` — never
 * `Date.now()` in render) into "Aujourd'hui" / "Hier & Plus tôt", each
 * sorted by date descending. An empty group is dropped entirely (rule 10:
 * "groupe vide = masqué"), never rendered with a 0 count.
 */
export function groupNotificationsByDay(notifications: Notification[], now: Date): NotificationGroup[] {
  const sorted = [...notifications].sort((a, b) => b.createdAtIso.localeCompare(a.createdAtIso));
  const today: Notification[] = [];
  const earlier: Notification[] = [];

  for (const notification of sorted) {
    const isToday = utcMidnight(new Date(notification.createdAtIso)) === utcMidnight(now);
    (isToday ? today : earlier).push(notification);
  }

  const groups: NotificationGroup[] = [];
  if (today.length > 0) groups.push({ key: "today", label: "Aujourd'hui", countLabel: formatUpdatesCount(today.length), notifications: today });
  if (earlier.length > 0) groups.push({ key: "earlier", label: "Hier & Plus tôt", countLabel: "Archives récentes", notifications: earlier });
  return groups;
}

export interface NotificationBadge {
  text: string;
  tone: "success" | "danger";
}

/** The small badge next to the title ("Fraîcheur garantie", the flash-sale deadline, "Retrait disponible") — exhaustive over `NotificationType`, `null` for the 5 types with none. Reuses `formatFlashDeadline` from the promotions domain (rule: "réutilise formatFlashDeadline de la Page B"). */
export function getNotificationBadge(notification: Notification, now: Date): NotificationBadge | null {
  switch (notification.type) {
    case "new-arrival":
      return { text: "Fraîcheur garantie", tone: "success" };
    case "flash-sale":
      return { text: `Jusqu'à ${formatFlashDeadline(notification.endsAtIso, now)}`, tone: "danger" };
    case "order-ready":
      return { text: "Retrait disponible", tone: "success" };
    case "back-in-stock":
    case "recipe-inspiration":
    case "loyalty-voucher":
    case "store-welcome":
    case "review-published":
      return null;
    default: {
      const exhaustive: never = notification;
      throw new Error(`Unhandled notification type: ${JSON.stringify(exhaustive)}`);
    }
  }
}

export interface NotificationCategoryCount {
  category: NotificationCategory;
  total: number;
  unread: number;
}

export interface NotificationCounts {
  total: number;
  unread: number;
  byCategory: NotificationCategoryCount[];
}

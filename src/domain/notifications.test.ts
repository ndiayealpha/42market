import { describe, expect, it } from "vitest";

import { getNotificationAction, getNotificationBadge, getNotificationContextLabel, groupNotificationsByDay, type Notification } from "./notifications";

const NOW = new Date("2026-11-10T12:15:00Z");

const NEW_ARRIVAL: Notification = {
  id: "1",
  type: "new-arrival",
  isRead: false,
  createdAtIso: "2026-11-10T12:00:00Z",
  title: "Nouvel arrivage",
  description: "desc",
  storeName: "Saveurs d'Afrique",
  cityLabel: "Saint-Étienne",
  href: "/main/epiceries/saveurs-dafrique",
};

const FLASH_SALE: Notification = {
  id: "2",
  type: "flash-sale",
  isRead: false,
  createdAtIso: "2026-11-10T11:00:00Z",
  title: "Vente flash",
  description: "desc",
  storeName: "LoirIvoire",
  endsAtIso: "2026-11-10T19:00:00Z",
  href: "/main/epiceries/loirivoire/bons-plans",
};

const BACK_IN_STOCK: Notification = {
  id: "3",
  type: "back-in-stock",
  isRead: true,
  createdAtIso: "2026-11-09T09:00:00Z",
  title: "Retour en stock",
  description: "desc",
  storeName: "Saveurs d'Afrique",
  cityLabel: "Saint-Étienne",
  productId: "p1",
  productName: "Attiéké",
};

describe("getNotificationBadge", () => {
  it("returns the fraîcheur badge for new-arrival", () => {
    expect(getNotificationBadge(NEW_ARRIVAL, NOW)).toEqual({ text: "Fraîcheur garantie", tone: "success" });
  });

  it("formats the flash-sale deadline via formatFlashDeadline (Europe/Paris, UTC+1 in November)", () => {
    expect(getNotificationBadge(FLASH_SALE, NOW)).toEqual({ text: "Jusqu'à ce soir 20H", tone: "danger" });
  });

  it("returns null for a type with no badge", () => {
    expect(getNotificationBadge(BACK_IN_STOCK, NOW)).toBeNull();
  });
});

describe("getNotificationAction", () => {
  it("builds a link action for new-arrival", () => {
    expect(getNotificationAction(NEW_ARRIVAL)).toEqual({ kind: "link", href: NEW_ARRIVAL.href, label: "Voir le produit" });
  });

  it("builds an add-to-cart command for back-in-stock", () => {
    expect(getNotificationAction(BACK_IN_STOCK)).toEqual({ kind: "add-to-cart", label: "Ajouter au panier", productName: "Attiéké", productId: "p1" });
  });
});

describe("getNotificationContextLabel", () => {
  it("joins store and city for new-arrival", () => {
    expect(getNotificationContextLabel(NEW_ARRIVAL)).toBe("Saveurs d'Afrique • Saint-Étienne");
  });

  it("returns just the store name for flash-sale", () => {
    expect(getNotificationContextLabel(FLASH_SALE)).toBe("LoirIvoire");
  });
});

describe("groupNotificationsByDay", () => {
  it("splits into 'today' and 'earlier', sorted descending, dropping empty groups", () => {
    const groups = groupNotificationsByDay([BACK_IN_STOCK, NEW_ARRIVAL, FLASH_SALE], NOW);
    expect(groups.map((g) => g.key)).toEqual(["today", "earlier"]);
    expect(groups[0].notifications.map((n) => n.id)).toEqual(["1", "2"]);
    expect(groups[0].countLabel).toBe("2 mises à jour");
    expect(groups[1].notifications.map((n) => n.id)).toEqual(["3"]);
  });

  it("omits a group entirely when it has no notifications", () => {
    const groups = groupNotificationsByDay([NEW_ARRIVAL], NOW);
    expect(groups).toHaveLength(1);
    expect(groups[0].key).toBe("today");
  });
});

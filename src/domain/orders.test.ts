import { describe, expect, it } from "vitest";

import { getTrackingSteps, type FullOrder } from "@/src/domain/orders";

const BASE_ORDER: FullOrder = {
  id: "cmd-4289",
  ownerUserId: "1",
  reference: "#CMD-4289",
  status: "preparing",
  createdAtIso: "2026-11-10T14:32:00Z",
  lastUpdatedIso: "2026-11-10T14:40:00Z",
  isExpress: true,
  reminderEnabled: true,
  store: {
    slug: "loirivoire",
    name: "Épicerie LoirIvoire",
    street: "32 rue des docteurs Charcot",
    city: "42000 Saint-Étienne",
    counterInfo: "Comptoir retrait",
    phone: "04 77 32 19 80",
    distanceMeters: 1200,
    openUntilLabel: "Ouvert aujourd'hui jusqu'à 19h30",
    isOpenNow: true,
    consigneNote: "Consigne réfrigérée active",
  },
  pickupWindow: { startIso: "2026-11-10T15:00:00Z", endIso: "2026-11-10T16:00:00Z" },
  lines: [],
  vatRatePercent: 5.5,
  payment: { method: "online", cardLast4: "4242", isPaid: true },
  qrToken: "token",
  pin: "8492",
};

describe("getTrackingSteps", () => {
  it("marks exactly the step matching the order's status as current, earlier ones done, later ones upcoming", () => {
    const steps = getTrackingSteps(BASE_ORDER);
    expect(steps.map((s) => s.status)).toEqual(["done", "current", "upcoming", "upcoming"]);
  });

  it("advances as the order moves to ready, then completed", () => {
    expect(getTrackingSteps({ ...BASE_ORDER, status: "ready" }).map((s) => s.status)).toEqual(["done", "done", "current", "upcoming"]);
    expect(getTrackingSteps({ ...BASE_ORDER, status: "completed" }).map((s) => s.status)).toEqual(["done", "done", "done", "current"]);
  });

  it("names the preparer when provided, falls back to a generic label otherwise", () => {
    expect(getTrackingSteps({ ...BASE_ORDER, preparerFirstName: "Mamadou" })[1].title).toContain("Mamadou");
    expect(getTrackingSteps(BASE_ORDER)[1].title).toContain("l'épicier");
  });
});

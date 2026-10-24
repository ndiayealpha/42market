import { describe, expect, it } from "vitest";

import { applySlotSelection, buildPickupSlots, getCheckoutStepStates } from "@/src/domain/checkout";

const BASE_PARAMS = {
  openIso: "2026-11-24T14:00:00+01:00",
  closeIso: "2026-11-24T19:30:00+01:00",
  now: new Date("2026-11-24T14:40:00+01:00"),
  pickupDelayMinutes: 20,
  slotDurationMinutes: 60,
  closingMarginMinutes: 15,
  fullSlotIds: [],
  expressReadyMinutes: 15,
  expressLockMinutes: 30,
  isExpressAvailable: true,
};

describe("buildPickupSlots", () => {
  it("generates hourly windows with a last slot absorbing the remainder before the closing margin", () => {
    const slots = buildPickupSlots(BASE_PARAMS);
    const windows = slots.filter((slot) => slot.kind === "window");
    expect(windows.map((w) => [w.startIso, w.endIso])).toEqual([
      ["2026-11-24T13:00:00.000Z", "2026-11-24T14:00:00.000Z"],
      ["2026-11-24T14:00:00.000Z", "2026-11-24T15:00:00.000Z"],
      ["2026-11-24T15:00:00.000Z", "2026-11-24T16:00:00.000Z"],
      ["2026-11-24T16:00:00.000Z", "2026-11-24T17:00:00.000Z"],
      ["2026-11-24T17:00:00.000Z", "2026-11-24T18:15:00.000Z"],
    ]);
    expect(windows[windows.length - 1].isLastSlot).toBe(true);
  });

  it("marks the first window whose start clears the pickup delay as recommended, even when an earlier window is still bookable", () => {
    const slots = buildPickupSlots(BASE_PARAMS);
    const windows = slots.filter((slot) => slot.kind === "window");
    // now=14:40, delay=20min -> cutoff 15:00 -> the 14:00-15:00 window (still in progress) stays available but isn't recommended.
    expect(windows[0].status).toBe("available");
    expect(windows[0].isRecommended).toBe(false);
    expect(windows[1].isRecommended).toBe(true);
  });

  it("marks a past window as unavailable with a reason, and a fixture-marked full window as complet", () => {
    const slots = buildPickupSlots({ ...BASE_PARAMS, now: new Date("2026-11-24T15:10:00+01:00"), fullSlotIds: ["slot-2026-11-24T14:00:00.000Z"] });
    const windows = slots.filter((slot) => slot.kind === "window");
    expect(windows[0].status).toBe("unavailable");
    expect(windows[0].unavailableReason).toBe("Créneau passé");
    expect(windows[1].status).toBe("unavailable");
    expect(windows[1].unavailableReason).toBe("Complet");
  });

  it("includes exactly one express tile, available or not per the flag", () => {
    const available = buildPickupSlots(BASE_PARAMS).find((slot) => slot.kind === "express");
    const unavailable = buildPickupSlots({ ...BASE_PARAMS, isExpressAvailable: false }).find((slot) => slot.kind === "express");
    expect(available?.status).toBe("available");
    expect(unavailable?.status).toBe("unavailable");
  });
});

describe("applySlotSelection", () => {
  it("marks exactly the selected slot, leaves unavailable slots untouched", () => {
    const slots = buildPickupSlots(BASE_PARAMS);
    const targetId = slots[1].id;
    const selected = applySlotSelection(slots, targetId);
    expect(selected.find((s) => s.id === targetId)?.status).toBe("selected");
    expect(selected.filter((s) => s.status === "selected")).toHaveLength(1);
  });
});

describe("getCheckoutStepStates", () => {
  it("defaults to slot as current, store done, payment upcoming", () => {
    expect(getCheckoutStepStates("slot", true)).toEqual({ store: "done", slot: "current", payment: "upcoming" });
  });

  it("payment is never done, even when it's the current step", () => {
    expect(getCheckoutStepStates("payment", true)).toEqual({ store: "done", slot: "done", payment: "current" });
  });

  it("store is current, not done, until the cart has fixed a store", () => {
    expect(getCheckoutStepStates("store", false)).toEqual({ store: "current", slot: "upcoming", payment: "upcoming" });
  });
});

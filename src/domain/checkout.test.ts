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

  it("marks the first window whose start clears the pickup delay as recommended, and disables an earlier window that starts too soon to prepare", () => {
    const slots = buildPickupSlots(BASE_PARAMS);
    const windows = slots.filter((slot) => slot.kind === "window");
    // now=14:40, delay=20min -> cutoff 15:00 -> the 14:00-15:00 window starts before the cutoff (14:00 < 15:00): too soon to prepare, even though it hasn't ended yet.
    expect(windows[0].status).toBe("unavailable");
    expect(windows[0].unavailableReason).toBe("Délai de préparation insuffisant");
    expect(windows[0].isRecommended).toBe(false);
    // 15:00-16:00 starts exactly at the cutoff: bookable, and the first (so recommended) one that is.
    expect(windows[1].status).toBe("available");
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

  // M3 — regression tests for the reported bug ("à 16h32, le créneau 15h-16h n'était pas grisé") and the fix's acceptance cases.
  describe("M3 — a slot is disabled once it's over, or once it starts too soon to prepare", () => {
    const DAY_PARAMS = { ...BASE_PARAMS, openIso: "2026-11-24T14:00:00+01:00", closeIso: "2026-11-24T19:30:00+01:00" };

    it("16h32 with a fresh `now`: the 15h-16h window is disabled (already over)", () => {
      const slots = buildPickupSlots({ ...DAY_PARAMS, now: new Date("2026-11-24T16:32:00+01:00") });
      const window15to16 = slots.find((s) => s.kind === "window" && s.startIso === "2026-11-24T14:00:00.000Z");
      expect(window15to16?.status).toBe("unavailable");
      expect(window15to16?.unavailableReason).toBe("Créneau passé");
    });

    it("a slot currently in progress is disabled once its start is before now + delay, even though it hasn't ended", () => {
      // now=16:10, delay=20min -> cutoff 16:30. The 16h-17h window (in progress) starts at 16:00, before the cutoff.
      const slots = buildPickupSlots({ ...DAY_PARAMS, now: new Date("2026-11-24T16:10:00+01:00") });
      const inProgress = slots.find((s) => s.kind === "window" && s.startIso === "2026-11-24T15:00:00.000Z"); // 16:00 Paris
      expect(inProgress?.status).toBe("unavailable");
      expect(inProgress?.unavailableReason).toBe("Délai de préparation insuffisant");
    });

    it("a genuinely future slot, well past the delay cutoff, stays available", () => {
      const slots = buildPickupSlots({ ...DAY_PARAMS, now: new Date("2026-11-24T16:10:00+01:00") });
      const future = slots.find((s) => s.kind === "window" && s.startIso === "2026-11-24T16:00:00.000Z"); // 17:00 Paris
      expect(future?.status).toBe("available");
    });

    it("midnight rollover: a window starting on the next calendar day (Paris time) is still correctly dated and evaluated", () => {
      const slots = buildPickupSlots({
        openIso: "2026-11-24T23:00:00+01:00",
        closeIso: "2026-11-25T02:00:00+01:00",
        now: new Date("2026-11-24T23:00:00+01:00"),
        pickupDelayMinutes: 20,
        slotDurationMinutes: 60,
        closingMarginMinutes: 15,
        fullSlotIds: [],
        expressReadyMinutes: 15,
        expressLockMinutes: 30,
        isExpressAvailable: true,
      });
      const windows = slots.filter((s) => s.kind === "window");
      // now=23:00 Paris (22:00Z), delay=20min -> cutoff 22:20Z. The opening window starts exactly at `now`: still inside the delay, unavailable.
      expect(windows[0].status).toBe("unavailable");
      expect(windows[0].unavailableReason).toBe("Délai de préparation insuffisant");
      // The next window is Paris 00:00-01:00 on the 25th — UTC "2026-11-24T23:00:00.000Z", not shifted to the wrong calendar day — and starts well past the cutoff, so it's bookable.
      expect(windows[1].startIso).toBe("2026-11-24T23:00:00.000Z");
      expect(windows[1].status).toBe("available");
    });
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

import { describe, expect, it } from "vitest";

import { STORE_DETAIL } from "@/src/data/store-detail.mock";

import { buildDayWindow, buildPickupDays } from "./pickup-schedule";

describe("buildPickupDays", () => {
  it("returns today + the next 2 open days, skipping Sunday", () => {
    // Friday 23 Oct 2026 — Saturday is open, Sunday (25th) has no `openingHours` entry and must be skipped.
    const now = new Date("2026-10-23T10:00:00Z");
    const days = buildPickupDays(now, STORE_DETAIL.openingHours);

    expect(days.map((day) => day.dateIso)).toEqual(["2026-10-23", "2026-10-24", "2026-10-26"]);
    expect(days[0]).toMatchObject({ isToday: true, label: "Aujourd'hui" });
    expect(days[1].isToday).toBe(false);
    expect(days.some((day) => day.dateIso === "2026-10-25")).toBe(false);
  });

  it("never returns more than 3 days even when closed days interrupt the run", () => {
    const now = new Date("2026-10-23T10:00:00Z");
    const days = buildPickupDays(now, STORE_DETAIL.openingHours);
    expect(days).toHaveLength(3);
  });
});

describe("buildDayWindow", () => {
  it("builds the store's opening window as Paris-offset ISO instants", () => {
    const day = { dateIso: "2026-10-23", label: "Aujourd'hui", isToday: true, isClosed: false };
    const window = buildDayWindow(day, STORE_DETAIL.openingHours);

    // Late October is still CEST (+02:00) in Europe/Paris (DST ends the last Sunday of October).
    expect(window).toEqual({ openIso: "2026-10-23T08:00:00+02:00", closeIso: "2026-10-23T19:30:00+02:00" });
  });

  it("uses the winter +01:00 offset once DST has ended", () => {
    const day = { dateIso: "2026-11-24", label: "Aujourd'hui", isToday: true, isClosed: false };
    const window = buildDayWindow(day, STORE_DETAIL.openingHours);

    expect(window).toEqual({ openIso: "2026-11-24T08:00:00+01:00", closeIso: "2026-11-24T19:30:00+01:00" });
  });

  it("returns null for a weekday with no opening hours", () => {
    const sunday = { dateIso: "2026-10-25", label: "Dim.", isToday: false, isClosed: false };
    expect(buildDayWindow(sunday, STORE_DETAIL.openingHours)).toBeNull();
  });
});

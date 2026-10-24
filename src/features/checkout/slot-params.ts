import type { PickupSlot } from "@/src/domain/checkout";
import { buildPickupSlots } from "@/src/domain/checkout";
import type { StoreDetail } from "@/src/domain/store-detail";

import { buildDayWindow, buildPickupDays, type DayWindow } from "./pickup-schedule";

/**
 * The fixed slot-generation parameters that reproduce the maquette's exact
 * 5 windows + 1 express tile for a 14h–19h30 opening window (verified by
 * `src/domain/checkout.test.ts`) — defined once so `PickupSlotPicker` and
 * `CheckoutView` (which needs the same slots to resolve the id the user
 * picked, and to know whether "under 2h" is promisable today) can never
 * disagree on how a slot list is built.
 */
export const SLOT_PARAMS = {
  pickupDelayMinutes: 20,
  slotDurationMinutes: 60,
  closingMarginMinutes: 15,
  expressReadyMinutes: 15,
  expressLockMinutes: 30,
} as const;

/**
 * Express has no domain-level availability rule of its own (`buildPickupSlots`
 * takes `isExpressAvailable` as a caller-supplied flag) — this app treats it
 * as "today only, and only while there's still enough time before closing to
 * prepare it", a reasonable invented heuristic, not a rule from the brief.
 */
function isExpressAvailable(day: ReturnType<typeof buildPickupDays>[number], window: DayWindow, now: Date): boolean {
  const minutesUntilClose = (new Date(window.closeIso).getTime() - now.getTime()) / 60_000;
  return day.isToday && minutesUntilClose > SLOT_PARAMS.expressReadyMinutes;
}

/** Every pickup slot for one day, or `[]` when that weekday has no opening hours (defensive). */
export function buildSlotsForDay(day: ReturnType<typeof buildPickupDays>[number], store: StoreDetail, now: Date): PickupSlot[] {
  const window = buildDayWindow(day, store.openingHours);
  if (!window) return [];
  return buildPickupSlots({ ...SLOT_PARAMS, ...window, now, isExpressAvailable: isExpressAvailable(day, window, now) });
}

/** Every pickup slot across the 3 visible days, keyed by `PickupDay.dateIso`. */
export function buildSlotsByDay(store: StoreDetail, now: Date): Map<string, PickupSlot[]> {
  const days = buildPickupDays(now, store.openingHours);
  const map = new Map<string, PickupSlot[]>();
  for (const day of days) {
    map.set(day.dateIso, buildSlotsForDay(day, store, now));
  }
  return map;
}

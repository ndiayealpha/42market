import type { PickupDay } from "@/src/domain/checkout";
import type { StoreDetail, Weekday } from "@/src/domain/store-detail";
import { formatShortDay } from "@/src/lib/format";

const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function weekdayOf(date: Date): Weekday {
  return WEEKDAYS[(date.getUTCDay() + 6) % 7];
}

function addUtcDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function toDateIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Today + the next 2 days the store actually opens. LoirIvoire's
 * `openingHours` has no "sun" entry, so Sundays are skipped automatically —
 * nothing Sunday-specific is hardcoded here; any other closed weekday
 * would be skipped the same way. Calendar days are read off `now`'s UTC
 * components (same convention every other formatter in `src/lib/format.ts`
 * already uses), not a true Europe/Paris wall-clock date — close enough
 * for a demo, a documented trim rather than pulling in a timezone library.
 */
export function buildPickupDays(now: Date, openingHours: StoreDetail["openingHours"]): PickupDay[] {
  const days: PickupDay[] = [];
  let cursor = now;
  let dayOffset = 0;
  while (days.length < 3 && dayOffset < 14) {
    const weekday = weekdayOf(cursor);
    if (openingHours[weekday]) {
      const isToday = dayOffset === 0;
      const dateIso = toDateIso(cursor);
      days.push({
        dateIso,
        label: isToday ? "Aujourd'hui" : formatShortDay(dateIso),
        isToday,
        isClosed: false,
      });
    }
    cursor = addUtcDays(cursor, 1);
    dayOffset += 1;
  }
  return days;
}

/** Europe/Paris UTC offset for a given calendar day, DST-aware via `Intl` (no date library needed) — `buildPickupSlots` takes ISO instants with an explicit offset. */
function parisOffsetFor(date: Date): string {
  const noonUtc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 12));
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", timeZoneName: "shortOffset" }).formatToParts(noonUtc);
  const raw = parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT+1";
  const match = /GMT([+-])(\d+)/.exec(raw);
  const sign = match?.[1] ?? "+";
  const hours = (match?.[2] ?? "1").padStart(2, "0");
  return `${sign}${hours}:00`;
}

function isoAt(dateIso: string, time: string): string {
  return `${dateIso}T${time}:00${parisOffsetFor(new Date(`${dateIso}T12:00:00Z`))}`;
}

export interface DayWindow {
  openIso: string;
  closeIso: string;
}

/** The store's opening window for one `PickupDay`, as ISO instants with their Paris offset — `null` when that weekday has no hours (defensive; `buildPickupDays` never returns a closed day). */
export function buildDayWindow(day: PickupDay, openingHours: StoreDetail["openingHours"]): DayWindow | null {
  const weekday = weekdayOf(new Date(`${day.dateIso}T00:00:00Z`));
  const hours = openingHours[weekday];
  if (!hours) return null;
  return { openIso: isoAt(day.dateIso, hours.open), closeIso: isoAt(day.dateIso, hours.close) };
}

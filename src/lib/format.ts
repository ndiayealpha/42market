const euroFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
const shortDayFormatter = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", timeZone: "UTC" });
const numberFormatter = new Intl.NumberFormat("fr-FR");
const timeFormatter = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
const shortDateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });
const longDateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const monthYearFormatter = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });

/** "À 600m" under 1km, "À 1 km" / "À 2,1 km" (fr-FR decimal comma) from 1km up. */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `À ${meters}m`;
  const km = meters / 1000;
  const rounded = Math.round(km * 10) / 10;
  const value = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(".", ",");
  return `À ${value} km`;
}

/** `formatDistance` for a value already in kilometers (`StoreDetail.distanceKm`) — the one place the km→m conversion happens, instead of each call site re-deriving `distanceKm * 1000` inline. */
export function formatDistanceFromKm(km: number): string {
  return formatDistance(Math.round(km * 1000));
}

/** "650 m" / "1,2 km" — same thresholds as `formatDistance`, without its leading "À " (sentence) wording, for compact contexts like a chip ("🚶 1,2 km") where the distance isn't itself a sentence. */
export function formatDistanceCompact(km: number): string {
  const meters = Math.round(km * 1000);
  if (meters < 1000) return `${meters} m`;
  return `${km.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} km`;
}

/** "24,90 €" — Intl fr-FR/EUR. */
export function formatPrice(amount: number): string {
  return euroFormatter.format(amount);
}

/** "4.9" — one decimal, dot (not the fr-FR comma `formatPrice` uses). */
export function formatRating(value: number): string {
  return value.toFixed(1);
}

/** "2026-04-24" → "Ven. 24" (UTC, first letter capitalized). */
export function formatShortDay(isoDate: string): string {
  const formatted = shortDayFormatter.format(new Date(`${isoDate}T00:00:00Z`));
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/** "45 min" under 1h, "1h00" / "1h15" (always 2-digit minutes) from 1h up. */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}h${String(rest).padStart(2, "0")}`;
}

/** "4,8" / "1,2" / "25" — fr-FR grouping and decimal comma, no forced decimals. */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/**
 * Euros per kg from an amount (in euros, same unit `formatPrice` takes —
 * see store-merchandising.ts's note on why this page doesn't adopt the
 * cents-based `Price` model) and a weight in grams.
 */
export function computeUnitPricePerKg(amount: number, grams: number): number {
  return (amount / grams) * 1000;
}

/** "3,80 €/kg". */
export function formatUnitPrice(amountPerKg: number): string {
  return `${formatPrice(amountPerKg)}/kg`;
}

function utcMidnight(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/** "aujourd'hui 08h30" / "hier 08h30", otherwise a short date — `now` is an injected clock, never read internally. */
export function formatUpdatedAt(iso: string, now: Date): string {
  const date = new Date(iso);
  const time = timeFormatter.format(date).replace(":", "h");
  const daysAgo = Math.round((utcMidnight(now) - utcMidnight(date)) / 86_400_000);
  if (daysAgo === 0) return `aujourd'hui ${time}`;
  if (daysAgo === 1) return `hier ${time}`;
  return shortDateFormatter.format(date);
}

/** "12 août 2026". */
export function formatLongDate(iso: string): string {
  return longDateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

/** "Janvier 2023" — month + year, first letter capitalized (Intl lowercases French month names). */
export function formatMemberSince(iso: string): string {
  const formatted = monthYearFormatter.format(new Date(`${iso}T00:00:00Z`));
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * "À l'instant" / "Il y a 5 min" / "Il y a 2 heures" / "Hier à 16:40" /
 * "Il y a 4 jours" / "12 nov." — `now` is an injected clock (rule 6: no
 * `Date.now()` in render). fr-FR treats 0 as plural, same convention as
 * `formatAddressesLabel`.
 */
export function formatRelativeTime(iso: string, now: Date): string {
  const date = new Date(iso);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 1) return "À l'instant";
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;

  const diffDays = Math.round((utcMidnight(now) - utcMidnight(date)) / 86_400_000);
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMinutes / 60);
    return `Il y a ${diffHours} ${diffHours === 1 ? "heure" : "heures"}`;
  }
  if (diffDays === 1) return `Hier à ${timeFormatter.format(date)}`;
  if (diffDays <= 6) return `Il y a ${diffDays} jours`;
  return shortDateFormatter.format(date);
}

/** "TVA incluse (5,5 %)" — fr-FR decimal comma, built once instead of at every call site (P5). */
export function formatVatRate(ratePercent: number): string {
  return `TVA incluse (${String(ratePercent).replace(".", ",")} %)`;
}

/** "TVA 5,5 % incluse (0,98 €)" — the OrderTotals wording, distinct from `formatVatRate`'s product-page wording (incohérence #5: unify the number, not the two different sentences each screen already uses). */
export function formatVatBreakdown(ratePercent: number, vatAmount: number): string {
  return `TVA ${String(ratePercent).replace(".", ",")} % incluse (${formatPrice(vatAmount)})`;
}

/** "14h32" — the one time-of-day formatter for order/tracking copy (incohérence #6: "14h32" / "14:32" / "15:00" unified). */
export function formatTime(iso: string): string {
  return timeFormatter.format(new Date(iso)).replace(":", "h");
}

/** "Aujourd'hui 14h - 19h" / "Demain 9h - 13h" — `now` injected, never read internally. */
export function formatPickupWindow(now: Date, startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const diffDays = Math.round((utcMidnight(start) - utcMidnight(now)) / 86_400_000);
  const dayLabel = diffDays === 0 ? "Aujourd'hui" : diffDays === 1 ? "Demain" : shortDateFormatter.format(start);
  const formatHour = (date: Date) => {
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return minutes === 0 ? `${hours}h` : `${hours}h${String(minutes).padStart(2, "0")}`;
  };
  return `${dayLabel} ${formatHour(start)} - ${formatHour(end)}`;
}

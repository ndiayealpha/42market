const euroFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
const shortDayFormatter = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", timeZone: "UTC" });

/** "À 600m" under 1km, "À 1 km" / "À 2,1 km" (fr-FR decimal comma) from 1km up. */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `À ${meters}m`;
  const km = meters / 1000;
  const rounded = Math.round(km * 10) / 10;
  const value = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(".", ",");
  return `À ${value} km`;
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

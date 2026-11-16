export const RADIUS_OPTIONS_KM = [1, 3, 5, 10, 20] as const;

/** "Rayon 3 km" — same label shown in the header pill and the picker's own options. */
export function formatRadiusLabel(radiusKm: number): string {
  return `Rayon ${radiusKm} km`;
}

/** "42000, FR" — France-only demo, so the country suffix is always the same. */
export function formatLocationLabel(postalCode: string): string {
  return `${postalCode}, FR`;
}

/** 5 digits, same leniency as a plain `<input inputMode="numeric">` — not a real postal-code database lookup (none exists in this app). */
export function isValidFrenchPostalCode(value: string): boolean {
  return /^\d{5}$/.test(value.trim());
}

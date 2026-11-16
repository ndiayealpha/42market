/** French landline/mobile formats: `06 12 34 56 78`, `+33 6 12 34 56 78`, `01.23.45.67.89`, etc. Shared by Contact and Merchant onboarding — same business rule, kept in one place to avoid drift. */
const FRENCH_PHONE_PATTERN = /^(?:\+33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

export function isValidFrenchPhone(value: string): boolean {
  return FRENCH_PHONE_PATTERN.test(value.trim());
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

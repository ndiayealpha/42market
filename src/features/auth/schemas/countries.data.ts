/**
 * Static country reference data: dial code, display name, flag emoji,
 * and the national significant number length used for the "simple"
 * phone validation (no libphonenumber-js in this project — see
 * `signup.schema.ts`). Shared by `getCountries()` (api/) and the phone
 * length check (schemas/) so there is one list, not two.
 */
export interface Country {
  /** ISO 3166-1 alpha-2 code, also used as the React/select key. */
  code: string;
  name: string;
  /** E.164 dial code, without the leading "+". */
  dialCode: string;
  /** Unicode flag emoji — see corrections §5: no more black-square placeholder. */
  flag: string;
  /** Expected national number length (digits only), for the length check. */
  nationalNumberLength: number;
}

export const COUNTRIES: Country[] = [
  { code: "FR", name: "France", dialCode: "33", flag: "🇫🇷", nationalNumberLength: 9 },
  { code: "BE", name: "Belgique", dialCode: "32", flag: "🇧🇪", nationalNumberLength: 9 },
  { code: "CH", name: "Suisse", dialCode: "41", flag: "🇨🇭", nationalNumberLength: 9 },
  { code: "LU", name: "Luxembourg", dialCode: "352", flag: "🇱🇺", nationalNumberLength: 9 },
  { code: "CA", name: "Canada", dialCode: "1", flag: "🇨🇦", nationalNumberLength: 10 },
  { code: "SN", name: "Sénégal", dialCode: "221", flag: "🇸🇳", nationalNumberLength: 9 },
  { code: "CI", name: "Côte d'Ivoire", dialCode: "225", flag: "🇨🇮", nationalNumberLength: 10 },
  { code: "MA", name: "Maroc", dialCode: "212", flag: "🇲🇦", nationalNumberLength: 9 },
  { code: "DZ", name: "Algérie", dialCode: "213", flag: "🇩🇿", nationalNumberLength: 9 },
  { code: "TN", name: "Tunisie", dialCode: "216", flag: "🇹🇳", nationalNumberLength: 8 },
  { code: "GB", name: "Royaume-Uni", dialCode: "44", flag: "🇬🇧", nationalNumberLength: 10 },
  { code: "DE", name: "Allemagne", dialCode: "49", flag: "🇩🇪", nationalNumberLength: 10 },
];

export const DEFAULT_COUNTRY_CODE = "FR";

export function findCountry(code: string): Country | undefined {
  return COUNTRIES.find((country) => country.code === code);
}

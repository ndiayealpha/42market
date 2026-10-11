/**
 * Single source of truth for what makes a password acceptable. Both
 * `signup.schema.ts` (Zod validation) and `usePasswordStrength` (the
 * live strength meter) run every password through this same array, so
 * the rule a user sees failing in the meter is exactly the rule the
 * schema enforces — never two lists drifting apart.
 */
export interface PasswordRule {
  id: "minLength" | "uppercase" | "number" | "specialChar";
  label: string;
  test: (value: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "minLength",
    label: "8 caractères minimum",
    test: (value) => value.length >= 8,
  },
  {
    id: "uppercase",
    label: "Une majuscule",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    id: "number",
    label: "Un chiffre",
    test: (value) => /[0-9]/.test(value),
  },
  {
    id: "specialChar",
    label: "Un caractère spécial",
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
];

/** Number of rules satisfied by `value`, from 0 to `PASSWORD_RULES.length`. */
export function scorePassword(value: string): number {
  return PASSWORD_RULES.reduce((score, rule) => score + (rule.test(value) ? 1 : 0), 0);
}

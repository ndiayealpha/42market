import { useMemo } from "react";

import { PASSWORD_RULES, scorePassword } from "../schemas/password.rules";

export type PasswordStrengthLabel = "Faible" | "Moyen" | "Fort";

export interface PasswordStrengthRule {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordStrength {
  /** 0 = empty, 1 = Faible, 2 = Moyen, 3 = Fort — the only shape `PasswordStrengthMeter` accepts. */
  score: 0 | 1 | 2 | 3;
  label: PasswordStrengthLabel | null;
  rules: PasswordStrengthRule[];
}

// Exported (not just used internally) so the mapping can be unit-tested
// directly — this project's vitest "unit" project runs in a plain Node
// environment with no DOM, so a React hook itself can't be rendered
// there the way `useSession` never has been either; see the hook's own
// test file for the resulting split (pure mapping tested here in Node,
// the end-to-end wiring exercised via SignupForm's Storybook stories).
export function toUiScore(rawScore: number, ruleCount: number): 0 | 1 | 2 | 3 {
  if (rawScore <= 0) return 0;
  if (rawScore >= ruleCount) return 3;
  if (rawScore >= Math.ceil(ruleCount * 0.75)) return 2;
  return 1;
}

const LABELS: Record<0 | 1 | 2 | 3, PasswordStrengthLabel | null> = {
  0: null,
  1: "Faible",
  2: "Moyen",
  3: "Fort",
};

/**
 * Reads the same `PASSWORD_RULES` the Zod schema validates against — one
 * source of truth (see password.rules.ts) — so the meter can never show
 * "Fort" for a password the schema would reject, or vice versa.
 */
export function usePasswordStrength(password: string): PasswordStrength {
  return useMemo(() => {
    const rawScore = scorePassword(password);
    const score = password.length === 0 ? 0 : toUiScore(rawScore, PASSWORD_RULES.length);

    return {
      score,
      label: LABELS[score],
      rules: PASSWORD_RULES.map((rule) => ({ id: rule.id, label: rule.label, met: rule.test(password) })),
    };
  }, [password]);
}

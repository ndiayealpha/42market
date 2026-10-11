import { ProgressSegment } from "@/src/components/atoms/ProgressSegment/ProgressSegment";

export interface PasswordStrengthMeterProps {
  /** 0 = no password yet, 1 = Faible, 2 = Moyen, 3 = Fort. The only thing this molecule knows — the score is computed elsewhere (usePasswordStrength). */
  score: 0 | 1 | 2 | 3;
  label?: "Faible" | "Moyen" | "Fort" | null;
  className?: string;
}

const BAR_COLOR: Record<1 | 2 | 3, string> = {
  1: "bg-danger",
  2: "bg-warning",
  3: "bg-auth-success",
};

const LABEL_COLOR: Record<1 | 2 | 3, string> = {
  1: "text-danger",
  2: "text-warning",
  3: "text-auth-success",
};

/**
 * 3 segments, 6px tall, 4px gap, always contained in the parent's width
 * (correction vs. the mockup, where the gauge overflowed 13px to the
 * right — `w-full` + `min-w-0` on each segment instead of a fixed px
 * width fixes that). Announced to screen readers as it changes.
 */
export function PasswordStrengthMeter({ score, label, className = "" }: PasswordStrengthMeterProps) {
  return (
    <div className={`w-full ${className}`} aria-live="polite">
      <div className="flex items-center justify-between text-xs text-auth-ink-muted">
        <span>Sécurité du mot de passe</span>
        {label && score > 0 && <span className={`font-semibold ${LABEL_COLOR[score as 1 | 2 | 3]}`}>{label}</span>}
      </div>
      <div className="mt-1.5 flex w-full gap-1">
        {[1, 2, 3].map((segment) => (
          <ProgressSegment
            key={segment}
            active={score >= segment}
            activeClassName={score > 0 ? BAR_COLOR[score as 1 | 2 | 3] : undefined}
          />
        ))}
      </div>
    </div>
  );
}

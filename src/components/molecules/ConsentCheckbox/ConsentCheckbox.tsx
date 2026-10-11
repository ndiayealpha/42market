import { forwardRef, useId, type ReactNode } from "react";

import { Checkbox, type CheckboxProps } from "@/src/components/atoms/Checkbox/Checkbox";

export interface ConsentCheckboxProps extends CheckboxProps {
  /** Rich label — can contain `TextLink`s (e.g. "J'accepte les [CGU] et la [politique de confidentialité]"). */
  label: ReactNode;
  error?: string;
}

/**
 * A consent row (terms acceptance, newsletter opt-in) built on the same
 * custom `Checkbox` atom everywhere else in the app uses — correction
 * vs. the mockup, where the newsletter checkbox used the browser's
 * native, unstyled control.
 */
export const ConsentCheckbox = forwardRef<HTMLInputElement, ConsentCheckboxProps>(function ConsentCheckbox(
  { label, error, id, size = 14, className = "", ...props },
  ref
) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const errorId = `${checkboxId}-error`;

  return (
    <div>
      <label htmlFor={checkboxId} className="flex items-start gap-2 text-[13px] leading-5 text-auth-ink-muted">
        <Checkbox
          ref={ref}
          id={checkboxId}
          size={size}
          className={`mt-0.5 ${className}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        <span>{label}</span>
      </label>
      <p id={errorId} role={error ? "alert" : undefined} className="h-4 truncate text-xs leading-4 text-danger">
        {error}
      </p>
    </div>
  );
});

import { forwardRef, useId, type ReactNode } from "react";

import { Input, type InputProps } from "@/src/components/atoms/Input/Input";

export interface FormFieldProps extends InputProps {
  label: string;
  error?: string;
  /** Rendered to the right of the label, e.g. a "forgot password" link. */
  labelSuffix?: ReactNode;
  /** Extra classes merged onto the label element. */
  labelClassName?: string;
}

/**
 * Label + input + error message, wired together with the right aria
 * attributes. Deliberately unstyled beyond structure/spacing — no
 * domain or page owns a fixed look here, since both LoginForm and the
 * signup feature's own adapter (see features/auth/components) need
 * their own colors/radii. Forwards its ref to the underlying `<input>`
 * so it works as a direct target of React Hook Form's `register()`.
 */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { label, error, labelSuffix, labelClassName = "", id, ...inputProps },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={inputId} className={`text-sm font-medium text-foreground ${labelClassName}`}>
          {label}
        </label>
        {labelSuffix}
      </div>
      <Input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {/* Fixed-height slot (16px) so an error appearing/disappearing never shifts layout or triggers scroll. */}
      <p id={errorId} role={error ? "alert" : undefined} className="h-4 truncate text-xs leading-4 text-danger">
        {error}
      </p>
    </div>
  );
});

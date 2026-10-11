import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  /** Rendered after the input, e.g. a password-visibility toggle. */
  endAdornment?: ReactNode;
  /**
   * A larger leading control rendered before the icon/input — e.g.
   * PhoneField's CountryCodeSelect — separated by a divider. Distinct
   * from `icon`: this slot can hold an interactive element, not just a
   * decorative glyph.
   */
  leftAddon?: ReactNode;
  /** Visual style: "plain" has no border/background (e.g. inside the search pill). */
  variant?: "bordered" | "plain";
  /** Extra classes merged onto the `<input>` itself (e.g. text color, placeholder color). */
  inputClassName?: string;
  /** Extra classes merged onto the leading icon's wrapper. */
  iconClassName?: string;
}

/**
 * Generic text input atom, with optional leading icon/addon and trailing
 * adornment slots. Forwards its ref to the native `<input>` so it works
 * as a direct target of React Hook Form's `register()`.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, endAdornment, leftAddon, variant = "bordered", className = "", inputClassName = "", iconClassName = "", ...props },
  ref
) {
  const base = `w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none ${inputClassName}`;
  const wrapperBase = "flex items-center gap-2";
  const wrapperVariant =
    variant === "bordered"
      ? "rounded-lg border border-border bg-surface px-3 py-2 focus-within:ring-2 focus-within:ring-info"
      : "";

  return (
    <span className={`${wrapperBase} ${wrapperVariant} ${className}`}>
      {leftAddon && (
        <span className="flex shrink-0 items-center border-r border-border pr-2">{leftAddon}</span>
      )}
      {icon && (
        <span aria-hidden className={`text-muted-foreground ${iconClassName}`}>
          {icon}
        </span>
      )}
      <input ref={ref} className={base} {...props} />
      {endAdornment}
    </span>
  );
});

"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";

/**
 * The only shape this molecule knows about — no "country for phone
 * validation" domain knowledge. The signup feature maps its own
 * `Country[]` (injected via `getCountries()`) into this before passing
 * it down, per the dependency-inversion rule: molecules never import
 * from `features/**`.
 */
export interface CountryCodeOption {
  code: string;
  dialCode: string;
  /** Unicode flag emoji — see corrections: no black-square placeholder. */
  flag: string;
  name: string;
}

export interface CountryCodeSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange" | "children"> {
  value: string;
  onChange: (code: string) => void;
  options: CountryCodeOption[];
}

/**
 * A native `<select>` (free keyboard nav, screen reader and mobile
 * picker support) styled to look like a flag + dial-code control: the
 * flag emoji is just part of each `<option>`'s text, so the browser
 * renders it in both the closed control and the open list for free.
 * The native arrow is hidden in favor of the design system's chevron icon.
 */
export const CountryCodeSelect = forwardRef<HTMLSelectElement, CountryCodeSelectProps>(function CountryCodeSelect(
  { value, onChange, options, className = "", ...props },
  ref
) {
  return (
    <span className={`relative flex items-center ${className}`}>
      <select
        ref={ref}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full cursor-pointer appearance-none bg-transparent py-2 pl-1 pr-5 text-sm text-foreground focus:outline-none"
        {...props}
      >
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.flag} +{option.dialCode}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={14}
        className="pointer-events-none absolute right-0 text-muted-foreground"
        decorative
      />
    </span>
  );
});

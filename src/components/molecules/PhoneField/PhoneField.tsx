import { forwardRef } from "react";

import { CountryCodeSelect, type CountryCodeOption } from "@/src/components/molecules/CountryCodeSelect/CountryCodeSelect";
import { FormField, type FormFieldProps } from "@/src/components/molecules/FormField/FormField";

export interface PhoneFieldProps extends Omit<FormFieldProps, "leftAddon" | "type"> {
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  countryOptions: CountryCodeOption[];
  countryInvalid?: boolean;
}

/**
 * TextField (FormField) + CountryCodeSelect composed via the `leftAddon`
 * slot — extending an existing molecule through a slot, per the O in
 * SOLID, instead of a one-off phone-specific fork of FormField.
 */
export const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(function PhoneField(
  { countryCode, onCountryCodeChange, countryOptions, countryInvalid, ...props },
  ref
) {
  return (
    <FormField
      ref={ref}
      type="tel"
      inputMode="numeric"
      leftAddon={
        <CountryCodeSelect
          value={countryCode}
          onChange={onCountryCodeChange}
          options={countryOptions}
          aria-invalid={countryInvalid || undefined}
          aria-label="Indicatif téléphonique"
          className="w-[88px]"
        />
      }
      {...props}
    />
  );
});

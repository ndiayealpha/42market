"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SignupApiError } from "../api/auth.api";
import { useSignupMutation } from "../queries/useSignupMutation";
import { DEFAULT_COUNTRY_CODE } from "../schemas/countries.data";
import { signupSchema } from "../schemas/signup.schema";
import { usePreferredCountryCode } from "../store/onboarding.store";
import type { SignupFieldError, SignupFormValues } from "../types/auth.types";
import { usePasswordStrength } from "./usePasswordStrength";

/** Maps a server field-error to the (possibly nested) RHF field name it belongs to. */
const RHF_FIELD_PATH: Record<SignupFieldError["field"], keyof SignupFormValues | "phone.number"> = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  phone: "phone.number",
  password: "password",
  acceptTerms: "acceptTerms",
};

/**
 * Orchestrates the signup screen: React Hook Form owns every field's
 * value/validation, `useSignupMutation` owns the request, this hook only
 * wires the two together (submit → mutate, server errors → `setError`)
 * and derives the password-strength score the meter renders. It holds
 * no state of its own.
 */
export function useSignupForm() {
  const preferredCountryCode = usePreferredCountryCode() || DEFAULT_COUNTRY_CODE;
  const mutation = useSignupMutation();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    shouldFocusError: true,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: { countryCode: preferredCountryCode, number: "" },
      password: "",
      acceptTerms: false,
      newsletter: false,
    },
  });

  const passwordStrength = usePasswordStrength(form.watch("password"));

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values, {
      onError: (error) => {
        if (error instanceof SignupApiError && error.fieldErrors?.length) {
          for (const fieldError of error.fieldErrors) {
            form.setError(RHF_FIELD_PATH[fieldError.field], { type: "server", message: fieldError.message });
          }
          return;
        }
        const message = error instanceof Error ? error.message : "Une erreur est survenue. Réessayez.";
        form.setError("root", { type: "server", message });
      },
    });
  });

  return {
    form,
    onSubmit,
    isSubmitting: mutation.isPending,
    passwordStrength,
  };
}

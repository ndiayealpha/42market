import { countriesResponseSchema, signupResponseSchema } from "../schemas/auth.dto.schema";
import { COUNTRIES } from "../schemas/countries.data";
import type { CountriesResponse, SignupFieldError, SignupFormValues, SignupResponse } from "../types/auth.types";
import { authProvider } from "./auth-provider";

/** Thrown by `AuthApi.signup` on any failure — field-level or global. */
export class SignupApiError extends Error {
  fieldErrors?: SignupFieldError[];

  constructor(message: string, fieldErrors?: SignupFieldError[]) {
    super(message);
    this.name = "SignupApiError";
    this.fieldErrors = fieldErrors;
  }
}

/**
 * The one seam `useSignupMutation`/`useCountriesQuery` depend on (never
 * on this module directly) — see `AuthApiProvider`. Pure transport: no
 * React, no form state, no Zustand.
 */
export interface AuthApi {
  signup: (payload: SignupFormValues) => Promise<SignupResponse>;
  getCountries: () => Promise<CountriesResponse>;
}

/**
 * Real implementation. There is no backend yet, so — like login's
 * `authProvider` — this simulates the round trip against the same
 * in-memory mock store, but still goes through the exact same
 * request/response shape (and the same Zod `safeParse` boundary) a real
 * `fetch` implementation would use, so swapping it later is a one-file change.
 */
export const authApi: AuthApi = {
  async signup(payload) {
    const result = await authProvider.register({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });

    if ("error" in result) {
      throw new SignupApiError(result.message, [{ field: "email", message: result.message }]);
    }

    const parsed = signupResponseSchema.safeParse({ user: result.user });
    if (!parsed.success) {
      throw new SignupApiError("Réponse du serveur invalide.");
    }
    return parsed.data;
  },

  async getCountries() {
    const parsed = countriesResponseSchema.safeParse(COUNTRIES);
    if (!parsed.success) {
      throw new SignupApiError("Liste des pays invalide.");
    }
    return parsed.data;
  },
};

import { z } from "zod";

/**
 * Schemas for what the server sends back. `auth.api.ts` parses every
 * response through these with `safeParse`, so a server contract change
 * surfaces as a typed error instead of a silent `any`.
 */
export const countryDtoSchema = z.object({
  code: z.string().length(2),
  name: z.string(),
  dialCode: z.string(),
  flag: z.string(),
  nationalNumberLength: z.number().int().positive(),
});

export const countriesResponseSchema = z.array(countryDtoSchema);

export const signupUserDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export const signupResponseSchema = z.object({
  user: signupUserDtoSchema,
});

/** Shape of a field-level error the server can send back (e.g. "email already used"). */
export const signupFieldErrorSchema = z.object({
  field: z.enum(["firstName", "lastName", "email", "phone", "password", "acceptTerms"]),
  message: z.string(),
});

export const signupErrorResponseSchema = z.object({
  message: z.string(),
  fieldErrors: z.array(signupFieldErrorSchema).optional(),
});

import type { z } from "zod";

import type { Country } from "../schemas/countries.data";
import type {
  countriesResponseSchema,
  signupErrorResponseSchema,
  signupFieldErrorSchema,
  signupResponseSchema,
  signupUserDtoSchema,
} from "../schemas/auth.dto.schema";
import type { signupSchema } from "../schemas/signup.schema";

// No type here is hand-written when it can be derived from a schema —
// the schema is the single source of truth, the type just names it.
export type SignupFormValues = z.infer<typeof signupSchema>;

export type SignupUser = z.infer<typeof signupUserDtoSchema>;
export type SignupResponse = z.infer<typeof signupResponseSchema>;
export type SignupFieldError = z.infer<typeof signupFieldErrorSchema>;
export type SignupErrorResponse = z.infer<typeof signupErrorResponseSchema>;
export type CountriesResponse = z.infer<typeof countriesResponseSchema>;

export type { Country };

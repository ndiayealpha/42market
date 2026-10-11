import { z } from "zod";

import { findCountry } from "./countries.data";
import { PASSWORD_RULES } from "./password.rules";

const nameField = (requiredMessage: string) =>
  z.string().trim().min(1, requiredMessage).max(50, "50 caractères maximum.");

// A fixed, single-line message regardless of *which* rule(s) fail:
// listing the missing rules dynamically could produce a message long
// enough to need the error slot's reserved one line to truncate it —
// exactly the layout jump that slot exists to prevent. The strength
// meter is where a user sees progress; this is just the final gate.
const PASSWORD_REQUIREMENTS_MESSAGE =
  "8 caractères min., avec une majuscule, un chiffre et un caractère spécial.";

const passwordField = z.string().superRefine((value, ctx) => {
  const allRulesPass = PASSWORD_RULES.every((rule) => rule.test(value));
  if (!allRulesPass) {
    ctx.addIssue({ code: "custom", message: PASSWORD_REQUIREMENTS_MESSAGE });
  }
});

const phoneField = z
  .object({
    countryCode: z.string().min(1, "Sélectionnez un indicatif."),
    number: z.string().trim().min(1, "Le numéro de téléphone est requis."),
  })
  .superRefine((phone, ctx) => {
    const digits = phone.number.replace(/\D/g, "");
    const country = findCountry(phone.countryCode);

    if (!country) {
      ctx.addIssue({ code: "custom", message: "Indicatif inconnu.", path: ["countryCode"] });
      return;
    }

    if (digits.length !== country.nationalNumberLength) {
      ctx.addIssue({
        code: "custom",
        message: `Numéro invalide pour ${country.name} (${country.nationalNumberLength} chiffres attendus).`,
        path: ["number"],
      });
    }
  });

export const signupSchema = z.object({
  firstName: nameField("Le prénom est requis."),
  lastName: nameField("Le nom est requis."),
  email: z.string().trim().min(1, "L'adresse e-mail est requise.").email("Adresse e-mail invalide.").toLowerCase(),
  phone: phoneField,
  password: passwordField,
  // z.boolean().refine (not z.literal(true)) so the inferred TS type stays
  // `boolean` — an unchecked checkbox's `false` default value needs to be
  // assignable, only the *validation* has to require `true`.
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: "Vous devez accepter les conditions générales pour continuer.",
  }),
  // No `.default()` here: RHF's `defaultValues` already guarantees a
  // defined value, and a zod `.default()` would make the input type
  // `boolean | undefined` while the output stays `boolean` — the
  // resulting mismatch is what `useForm`'s generic actually complains about.
  newsletter: z.boolean(),
});

export type SignupSchema = typeof signupSchema;

"use client";

import { Controller } from "react-hook-form";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { TextLink } from "@/src/components/atoms/Link/Link";
import { ConsentCheckbox } from "@/src/components/molecules/ConsentCheckbox/ConsentCheckbox";
import { FormField } from "@/src/components/molecules/FormField/FormField";
import { PasswordField } from "@/src/components/molecules/PasswordField/PasswordField";
import { PasswordStrengthMeter } from "@/src/components/molecules/PasswordStrengthMeter/PasswordStrengthMeter";
import { PhoneField } from "@/src/components/molecules/PhoneField/PhoneField";
import { Button } from "@/src/stories/Button";

import { useCountriesQuery } from "../../queries/useCountriesQuery";
import { useSignupForm } from "../../hooks/useSignupForm";

// FormField/Input are styling-neutral (see FormField.tsx) — this feature
// owns its own look, distinct from LoginForm's (tinted, borderless,
// 8px radius vs. login's white/bordered/10px).
const SIGNUP_FIELD_STYLE = {
  className: "!h-[52px] !rounded-[8px] !border-0 !bg-auth-input-tint !px-4",
  inputClassName: "!text-[15px] !text-foreground placeholder:!text-auth-placeholder-muted",
  iconClassName: "!text-auth-ink-muted",
};

export function SignupForm() {
  const { form, onSubmit, isSubmitting, passwordStrength } = useSignupForm();
  const { data: countries = [] } = useCountriesQuery();
  const {
    control,
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[clamp(12px,2vh,24px)]">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          {...SIGNUP_FIELD_STYLE}
          label="Prénom"
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <FormField
          {...SIGNUP_FIELD_STYLE}
          label="Nom"
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <FormField
        {...SIGNUP_FIELD_STYLE}
        label="Adresse e-mail"
        type="email"
        autoComplete="email"
        placeholder="exemple@domaine.fr"
        icon={<Icon name="mail" decorative />}
        error={errors.email?.message}
        {...register("email")}
      />

      <Controller
        control={control}
        name="phone.countryCode"
        render={({ field: countryField }) => (
          <PhoneField
            {...SIGNUP_FIELD_STYLE}
            label="Téléphone"
            autoComplete="tel-national"
            placeholder="6 12 34 56 78"
            countryCode={countryField.value}
            onCountryCodeChange={countryField.onChange}
            countryOptions={countries}
            countryInvalid={Boolean(errors.phone?.countryCode)}
            error={errors.phone?.countryCode?.message ?? errors.phone?.number?.message}
            {...register("phone.number")}
          />
        )}
      />

      <div className="flex flex-col gap-2">
        <PasswordField
          {...SIGNUP_FIELD_STYLE}
          className={`${SIGNUP_FIELD_STYLE.className} !h-12`}
          label="Mot de passe"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordStrengthMeter score={passwordStrength.score} label={passwordStrength.label} />
      </div>

      <div className="flex flex-col gap-3">
        <Controller
          control={control}
          name="acceptTerms"
          render={({ field }) => (
            <ConsentCheckbox
              checked={field.value}
              onChange={(event) => field.onChange(event.target.checked)}
              onBlur={field.onBlur}
              error={errors.acceptTerms?.message}
              label={
                <>
                  J&apos;accepte les <TextLink href="#">conditions générales</TextLink> et la{" "}
                  <TextLink href="#">politique de confidentialité</TextLink>
                </>
              }
            />
          )}
        />
        <Controller
          control={control}
          name="newsletter"
          render={({ field }) => (
            <ConsentCheckbox
              checked={field.value}
              onChange={(event) => field.onChange(event.target.checked)}
              onBlur={field.onBlur}
              label="Je souhaite recevoir les offres et actualités de 42 Markets par e-mail"
            />
          )}
        />
      </div>

      {errors.root?.message && (
        <p role="alert" className="text-sm text-danger">
          {errors.root.message}
        </p>
      )}

      <Button
        primary
        fullWidth
        disabled={isSubmitting}
        label={isSubmitting ? "Création en cours…" : "Créer mon compte client"}
        icon={<Icon name="arrow-right" size={18} />}
        iconPosition="right"
        style={{
          backgroundColor: "var(--foreground-strong)",
          borderRadius: 8,
          height: 56,
          fontSize: 15,
          fontWeight: 700,
        }}
        onClick={onSubmit}
      />
    </form>
  );
}

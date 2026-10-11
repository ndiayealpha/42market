"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { TextLink } from "@/src/components/atoms/Link/Link";
import { FormField } from "@/src/components/molecules/FormField/FormField";
import { PasswordField } from "@/src/components/molecules/PasswordField/PasswordField";
import { RememberMe } from "@/src/components/molecules/RememberMe/RememberMe";
import { Button } from "@/src/stories/Button";

import { useSession } from "../../hooks/session-provider";

/**
 * The actual <form>: email, password, remember-me, forgot-password,
 * submit. All auth logic is delegated to `useSession()` — this
 * component only owns the form's own local field state.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  email?: string;
  password?: string;
}

// FormField/Input are styling-neutral molecules (see FormField.tsx) — the
// login look lives here, at the call site, so it never leaks into other
// consumers (e.g. the signup feature's own field adapter has its own look).
const LOGIN_FIELD_STYLE = {
  labelClassName: "!font-semibold !text-auth-ink",
  className:
    "!h-[clamp(42px,5.6vh,52px)] !rounded-[10px] !border !border-auth-input-border !bg-white !px-4 !shadow-[0_1px_2px_rgba(58,34,32,0.04)] focus-within:!shadow-[0_0_0_2px_#F3E8E5] focus-within:!ring-0",
  inputClassName: "!text-[15px] !text-auth-ink placeholder:!text-auth-placeholder",
  iconClassName: "!text-auth-ink-muted",
};

export function LoginForm() {
  const session = useSession();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // No validation library is installed in this project; this is the
  // simplest check that covers the two required fields without adding one.
  function validate(): boolean {
    const errors: FieldErrors = {};
    if (!email) errors.email = "L'adresse e-mail est requise.";
    else if (!EMAIL_PATTERN.test(email)) errors.email = "Adresse e-mail invalide.";
    if (!password) errors.password = "Le mot de passe est requis.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function submit() {
    if (session.isLoading) return;
    if (!validate()) return;
    session.login({ email, password }, searchParams?.get("callbackUrl") ?? undefined);
  }

  return (
    // Button below is type="button" (see src/stories/Button.tsx), so it
    // can't submit natively — onSubmit only covers Enter-in-a-field;
    // the button's own onClick calls the same `submit()`.
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      noValidate
      className="flex flex-col gap-[clamp(12px,2vh,24px)]"
    >
      <FormField
        {...LOGIN_FIELD_STYLE}
        label="Adresse e-mail"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="exemple@domaine.fr"
        icon={<Icon name="mail" decorative />}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldErrors.email}
        required
      />

      <PasswordField
        {...LOGIN_FIELD_STYLE}
        label="Mot de passe"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={fieldErrors.password}
        required
        labelSuffix={
          <TextLink href="#" variant="muted" className="!text-xs !text-auth-ink hover:!text-foreground">
            Mot de passe oublié ?
          </TextLink>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <RememberMe checked={rememberMe} onChange={setRememberMe} />
        <span className="flex items-center gap-1 text-xs text-auth-ink-muted">
          <Icon name="shield" size={12} decorative />
          Session chiffrée
        </span>
      </div>

      {session.error && (
        <p role="alert" className="text-sm text-danger">
          {session.error}
        </p>
      )}

      <Button
        primary
        fullWidth
        disabled={session.isLoading}
        label={session.isLoading ? "Connexion…" : "Se connecter"}
        icon={<Icon name="arrow-right" size={20} />}
        iconPosition="right"
        style={{
          backgroundColor: "var(--foreground)",
          borderRadius: 10,
          height: "clamp(46px, 6.4vh, 60px)",
          fontSize: "clamp(17px, 2.2vh, 22px)",
          fontWeight: 700,
          boxShadow: "0 4px 12px rgba(58, 34, 32, 0.18)",
        }}
        onClick={submit}
      />
    </form>
  );
}

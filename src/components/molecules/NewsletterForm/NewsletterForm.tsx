"use client";

import { useId, useState, type CSSProperties } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Input } from "@/src/components/atoms/Input/Input";
import { Button } from "@/src/stories/Button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface NewsletterFormProps {
  /**
   * Called with the submitted email. Left unset, the form still renders
   * and can be composed/tested on its own; wire a real API call here
   * later without touching the Footer that renders it. Rejecting it
   * surfaces the error state below.
   */
  onSubscribe?: (email: string) => Promise<void> | void;
  /** Override the input pill's classes (default: desktop's bordered white pill). */
  inputWrapperClassName?: string;
  /** Override the submit button's inline style (default: desktop's dark pill). */
  buttonStyle?: CSSProperties;
}

const DEFAULT_BUTTON_STYLE: CSSProperties = { backgroundColor: "var(--color-foreground-strong)" };

export function NewsletterForm({ onSubscribe, inputWrapperClassName, buttonStyle }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const helpId = useId();

  async function submit() {
    if (status === "pending") return;
    if (!email || !EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setErrorMessage("Adresse e-mail invalide.");
      return;
    }
    setStatus("pending");
    try {
      await onSubscribe?.(email);
      setStatus("done");
    } catch {
      setStatus("error");
      setErrorMessage("Une erreur est survenue. Réessayez.");
    }
  }

  const helpText =
    status === "done"
      ? "Merci ! Vérifiez votre boîte mail."
      : status === "error"
        ? errorMessage
        : "Désinscription possible à tout moment en 1 clic";

  return (
    // Button below is type="button" (see src/stories/Button.tsx), so it
    // can't submit natively — onSubmit only covers Enter-in-the-input;
    // the button's own onClick calls the same `submit()`.
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
      noValidate
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className={inputWrapperClassName ?? "min-w-0 flex-1 rounded-full border border-border bg-surface px-4 py-2"}>
          <Input
            variant="plain"
            type="email"
            required
            placeholder="Votre adresse email..."
            aria-label="Adresse email"
            aria-invalid={status === "error" ? true : undefined}
            aria-describedby={helpId}
            icon={<Icon name="mail" decorative />}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <Button
          primary
          label={status === "pending" ? "Envoi…" : "S'inscrire"}
          icon={<Icon name="chevron-right" size={14} />}
          iconPosition="right"
          style={buttonStyle ?? DEFAULT_BUTTON_STYLE}
          onClick={submit}
        />
      </div>
      <p id={helpId} role={status === "error" ? "alert" : undefined} className={`text-xs ${status === "error" ? "text-danger" : "text-muted-foreground"}`}>
        {helpText}
      </p>
    </form>
  );
}

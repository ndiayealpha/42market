"use client";

import { useState } from "react";

import { Button } from "@/src/components/atoms/Button/Button";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { FormField } from "@/src/components/molecules/FormField/FormField";
import { FormSelectField, type FormSelectOption } from "@/src/components/molecules/FormSelectField/FormSelectField";
import { FormTextareaField } from "@/src/components/molecules/FormTextareaField/FormTextareaField";
import {
  CONTACT_MOTIF_LABELS,
  hasContactFormErrors,
  isContactMotif,
  validateContactRequest,
  type ContactFormErrors,
  type ContactMotif,
} from "@/src/domain/contact";
import { useSubmitContact } from "@/src/hooks/useSubmitContact";

export interface ContactFormProps {
  storeOptions: FormSelectOption[];
  initialMotif?: ContactMotif;
  initialStoreSlug?: string;
}

const MOTIF_OPTIONS: FormSelectOption[] = Object.entries(CONTACT_MOTIF_LABELS).map(([value, label]) => ({ value, label }));

/**
 * `honeypot` is a hidden field real visitors never fill (CSS-hidden, no
 * label a screen reader would announce as meaningful content, `tabIndex={-1}`,
 * `autoComplete="off"`) — a submission with it filled is treated as spam
 * and silently "succeeds" without ever calling the mutation. The simplest
 * anti-spam measure that needs no backend.
 */
export function ContactForm({ storeOptions, initialMotif, initialStoreSlug }: ContactFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [motif, setMotif] = useState<ContactMotif>(initialMotif ?? "autre");
  const [storeSlug, setStoreSlug] = useState(initialStoreSlug ?? "");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedAsSpam, setSubmittedAsSpam] = useState(false);
  const submitContact = useSubmitContact();

  function handleSubmit() {
    if (honeypot) {
      setSubmittedAsSpam(true);
      return;
    }

    const input = { fullName, phone, motif, storeSlug: storeSlug || undefined, message };
    const nextErrors = validateContactRequest(input);
    setErrors(nextErrors);
    if (hasContactFormErrors(nextErrors)) return;

    submitContact.mutate(input);
  }

  if (submitContact.isSuccess || submittedAsSpam) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface px-6 py-10 text-center shadow-card">
        <Icon name="check-circle" size={32} className="text-success" decorative />
        <p className="text-lg font-bold text-foreground-strong">Message envoyé !</p>
        <p className="max-w-sm text-sm text-ink-muted">
          Merci {fullName || ""}, votre message a bien été transmis. Notre équipe (ou l&apos;épicerie concernée) vous répond sous 24h.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      noValidate
      className="flex flex-col gap-5 rounded-2xl bg-surface p-6 shadow-card sm:p-8"
    >
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="contact-company">Votre entreprise</label>
        <input id="contact-company" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Votre nom complet"
          placeholder="Aïcha, Mamadou, Christian..."
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          error={errors.fullName}
        />
        <FormField
          label="Téléphone (ou WhatsApp)"
          type="tel"
          placeholder="06 12 34 56 78"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          error={errors.phone}
        />
        <FormSelectField
          label="Motif de votre message"
          value={motif}
          onChange={(value) => isContactMotif(value) && setMotif(value)}
          options={MOTIF_OPTIONS}
          error={errors.motif}
        />
        <FormSelectField
          label="Épicerie concernée (Optionnel)"
          value={storeSlug}
          onChange={setStoreSlug}
          options={storeOptions}
          placeholder="Aucune épicerie en particulier"
        />
      </div>

      <FormTextareaField
        label="Votre message"
        placeholder="Écrivez-nous en toute simplicité votre besoin..."
        rows={6}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        error={errors.message}
      />

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="flex items-center gap-1.5 text-xs text-ink-muted">
          <Icon name="lock" size={14} decorative />
          Vos données personnelles restent protégées et confidentielles.
        </p>
        <Button
          variant="primary-lg"
          type="submit"
          disabled={submitContact.isPending}
          icon={<Icon name="arrow-right" size={16} decorative />}
          className="sm:w-auto"
        >
          {submitContact.isPending ? "Envoi…" : "Envoyer le message"}
        </Button>
      </div>

      {submitContact.isError && <p role="alert" className="text-sm text-danger">Une erreur est survenue. Réessayez dans un instant.</p>}
    </form>
  );
}

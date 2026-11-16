"use client";

import { useId, useRef, useState, type ChangeEvent } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface FileUploadProps {
  label: string;
  /** e.g. "application/pdf,image/jpeg,image/png" — passed straight to the native `accept` attribute. */
  accept: string;
  /** Human-readable hint shown under the dropzone, e.g. "PDF, JPEG, PNG (< 10 Mo)". */
  hint: string;
  maxSizeBytes: number;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  id?: string;
}

/**
 * No `FileUpload` primitive existed in this repo (checked first, same
 * precedent as `Textarea`). Client-side only: validates mime-type (against
 * `accept`) and size, reports the result via `error`/`onChange` — there is
 * no real upload endpoint in this mock app, same spirit as `NewsletterForm`'s
 * `onSubscribe` stub.
 */
export function FileUpload({ label, accept, hint, maxSizeBytes, file, onChange, error, id }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    if (selected) {
      const validationError = validateFile(selected, accept, maxSizeBytes);
      setLocalError(validationError);
      onChange(validationError ? null : selected);
      return;
    }
    setLocalError(undefined);
    onChange(null);
  }

  function handleRemove() {
    onChange(null);
    setLocalError(undefined);
    if (inputRef.current) inputRef.current.value = "";
  }

  const displayedError = localError ?? error;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <label
        htmlFor={fieldId}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-surface px-4 py-6 text-center transition-colors hover:border-info focus-within:ring-2 focus-within:ring-info"
      >
        <Icon name="upload" size={20} className="text-muted-foreground" decorative />
        {file ? (
          <p className="text-sm font-medium text-foreground-strong">{file.name}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Glissez votre document ou cliquez
            <br />
            <span className="text-xs">{hint}</span>
          </p>
        )}
        <input
          ref={inputRef}
          id={fieldId}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="sr-only"
          aria-invalid={displayedError ? true : undefined}
          aria-describedby={displayedError ? errorId : undefined}
        />
      </label>

      {file && (
        <button type="button" onClick={handleRemove} className="self-start text-xs font-medium text-danger underline underline-offset-2">
          Retirer le fichier
        </button>
      )}

      <p id={errorId} role={displayedError ? "alert" : undefined} className="h-4 truncate text-xs leading-4 text-danger">
        {displayedError}
      </p>
    </div>
  );
}

/** Pure validation helper, kept outside the component so a page/hook can call it before/without rendering (e.g. on submit). */
export function validateFile(file: File, accept: string, maxSizeBytes: number): string | undefined {
  const acceptedTypes = accept.split(",").map((type) => type.trim());
  if (!acceptedTypes.includes(file.type)) {
    return "Format de fichier non pris en charge.";
  }
  if (file.size > maxSizeBytes) {
    return `Le fichier dépasse la taille maximale de ${Math.round(maxSizeBytes / (1024 * 1024))} Mo.`;
  }
  return undefined;
}

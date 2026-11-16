import { forwardRef, useId } from "react";

import { Textarea, type TextareaProps } from "@/src/components/atoms/Textarea/Textarea";

export interface FormTextareaFieldProps extends TextareaProps {
  label: string;
  error?: string;
}

/** Label + textarea + error message, same structure as `FormField` (its `Input`-specific counterpart) for the one multi-line field this app needs (Contact's message). */
export const FormTextareaField = forwardRef<HTMLTextAreaElement, FormTextareaFieldProps>(function FormTextareaField(
  { label, error, id, ...textareaProps },
  ref
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <Textarea ref={ref} id={fieldId} aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : undefined} {...textareaProps} />
      <p id={errorId} role={error ? "alert" : undefined} className="h-4 truncate text-xs leading-4 text-danger">
        {error}
      </p>
    </div>
  );
});

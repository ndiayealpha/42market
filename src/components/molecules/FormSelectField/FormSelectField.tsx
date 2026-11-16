import { useId } from "react";

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FormSelectOption[];
  error?: string;
  id?: string;
  placeholder?: string;
}

/**
 * Label + native `<select>` + error message, same bordered look as
 * `Input`/`Textarea` and same label/error structure as `FormField` — the
 * existing `atoms/Select` is a different visual contract (a pill-shaped
 * filter-bar dropdown with no label), not reused here to avoid a
 * form full of Input-style fields next to one filter-bar pill.
 */
export function FormSelectField({ label, value, onChange, options, error, id, placeholder }: FormSelectFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        id={fieldId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-info"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p id={errorId} role={error ? "alert" : undefined} className="h-4 truncate text-xs leading-4 text-danger">
        {error}
      </p>
    </div>
  );
}

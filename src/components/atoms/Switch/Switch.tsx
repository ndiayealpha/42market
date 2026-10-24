export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  /** Required accessible name — this control has no visible text of its own. */
  "aria-label": string;
  className?: string;
}

/**
 * The repo's only toggle-like primitive before this was `Checkbox`
 * (styled as a checkbox, not a switch track) — Phase 0 audit found no
 * Switch anywhere, so this is new, not an extension.
 */
export function Switch({ checked, onChange, disabled, "aria-label": ariaLabel, className = "" }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info disabled:opacity-50 ${
        checked ? "bg-foreground" : "bg-catalog-chip"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-150 ease-out motion-reduce:transition-none ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

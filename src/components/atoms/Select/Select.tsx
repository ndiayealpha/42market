import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string> {
  icon?: IconName;
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Visually hidden accessible name — every select needs one since there's no visible `<label>` in this design. */
  "aria-label": string;
  className?: string;
}

/** A native `<select>` (full keyboard/AT support for free) with a leading icon overlay — the repo's one sort/choice dropdown. Nothing like it existed before (Phase 0 audit). */
export function Select<T extends string>({ icon, options, value, onChange, "aria-label": ariaLabel, className = "" }: SelectProps<T>) {
  return (
    <span className={`relative inline-flex items-center ${className}`}>
      {icon && <Icon name={icon} size={16} className="pointer-events-none absolute left-3 text-muted-foreground" decorative />}
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className={`h-9 appearance-none rounded-full border border-border bg-surface py-0 pr-8 text-sm font-semibold text-foreground-strong ${icon ? "pl-9" : "pl-4"}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevron-down" size={14} className="pointer-events-none absolute right-3 text-muted-foreground" decorative />
    </span>
  );
}

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}

/** Nothing like it existed before (Phase 0 audit) — new primitive. A radio-group-like toggle, not tabs (it filters/sorts the content below it in place, it doesn't switch panels). */
export function SegmentedControl<T extends string>({ options, value, onChange, ariaLabel, className = "" }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={`inline-flex rounded-full bg-catalog-chip p-1 ${className}`}>
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              isSelected ? "bg-surface text-foreground-strong shadow-card" : "text-muted-foreground hover:text-foreground-strong"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface SearchInputProps {
  defaultValue: string;
  onDebouncedChange: (value: string) => void;
  /** Visually hidden accessible name — there's no visible `<label>` for this field. */
  label: string;
  placeholder: string;
  debounceMs?: number;
  className?: string;
}

/** A debounced `type="search"` field with a visually-hidden label — nothing like it existed before (Phase 0 audit). */
export function SearchInput({ defaultValue, onDebouncedChange, label, placeholder, debounceMs = 300, className = "" }: SearchInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [syncedDefaultValue, setSyncedDefaultValue] = useState(defaultValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Resets the field when `defaultValue` changes for a reason OTHER than this component's own
  // typing (e.g. "Réinitialiser les filtres") — adjusting state during render, not in an effect.
  if (defaultValue !== syncedDefaultValue) {
    setSyncedDefaultValue(defaultValue);
    setValue(defaultValue);
  }

  function handleChange(nextValue: string) {
    setValue(nextValue);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onDebouncedChange(nextValue), debounceMs);
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <Icon name="search" size={16} className="pointer-events-none absolute left-3 text-muted-foreground" decorative />
      <label className="sr-only" htmlFor="favorites-search">
        {label}
      </label>
      <input
        id="favorites-search"
        type="search"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm text-foreground-strong placeholder:text-muted-foreground"
      />
    </span>
  );
}

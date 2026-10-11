"use client";

import { useState } from "react";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Input } from "@/src/components/atoms/Input/Input";
import { Divider } from "@/src/components/atoms/Divider/Divider";
import { Button } from "@/src/stories/Button";
import { LocationSelector } from "@/src/components/molecules/LocationSelector/LocationSelector";

export interface HeaderSearchProps {
  location: string;
  radiusLabel: string;
  placeholder?: string;
  onLocationClick?: () => void;
  onSearch?: (query: string) => void;
}

/** The header's main search pill: location + radius, then a free-text search. */
export function HeaderSearch({
  location,
  radiusLabel,
  placeholder = "Rechercher ...",
  onLocationClick,
  onSearch,
}: HeaderSearchProps) {
  const [query, setQuery] = useState("");

  function submit() {
    onSearch?.(query);
  }

  return (
    // Button below is type="button" (see src/stories/Button.tsx), so it
    // can't submit natively — onSubmit only covers Enter-in-the-input;
    // the button's own onClick calls the same `submit()`.
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="flex w-full max-w-2xl items-center rounded-full border border-border bg-surface pl-1 pr-1.5"
    >
      <LocationSelector location={location} radiusLabel={radiusLabel} onClick={onLocationClick} />
      <Divider orientation="vertical" />
      <div className="flex-1 px-3">
        <Input
          variant="plain"
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Rechercher un produit ou un commerçant"
        />
      </div>
      <Button
        primary
        label="Rechercher"
        icon={<Icon name="search" size={16} />}
        backgroundColor="var(--color-foreground-strong)"
        onClick={submit}
      />
    </form>
  );
}

"use client";

import { Icon } from "@/src/components/atoms/Icon/Icon";

export interface LocationSelectorProps {
  location: string;
  radiusLabel: string;
  onClick?: () => void;
}

/** "42000, FR · Rayon 3 km" control, opens the location/radius picker. */
export function LocationSelector({ location, radiusLabel, onClick }: LocationSelectorProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm text-foreground"
    >
      <Icon name="location" size={16} className="text-muted-foreground" />
      <span className="font-semibold">{location}</span>
      <span className="hidden text-muted-foreground sm:inline">{radiusLabel}</span>
      <Icon name="chevron-down" size={14} className="text-muted-foreground" />
    </button>
  );
}

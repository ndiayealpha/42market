"use client";

import Link from "next/link";
import { useState } from "react";

import { Chip } from "@/src/components/atoms/Chip/Chip";
import { routes } from "@/src/lib/routing/routes";

import { FEATURED_COUNTRIES, MORE_COUNTRIES, type CountryChip } from "./about.constants";

function CountryTile({ country }: { country: CountryChip }) {
  return (
    <Link href={routes.main.epiceries}>
      <Chip tone="cream" size="sm" shape="pill" icon={country.emoji}>
        {country.label}
      </Chip>
    </Link>
  );
}

export function CountryChipsGrid() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {FEATURED_COUNTRIES.map((country) => (
        <CountryTile key={country.label} country={country} />
      ))}
      {expanded && MORE_COUNTRIES.map((country) => <CountryTile key={country.label} country={country} />)}
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="inline-flex h-[21px] items-center rounded-full bg-catalog-chip px-2 text-[12px] font-bold text-foreground-strong"
        >
          …
        </button>
      )}
    </div>
  );
}

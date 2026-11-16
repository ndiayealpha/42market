"use client";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { SearchInput } from "@/src/components/molecules/SearchInput/SearchInput";

export interface CarnetHeroProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function CarnetHero({ query, onQueryChange }: CarnetHeroProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground-strong">
        <Icon name="archive" size={14} />
        Le Carnet du Terroir · Édition &amp; Cultures
      </p>
      <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
        Histoires de goût, secrets d&apos;épices &amp; mémoire des terroirs
      </h1>
      <p className="max-w-2xl text-sm text-ink-muted sm:text-base">
        Des recettes ancestrales aux portraits d&apos;épiciers indépendants, plongez dans les coulisses de la gastronomie d&apos;Afrique, des Caraïbes,
        d&apos;Asie et du monde.
      </p>
      <SearchInput
        defaultValue={query}
        onDebouncedChange={onQueryChange}
        label="Rechercher un article du Carnet"
        placeholder="Rechercher une recette, un produit, un artisan…"
        className="w-full sm:w-96"
      />
    </div>
  );
}

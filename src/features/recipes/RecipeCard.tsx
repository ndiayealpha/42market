"use client";

import Image from "next/image";
import { useState } from "react";

import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Flag } from "@/src/components/atoms/Flag/Flag";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { RatingBadge } from "@/src/components/atoms/RatingBadge/RatingBadge";
import type { Recipe } from "@/src/domain/recipe";
import { formatDuration, formatPrice } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface RecipeCardProps {
  recipe: Recipe;
}

/**
 * Not built on `atoms/Card`: the brief requires an `<article>` root, and
 * `Card` only ever renders a `<div>`. The two overlay pills (country,
 * duration) are inline here too — they need a translucent
 * `backdrop-blur` background and, for the country one, an actual flag
 * image, neither of which `Pill`/`Chip` support.
 */
export function RecipeCard({ recipe }: RecipeCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="group flex h-full w-[80vw] max-w-[320px] shrink-0 flex-col overflow-hidden rounded-xl border border-catalog-line bg-surface shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-[240px] xl:w-[275px]">
      <div className="relative h-[176px] w-full shrink-0 overflow-hidden">
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-catalog-chip">
            <Icon name="cooking" size={28} className="text-catalog-faint" />
          </div>
        ) : (
          <Image
            src={recipe.image.src}
            alt={recipe.image.alt}
            fill
            sizes="(min-width: 1280px) 275px, (min-width: 640px) 240px, 80vw"
            className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            onError={() => setImageFailed(true)}
          />
        )}

        <span className="absolute top-3 left-3 inline-flex h-6 items-center gap-1.5 rounded-full bg-surface/90 px-2 backdrop-blur-sm">
          <Flag code={recipe.flag} size={12} />
          <span className="text-[11px] font-bold text-foreground-strong">{recipe.countries.join(" · ")}</span>
        </span>

        <span className="absolute right-2 bottom-2 inline-flex h-[22px] items-center gap-1 rounded-full bg-foreground-strong/90 px-2">
          <Icon name="clock" size={12} className="text-white" />
          <span className="text-[11px] font-medium text-white">
            {formatDuration(recipe.durationMinutes)} · {recipe.difficulty}
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 truncate text-lg font-bold text-foreground-strong">{recipe.title}</h3>
          {recipe.rating != null && <RatingBadge value={recipe.rating} size="sm" className="shrink-0" />}
        </div>
        <p className="mt-2 line-clamp-3 text-xs leading-4 text-catalog-text-secondary">{recipe.description}</p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-catalog-line-light px-4 pt-3 pb-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.06em] text-catalog-text-secondary uppercase">Panier dès</p>
          <p className="text-base font-bold text-foreground-strong">{formatPrice(recipe.priceFrom)}</p>
        </div>
        <ButtonLink
          href={routes.main.cart}
          variant="primary-sm"
          icon={<Icon name="arrow-right" size={14} />}
          aria-label={`Voir le panier de la recette ${recipe.title}`}
        >
          Voir le panier
        </ButtonLink>
      </div>
    </article>
  );
}

import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { getRecipeRating, type Recipe } from "@/src/domain/recipe";
import { formatRelativeTime } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface RecipeReviewsSectionProps {
  recipe: Recipe;
  now: Date;
}

/** No review-submission form exists yet — "Donner mon avis" points at `routes.main.support` (TODO: build a dedicated form), same convention as every other unbuilt flow in this app. */
export function RecipeReviewsSection({ recipe, now }: RecipeReviewsSectionProps) {
  const rating = getRecipeRating(recipe);
  const { reviews } = recipe.detail;

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-lg font-extrabold text-foreground-strong">
          {rating ? (
            <>
              <Icon name="star" size={18} className="text-warning" />
              {rating.average}
              <span className="text-sm font-medium text-muted-foreground">
                Basé sur {rating.count} avis cuisiniers
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-muted-foreground">Aucun avis pour le moment</span>
          )}
        </p>
        <ButtonLink href={routes.main.support} variant="soft">
          Donner mon avis
        </ButtonLink>
      </div>

      {reviews.length > 0 && (
        <ul className="flex flex-col gap-3">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-xl bg-surface-subtle p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold text-foreground-strong">
                  {review.authorName}
                  {review.authorLocation && <span className="font-normal text-muted-foreground"> ({review.authorLocation})</span>}
                </p>
                <time dateTime={review.createdAtIso} className="text-xs text-muted-foreground">
                  {formatRelativeTime(review.createdAtIso, now)}
                </time>
              </div>
              <p className="mt-1.5 text-sm text-ink-muted">« {review.comment} »</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

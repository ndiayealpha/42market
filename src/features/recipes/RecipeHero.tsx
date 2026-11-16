import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Flag } from "@/src/components/atoms/Flag/Flag";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { RECIPE_DIFFICULTY_CONFIG, getRecipeRating, type Recipe } from "@/src/domain/recipe";
import { formatDuration } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface RecipeHeroProps {
  recipe: Recipe;
}

export function RecipeHero({ recipe }: RecipeHeroProps) {
  const rating = getRecipeRating(recipe);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Accueil", href: routes.main.home },
          { label: "Recettes du Monde", href: routes.main.recipes },
          { label: recipe.countries[0], href: `${routes.main.recipes}?region=${recipe.region}` },
          { label: recipe.title },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <ProductImage
          src={recipe.image.src}
          alt={recipe.image.alt}
          aspectRatio="4/3"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="rounded-2xl"
          priority
          topLeft={
            recipe.originBadge ? (
              <span className="flex items-center gap-1.5 rounded-full bg-surface/95 px-3 py-1.5 text-xs font-bold text-foreground-strong">
                <Icon name="sparkle" size={14} className="text-warning" />
                {recipe.originBadge}
              </span>
            ) : undefined
          }
        />

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-catalog-chip px-2.5 py-1 text-xs font-bold text-foreground-strong">
              <Flag code={recipe.flag} size={14} />
              {recipe.countries.join(" · ")}
            </span>
            {recipe.originTag && (
              <Chip tone="cream" size="xs" shape="pill">
                {recipe.originTag}
              </Chip>
            )}
          </div>

          <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[28px]">{recipe.title}</h1>
          {recipe.subtitle && <p className="text-sm font-semibold text-muted-foreground">{recipe.subtitle}</p>}
          <p className="text-sm text-ink-muted">{recipe.description}</p>

          <div className="grid grid-cols-2 gap-3 rounded-xl bg-surface-subtle p-4 sm:grid-cols-4">
            <div>
              <p className="text-[11px] font-semibold uppercase text-muted-foreground">Préparation</p>
              <p className="text-sm font-bold text-foreground-strong">{formatDuration(recipe.durationMinutes)}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase text-muted-foreground">Difficulté</p>
              <p className="text-sm font-bold text-foreground-strong">{RECIPE_DIFFICULTY_CONFIG[recipe.difficulty].label}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase text-muted-foreground">Portions</p>
              <p className="text-sm font-bold text-foreground-strong">{recipe.servings} pers.</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase text-muted-foreground">Note Gourmets</p>
              <p className="flex items-center gap-1 text-sm font-bold text-foreground-strong">
                <Icon name="star" size={14} className="text-warning" />
                {rating ? rating.average : "—"}
              </p>
            </div>
          </div>

          {recipe.detail.chefTip && (
            <div className="rounded-xl bg-catalog-badge-cream/50 p-3 text-sm text-foreground-strong">
              <strong>Le conseil de {recipe.detail.chefTipAuthor} :</strong> « {recipe.detail.chefTip} »
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

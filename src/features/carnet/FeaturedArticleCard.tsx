import Link from "next/link";

import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Avatar } from "@/src/components/atoms/Avatar/Avatar";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { Article } from "@/src/domain/article";
import { formatReadingTime } from "@/src/domain/article";
import { getAllIngredientIds, getRecipeBasketTotal, getPrimaryStoreOption, type Recipe } from "@/src/domain/recipe";
import { formatLongDate, formatPrice } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

export interface FeaturedArticleCardProps {
  article: Article;
  linkedRecipe: Recipe | null;
}

export function FeaturedArticleCard({ article, linkedRecipe }: FeaturedArticleCardProps) {
  const basketTotal = linkedRecipe ? getRecipeBasketTotal(linkedRecipe, getPrimaryStoreOption(linkedRecipe).storeSlug, getAllIngredientIds(linkedRecipe)) : null;

  return (
    <div className="grid grid-cols-1 gap-6 overflow-hidden rounded-2xl bg-surface p-5 shadow-card lg:grid-cols-[1.1fr_1fr]">
      <Link href={routes.main.carnetArticle(article.slug)} className="relative block">
        <ProductImage src={article.heroImage.src} alt={article.heroImage.alt} aspectRatio="4/3" sizes="(min-width: 1024px) 45vw, 100vw" className="rounded-xl" />
      </Link>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="cream" size="xs" shape="pill" uppercase>
            À la une · Dossier Terroir
          </Chip>
          <span className="text-xs text-muted-foreground">
            {formatReadingTime(article.readingMinutes)} · {formatLongDate(article.publishedAtIso.slice(0, 10))}
          </span>
        </div>
        <Link href={routes.main.carnetArticle(article.slug)}>
          <h2 className="text-xl font-extrabold text-foreground-strong hover:underline">{article.title}</h2>
        </Link>
        <p className="line-clamp-3 text-sm text-ink-muted">{article.excerpt}</p>
        <div className="flex items-center gap-2">
          <Avatar name={article.author.name} size={32} />
          <div>
            <p className="text-sm font-bold text-foreground-strong">{article.author.name}</p>
            <p className="text-xs text-muted-foreground">{article.author.role}</p>
          </div>
        </div>
        <ButtonLink href={routes.main.carnetArticle(article.slug)} variant="primary-md" icon={<Icon name="arrow-right" size={14} />} className="w-fit">
          Lire le dossier complet
        </ButtonLink>

        {linkedRecipe && basketTotal !== null && (
          <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-catalog-badge-cream/50 p-3">
            <div>
              <p className="text-xs font-bold text-foreground-strong">Panier Thieb Express</p>
              <p className="text-xs text-muted-foreground">{linkedRecipe.detail.ingredients.length} ingrédients locaux certifiés en stock</p>
            </div>
            <ButtonLink href={routes.main.recipeDetail(linkedRecipe.slug)} variant="accent" className="shrink-0">
              Ajouter ({formatPrice(basketTotal)})
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}

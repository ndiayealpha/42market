import Link from "next/link";

import { Avatar } from "@/src/components/atoms/Avatar/Avatar";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { ARTICLE_KIND_CONFIG, type Article } from "@/src/domain/article";
import { routes } from "@/src/lib/routing/routes";

export interface ArticleHubCardProps {
  article: Article;
}

export function ArticleHubCard({ article }: ArticleHubCardProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-card">
      <ProductImage
        src={article.heroImage.src}
        alt={article.heroImage.alt}
        aspectRatio="4/3"
        sizes="(min-width: 1024px) 33vw, 100vw"
        topLeft={
          <span className="rounded-full bg-surface/90 px-2 py-1 text-[11px] font-bold uppercase text-foreground-strong backdrop-blur-sm">
            {ARTICLE_KIND_CONFIG[article.kind].badgeLabel}
          </span>
        }
        bottomRight={
          <span className="flex items-center gap-1 rounded-full bg-foreground-strong/90 px-2 py-1 text-[11px] font-medium text-white">
            <Icon name="clock" size={12} />
            {article.readingMinutes} min
          </span>
        }
      />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={routes.main.carnetArticle(article.slug)} className="after:absolute after:inset-0">
          <h3 className="line-clamp-2 text-base font-bold text-foreground-strong hover:underline">{article.title}</h3>
        </Link>
        <p className="line-clamp-2 text-xs text-ink-muted">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar name={article.author.name} size={24} />
            <span className="truncate text-xs font-semibold text-foreground-strong">{article.author.name}</span>
          </div>
          <Icon name="arrow-right" size={14} className="relative z-10 shrink-0 text-foreground-strong" decorative />
        </div>
      </div>
    </div>
  );
}

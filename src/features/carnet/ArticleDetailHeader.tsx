import { Avatar } from "@/src/components/atoms/Avatar/Avatar";
import { Breadcrumb } from "@/src/components/atoms/Breadcrumb/Breadcrumb";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import { ARTICLE_KIND_CONFIG, formatReadingTime, type Article } from "@/src/domain/article";
import { formatLongDate } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

import { ArticleActionBar } from "./ArticleActionBar";

export interface ArticleDetailHeaderProps {
  article: Article;
}

export function ArticleDetailHeader({ article }: ArticleDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Breadcrumb
          items={[
            { label: "Blog", href: routes.main.carnet },
            { label: "Le Carnet du Terroir", href: routes.main.carnet },
            { label: ARTICLE_KIND_CONFIG[article.kind].label, href: `${routes.main.carnet}?cat=${article.kind}` },
            { label: article.title },
          ]}
        />
        <ArticleActionBar />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {article.tags.map((tag) => (
          <Chip key={tag} tone="cream" size="xs" shape="pill" uppercase>
            {tag}
          </Chip>
        ))}
        <span className="text-xs text-muted-foreground">
          {formatReadingTime(article.readingMinutes)} · {formatLongDate(article.publishedAtIso.slice(0, 10))}
        </span>
      </div>

      <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">{article.title}</h1>
      <p className="max-w-3xl text-sm text-ink-muted sm:text-base">{article.excerpt}</p>

      <div className="flex items-center gap-3">
        <Avatar name={article.author.name} size={40} />
        <div>
          <p className="text-sm font-bold text-foreground-strong">{article.author.name}</p>
          <p className="text-xs text-muted-foreground">{article.author.role}</p>
        </div>
      </div>

      <ProductImage src={article.heroImage.src} alt={article.heroImage.alt} aspectRatio="16/9" sizes="100vw" className="rounded-2xl" priority />
    </div>
  );
}

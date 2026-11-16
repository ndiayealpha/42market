import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import type { Article } from "@/src/domain/article";
import { routes } from "@/src/lib/routing/routes";

import { ArticleHubCard } from "./ArticleHubCard";

export interface ArticleRelatedSectionProps {
  relatedArticles: Article[];
  title?: string;
}

export function ArticleRelatedSection({ relatedArticles, title = "Poursuivre le voyage culinaire" }: ArticleRelatedSectionProps) {
  if (relatedArticles.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-foreground-strong">{title}</h2>
        <ButtonLink href={routes.main.carnet} variant="soft" icon={<Icon name="arrow-right" size={14} />}>
          Explorer toutes les études
        </ButtonLink>
      </div>
      <CardGrid columns={3}>
        {relatedArticles.map((article) => (
          <li key={article.id}>
            <ArticleHubCard article={article} />
          </li>
        ))}
      </CardGrid>
    </div>
  );
}

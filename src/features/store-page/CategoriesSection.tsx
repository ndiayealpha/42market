import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { Section } from "@/src/components/layout/Section/Section";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import type { Category } from "@/src/domain/store-merchandising";

import { CategoryTile } from "./CategoryTile";

export interface CategoriesSectionProps {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  /** Omit on the "tous les rayons" (all) view itself — the link would just point at the current page (rule 12: "masque-le"). */
  viewAllHref?: string;
  /** The aisle id matching the current page, if any — drives `aria-current`/active styling on its tile. */
  activeAisleId?: string;
}

const SKELETON_KEYS = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4", "skeleton-5", "skeleton-6", "skeleton-7", "skeleton-8"];

export function CategoriesSection({ categories, isLoading, isError, onRetry, viewAllHref, activeAisleId }: CategoriesSectionProps) {
  return (
    <Section
      id="categories"
      title="Catégories de rayons"
      subtitle="Explorez les arrivages frais et produits typiques de votre quartier"
      action={
        viewAllHref && (
          <ButtonLink href={viewAllHref} variant="soft" icon={<Icon name="arrow-right" size={16} />}>
            Voir tous les rayons
          </ButtonLink>
        )
      }
    >
      <AsyncSection
        isLoading={isLoading}
        isError={isError}
        isEmpty={categories.length === 0}
        onRetry={onRetry}
        skeleton={
          <div className="flex gap-4 overflow-x-auto sm:flex-wrap sm:overflow-visible">
            {SKELETON_KEYS.map((key) => (
              <Skeleton key={key} width={80} height={96} radius="2xl" className="shrink-0" />
            ))}
          </div>
        }
      >
        {/* 8 columns fit flat at 1440px (flex-wrap); below that it becomes a snap-scroll rail instead of wrapping (rule: "en dessous, défilement horizontal avec snap"). */}
        <nav aria-label="Rayons">
          <ul role="list" className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {categories.map((category) => (
              <li key={category.id}>
                <CategoryTile category={category} isActive={category.id === activeAisleId} />
              </li>
            ))}
          </ul>
        </nav>
      </AsyncSection>
    </Section>
  );
}

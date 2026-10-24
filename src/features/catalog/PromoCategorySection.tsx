import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { TextLink } from "@/src/components/atoms/Link/Link";
import { Section } from "@/src/components/layout/Section/Section";
import type { PromoCategorySectionData } from "@/src/domain/promotions";
import { formatNumber } from "@/src/lib/format";
import { routes } from "@/src/lib/routing/routes";

import { ProductRail } from "./ProductRail";

export interface PromoCategorySectionProps {
  storeSlug: string;
  section: PromoCategorySectionData;
  showStoreName?: boolean;
}

/** One per aisle with active promos, generated from data (rule: "Zéro copier-coller... tout vient d'un map"). Absent entirely when a section has no products (rule 10). */
export function PromoCategorySection({ storeSlug, section, showStoreName = true }: PromoCategorySectionProps) {
  if (section.products.length === 0) return null;

  return (
    <Section
      id={`promo-${section.aisleSlug}`}
      title={
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-catalog-chip">
            <Icon name="basket" size={16} className="text-foreground-strong" decorative />
          </span>
          {section.title}
          <Chip tone="cream" size="sm">
            {section.chipLabel}
          </Chip>
        </span>
      }
      subtitle={section.subtitle}
      action={
        <TextLink href={routes.main.epicerieRayon(storeSlug, section.aisleSlug)}>
          Voir tout ({formatNumber(section.totalCount)} articles) ›
        </TextLink>
      }
    >
      <div className="mt-4">
        {/* Distinct name from the section's own landmark — two nested regions can't share one accessible name (axe: landmark-unique). */}
        <ProductRail products={section.products} showStoreName={showStoreName} ariaLabel={`Produits : ${section.title}`} />
      </div>
    </Section>
  );
}

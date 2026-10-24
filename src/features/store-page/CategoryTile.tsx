import Link from "next/link";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Card } from "@/src/components/atoms/Card/Card";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { Category } from "@/src/domain/store-merchandising";

export interface CategoryTileProps {
  category: Category;
  /** Set on the aisle matching the current page (e.g. a filtered "tous les rayons" view) — not maquetted, derived from existing active-link tokens (rule 12). */
  isActive?: boolean;
}

/** The label right below already names the category, so its visual (photo or "deals" icon) is decorative. */
export function CategoryTile({ category, isActive = false }: CategoryTileProps) {
  const isDeals = category.variant === "deals";

  return (
    <Card variant="outlined" className={`w-[150px] shrink-0 snap-start ${isActive ? "!border-foreground-strong" : ""}`}>
      <Link
        href={category.href}
        aria-current={isActive ? "page" : undefined}
        className="flex flex-col items-center gap-2 rounded-lg text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-strong"
      >
        {isDeals ? (
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-catalog-danger text-white">
            <Icon name="zap" size={28} />
          </span>
        ) : (
          <ProductImage src={category.image.src} alt="" aspectRatio="1/1" className="h-16 w-16 rounded-full" />
        )}
        <span className="text-xs font-semibold text-foreground-strong">{category.label}</span>
        <span className="text-[11px] text-ink-muted">{category.hint}</span>
      </Link>
    </Card>
  );
}

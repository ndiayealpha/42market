import Link from "next/link";

import { Card } from "@/src/components/atoms/Card/Card";
import { IconText } from "@/src/components/atoms/IconText/IconText";
import { RatingChip } from "@/src/components/atoms/RatingChip/RatingChip";
import { StoreAvatar } from "@/src/components/atoms/StoreAvatar/StoreAvatar";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import type { SearchStoreGroup, StoreHighlight, StoreResultsLink } from "@/src/domain/search";
import { ProductCard } from "@/src/features/catalog/ProductCard";

export interface StoreResultGroupProps {
  group: SearchStoreGroup;
}

/** Exhaustive switch over the 3 highlight kinds (rule O) — one headline fact per store, never more than one line. */
function StoreHighlightText({ highlight }: { highlight: StoreHighlight }) {
  switch (highlight.kind) {
    case "promo":
      return <span className="font-semibold text-catalog-danger">{highlight.text}</span>;
    case "neutral":
      return <span className="text-ink-muted">{highlight.text}</span>;
    case "tagline":
      return <span className="italic text-ink-muted">{highlight.text}</span>;
    default: {
      const exhaustive: never = highlight;
      throw new Error(`Unhandled store highlight kind: ${JSON.stringify(exhaustive)}`);
    }
  }
}

/** Exhaustive switch over the 3 results-link kinds — "search" points back at this very page, filtered to one store (see the compte-rendu's deviation note on `CatalogScope`). */
function StoreResultsLinkContent({ link }: { link: StoreResultsLink }) {
  const linkClassName = "text-sm font-semibold text-foreground-strong underline underline-offset-2 hover:no-underline";

  switch (link.kind) {
    case "catalog":
      return (
        <Link href={link.href} className={linkClassName}>
          Voir tout le catalogue de l&apos;épicerie ({link.totalCount} produits)
        </Link>
      );
    case "search":
      return (
        <Link href={link.href} className={linkClassName}>
          Voir les {link.foundCount} résultats de cette épicerie
        </Link>
      );
    case "aisle":
      return (
        <Link href={link.href} className={linkClassName}>
          {link.aisleLabel}
        </Link>
      );
    default: {
      const exhaustive: never = link;
      throw new Error(`Unhandled store results link kind: ${JSON.stringify(exhaustive)}`);
    }
  }
}

/**
 * R4 — one store's header card (avatar, name, rating, pickup/distance,
 * highlight, "voir plus" link) plus up to `SEARCH_GROUP_MAX_PRODUCTS`
 * `ProductCard variant="search"` cards. A group with fewer than 6 products
 * (Abidjan Market's 4) still renders inside the same fixed 6-column
 * `CardGrid` — the grid's own column tracks simply end early, the cards
 * are never stretched to fill the row.
 */
export function StoreResultGroup({ group }: StoreResultGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card variant="elevated" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <StoreAvatar name={group.name} slug={group.slug} size={44} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-base font-bold text-foreground-strong">{group.name}</p>
              {group.rating && <RatingChip average={group.rating.average} reviewCount={group.rating.reviewCount} />}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <IconText icon="clock" tone="muted">
                {group.pickupLabel}
              </IconText>
              <IconText icon="location" tone="muted">
                {group.distanceLabel}
              </IconText>
            </div>
            <p className="mt-1.5 text-sm">
              <StoreHighlightText highlight={group.highlight} />
            </p>
          </div>
        </div>
        <div className="shrink-0 sm:self-center">
          <StoreResultsLinkContent link={group.resultsLink} />
        </div>
      </Card>

      <CardGrid columns={6}>
        {group.products.map((product) => (
          <li key={product.id}>
            <ProductCard variant="search" product={product} />
          </li>
        ))}
      </CardGrid>
    </div>
  );
}

import { InfoTile, type InfoTileProps } from "@/src/components/molecules/InfoTile/InfoTile";
import type { ProductFact } from "@/src/domain/product-detail";

/** `ProductFact.tone` has a "warning"/"danger" `IconTile` has no matching color for — mapped to the closest neutral/cream tone instead of widening `IconTile`'s own enum for this one page. */
const FACT_TONE_TO_TILE_TONE: Record<NonNullable<ProductFact["tone"]> | "none", NonNullable<InfoTileProps["tone"]>> = {
  success: "success",
  warning: "cream",
  danger: "neutral",
  none: "neutral",
};

export interface ProductFactsStripProps {
  facts: ProductFact[];
}

/** P3 — up to 3 `InfoTile`s built from `buildProductFacts`'s already-filtered list; renders nothing if there's somehow none. */
export function ProductFactsStrip({ facts }: ProductFactsStripProps) {
  if (facts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {facts.map((fact) => (
        <InfoTile
          key={fact.title}
          icon={fact.icon}
          title={fact.title}
          subtitle={fact.subtitle}
          layout="card"
          tone={FACT_TONE_TO_TILE_TONE[fact.tone ?? "none"]}
        />
      ))}
    </div>
  );
}

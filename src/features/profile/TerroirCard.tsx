import { Chip } from "@/src/components/atoms/Chip/Chip";
import { ProductImage } from "@/src/components/atoms/ProductImage/ProductImage";
import type { Terroir } from "@/src/domain/terroir";

export interface TerroirCardProps {
  terroir: Terroir;
}

export function TerroirCard({ terroir }: TerroirCardProps) {
  return (
    <li className="overflow-hidden rounded-2xl border border-border bg-surface">
      <ProductImage
        src={terroir.image.src}
        alt={terroir.image.alt}
        aspectRatio="4 / 3"
        sizes="(min-width: 640px) 33vw, 100vw"
        topLeft={
          terroir.isActive ? (
            <Chip tone="cream" size="sm" shape="pill" uppercase>
              Terroir Actif
            </Chip>
          ) : undefined
        }
      />
      <div className="p-3">
        <p className="text-sm font-bold text-foreground-strong">{terroir.country}</p>
        <p className="text-xs text-muted-foreground">{terroir.citiesLabel}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {terroir.productTags.slice(0, 2).map((tag) => (
            <Chip key={tag} tone="cream" size="xs">
              {tag}
            </Chip>
          ))}
        </div>
      </div>
    </li>
  );
}

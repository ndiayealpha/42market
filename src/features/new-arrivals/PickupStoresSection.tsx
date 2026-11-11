import Link from "next/link";

import { Card } from "@/src/components/atoms/Card/Card";
import { PickupTimeChip } from "@/src/components/atoms/PickupTimeChip/PickupTimeChip";
import { StoreAvatar } from "@/src/components/atoms/StoreAvatar/StoreAvatar";
import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { Section } from "@/src/components/layout/Section/Section";
import { formatNewArrivalCountLabel, type NewArrivalSection as NewArrivalSectionData } from "@/src/domain/new-arrival";
import { routes } from "@/src/lib/routing/routes";

export interface PickupStoresSectionProps {
  sections: NewArrivalSectionData[];
}

interface PickupStoreTile {
  slug: string;
  name: string;
  address: string;
  pickupLabel: string;
  closesAt: string;
  productCount: number;
}

function toPickupTiles(sections: NewArrivalSectionData[]): PickupStoreTile[] {
  return sections.flatMap((section) =>
    section.stores.map((store) => ({
      slug: store.slug,
      name: store.name,
      address: section.address,
      pickupLabel: section.pickupLabel,
      closesAt: section.closesAt,
      productCount: section.products.length,
    }))
  );
}

/** "Où retirer vos nouveaux arrivages à Saint-Étienne ?" — derived straight from the already-fetched sections (each store's own address/pickup/closing time), not a second data source to keep in sync. */
export function PickupStoresSection({ sections }: PickupStoresSectionProps) {
  const tiles = toPickupTiles(sections);

  return (
    <Section id="ou-retirer" title="Où retirer vos nouveaux arrivages à Saint-Étienne ?" subtitle={`${tiles.length} épiceries ouvertes au retrait`}>
      <CardGrid columns={3}>
        {tiles.map((tile) => (
          <li key={tile.slug}>
            <Card variant="elevated" className="relative flex items-start gap-3">
              <StoreAvatar name={tile.name} slug={tile.slug} size={40} />
              <div className="min-w-0 flex-1">
                <Link
                  href={routes.main.epicerieDetail(tile.slug)}
                  className="text-sm font-bold text-foreground-strong after:absolute after:inset-0"
                >
                  {tile.name}
                </Link>
                <p className="mt-0.5 truncate text-xs text-ink-muted">{tile.address}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <PickupTimeChip label={tile.pickupLabel} />
                  <span className="text-xs text-ink-muted">{formatNewArrivalCountLabel(tile.productCount)} enregistrées</span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">Ouvert jusqu&apos;à {tile.closesAt}</p>
              </div>
            </Card>
          </li>
        ))}
      </CardGrid>
    </Section>
  );
}

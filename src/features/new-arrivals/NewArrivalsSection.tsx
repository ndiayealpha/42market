import { TextLink } from "@/src/components/atoms/Link/Link";
import { PickupTimeChip } from "@/src/components/atoms/PickupTimeChip/PickupTimeChip";
import { StoreAvatar } from "@/src/components/atoms/StoreAvatar/StoreAvatar";
import { Section } from "@/src/components/layout/Section/Section";
import { formatNewArrivalCountLabel, getNewArrivalsAnchorId, type NewArrivalSection as NewArrivalSectionData } from "@/src/domain/new-arrival";
import { routes } from "@/src/lib/routing/routes";

import { NewArrivalsRail } from "./NewArrivalsRail";

export interface NewArrivalsSectionProps {
  section: NewArrivalSectionData;
}

/** One section per épicerie, or per combined pair (e.g. "Nimba & Salam Market") — mirrors `StoreDealsSection`'s shape, with overlapping avatars for the multi-store case. */
export function NewArrivalsSection({ section }: NewArrivalsSectionProps) {
  const anchorId = getNewArrivalsAnchorId(section.stores.map((store) => store.slug));
  const title = section.stores.map((store) => store.name).join(" & ");
  const primaryStore = section.stores[0];

  return (
    <Section
      id={anchorId}
      className="scroll-mt-20"
      leading={
        <span className="flex -space-x-2">
          {section.stores.map((store) => (
            <StoreAvatar key={store.slug} name={store.name} slug={store.slug} size={36} className="ring-2 ring-surface" />
          ))}
        </span>
      }
      title={
        <span className="flex flex-wrap items-center gap-2">
          {title}
          <PickupTimeChip label={section.pickupLabel} />
        </span>
      }
      subtitle={section.tagline}
      action={
        <TextLink href={routes.main.epicerieDetail(primaryStore.slug)} variant="default" aria-label={`Voir tous les arrivages ${title}`}>
          Voir les {formatNewArrivalCountLabel(section.products.length)} {title} →
        </TextLink>
      }
    >
      <NewArrivalsRail products={section.products} stores={section.stores} ariaLabel={`Nouveaux arrivages ${title}`} />
    </Section>
  );
}

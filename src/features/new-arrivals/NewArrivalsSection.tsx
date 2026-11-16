import { TextLink } from "@/src/components/atoms/Link/Link";
import { PickupTimeChip } from "@/src/components/atoms/PickupTimeChip/PickupTimeChip";
import { Section } from "@/src/components/layout/Section/Section";
import { StoreAvatarGroup } from "@/src/components/molecules/StoreAvatarGroup/StoreAvatarGroup";
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
      leading={<StoreAvatarGroup stores={section.stores} size={36} />}
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

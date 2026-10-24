"use client";

import { TextLink } from "@/src/components/atoms/Link/Link";
import { SectionHeader } from "@/src/components/layout/SectionHeader/SectionHeader";
import { Carousel } from "@/src/components/organisms/Carousel/Carousel";
import { RailArrows } from "@/src/components/organisms/Carousel/RailArrows";
import { useCarousel } from "@/src/components/organisms/Carousel/useCarousel";
import type { StoreDealsSummary } from "@/src/domain/store-deals";
import { routes } from "@/src/lib/routing/routes";

import { StoreDealsTile } from "./StoreDealsTile";

export interface StoreDealsNavigatorProps {
  stores: StoreDealsSummary[];
  /** Maps a store slug to its `StoreDealsSection`'s anchor id, further down the page. */
  getSectionAnchor: (slug: string) => string;
}

/** D2 — this header carries the page's own `<h1>` (rule: one H1 per page). */
export function StoreDealsNavigator({ stores, getSectionAnchor }: StoreDealsNavigatorProps) {
  const { containerRef, prev, next, canPrev, canNext, hasOverflow } = useCarousel();

  return (
    <section aria-labelledby="bons-plans-heading">
      <SectionHeader
        headingLevel="h1"
        headingId="bons-plans-heading"
        title="Bons plans par épiceries"
        subtitle="Vos boutiques avec les réductions les plus fortes aujourd'hui"
        action={
          <div className="flex items-center gap-3">
            <TextLink href={routes.main.epiceries} variant="default">
              Voir tout
            </TextLink>
            {hasOverflow && <RailArrows ariaLabel="Boutiques" onPrev={prev} onNext={next} canPrev={canPrev} canNext={canNext} />}
          </div>
        }
      />
      <div role="region" aria-roledescription="carousel" aria-label="Boutiques en promotion">
        <Carousel
          ref={containerRef}
          items={stores}
          rows={1}
          rowHeights={[72, 72]}
          getKey={(store) => store.slug}
          renderItem={(store) => <StoreDealsTile store={store} sectionAnchor={getSectionAnchor(store.slug)} />}
        />
      </div>
    </section>
  );
}

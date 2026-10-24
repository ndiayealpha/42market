"use client";

import { Icon } from "@/src/components/atoms/Icon/Icon";
import { IconButton } from "@/src/components/atoms/IconButton/IconButton";
import { TextLink } from "@/src/components/atoms/Link/Link";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { SectionHeader } from "@/src/components/molecules/SectionHeader/SectionHeader";

import { Carousel } from "../Carousel/Carousel";
import { useCarousel } from "../Carousel/useCarousel";
import { PromoCard, type PromoCardProps } from "../PromoCard/PromoCard";

export interface PromoSectionItem extends PromoCardProps {
  id: string;
}

export interface PromoSectionProps {
  kicker: string;
  meta?: string;
  title: string;
  totalCount: number;
  seeAll: { label: string; href: string };
  items: PromoSectionItem[];
  rows?: 1 | 2;
  rowHeights?: [number, number];
  hint?: string;
  /** Shows row-sized skeletons instead of the rail. */
  loading?: boolean;
}

/**
 * SectionHeader (kicker/title + "Voir tout" + arrows) + Carousel +
 * PromoCard, wired together. Owns the one `useCarousel()` call so the
 * header's arrows, the rail, and the footer's dots/hint all agree on
 * the same scroll state.
 */
export function PromoSection({
  kicker,
  meta,
  title,
  totalCount,
  seeAll,
  items,
  rows = 2,
  rowHeights = [230, 220],
  hint,
  loading,
}: PromoSectionProps) {
  const { containerRef, prev, next, canPrev, canNext, page, pageCount, goTo, hasOverflow } = useCarousel();

  if (!loading && items.length === 0) return null;

  return (
    <section aria-label={title} className="w-full px-3 py-8 sm:px-4">
      <SectionHeader
        kicker={kicker}
        live
        meta={meta}
        title={title}
        actions={
          <>
            <TextLink href={seeAll.href} className="!text-sm !font-semibold">
              {seeAll.label} ({totalCount})
            </TextLink>
            {hasOverflow && (
              <div className="hidden items-center gap-2 md:flex">
                <IconButton
                  icon="chevron-left"
                  size="md"
                  bg="var(--color-surface-subtle)"
                  fg="var(--color-foreground-strong)"
                  ariaLabel="Offres précédentes"
                  onClick={prev}
                  disabled={!canPrev}
                />
                <IconButton
                  icon="chevron-right"
                  size="md"
                  bg="var(--color-surface-subtle)"
                  fg="var(--color-foreground-strong)"
                  ariaLabel="Offres suivantes"
                  onClick={next}
                  disabled={!canNext}
                />
              </div>
            )}
          </>
        }
      />

      <div className="mt-7">
        {loading ? (
          <div className="flex gap-2" aria-hidden>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} height={230} radius="2xl" className="w-[85vw] max-w-[400px] shrink-0 md:w-[480px]" />
            ))}
          </div>
        ) : (
          <Carousel
            ref={containerRef}
            items={items}
            rows={rows}
            rowHeights={rowHeights}
            getKey={(item) => item.id}
            renderItem={(item) => <PromoCard {...item} />}
          />
        )}
      </div>

      {hasOverflow && !loading && (
        <div className="mt-9 flex items-center justify-between gap-4">
          {hint && (
            <p className="hidden items-center gap-2 text-xs text-ink-muted md:flex">
              <Icon name="swipe" size={16} decorative />
              {hint}
            </p>
          )}
          <div className="mx-auto flex items-center gap-1.5 md:mx-0" role="tablist" aria-label="Pages de la liste d'offres">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Page ${index + 1} sur ${pageCount}`}
                aria-current={page === index ? "true" : undefined}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-200 motion-reduce:transition-none ${
                  page === index ? "w-6 bg-foreground-strong" : "w-2 bg-dot-idle"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

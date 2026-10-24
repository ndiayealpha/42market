import Link from "next/link";

import { AsyncSection } from "@/src/components/layout/AsyncSection/AsyncSection";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { IconButton } from "@/src/components/atoms/IconButton/IconButton";
import { ProgressBar } from "@/src/components/atoms/ProgressBar/ProgressBar";
import { Skeleton } from "@/src/components/atoms/Skeleton/Skeleton";
import { Carousel } from "@/src/components/organisms/Carousel/Carousel";
import { useCarousel } from "@/src/components/organisms/Carousel/useCarousel";
import type { Offer } from "@/src/domain/store-merchandising";
import { formatNumber, formatUpdatedAt } from "@/src/lib/format";

import { OfferCard } from "./OfferCard";

export interface OffersBannerProps {
  offers: Offer[];
  totalCount: number;
  updatedAtIso: string;
  stockedStoreCount: number;
  now: Date;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onAdd: (offerId: string) => void;
}

const SKELETON_KEYS = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"];

/** The one dark-red banner + carousel — `useCarousel` drives both the header's arrows and the rail itself, same split as `PromoSection`. */
export function OffersBanner({
  offers,
  totalCount,
  updatedAtIso,
  stockedStoreCount,
  now,
  isLoading,
  isError,
  onRetry,
  onAdd,
}: OffersBannerProps) {
  const { containerRef, prev, next, canPrev, canNext, hasOverflow } = useCarousel();
  const progressPercent = totalCount > 0 ? (offers.length / totalCount) * 100 : 0;

  return (
    <section aria-label="Offres de l'épicerie" className="overflow-hidden rounded-[22px] shadow-card">
      <div className="flex items-center justify-between gap-4 bg-catalog-danger px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">
            <Icon name="zap" size={18} />
          </span>
          <h2 className="text-lg font-bold text-white">Offres de l&apos;épicerie</h2>
        </div>
        <div className="flex items-center gap-3">
          {/* TODO: no "all offers" route exists yet */}
          <Link href="#" className="hidden text-sm font-semibold text-white sm:inline">
            Découvrez toutes les offres
          </Link>
          {hasOverflow && !isLoading && (
            <div className="flex items-center gap-2">
              <IconButton icon="chevron-left" size="md" bg="rgba(255,255,255,0.2)" fg="#FFFFFF" ariaLabel="Offres précédentes" onClick={prev} disabled={!canPrev} />
              <IconButton icon="chevron-right" size="md" bg="rgba(255,255,255,0.2)" fg="#FFFFFF" ariaLabel="Offres suivantes" onClick={next} disabled={!canNext} />
            </div>
          )}
        </div>
      </div>

      <div className="bg-surface p-5">
        <AsyncSection
          isLoading={isLoading}
          isError={isError}
          isEmpty={offers.length === 0}
          onRetry={onRetry}
          skeleton={
            <div className="flex gap-4" aria-hidden>
              {SKELETON_KEYS.map((key) => (
                <Skeleton key={key} width={200} height={290} radius="xl" />
              ))}
            </div>
          }
        >
          <Carousel
            ref={containerRef}
            items={offers}
            rows={1}
            rowHeights={[290, 290]}
            getKey={(offer) => offer.id}
            renderItem={(offer) => <OfferCard offer={offer} onAdd={() => onAdd(offer.id)} />}
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
            <div className="flex items-center gap-2">
              <span>Progression</span>
              <ProgressBar
                value={progressPercent}
                tone="success"
                aria-label="Progression des produits répertoriés"
                aria-valuetext={`${offers.length} sur ${totalCount} produits répertoriés`}
                className="!w-28"
              />
              <span>{formatNumber(totalCount)} produits répertoriés</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-catalog-success" aria-hidden />
                En stock dans les {stockedStoreCount} épiceries
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="clock" size={14} />
                Mis à jour {formatUpdatedAt(updatedAtIso, now)}
              </span>
            </div>
          </div>
        </AsyncSection>
      </div>
    </section>
  );
}

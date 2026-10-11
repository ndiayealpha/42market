"use client";

import type { SessionUser } from "@/src/features/auth";
import { Eyebrow } from "@/src/components/layout/Eyebrow/Eyebrow";
import { Button } from "@/src/components/atoms/Button/Button";
import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { CountdownBar } from "@/src/components/organisms/CountdownBar/CountdownBar";
import { PromoSection } from "@/src/components/organisms/PromoSection/PromoSection";
import { PROMO_ITEMS, PROMO_SECTION_CONTENT } from "@/src/components/organisms/PromoSection/PromoSection.data";
import { StoreGridSection } from "@/src/features/stores/StoreGridSection";
import { PreordersSection } from "@/src/features/preorders/PreordersSection";
import { RecipesSection } from "@/src/features/recipes/RecipesSection";
import { useNearbyStores } from "@/src/hooks/useNearbyStores";
import { useCityStores } from "@/src/hooks/useCityStores";
import { usePreorderCampaigns } from "@/src/hooks/usePreorderCampaigns";

export interface DashboardViewProps {
  user: SessionUser;
}

export function DashboardView({ user }: DashboardViewProps) {
  const nearby = useNearbyStores();
  const city = useCityStores();
  const preorders = usePreorderCampaigns();

  return (
    <>
      <section className="p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2">Welcome back, {user.name}.</p>
      </section>

      <div className="px-3 sm:px-4">
        <CountdownBar className="mx-auto w-full sm:w-1/2" />
      </div>

      <PromoSection
        kicker={PROMO_SECTION_CONTENT.kicker}
        meta={`Mis à jour en direct · ${PROMO_SECTION_CONTENT.totalCount} offres actives à Saint-Étienne`}
        title={PROMO_SECTION_CONTENT.title}
        totalCount={PROMO_SECTION_CONTENT.totalCount}
        seeAll={PROMO_SECTION_CONTENT.seeAll}
        hint={PROMO_SECTION_CONTENT.hint}
        items={PROMO_ITEMS}
      />

      <div className="mx-auto max-w-[1280px] space-y-12 px-4 py-12 sm:px-6 xl:px-0">
        <StoreGridSection
          id="nearby-stores"
          eyebrow={<Eyebrow tone="accent">Moins de 10 km de vous</Eyebrow>}
          title="Épiceries près de vous"
          action={
            <Button variant="soft" aria-haspopup="listbox">
              <span className="font-semibold text-ink-muted">Classé par : </span>
              <span className="font-bold text-foreground-strong">Distance la plus courte</span>
            </Button>
          }
          stores={nearby.stores}
          isLoading={nearby.isLoading}
          emptyMessage="Aucune épicerie à moins de 10 km pour l'instant."
        />

        <StoreGridSection
          id="city-stores"
          eyebrow={<Eyebrow>Catalogue complet</Eyebrow>}
          title="Épiceries de la ville"
          action={
            <ButtonLink href="/main/epiceries" variant="soft" icon={<Icon name="arrow-right" size={16} />}>
              Voir tout (15+)
            </ButtonLink>
          }
          stores={city.stores}
          isLoading={city.isLoading}
          emptyMessage="Aucune épicerie à afficher pour l'instant."
        />

        <PreordersSection campaigns={preorders.campaigns} isLoading={preorders.isLoading} />

        <RecipesSection />
      </div>
    </>
  );
}

import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { Section } from "@/src/components/layout/Section/Section";
import { FEATURE_FLAGS } from "@/src/config/feature-flags";
import type { PreorderCampaign } from "@/src/domain/preorder";
import { routes } from "@/src/lib/routing/routes";

import { PreordersPanel } from "./PreordersPanel";

export interface PreordersSectionProps {
  campaigns: PreorderCampaign[];
  isLoading?: boolean;
}

/** K1 (2026-11-17 UAT): gated here, not at each call site — a second call site (the store page) was missing the flag check the home page already had. */
export function PreordersSection({ campaigns, isLoading }: PreordersSectionProps) {
  if (!FEATURE_FLAGS.precommandesEnabled) return null;

  return (
    <Section
      id="preorders"
      title="Précommandes groupées"
      action={
        <ButtonLink href={routes.main.preorders} variant="soft" icon={<Icon name="arrow-right" size={16} />}>
          Toutes les campagnes
        </ButtonLink>
      }
    >
      {!isLoading && campaigns.length === 0 ? (
        <p className="text-sm text-ink-muted">Aucune précommande groupée pour l&apos;instant.</p>
      ) : (
        <PreordersPanel campaigns={campaigns} isLoading={isLoading} />
      )}
    </Section>
  );
}

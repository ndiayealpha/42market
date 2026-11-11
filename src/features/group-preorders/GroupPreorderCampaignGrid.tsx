import { CardGrid } from "@/src/components/layout/CardGrid/CardGrid";
import { Section } from "@/src/components/layout/Section/Section";
import { formatRelativeTime } from "@/src/lib/format";
import type { GroupPreorderCampaign } from "@/src/domain/group-preorder";

import { GroupPreorderCampaignCard } from "./GroupPreorderCampaignCard";

export interface GroupPreorderCampaignGridProps {
  campaigns: GroupPreorderCampaign[];
  now: Date;
  /** When the campaign list was last refreshed — "Actualisé il y a X min". */
  refreshedAtIso: string;
}

export function GroupPreorderCampaignGrid({ campaigns, now, refreshedAtIso }: GroupPreorderCampaignGridProps) {
  return (
    <Section
      id="campagnes-ouvertes"
      title="Campagnes ouvertes à la réservation"
      subtitle="Paiement à la réservation avec garantie d'annulation sans frais si le seuil coopératif n'est pas atteint."
      action={
        <span className="text-xs text-ink-muted">
          Actualisé {formatRelativeTime(refreshedAtIso, now).replace(/^./, (char) => char.toLowerCase())}
        </span>
      }
    >
      <CardGrid columns={4}>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <GroupPreorderCampaignCard campaign={campaign} now={now} />
          </li>
        ))}
      </CardGrid>
    </Section>
  );
}

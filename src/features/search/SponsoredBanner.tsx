import type { ReactNode } from "react";

import { BannerCta } from "@/src/components/layout/BannerCta/BannerCta";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { CodeChip } from "@/src/components/molecules/CodeChip/CodeChip";
import type { SearchCampaign } from "@/src/domain/search";

export interface SponsoredBannerProps {
  campaign?: SearchCampaign;
}

/** Bolds the campaign's own `highlightedPhrase` wherever it appears in `body` — never `dangerouslySetInnerHTML`. Falls back to the plain body if the phrase isn't found verbatim in it. */
function renderBody(body: string, highlightedPhrase: string): ReactNode {
  const index = body.indexOf(highlightedPhrase);
  if (index === -1) return body;
  return (
    <>
      {body.slice(0, index)}
      <strong className="font-extrabold text-white">{highlightedPhrase}</strong>
      {body.slice(index + highlightedPhrase.length)}
    </>
  );
}

/**
 * R2 — reuses the same dark `BannerSurface`/`BannerCta` primitive as
 * `LoyaltyBanner`/`SponsoredParcelBanner` rather than a new card (rule 5:
 * "Étends-la, ne crée pas une seconde carte sombre"). The "Sponsorisé"
 * label is always real text in the DOM (never CSS-only), same pattern as
 * `SponsoredParcelBanner`. Renders nothing when there's no campaign.
 */
export function SponsoredBanner({ campaign }: SponsoredBannerProps) {
  if (!campaign) return null;

  return (
    <BannerSurface tone="forest" className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <Icon name="sparkle" size={22} />
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">Sponsorisé</span>
            <span className="text-xs font-semibold text-white/70">{campaign.storeName}</span>
          </div>
          <h2 className="mt-1 text-lg font-extrabold text-white">{campaign.title}</h2>
          <p className="mt-1 text-sm text-white/80">{renderBody(campaign.body, campaign.highlightedPhrase)}</p>
          <div className="mt-2">
            <CodeChip code={campaign.code} />
          </div>
        </div>
      </div>

      <BannerCta href={campaign.ctaHref} className="self-start sm:self-auto">
        {campaign.ctaLabel}
      </BannerCta>
    </BannerSurface>
  );
}

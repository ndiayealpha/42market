import { BannerCta } from "@/src/components/layout/BannerCta/BannerCta";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { LOYALTY_PROGRAM_CONFIG } from "@/src/domain/profile";

export interface LoyaltyBannerProps {
  ctaHref: string;
}

/**
 * D4 — the "inline" layout of the Profile's dark `BannerSurface`
 * (`JoinNetworkBanner` is its "stacked" sibling): same primitive reused,
 * badge/title/description on the left and the CTA on the right instead of
 * stacked below (rule 5: "Étends-la, ne crée pas une seconde carte sombre").
 * Hidden entirely for an already-active loyalty card — see
 * `assembleDealsBlocks`.
 */
export function LoyaltyBanner({ ctaHref }: LoyaltyBannerProps) {
  return (
    <BannerSurface tone="brown" className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Chip tone="cream" size="sm" shape="pill" icon={<Icon name="sparkle" size={12} decorative />} uppercase className="self-start">
          Programme fidélité 42 Markets
        </Chip>
        <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-[32px]">
          Cumulez {LOYALTY_PROGRAM_CONFIG.cashbackPercent}% en cagnotte à chaque commande
        </h2>
        <p className="mt-1 text-sm text-white/80">
          Valable auprès de toutes les épiceries exotiques et indépendantes de votre agglomération. Débloquez vos bons d&apos;achat dès{" "}
          {LOYALTY_PROGRAM_CONFIG.voucherThresholdAmount}€ cumulés.
        </p>
      </div>
      <BannerCta href={ctaHref} className="shrink-0 self-start sm:self-center">
        Activer ma carte fidélité
      </BannerCta>
    </BannerSurface>
  );
}

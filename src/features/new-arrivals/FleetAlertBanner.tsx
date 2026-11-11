import Link from "next/link";

import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { BannerCta } from "@/src/components/layout/BannerCta/BannerCta";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";
import { routes } from "@/src/lib/routing/routes";

/**
 * Mirrors `LoyaltyBanner`'s "inline" `BannerSurface` layout. "Activer mes
 * alertes arrivages" reuses the real notifications-preferences page
 * (`routes.main.notifications`) — exactly what that action means, not a
 * dead link. "Planning des vols" has no dedicated page yet, so it reuses
 * the same placeholder contact route already shared by 3 other "en savoir
 * plus" CTAs app-wide (`HelpCard`, `ZeroSpamCard`, `SupportBar`).
 */
export function FleetAlertBanner() {
  return (
    <BannerSurface tone="brown" className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Chip tone="cream" size="sm" shape="pill" icon={<Icon name="truck" size={12} decorative />} uppercase className="self-start">
          Alerte Fret &amp; Débarquements Directs
        </Chip>
        <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-[32px]">
          Ne ratez plus jamais un arrivage rare de mangues, safous ou tubercules frais
        </h2>
        <p className="mt-1 max-w-xl text-sm text-white/80">
          Les cargaisons de fruits exotiques par avion et les poissons fumés s&apos;écoulent souvent en moins de 3 heures. Choisissez votre
          boutique préférée et recevez un texto dès l&apos;ouverture des cartons.
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
        <BannerCta href={routes.main.notifications} icon={<Icon name="bell" size={14} decorative />}>
          Activer mes alertes arrivages
        </BannerCta>
        <Link
          href={routes.main.support}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-white/30 px-4 text-[13px] font-bold text-white transition-colors hover:bg-white/10"
        >
          Planning des vols de la semaine
        </Link>
      </div>
    </BannerSurface>
  );
}

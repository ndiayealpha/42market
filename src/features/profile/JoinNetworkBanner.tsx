import { BannerCta } from "@/src/components/layout/BannerCta/BannerCta";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { routes } from "@/src/lib/routing/routes";

/** Reuses `routes.auth.createAccount` — already the merchant sign-up destination elsewhere (`StoreRegistrationButton` in the Header), not a new route. */
export function JoinNetworkBanner() {
  return (
    <BannerSurface tone="brown" className="flex flex-col gap-4 p-5">
      <Chip tone="cream" size="sm" shape="pill" icon={<Icon name="store" size={12} decorative />} uppercase className="self-start">
        Rejoindre le réseau de proximité
      </Chip>
      <div>
        <h2 className="text-lg font-bold text-white">Vous êtes commerçant, primeur ou traiteur ligérien ?</h2>
        <p className="mt-1 text-sm text-white/80">
          Inscrivez votre épicerie sur 42 Markets et valorisez vos produits du terroir auprès de milliers d&apos;habitants du Forez.
        </p>
      </div>
      <BannerCta href={routes.auth.createAccount} className="self-start">
        Inscrire mon commerce sur 42 Markets
      </BannerCta>
    </BannerSurface>
  );
}

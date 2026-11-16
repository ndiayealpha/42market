import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon } from "@/src/components/atoms/Icon/Icon";
import { BannerSurface } from "@/src/components/layout/BannerSurface/BannerSurface";
import { routes } from "@/src/lib/routing/routes";

import { MERCHANT_DEMO_FEATURES } from "./merchant-onboarding.constants";

/** Stands in for "Découvrir la démo commerçant" — no real video/demo environment exists for this mock app, so the hero CTA scrolls here to the actual feature set instead of opening a fabricated video modal. */
export function MerchantDemoSection() {
  return (
    <BannerSurface id="demo" tone="brown" className="scroll-mt-24 px-6 py-10 sm:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-xl font-extrabold text-white sm:text-2xl">Gérer sa boutique depuis son smartphone, entre deux clients au comptoir</h2>
        <p className="mt-2 text-sm text-white/80">
          Pas le temps de rester assis derrière un bureau ? Notre interface commerçant a été forgée avec les épiciers : gros boutons, contrastes
          lisibles en plein soleil, gestion des promotions et des arrivages en quelques gestes.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {MERCHANT_DEMO_FEATURES.map((feature) => (
          <div key={feature.title} className="flex flex-col gap-2 rounded-xl bg-white/10 p-4">
            <Icon name={feature.icon} size={20} className="text-white" decorative />
            <p className="text-sm font-bold text-white">{feature.title}</p>
            <p className="text-xs text-white/75">{feature.description}</p>
            <span className="mt-auto inline-flex w-fit items-center rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white">{feature.tag}</span>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 border-t border-white/15 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-white/80">Vous êtes déjà affilié à 42 Markets ? Accédez sans attendre à votre espace de commande en direct.</p>
        <ButtonLink href={`${routes.auth.login}?callbackUrl=${encodeURIComponent(routes.main.merchantOnboarding)}`} variant="accent" className="shrink-0">
          Connexion Espace Commerçant
        </ButtonLink>
      </div>
    </BannerSurface>
  );
}

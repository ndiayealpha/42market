import { ButtonLink } from "@/src/components/atoms/Button/ButtonLink";
import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

const TRUST_BADGES: { icon: IconName; label: string }[] = [
  { icon: "tag", label: "0€ d'installation" },
  { icon: "refresh", label: "Reversé à J+7" },
  { icon: "headset", label: "Support humain" },
];

/** Both CTAs are same-page anchors (`#formulaire`, `#demo`) — no modal/video asset exists for "Découvrir la démo", so it scrolls to the real `MerchantDemoSection` further down instead of a fabricated video player. */
export function MerchantHero() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">
          Rejoindre la famille 42 Markets en toute simplicité
        </h1>
        <p className="mt-3 text-sm text-ink-muted sm:text-base">
          42 Markets accompagne les épiciers ethniques, afro-exotiques. Pas besoin d&apos;être un expert du numérique : développez votre chiffre
          d&apos;affaires sans abonnement contraignant. Mise en ligne de votre boutique en moins de 48 heures chrono.
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row">
        <ButtonLink href="#formulaire" variant="primary-lg">
          Ouvrir ma boutique gratuitement
        </ButtonLink>
        <ButtonLink href="#demo" variant="soft">
          Découvrir la démo commerçant
        </ButtonLink>
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-ink-muted">
        {TRUST_BADGES.map((badge) => (
          <li key={badge.label} className="flex items-center gap-1.5">
            <Icon name={badge.icon} size={14} className="text-foreground-strong" decorative />
            {badge.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
